import {Contact} from "../types/embeddedEntities/embeddedEntities";

export type DealCustomField = {
    id: string
    name: string
    values: Array<CustomFieldValue>
}

export type CustomFieldValue = {
    value: string
}

export type DealHookData = {
    id: string
    custom_fields: DealCustomField[]
    price: string
    _embedded: Contact[]
}