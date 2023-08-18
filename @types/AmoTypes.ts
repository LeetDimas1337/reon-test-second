export type DealCustomField = {
    id: string
    name: string
    values: CustomFieldValue[]
}

export type CustomFieldValue = {
    value: string
}

export type DealHookData = {
    id: string
    custom_fields: DealCustomField[]
    price: string
}