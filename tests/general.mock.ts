import { faker } from "@faker-js/faker"

const getRandomNumber = () => faker.datatype.number()

const getRandomNumberWithLimits = (min: number, max: number) => faker.datatype.number({min, max})

export {
	getRandomNumber,
	getRandomNumberWithLimits
}
