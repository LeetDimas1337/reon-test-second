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

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const SERVICES_LIST_ID = '919003'

const amo = new AmoCRM(config.SUB_DOMAIN, config.AUTH_CODE)
const countDealPrice = (selectedServicesList: CustomFieldValue[], contactPrices: CustomField[]) => {
    return selectedServicesList.reduce((price, {value}) => {
        const servicePrice = contactPrices.find((contactPrice) => contactPrice.field_name === value)
        if (!servicePrice)
            throw new Error("У контакта не указана стоимость одной из услуг")
        return price + Number(servicePrice.values[0].value)
    }, 0)
}


app.get('/', (req, res) => res.send("pong"))

amo.getAccessToken().then(() => {

    app.post('/deal-hook', async (req: TypedRequestBody<DealHookBody>, res: Response) => {
        try {
            const [deal] = (req.body.leads.update || req.body.leads.add)
            const {contacts} = (await amo.getDeal(deal.id, ['contacts']))._embedded
            const mainContact = contacts.find((contact: EmbeddedContact) => contact.is_main)

            if (!mainContact) {
                throw new Error("К сделке не прикреплено ни одного контакта")
            }

            const contactData = (await amo.getContact(mainContact.id) as Contact).custom_fields_values

            if (!contactData) {
                throw new Error("У контакта не указана стоимость услуг")
            }

            const services = deal.custom_fields.find((customField) => customField.id === SERVICES_LIST_ID)

            if (!services) {
                throw new Error("В сделке не выбрана ни одна услуга")
            }
            const price = countDealPrice(services.values, contactData)

            if (price !== Number(deal.price))
                await amo.updateDeal({id: Number(deal.id), price})

            return res.json({message: "OK"})

        } catch (e: unknown) {
            console.log(e)
            res.json({message: "За сделкой не закреплено ни одного контакта"})
        }

    })

    app.listen(config.PORT, () => {
        mainLogger.debug('Server started on', config.PORT)
    })

}).catch((err: Error) => console.log(err.message))

