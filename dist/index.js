"use strict";
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
const amo = new amo_1.default(config_1.default.SUB_DOMAIN, config_1.default.AUTH_CODE);
amo.getAccessToken().then(() => {
    app.listen(config_1.default.PORT, () => logger_1.mainLogger.debug('Server started on', config_1.default.PORT));
});
