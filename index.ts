import express from "express";
import AmoCRM from "./api/amo";
import {mainLogger} from "./logger"
import config from "./config";
import {Request, Response} from "express";
import {CustomField} from "./types/customField/customField";
import {AxiosResponse} from "axios";
import {Contact as EmbeddedContact} from "./types/embeddedEntities/embeddedEntities";
import {Contact} from "./types/contacts/contact"
import {DealHookBody, DealHookKeys, TypedRequestBody} from "./@types/CustomRequest";
import api from "./api/api";
import {getFieldValues} from "./utils";
import {CustomFieldValue, DealCustomField} from "./@types/AmoTypes";
import {CreatedTask} from "./types/task/task";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const SERVICES_LIST_ID = '919003'
const CHECK_PRICE_TASK_ID = 3035714

const amo = new AmoCRM(config.SUB_DOMAIN, config.AUTH_CODE)
const countDealPrice = (selectedServicesList: CustomFieldValue[], contactPrices: CustomField[]) => {
    return selectedServicesList.reduce((price, {value}) => {
        const servicePrice = contactPrices.find((contactPrice) => contactPrice.field_name === value)
        if (!servicePrice) {
            return price
        }
        return price + Number(servicePrice.values[0].value)
    }, 0)
}

const createTask = () => {

}

app.get('/', (req, res) => res.send("pong"))

amo.getAccessToken().then(() => {

    app.post('/deal-hook', async (req: TypedRequestBody<DealHookBody>, res: Response) => {
        try {

            const [dealHook] = (req.body.leads.update || req.body.leads.add)
            const deal = await amo.getDeal(dealHook.id, ['contacts'])

            if (!deal._embedded) {
                throw new Error("Не пришел список контактов")
            }

            const mainContact = deal._embedded.contacts?.find((contact: EmbeddedContact) => contact.is_main)

            if (!mainContact) {
                throw new Error("К сделке не прикреплено ни одного контакта")
            }

            const {custom_fields_values: contactData} = await amo.getContact(mainContact.id) as Contact

            if (!contactData) {
                throw new Error("У контакта не указана стоимость услуг")
            }

            const services = dealHook.custom_fields.find((customField) => customField.id === SERVICES_LIST_ID)

            if (!services) {
                await amo.updateDeal({id: Number(dealHook.id), price: 0})
                return res.json({message: 'OK'})
            }
            const price = countDealPrice(services.values, contactData)

            if (price !== Number(dealHook.price)) {
                await amo.updateDeal({id: Number(dealHook.id), price})
                // await amo.createTasks([{task_type_id: CHECK_PRICE_TASK_ID, text: 'Проверить бюджет'} as CreatedTask])
            }

            return res.json({message: 'OK'})

        } catch (e: unknown) {
            mainLogger.error((e as Error).message)
        }

    })


    app.listen(config.PORT, () => {
        mainLogger.debug('Server started on', config.PORT)
    })

}).catch((err: Error) => console.log(err.message))

