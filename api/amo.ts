import axios, {AxiosResponse} from "axios";
import config from "../config";
import querystring from "querystring";
import fs from "fs";
import axiosRetry from "axios-retry";
import Api from "./api";
import {
    getUserLogger
} from "../logger";
import log4js from "log4js"
import {LeadData} from "../types/lead/lead";
import {Contact} from "../types/contacts/contact";
import {CreatedTask, Task} from "../types/task/task";
import {AccountSettings} from "../types/accountSettings/accountSettings";
import {TaskList} from "../types/task/taskList";
import {Lead} from "../types/embeddedEntities/embeddedEntities";
import {Company} from "../types/companies/company";


axiosRetry(axios, {retries: 3, retryDelay: axiosRetry.exponentialDelay});

class AmoCRM extends Api {
    AMO_TOKEN_PATH: string;
    LIMIT: number;
    ROOT_PATH: string;
    ACCESS_TOKEN: string;
    REFRESH_TOKEN: string;
    SUB_DOMAIN: string;
    logger: log4js.Logger;
    CODE: string;

    constructor(subDomain: string, CODE: string) {
        super();
        this.SUB_DOMAIN = subDomain;
        this.AMO_TOKEN_PATH = `./authclients/${this.SUB_DOMAIN}_amo_token.json`;
        this.LIMIT = 200;
        this.ROOT_PATH = `https://${this.SUB_DOMAIN}.amocrm.ru`
        this.ACCESS_TOKEN = "";
        this.REFRESH_TOKEN = "";
        this.logger = getUserLogger(this.SUB_DOMAIN);
        this.CODE = CODE;
    }

    authChecker = <T extends any[], D>(request: (...args: T) => Promise<D>) => {
        return async (...args: T): Promise<D> => {
            if (!this.ACCESS_TOKEN) {
                return this.getAccessToken().then(() => this.authChecker(request)(...args));
            }
            return request(...args).catch((err: any) => {
                this.logger.error(err.response);
                this.logger.error(err);
                this.logger.error(err.response.data);
                const data = err.response.data;
                if ('validation-errors' in data) {
                    //data['validation-errors'].forEach(({ errors }) => logger.error(errors))
                    this.logger.error('args', JSON.stringify(args, null, 2))
                }
                if (data.status == 401 && data.title === "Unauthorized") {
                    this.logger.debug("Нужно обновить токен");
                    return this.refreshToken().then(() => this.authChecker(request)(...args));
                }
                throw err
            });
        };
    };

    async requestAccessToken() {
        return axios
            .post(`${this.ROOT_PATH}/oauth2/access_token`, {
                client_id: config.CLIENT_ID,
                client_secret: config.CLIENT_SECRET,
                grant_type: "authorization_code",
                code: this.CODE,
                redirect_uri: config.REDIRECT_URI,
            })
            .then((res) => {
                this.logger.debug("Свежий токен получен");
                return res.data;
            })
            .catch((err) => {
                this.logger.error(err.response.data);
                throw err;
            });
    };

    async getAccessToken() {
        if (this.ACCESS_TOKEN) {
            return Promise.resolve(this.ACCESS_TOKEN);
        }
        try {
            const content = fs.readFileSync(this.AMO_TOKEN_PATH).toString();
            const token = JSON.parse(content);
            this.ACCESS_TOKEN = token.access_token;
            this.REFRESH_TOKEN = token.refresh_token;
            return Promise.resolve(token);
        } catch (error) {
            this.logger.error(`Ошибка при чтении файла ${this.AMO_TOKEN_PATH}`, error);
            this.logger.debug("Попытка заново получить токен");
            const token = await this.requestAccessToken();
            fs.writeFileSync(this.AMO_TOKEN_PATH, JSON.stringify(token));
            this.ACCESS_TOKEN = token.ACCESS_TOKEN;
            this.REFRESH_TOKEN = token.REFRESH_TOKEN;
            return Promise.resolve(token);
        }
    };

    async refreshToken() {
        return axios
            .post(`${this.ROOT_PATH}/oauth2/access_token`, {
                client_id: config.CLIENT_ID,
                client_secret: config.CLIENT_SECRET,
                grant_type: "refresh_token",
                refresh_token: this.REFRESH_TOKEN,
                redirect_uri: config.REDIRECT_URI,
            })
            .then((res) => {
                this.logger.debug("Токен успешно обновлен");
                const token = res.data;
                fs.writeFileSync(this.AMO_TOKEN_PATH, JSON.stringify(token));
                this.ACCESS_TOKEN = token.ACCESS_TOKEN;
                this.REFRESH_TOKEN = token.REFRESH_TOKEN;
                return token;
            })
            .catch((err) => {
                this.logger.error("Не удалось обновить токен");
                this.logger.error(err.response.data);
            });
    };

    getAccountData = this.authChecker((withParam: string[] = []) => {
        return axios.get<AccountSettings>(`${this.ROOT_PATH}/api/v4/account?${querystring.encode({
            with: withParam.join(","),
        })}`, {
            headers: {
                Authorization: `Bearer ${this.ACCESS_TOKEN}`,
            },
        }).then((res) => res.data)
    })


    getDeal = this.authChecker((id: string, withParam: string[] = []): Promise<LeadData> => {
        return axios
            .get<LeadData>(
                `${this.ROOT_PATH}/api/v4/leads/${id}?${querystring.encode({
                    with: withParam.join(","),
                })}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.ACCESS_TOKEN}`,
                    },
                }
            )
            .then((res) => res.data);
    });

    // Получить контакт по id
    getContact = this.authChecker((id: string): Promise<Contact> => {
        return axios
            .get<Contact>(`${this.ROOT_PATH}/api/v4/contacts/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.ACCESS_TOKEN}`,
                },
            })
            .then((res) => res.data);
    });

    // Получить компанию по id
    getCompany = this.authChecker((id: string): Promise<Company> => {
        return axios
            .get(`${this.ROOT_PATH}/api/v4/companies/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.ACCESS_TOKEN}`,
                },
            })
            .then((res) => res.data);
    });

    getUnfulfilledTasksFromDeal = this.authChecker((entityId: string): Promise<TaskList | string> => {
        return axios
            .get(`${this.ROOT_PATH}/api/v4/tasks?filter[is_completed]=0&filter[entity_id]=${entityId}`, {
                headers: {
                    Authorization: `Bearer ${this.ACCESS_TOKEN}`,
                },
            })
            .then((res) => res.data);
    })

    updateDeal = this.authChecker((data: LeadData): Promise<LeadData> => {
        return axios
            .patch<LeadData>(`${this.ROOT_PATH}/api/v4/leads`, [data], {
                headers: {
                    Authorization: `Bearer ${this.ACCESS_TOKEN}`,
                },
            }).then((res) => res.data)
    })

    createTasks = this.authChecker((data: CreatedTask[]): Promise<CreatedTask> => {
        return axios
            .post<CreatedTask>(`${this.ROOT_PATH}/api/v4/tasks`, [...data], {
                headers: {
                    Authorization: `Bearer ${this.ACCESS_TOKEN}`,
                },
            }).then((res) => res.data)
    })

}


export default AmoCRM;