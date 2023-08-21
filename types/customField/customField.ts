export type CustomField = {
    field_id?: number,
    field_name?: string,
    field_code?: string | null,
    field_type?: string,
    values: CustomFieldValues[]
}

type CustomFieldValues = {
    value?: string | boolean | number,
    enum_id?: number,
    enum?: string,
    enum_code?: string
}

