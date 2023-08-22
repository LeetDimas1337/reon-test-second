import express from "express";
import AmoCRM from "./api/amo";
import {mainLogger} from "./logger"
import config from "./config";
import {Response} from "express";
import {CustomField} from "./types/customField/customField";
import {Contact as EmbeddedContact} from "./types/embeddedEntities/embeddedEntities";
import {DealHookBody, TaskHookBody, TypedRequestBody} from "./@types/CustomRequest";
import {CustomFieldValue, TaskHookData} from "./@types/AmoTypes";
import {CreatedTask} from "./types/task/task";
import moment from "moment";
import {CreatedNote} from "./types/notes/note";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const SERVICES_LIST_ID = '919003'
const CHECK_PRICE_TASK_ID = 3035714
const CHECK_TASK_TEXT = 'Проверить бюджет'
const TASK_NOTE_TEXT = 'Бюджет проверен, ошибок нет'

const amo = new AmoCRM(config.SUB_DOMAIN, config.AUTH_CODE)
const countDealPrice = (selectedServicesList: CustomFieldValue[], contactPrices: CustomField[]): number => {
    return selectedServicesList.reduce((price, {value}) => {
        const servicePrice = contactPrices.find((contactPrice) => contactPrice.field_name === value)
        if (!servicePrice) {
            return price
        }
        return price + Number(servicePrice.values[0].value)
    }, 0)
}

const createTask = async (dealId: string): Promise<void> => {

    const newTaskData: CreatedTask = {
        entity_id: Number(dealId),
        entity_type: 'leads',
        task_type_id: CHECK_PRICE_TASK_ID,
        text: CHECK_TASK_TEXT,
        complete_till: getDeadlineTime(1)
    }

    const tasks = await amo.getUnfulfilledTasksFromDeal(dealId)

    const targetTask = tasks.find(task => task.text === CHECK_TASK_TEXT)

    if (!targetTask) {
        await amo.createTasks([newTaskData])
    }
}

const getDeadlineTime = (days: number): number => {
    return moment().add(days, 'days').unix()
}

app.get('/', (req, res) => res.send("pong"))

amo.getAccessToken().then(() => {

    app.post('/deal-hook', async (req: TypedRequestBody<DealHookBody>, res: Response) => {
        try {
            console.log('deal-hook')
            const [dealHook] = (req.body.leads.update || req.body.leads.add)
            const deal = await amo.getDeal(dealHook.id, ['contacts'])

            if (!deal._embedded) {
                console.log(deal)
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

            const services = dealHook.custom_fields?.find((customField) => customField.id === SERVICES_LIST_ID)

            const price = countDealPrice(services?.values || [], contactData)

            if (price !== Number(dealHook.price)) {
                await amo.updateDeal({id: Number(dealHook.id), price})
                await createTask(dealHook.id)
            }

            return res.json({message: 'OK'})

        } catch (e: unknown) {

            mainLogger.error((e as Error).message)

            return res.json({message: 'Error'})

        }
    })

    app.listen(config.PORT, () => {
        mainLogger.debug('Server started on', config.PORT)
    })

}).catch((err: Error) => console.log(err.message))

