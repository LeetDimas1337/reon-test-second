"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config"));
const querystring_1 = __importDefault(require("querystring"));
const fs_1 = __importDefault(require("fs"));
const axios_retry_1 = __importDefault(require("axios-retry"));
const api_1 = __importDefault(require("./api"));
const logger_1 = require("../logger");
(0, axios_retry_1.default)(axios_1.default, { retries: 3, retryDelay: axios_retry_1.default.exponentialDelay });
class AmoCRM extends api_1.default {
    constructor(subDomain, CODE) {
        super();
        this.authChecker = (request) => {
            return (...args) => __awaiter(this, void 0, void 0, function* () {
                if (!this.ACCESS_TOKEN) {
                    return this.getAccessToken().then(() => this.authChecker(request)(...args));
                }
                return request(...args).catch((err) => {
                    this.logger.error(err.response);
                    this.logger.error(err);
                    this.logger.error(err.response.data);
                    const data = err.response.data;
                    if ('validation-errors' in data) {
                        // data['validation-errors'].forEach(({ errors }) => logger.error(errors))
                        this.logger.error('args', JSON.stringify(args, null, 2));
                    }
                    if (data.status == 401 && data.title === "Unauthorized") {
                        this.logger.debug("Нужно обновить токен");
                        return this.refreshToken().then(() => this.authChecker(request)(...args));
                    }
                    throw err;
                });
            });
        };
        this.getAccountData = this.authChecker(() => {
            return axios_1.default.get(`${this.ROOT_PATH}/api/v4/account`, {
                headers: {
                    Authorization: `Bearer ${this.ACCESS_TOKEN}`,
                },
            }).then((res) => res.data);
        });
        this.getDeal = this.authChecker((id, withParam = []) => {
            return axios_1.default
                .get(`${this.ROOT_PATH}/api/v4/leads/${id}?${querystring_1.default.encode({
                with: withParam.join(","),
            })}`, {
                headers: {
                    Authorization: `Bearer ${this.ACCESS_TOKEN}`,
                },
            })
                .then((res) => res.data);
        });
        // Получить контакт по id
        this.getContact = this.authChecker((id) => {
            return axios_1.default
                .get(`${this.ROOT_PATH}/api/v4/contacts/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.ACCESS_TOKEN}`,
                },
            })
                .then((res) => res.data);
        });
        // Получить компанию по id
        this.getCompany = this.authChecker((id) => {
            return axios_1.default
                .get(`${this.ROOT_PATH}/api/v4/companies/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.ACCESS_TOKEN}`,
                },
            })
                .then((res) => res.data);
        });
        this.SUB_DOMAIN = subDomain;
        this.AMO_TOKEN_PATH = `./authclients/${this.SUB_DOMAIN}_amo_token.json`;
        this.LIMIT = 200;
        this.ROOT_PATH = `https://${this.SUB_DOMAIN}.amocrm.ru`;
        this.ACCESS_TOKEN = "";
        this.REFRESH_TOKEN = "";
        this.logger = (0, logger_1.getUserLogger)(this.SUB_DOMAIN);
        this.CODE = CODE;
    }
    requestAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            return axios_1.default
                .post(`${this.ROOT_PATH}/oauth2/access_token`, {
                client_id: config_1.default.CLIENT_ID,
                client_secret: config_1.default.CLIENT_SECRET,
                grant_type: "authorization_CODE",
                CODE: this.CODE,
                redirect_uri: config_1.default.REDIRECT_URI,
            })
                .then((res) => {
                this.logger.debug("Свежий токен получен");
                return res.data;
            })
                .catch((err) => {
                this.logger.error(err.response.data);
                throw err;
            });
        });
    }
    ;
    getAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.ACCESS_TOKEN) {
                return Promise.resolve(this.ACCESS_TOKEN);
            }
            try {
                const content = fs_1.default.readFileSync(this.AMO_TOKEN_PATH).toString();
                const token = JSON.parse(content);
                this.ACCESS_TOKEN = token.ACCESS_TOKEN;
                this.REFRESH_TOKEN = token.REFRESH_TOKEN;
                return Promise.resolve(token);
            }
            catch (error) {
                this.logger.error(`Ошибка при чтении файла ${this.AMO_TOKEN_PATH}`, error);
                this.logger.debug("Попытка заново получить токен");
                const token = yield this.requestAccessToken();
                fs_1.default.writeFileSync(this.AMO_TOKEN_PATH, JSON.stringify(token));
                this.ACCESS_TOKEN = token.ACCESS_TOKEN;
                this.REFRESH_TOKEN = token.REFRESH_TOKEN;
                return Promise.resolve(token);
            }
        });
    }
    ;
    refreshToken() {
        return __awaiter(this, void 0, void 0, function* () {
            return axios_1.default
                .post(`${this.ROOT_PATH}/oauth2/access_token`, {
                client_id: config_1.default.CLIENT_ID,
                client_secret: config_1.default.CLIENT_SECRET,
                grant_type: "REFRESH_TOKEN",
                REFRESH_TOKEN: this.REFRESH_TOKEN,
                redirect_uri: config_1.default.REDIRECT_URI,
            })
                .then((res) => {
                this.logger.debug("Токен успешно обновлен");
                const token = res.data;
                fs_1.default.writeFileSync(this.AMO_TOKEN_PATH, JSON.stringify(token));
                this.ACCESS_TOKEN = token.ACCESS_TOKEN;
                this.REFRESH_TOKEN = token.REFRESH_TOKEN;
                return token;
            })
                .catch((err) => {
                this.logger.error("Не удалось обновить токен");
                this.logger.error(err.response.data);
            });
        });
    }
    ;
}
exports.default = AmoCRM;
