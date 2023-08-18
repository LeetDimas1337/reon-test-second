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
const express_1 = __importDefault(require("express"));
const amo_1 = __importDefault(require("./api/amo"));
const logger_1 = require("./logger");
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.listen(config_1.default.PORT, () => logger_1.mainLogger.debug('Server started on ', config_1.default.PORT));
app.get("/login", (req) => __awaiter(void 0, void 0, void 0, function* () {
    const authCode = String(req.query.code);
    const subDomain = String(req.query.referer).split(".")[0];
    logger_1.mainLogger.debug("Запрос на установку получен");
    const api = new amo_1.default(subDomain, authCode);
    yield api.getAccessToken()
        .then(() => logger_1.mainLogger.debug(`Авторизация при установке виджета для ${subDomain} прошла успешно`))
        .catch((err) => logger_1.mainLogger.debug("Ошибка авторизации при установке виджета ", subDomain, err.data));
}));
