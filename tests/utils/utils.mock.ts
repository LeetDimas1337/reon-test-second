import {faker} from "@faker-js/faker"
import {getRandomNumber, getRandomNumberWithLimits} from "../general.mock"
import {custom_fields, customField, customFieldValue} from "../../../../IDENT/IDENT_v.4/server/@types/amo-types";



const phoneNumbers = [
	{
		input: "+7-651-749 67-03",
		output: "6517496703"
	},
	{
		input: "+8-560-885-32-42",
		output: "5608853242"
	},
	{
		input: "+7669-801 57-78",
		output: "6698015778"
	},
	{
		input: "+7-581-280 90-91",
		output: "5812809091"
	},
	{
		input: "+7-25610360-82",
		output: "2561036082"
	},
	{
		input: "8937-947 41-54",
		output: "9379474154"
	},
	{
		input: "+7-446-359 07-25",
		output: "4463590725"
	},
	{
		input: "+7-225-157 53-24",
		output: "2251575324"
	},
	{
		input: "041-625 17-53",
		output: "0416251753"
	},
	{
		input: "74515187320",
		output: "4515187320"
	}
]

const getMockAmoFields = () => Array.from({length: getRandomNumberWithLimits(10, 1000)}, () => {

	const anyValues = [faker.datatype.number(), faker.address.cityName(), true]

	const field_id = getRandomNumber()
	const enum_id = getRandomNumber()
	const value = anyValues[Math.floor(Math.random() * anyValues.length)]

	return {
		input: {
			field_id,
			enum_id,
			value
		},
		output: {
			field_id,
			values: [
				{
					value,
					enum_id
				},
			]
		}
	}
})

// * Получаем случайный набор field_id
const createFieldIdList = (randomLength: number) => Array.from({length: randomLength}, () => getRandomNumber());

// * Получаем случайное значение случайного типа
const createRandomTypeValue = (): number | string | boolean => {
	const values = [faker.datatype.number(), faker.address.cityName(), Math.random() < 0.5];
	return values[getRandomNumberWithLimits(0, values.length - 1)];
}

// * Функция создания списка случайных значений по структуре amoCRM
// * Функция получает в качестве параметров массив значений, которые объединяем с enum_ids

const createRandomValueList = (
	valueList: ReturnType<typeof createRandomTypeValue>[], enum_id?: number | number[]) => ({
	values: valueList.map((value, i) => ({
			value,
			enum_id: typeof enum_id !== 'number' && enum_id ? enum_id[i] : enum_id,
		}))
});

// * Функция поля карточки сущности по структуре данных amoCRM
export const createMockAmoCusomField = (field_id: number, values: ReturnType<typeof createRandomValueList>): customField => {
	const innerValues = values.values;
	return {
		field_id,
		values: innerValues
	};
}

// * Создание мапы id-значения.
export const createTestFieldValueMap = (randomInt: number, isList?: boolean) => {
	const fieldMap: {
		[id: string]: {
			fieldValue: ReturnType<typeof createRandomValueList>,
			outputValue: ReturnType<typeof createRandomTypeValue>[]
			}
		} = {};
	const fieldIds = createFieldIdList(randomInt);
	fieldIds.forEach((fieldId) => {
		const randomListLength = isList ? getRandomNumberWithLimits(0, 5) : 1;
		const randomValue = Array.from({length: randomListLength}, createRandomTypeValue)
		fieldMap[fieldId] = {
			fieldValue: createRandomValueList(randomValue),
			outputValue: randomValue
		}
	});
	return fieldMap;
}

const patientSanationTrue = [
	{
		ID_Receptions: getRandomNumber(),
		ID_TherapeuticSanations: 2,
		ID_ProstheticSanations: 4,
		ID_OrthodonticSanations: 1,
		ID_ParodontolalSanations: 7,
		ID_SurgicalSanations: 7
	},
	{
		ID_Receptions: getRandomNumber(),
		ID_TherapeuticSanations: 9,
		ID_ProstheticSanations: 4,
		ID_OrthodonticSanations: 3,
		ID_ParodontolalSanations: 7,
		ID_SurgicalSanations: 9
	},
	{
		ID_Receptions: getRandomNumber(),
		ID_TherapeuticSanations: 8,
		ID_ProstheticSanations: 2,
		ID_OrthodonticSanations: 1,
		ID_ParodontolalSanations: 7,
		ID_SurgicalSanations: 5
	},
	{
		ID_Receptions: getRandomNumber(),
		ID_TherapeuticSanations: 4,
		ID_ProstheticSanations: 1,
		ID_OrthodonticSanations: 1,
		ID_ParodontolalSanations: 3,
		ID_SurgicalSanations: 0
	},
	{
		ID_Receptions: getRandomNumber(),
		ID_TherapeuticSanations: 1,
		ID_ProstheticSanations: 4,
		ID_OrthodonticSanations: 1,
		ID_ParodontolalSanations: 7,
		ID_SurgicalSanations: 3
	}
]

