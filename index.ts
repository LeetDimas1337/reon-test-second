import express from "express";
import AmoCRM from "./api/amo";
import {mainLogger} from "./logger"
import config from "./config";
import {Response} from "express";
import {CustomField} from "./types/customField/customField";
import {Contact as EmbeddedContact} from "./types/embeddedEntities/embeddedEntities";
import {DealHookBody, TypedRequestBody} from "./@types/CustomRequest";
import {CustomFieldValue} from "./@types/AmoTypes";
import {CreatedTask} from "./types/task/task";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const SERVICES_LIST_ID = '919003'
const CHECK_PRICE_TASK_ID = 3035714
const CHECK_TASK_TEXT = 'Проверить бюджет'
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

const checkAndCreateTask = async (dealId: string): Promise<void> => {

    const newTaskData = {
        entity_id: Number(dealId),
        entity_type: 'leads',
        task_type_id: CHECK_PRICE_TASK_ID,
        text: CHECK_TASK_TEXT,
        complete_till: getDeadlineTime(1)
    } as CreatedTask

    const tasks = await amo.getUnfulfilledTasksFromDeal(dealId)

    if (typeof tasks === 'string') {
        await amo.createTasks([newTaskData])
    } else {
        const checkTask = tasks._embedded.tasks.find(task => task.text === CHECK_TASK_TEXT)
        if (!checkTask) {
            await amo.createTasks([newTaskData])
        }
    }

}

const getDeadlineTime = (days: number): number => {
    return Math.floor((Date.now() + days * 1000 * 3600 * 24) / 1000)
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

            const {custom_fields_values: contactData} = await amo.getContact(String(mainContact.id))

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
                await checkAndCreateTask(dealHook.id)
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

