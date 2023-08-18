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


// const countDealPrice = (selectedServicesList: DealCustomField[], contactPrices: CustomField[]) => {
//     selectedServicesList.reduce((accum, service) => {
//         contactPrices.includes(service.name)
//         return accum
//     }, 0)
//     return 0
// }

amo.getAccessToken().then(() => {

    app.post('/deal-hook', async (req: TypedRequestBody<DealHookBody>, res: Response) => {

        const deal = (req.body.leads.update || req.body.leads.add)[0]

        const {contacts} = (await amo.getDeal(deal.id, ['contacts']))._embedded

        const mainContact = contacts.find((contact: EmbeddedContact) => contact.is_main)

        if (mainContact) {

            const contactData = await amo.getContact(mainContact.id) as Contact
            const dealPrice = countDealPrice(deal.custom_fields, contactData.custom_fields_values as CustomField[])

            // console.log(contactData.custom_fields_values ? contactData.custom_fields_values : 'huy')
            // console.log(deal.custom_fields.find(field => field.id === SERVICES_LIST_ID)?.values)
        } else {
            console.log("Нет контактов")
            res.json({message: "За сделкой не закреплено ни одного контакта"})
        }
    })

    app.listen(config.PORT, () => {
        mainLogger.debug('Server started on', config.PORT)
    })

}).catch((err: Error) => console.log(err.message))

