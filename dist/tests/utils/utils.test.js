"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const utils_mock_1 = require("./utils.mock");
const general_mock_1 = require("../general.mock");
describe('Test function getClearPhoneNumber on return clear number', () => {
    it('Can return undefined if empty argument', () => {
        expect((0, utils_1.getClearPhoneNumber)('')).toBeUndefined();
    });
    it('Return clear number', () => {
        utils_mock_1.phoneNumbers.forEach(item => {
            expect((0, utils_1.getClearPhoneNumber)(item.input)).toBe(item.output);
        });
    });
});
describe('Test function getFieldValue on return correct value', () => {
    // * тестовый случай
    // * expectedValue - значение возвращаемое тестируемой функцией
    // * realValue - заготовленное значение
    it("should have to return correct value from list values", () => {
        const randomInt = (0, general_mock_1.getRandomNumberWithLimits)(1, 100);
        const fieldMap = (0, utils_mock_1.createTestFieldValueMap)(randomInt);
        const fieldIds = Object.keys(fieldMap).slice(0, (0, general_mock_1.getRandomNumberWithLimits)(1, randomInt));
        const customFieldValuesList = Array.from({ length: (0, general_mock_1.getRandomNumberWithLimits)(1, 15) }, () => fieldIds.map((id) => (0, utils_mock_1.createMockAmoCusomField)(Number(id), fieldMap[id].fieldValue)));
        customFieldValuesList.forEach((customFieldValues) => {
            const randomFieldId = Number(fieldIds[(0, general_mock_1.getRandomNumberWithLimits)(0, fieldIds.length - 1)]);
            const expectedValue = (0, utils_1.getFieldValue)(customFieldValues, randomFieldId);
            const [realValue] = fieldMap[String(randomFieldId)].outputValue;
            expect(expectedValue).toBe(realValue);
        });
    });
    it('Can return undefined if argument customField is empty', () => {
        expect((0, utils_1.getFieldValue)([], (0, general_mock_1.getRandomNumber)())).toBeUndefined();
    });
    it('Returns undefined if the field with the given id is not found', () => {
        const customFields = [
            {
                id: 1,
                values: [{ value: 'Field 1 Value' }]
            }
        ];
        expect((0, utils_1.getFieldValue)(customFields, 2)).toBeUndefined();
    });
});
describe('Test function getFieldValues on return correct value', () => {
    it("should have to return correct value from list values", () => {
        const randomInt = (0, general_mock_1.getRandomNumberWithLimits)(1, 100);
        const fieldMap = (0, utils_mock_1.createTestFieldValueMap)(randomInt, true);
        const fieldIds = Object.keys(fieldMap).slice(0, (0, general_mock_1.getRandomNumberWithLimits)(1, randomInt));
        const customFieldValuesList = Array.from({ length: (0, general_mock_1.getRandomNumberWithLimits)(1, 15) }, () => fieldIds.map((id) => (0, utils_mock_1.createMockAmoCusomField)(Number(id), fieldMap[id].fieldValue)));
        customFieldValuesList.forEach((customFieldValues) => {
            const randomFieldId = Number(fieldIds[(0, general_mock_1.getRandomNumberWithLimits)(0, fieldIds.length - 1)]);
            const expectedValue = (0, utils_1.getFieldValues)(customFieldValues, randomFieldId);
            const realValues = fieldMap[randomFieldId].outputValue;
            expect(expectedValue).toEqual(realValues);
        });
    });
    it('returns an empty array if the specified field is not found', () => {
        const numFields = (0, general_mock_1.getRandomNumberWithLimits)(1, 100);
        const result = (0, utils_1.getFieldValues)([], numFields);
        expect(result).toEqual([]);
    });
    it('returns an empty array if customFields is undefined', () => {
        const fieldId = (0, general_mock_1.getRandomNumberWithLimits)(0, 100);
        const result = (0, utils_1.getFieldValues)([], fieldId);
        expect(result).toEqual([]);
    });
});
describe('Test function makeField on return correct value', () => {
    it('Can return undefined if value is empty or false', () => {
        expect((0, utils_1.makeField)((0, general_mock_1.getRandomNumber)(), '', (0, general_mock_1.getRandomNumber)())).toBeUndefined();
        expect((0, utils_1.makeField)((0, general_mock_1.getRandomNumber)(), false, (0, general_mock_1.getRandomNumber)())).toBeUndefined();
    });
    it('Can return undefined enum_id if argument enum_id is empty', () => {
        const mockAmoFields = (0, utils_mock_1.getMockAmoFields)();
        mockAmoFields.forEach(item => {
            expect((0, utils_1.makeField)(item.input.field_id, item.input.value)).toEqual({
                field_id: item.output.field_id,
                values: item.output.values.map((item) => {
                    return {
                        value: item.value,
                        enum_id: undefined
                    };
                })
            });
        });
    });
    it('Return expected values', () => {
        const mockAmoFields = (0, utils_mock_1.getMockAmoFields)();
        mockAmoFields.forEach(item => {
            expect((0, utils_1.makeField)(item.input.field_id, item.input.value, item.input.enum_id)).toEqual(item.output);
        });
    });
});
describe('Test function getHuminizeTimeFromUnix on return correct value', () => {
    it('Return needed length', () => {
        expect((0, utils_1.getHuminizeTimeFromUnix)(Math.floor(Date.now() / 1000)).length).toBe(23);
    });
    it('Return needed humanize string', () => {
        utils_mock_1.humanizeDate.forEach(item => {
            expect((0, utils_1.getHuminizeTimeFromUnix)(Number(item.input))).toBe(item.output);
        });
    });
});
describe('Test function getUnixBithdate on return correct value', () => {
    it('Return NaN with empty argument', () => {
        expect((0, utils_1.getUnixBithdate)('')).toBeNaN();
    });
    it('Return time in unix format', () => {
        utils_mock_1.unixDates.forEach(item => {
            expect((0, utils_1.getUnixBithdate)(item.input)).toBe(Number(item.output));
        });
    });
});
describe('Test function getDateUnixValue on return correct value', () => {
    it('Return NaN with empty argument', () => {
        expect((0, utils_1.getDateUnixValue)('')).toBeNaN();
    });
    it('Return current value', () => {
        utils_mock_1.dates.forEach(item => {
            expect((0, utils_1.getDateUnixValue)(item.input)).toBe(Number(item.output));
        });
    });
});
describe('Test function analyzePatientSanation on return correct value', () => {
    it('Can return false if patientSanation is empty argument', () => {
        expect((0, utils_1.analyzePatientSanation)()).toBe(false);
    });
    it('Return true if any ID equal 2 or 3', () => {
        utils_mock_1.patientSanationTrue.forEach(item => {
            expect((0, utils_1.analyzePatientSanation)(item)).toBe(true);
        });
    });
    it('Return false if no one ID not equal 2 or 3', () => {
        utils_mock_1.patientSanationFalse.forEach(item => {
            expect((0, utils_1.analyzePatientSanation)(item)).toBe(false);
        });
    });
});
describe('Test function getSanationMultiselectFields on return correct value', () => {
    it('Can return undefined if patientSanation is empty argument', () => {
        expect((0, utils_1.getSanationMultiselectFields)((0, general_mock_1.getRandomNumber)())).toBeUndefined();
    });
    it('Return current field', () => {
        const fieldId = (0, general_mock_1.getRandomNumber)();
        expect((0, utils_1.getSanationMultiselectFields)(fieldId, {
            ID_Receptions: (0, general_mock_1.getRandomNumber)(),
            ID_TherapeuticSanations: 2,
            ID_ProstheticSanations: 4,
            ID_OrthodonticSanations: 1,
            ID_ParodontolalSanations: 7,
            ID_SurgicalSanations: 7
        }, utils_mock_1.sanationsEnumIds)).toEqual({
            field_id: fieldId,
            values: [
                {
                    value: utils_mock_1.sanationsEnumIds["ID_TherapeuticSanations"][1],
                    enum_id: utils_mock_1.sanationsEnumIds["ID_TherapeuticSanations"][0]
                }
            ]
        });
        expect((0, utils_1.getSanationMultiselectFields)(fieldId, {
            ID_Receptions: (0, general_mock_1.getRandomNumber)(),
            ID_TherapeuticSanations: 2,
            ID_ProstheticSanations: 4,
            ID_OrthodonticSanations: 3,
            ID_ParodontolalSanations: 7,
            ID_SurgicalSanations: 7
        }, utils_mock_1.sanationsEnumIds)).toEqual({
            field_id: fieldId,
            values: [
                {
                    value: utils_mock_1.sanationsEnumIds["ID_TherapeuticSanations"][1],
                    enum_id: utils_mock_1.sanationsEnumIds["ID_TherapeuticSanations"][0]
                },
                {
                    value: utils_mock_1.sanationsEnumIds["ID_OrthodonticSanations"][1],
                    enum_id: utils_mock_1.sanationsEnumIds["ID_OrthodonticSanations"][0]
                }
            ]
        });
        expect((0, utils_1.getSanationMultiselectFields)(fieldId, {
            ID_Receptions: (0, general_mock_1.getRandomNumber)(),
            ID_TherapeuticSanations: 3,
            ID_ProstheticSanations: 4,
            ID_OrthodonticSanations: 1,
            ID_ParodontolalSanations: 7,
            ID_SurgicalSanations: 7
        }, utils_mock_1.sanationsEnumIds)).toEqual({
            field_id: fieldId,
            values: [
                {
                    value: utils_mock_1.sanationsEnumIds["ID_TherapeuticSanations"][1],
                    enum_id: utils_mock_1.sanationsEnumIds["ID_TherapeuticSanations"][0]
                }
            ]
        });
    });
});
describe('Test function getUniqNumbers on return correct value', () => {
    it('Can return empty array if entree array is empty', () => {
        expect((0, utils_1.getUniqNumbers)([])).toEqual([]);
    });
    it('Equal on length entree and final array', () => {
        expect((0, utils_1.getUniqNumbers)([1, 1, 2, 3, 4]).length).toBe(4);
        expect((0, utils_1.getUniqNumbers)([1, 1, 1, 3, 3]).length).toBe(2);
        expect((0, utils_1.getUniqNumbers)([1, 3, 2, 4, 4]).length).toBe(4);
        expect((0, utils_1.getUniqNumbers)([1, 1, 1, 3, 4]).length).toBe(3);
        expect((0, utils_1.getUniqNumbers)([1, 1, 1, 1, 1]).length).toBe(1);
        expect((0, utils_1.getUniqNumbers)([1, 2, 3, 4, 5]).length).toBe(5);
    });
    it('Equal entree and final array', () => {
        expect((0, utils_1.getUniqNumbers)([1, 1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
        expect((0, utils_1.getUniqNumbers)([1, 1, 1, 3, 3])).toEqual([1, 3]);
        expect((0, utils_1.getUniqNumbers)([1, 3, 2, 4, 4])).toEqual([1, 3, 2, 4]);
        expect((0, utils_1.getUniqNumbers)([1, 1, 1, 3, 4])).toEqual([1, 3, 4]);
        expect((0, utils_1.getUniqNumbers)([1, 1, 1, 1, 1])).toEqual([1]);
        expect((0, utils_1.getUniqNumbers)([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
        expect((0, utils_1.getUniqNumbers)([1, 2, 4, 5, 1, 6, 2, 1, 8])).toEqual([1, 2, 4, 5, 6, 8]);
        expect((0, utils_1.getUniqNumbers)([1, 2, 3, 4, 5, 8, 2, 5, 3, 9, 11, 23, 23, 12, 11, 11])).toEqual([1, 2, 3, 4, 5, 8, 9, 11, 23, 12]);
    });
    it('Return the same array if all values in array is unique', () => {
        expect((0, utils_1.getUniqNumbers)([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
        expect((0, utils_1.getUniqNumbers)([1, 2, 3, 4, 5, 6, 7])).toEqual([1, 2, 3, 4, 5, 6, 7]);
        expect((0, utils_1.getUniqNumbers)([1, 2, 3])).toEqual([1, 2, 3]);
        expect((0, utils_1.getUniqNumbers)([2, 3, 1, 5])).toEqual([2, 3, 1, 5]);
    });
    it('Return the same length if all values in array is unique', () => {
        expect((0, utils_1.getUniqNumbers)([1, 2, 3, 4, 5]).length).toEqual(5);
        expect((0, utils_1.getUniqNumbers)([1, 2, 3, 4, 5, 6, 7]).length).toEqual(7);
    });
});