const patientSanationFalse = [
	{
		ID_Receptions: getRandomNumber(),
		ID_TherapeuticSanations: 1,
		ID_ProstheticSanations: 4,
		ID_OrthodonticSanations: 1,
		ID_ParodontolalSanations: 7,
		ID_SurgicalSanations: 9
	},
	{
		ID_Receptions: getRandomNumber(),
		ID_TherapeuticSanations: 1,
		ID_ProstheticSanations: 7,
		ID_OrthodonticSanations: 6,
		ID_ParodontolalSanations: 7,
		ID_SurgicalSanations: 9
	},
	{
		ID_Receptions: getRandomNumber(),
		ID_TherapeuticSanations: 1,
		ID_ProstheticSanations: 4,
		ID_OrthodonticSanations: 5,
		ID_ParodontolalSanations: 7,
		ID_SurgicalSanations: 9
	}
]

const sanationsEnumIds = {
	"ID_TherapeuticSanations": [getRandomNumber(), "Терапия"],
	"ID_ProstheticSanations": [getRandomNumber(), "Ортопедия"],
	"ID_OrthodonticSanations": [getRandomNumber(), "Ортодонтия"],
	"ID_ParodontolalSanations": [getRandomNumber(), "Пародонтология"],
	"ID_SurgicalSanations": [getRandomNumber(), "Хирургия"]
};

const humanizeDate = [
	{
		input: "1674121980",
		output: "2023-01-19 12:53:00.000"
	},
	{
		input: "1674122025",
		output: "2023-01-19 12:53:45.000"
	},
	{
		input: "1674122062",
		output: "2023-01-19 12:54:22.000"
	},
	{
		input: "1674122078",
		output: "2023-01-19 12:54:38.000"
	},
	{
		input: "1674122093",
		output: "2023-01-19 12:54:53.000"
	},
	{
		input: "1674122107",
		output: "2023-01-19 12:55:07.000"
	},
	{
		input: "1674122122",
		output: "2023-01-19 12:55:22.000"
	},
	{
		input: "1674122135",
		output: "2023-01-19 12:55:35.000"
	},
	{
		input: "1674122151",
		output: "2023-01-19 12:55:51.000"
	},
	{
		input: "1674122166",
		output: "2023-01-19 12:56:06.000"
	}
]

const unixDates = [
	{
		input: "30.11.1999",
		output: "943909200",
	},
	{
		input: "31.12.2001",
		output: "1009746000",
	},
	{
		input: "01.01.2001",
		output: "978296400",
	},
	{
		input: "22.05.2011",
		output: "1306008000",
	},
	{
		input: "17.09.1995",
		output: "811281600",
	},
	{
		input: "14.04.2022",
		output: "1649883600",
	},
	{
		input: "20.02.2012",
		output: "1329681600",
	},
	{
		input: "12.12.2012",
		output: "1355256000",
	}
]

const dates = [
	{
		input: "2023-01-19 12:53:00.000",
		output: "1674121980",
	},
	{
		input: "2023-01-19 12:53:45.000",
		output: "1674122025"
	},
	{
		input: "2023-01-19 12:54:22.000",
		output: "1674122062",
	},
	{
		input: "2023-01-19 12:54:38.000",
		output: "1674122078",
	},
	{
		input: "2023-01-19 12:54:53.000",
		output: "1674122093",
	},
	{
		input: "2023-01-19 12:55:07.000",
		output: "1674122107",
	},
	{
		input: "2023-01-19 12:55:22.000",
		output: "1674122122",
	},
	{
		input: "2023-01-19 12:55:35.000",
		output: "1674122135",
	},
	{
		input: "2023-01-19 12:55:51.000",
		output: "1674122151",
	},
	{
		input: "2023-01-19 12:56:06.000",
		output: "1674122166",
	}
]

export {
	phoneNumbers,
	getMockAmoFields,
	humanizeDate,
	unixDates,
	dates,
	patientSanationTrue,
	patientSanationFalse,
	sanationsEnumIds
}
