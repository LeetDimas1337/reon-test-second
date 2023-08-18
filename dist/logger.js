"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainLogger = exports.getUserLogger = void 0;
const log4js_1 = __importDefault(require("log4js"));
log4js_1.default.configure({
    appenders: {
        out: {
            type: "stdout",
            layout: {
                type: "pattern",
                pattern: "%d %p %f:%l %m%n",
            },
        },
        everything: {
            type: "file",
            filename: "./logs/logs.log",
            maxLogSize: 1024000,
            layout: {
                type: "pattern",
                pattern: "%d %p %f:%l %m%n",
            },
        },
    },
    categories: {
        default: { appenders: ["everything", "out"], level: "debug", enableCallStack: true },
    },
});
const mainLogger = log4js_1.default.getLogger();
exports.mainLogger = mainLogger;
const getUserLogger = (subdomain) => {
    log4js_1.default.configure({
        appenders: {
            out: {
                type: "stdout",
                layout: {
                    type: "pattern",
                    pattern: "%d %p %f:%l %m%n",
                },
            },
            everything: {
                type: "file",
                filename: `./logs/${subdomain}/logs.log`,
                maxLogSize: 1024000,
                layout: {
                    type: "pattern",
                    pattern: "%d %p %f:%l %m%n",
                },
            },
        },
        categories: {
            default: { appenders: ["everything", "out"], level: "debug", enableCallStack: true },
        },
    });
    return log4js_1.default.getLogger();
};
exports.getUserLogger = getUserLogger;
