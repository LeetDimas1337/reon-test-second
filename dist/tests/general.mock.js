"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomNumberWithLimits = exports.getRandomNumber = void 0;
const faker_1 = require("@faker-js/faker");
const getRandomNumber = () => faker_1.faker.datatype.number();
exports.getRandomNumber = getRandomNumber;
const getRandomNumberWithLimits = (min, max) => faker_1.faker.datatype.number({ min, max });
exports.getRandomNumberWithLimits = getRandomNumberWithLimits;
