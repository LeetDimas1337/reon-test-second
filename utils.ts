import moment from "moment";
import fs from "fs";
import { customField, requestParameters, custom_fields, createdDealResponse } from "../../IDENT/IDENT_v.4/server/@types/amo-types";
import { serverPatientSanation } from "../../IDENT/IDENT_v.4/server/@types/ident-patients-type";
import { SANATION_ENUM_ID } from "../../IDENT/IDENT_v.4/server/constants";

const getTodayDateTime = ():string => moment().format("YYYY-MM-DD HH:MM:ss");

const getClearPhoneNumber = (tel:string | undefined) => {
	const clearNumber = !tel ? [] : tel.split("").filter(item => new RegExp(/\d/).test(item));
	if (!clearNumber.length) {
		return undefined;
	}
	return clearNumber.length > 10 ? clearNumber.join("").slice(1) : clearNumber.join("");
};

const getFieldValue = (customFields:Array<customField | custom_fields>, fieldId:number) => {
    const field = customFields
        ? customFields.find((item) => String(item.field_id || item.id) === String(fieldId))
        : undefined;
    const value = field ? field.values[0].value : undefined;
    return value;
};

const getFieldValues = (customFields:Array<customField | custom_fields>, fieldId:number) => {
    const field = customFields
        ? customFields.find((item) => String(item.field_id || item.id) === String(fieldId))
        : undefined;
    const values = field ? field.values : [];
    return values.map(item => item.value);
};

const getAllPages = async (request: ({page, limit }: requestParameters) => Promise<any>, page = 1, limit = 200) => {
    try {
        console.log(`Downloading page ${page}`);
        let res = await request({ page, limit });
        let retry = 3;
        console.log("Quantity of elements", res.length)
        if (!res.length) {
			for (let i = 0; i < retry; i++) {
				console.log("Array is empty, try to get page again")
				res = await request({ page, limit });
				if (res.length === limit) {
					break
				}
			}
        }
        if (res.length === limit) {
            const next:any = await getAllPages(request, page + 1, limit);
            return [...res, ...next];
        }
        return res;
    } catch (e) {
        console.log(e);
    }
};

const makeField = (field_id:number, value?: string | number | boolean, enum_id?:number) => {
    if (!value) {
        return undefined;
    }
    return {
        field_id,
        values: [
            {
                value,
                enum_id
            },
        ],
    };
};

const getHuminizeTimeFromUnix = (unixTimeStamp: number) => {
    // Принимаем в секундах, моменту нужны миллисекунды
    const time = unixTimeStamp * 1000;
    return moment(time).format("YYYY-MM-DD HH:mm:ss.SSS")
};

const getUnixBithdate = (date:string) => {
    const unix = moment(date, "DD.MM.YYYY").utcOffset(0).unix();
    return unix;
};

const getDateUnixValue = (date:string) => {
    return moment(
        moment(date).utcOffset(3).format("DD.MM.YYYY HH:mm:ss"),
        "DD.MM.YYYY HH:mm:ss"
    ).unix();
};

const analyzePatientSanation = (patientSanation?:serverPatientSanation) => {
    if (!patientSanation) {
        return false
    }
    const {
        ID_TherapeuticSanations,
		ID_ProstheticSanations,
		ID_OrthodonticSanations,
        ID_ParodontolalSanations,
		ID_SurgicalSanations
    } = patientSanation;
    const sanationTypes = [ID_TherapeuticSanations, ID_ProstheticSanations, ID_OrthodonticSanations, ID_ParodontolalSanations, ID_SurgicalSanations];
    if (sanationTypes.some((element) => element === 2 || element === 3)) {
        return true
    }
    return false
};

/**
 * Функция возвращает мультисписковое поле для карточки контакта "Информация о санации"
 */
 const getSanationMultiselectFields = (field_id:number, patientSanation?:serverPatientSanation,  sanationEnumIds = SANATION_ENUM_ID) => {
    if (!patientSanation) {
        return undefined
    }

    const sanationTypes = [
        {
            name: "ID_TherapeuticSanations",
            value: patientSanation.ID_TherapeuticSanations
        },
        {
            name: "ID_ProstheticSanations",
            value: patientSanation.ID_ProstheticSanations
        },
        {
            name: "ID_OrthodonticSanations",
            value: patientSanation.ID_OrthodonticSanations
        },
        {
            name: "ID_ParodontolalSanations",
            value: patientSanation.ID_ParodontolalSanations
        },
        {
            name: "ID_SurgicalSanations",
            value: patientSanation.ID_SurgicalSanations
        }
    ];

    return {
        field_id: field_id,
        values: sanationTypes.filter(element => element.value === 2 || element.value === 3).map(element => {
            return {
                value: sanationEnumIds[element.name][1],
                enum_id: sanationEnumIds[element.name][0]
            }
        })
    }
}

//функция для разбиения запроса на создание на несколько по chunkSize
const bulkOperation = async (
    request: (data: any) => Promise<any>,
    data:Array<any>,
    chunkSize: number,
    operationName = "bulk"
) => {
    let failed = [];
    if (data.length) {
        console.log(`Start operation of ${operationName}`);
        const result = [];
        try {
            const chunksCount = data.length / chunkSize;
            for (let i = 0; i < chunksCount; i++) {
                try {
                    const sliced = data.slice(i * chunkSize, (i + 1) * chunkSize);
                    const requestResult:createdDealResponse[] = await request(sliced);
                    if (requestResult && requestResult.length > 0) {
                        const updatedResult = requestResult.map((element, index) => {
                            if (!i) {
                                return {
                                    ...element, request_id: String(index),
                                }
                            }
                            return {
                                ...element, request_id: String((i * chunkSize) + index),
                            }
                        })
                        result.push(...updatedResult)
                    }
                } catch (e) {
                    console.log(e)
                    failed.push(...data.slice(i * chunkSize, (i + 1) * chunkSize));
                }
                console.log(
                    `${operationName} ${i * chunkSize} - ${(i + 1) * chunkSize}`
                );
            }
            return result;
        } catch (e) {
            console.log(e)
        }
    }
    console.log(
        `operation "${operationName}" finished. Failed - ${failed.length}`
    );
    fs.writeFileSync(`./bulkOperations_logs/${operationName}Failed.txt`, JSON.stringify(failed));
};

const getUniqNumbers = (numbers:number[]):number[] => {
    const numberCollection = new Set();
    numbers.forEach((number) => numberCollection.add(number));
    const uniqNumbers = Array.from(numberCollection).map(Number);
    return uniqNumbers;
};

export {
	getClearPhoneNumber,
	getFieldValue,
	getFieldValues,
	getAllPages,
    makeField,
    getUnixBithdate,
    getDateUnixValue,
    analyzePatientSanation,
    getSanationMultiselectFields,
    bulkOperation,
    getTodayDateTime,
    getUniqNumbers,
    getHuminizeTimeFromUnix
};
