export type Customfield = {
    field_id?: number,
    field_name?: string,
    field_code?: string | null,
    field_type?: string,
    values?: Array<CustomfieldValues>
}

type CustomfieldValues = {
    value?: string | boolean | number,
    enum_id?: number,
    enum?: string,
    enum_code?: string
}
