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
exports.getHuminizeTimeFromUnix = exports.getUniqNumbers = exports.getTodayDateTime = exports.bulkOperation = exports.getSanationMultiselectFields = exports.analyzePatientSanation = exports.getDateUnixValue = exports.getUnixBithdate = exports.makeField = exports.getAllPages = exports.getFieldValues = exports.getFieldValue = exports.getClearPhoneNumber = void 0;
const moment_1 = __importDefault(require("moment"));
const fs_1 = __importDefault(require("fs"));
const constants_1 = require("../../IDENT/IDENT_v.4/server/constants");
const getTodayDateTime = () => (0, moment_1.default)().format("YYYY-MM-DD HH:MM:ss");
exports.getTodayDateTime = getTodayDateTime;
const getClearPhoneNumber = (tel) => {
    const clearNumber = !tel ? [] : tel.split("").filter(item => new RegExp(/\d/).test(item));
    if (!clearNumber.length) {
        return undefined;
    }
    return clearNumber.length > 10 ? clearNumber.join("").slice(1) : clearNumber.join("");
};
exports.getClearPhoneNumber = getClearPhoneNumber;
const getFieldValue = (customFields, fieldId) => {
    const field = customFields
        ? customFields.find((item) => String(item.field_id || item.id) === String(fieldId))
        : undefined;
    const value = field ? field.values[0].value : undefined;
    return value;
};
exports.getFieldValue = getFieldValue;
const getFieldValues = (customFields, fieldId) => {
    const field = customFields
        ? customFields.find((item) => String(item.field_id || item.id) === String(fieldId))
        : undefined;
    const values = field ? field.values : [];
    return values.map(item => item.value);
};
exports.getFieldValues = getFieldValues;
const getAllPages = (request, page = 1, limit = 200) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`Downloading page ${page}`);
        let res = yield request({ page, limit });
        let retry = 3;
        console.log("Quantity of elements", res.length);
        if (!res.length) {
            for (let i = 0; i < retry; i++) {
                console.log("Array is empty, try to get page again");
                res = yield request({ page, limit });
                if (res.length === limit) {
                    break;
                }
            }
        }
        if (res.length === limit) {
            const next = yield getAllPages(request, page + 1, limit);
            return [...res, ...next];
        }
        return res;
    }
    catch (e) {
        console.log(e);
    }
});
exports.getAllPages = getAllPages;
const makeField = (field_id, value, enum_id) => {
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
exports.makeField = makeField;
const getHuminizeTimeFromUnix = (unixTimeStamp) => {
    // Принимаем в секундах, моменту нужны миллисекунды
    const time = unixTimeStamp * 1000;
    return (0, moment_1.default)(time).format("YYYY-MM-DD HH:mm:ss.SSS");
};
exports.getHuminizeTimeFromUnix = getHuminizeTimeFromUnix;
const getUnixBithdate = (date) => {
    const unix = (0, moment_1.default)(date, "DD.MM.YYYY").utcOffset(0).unix();
    return unix;
};
exports.getUnixBithdate = getUnixBithdate;
const getDateUnixValue = (date) => {
    return (0, moment_1.default)((0, moment_1.default)(date).utcOffset(3).format("DD.MM.YYYY HH:mm:ss"), "DD.MM.YYYY HH:mm:ss").unix();
};
exports.getDateUnixValue = getDateUnixValue;
const analyzePatientSanation = (patientSanation) => {
    if (!patientSanation) {
        return false;
    }
    const { ID_TherapeuticSanations, ID_ProstheticSanations, ID_OrthodonticSanations, ID_ParodontolalSanations, ID_SurgicalSanations } = patientSanation;
    const sanationTypes = [ID_TherapeuticSanations, ID_ProstheticSanations, ID_OrthodonticSanations, ID_ParodontolalSanations, ID_SurgicalSanations];
    if (sanationTypes.some((element) => element === 2 || element === 3)) {
        return true;
    }
    return false;
};
exports.analyzePatientSanation = analyzePatientSanation;
/**
 * Функция возвращает мультисписковое поле для карточки контакта "Информация о санации"
 */
const getSanationMultiselectFields = (field_id, patientSanation, sanationEnumIds = constants_1.SANATION_ENUM_ID) => {
    if (!patientSanation) {
        return undefined;
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
            };
        })
    };
};
exports.getSanationMultiselectFields = getSanationMultiselectFields;
//функция для разбиения запроса на создание на несколько по chunkSize
const bulkOperation = (request, data, chunkSize, operationName = "bulk") => __awaiter(void 0, void 0, void 0, function* () {
    let failed = [];
    if (data.length) {
        console.log(`Start operation of ${operationName}`);
        const result = [];
        try {
            const chunksCount = data.length / chunkSize;
            for (let i = 0; i < chunksCount; i++) {
                try {
                    const sliced = data.slice(i * chunkSize, (i + 1) * chunkSize);
                    const requestResult = yield request(sliced);
                    if (requestResult && requestResult.length > 0) {
                        const updatedResult = requestResult.map((element, index) => {
                            if (!i) {
                                return Object.assign(Object.assign({}, element), { request_id: String(index) });
                            }
                            return Object.assign(Object.assign({}, element), { request_id: String((i * chunkSize) + index) });
                        });
                        result.push(...updatedResult);
                    }
                }
                catch (e) {
                    console.log(e);
                    failed.push(...data.slice(i * chunkSize, (i + 1) * chunkSize));
                }
                console.log(`${operationName} ${i * chunkSize} - ${(i + 1) * chunkSize}`);
            }
            return result;
        }
        catch (e) {
            console.log(e);
        }
    }
    console.log(`operation "${operationName}" finished. Failed - ${failed.length}`);
    fs_1.default.writeFileSync(`./bulkOperations_logs/${operationName}Failed.txt`, JSON.stringify(failed));
});
exports.bulkOperation = bulkOperation;
const getUniqNumbers = (numbers) => {
    const numberCollection = new Set();
    numbers.forEach((number) => numberCollection.add(number));
    const uniqNumbers = Array.from(numberCollection).map(Number);
    return uniqNumbers;
};
exports.getUniqNumbers = getUniqNumbers;
