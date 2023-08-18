// Response for:
// POST /api/v4/leads/link
// POST /api/v4/contacts/link
// POST /api/v4/companies/link
// POST /api/v4/customers/link

export type AllCreatedLink = {
    to_entity_id: number,
    to_entity_type: string,
    metadata: Info| null
}

type Info = {
    catalog_id?: number,
    quantity?: number,
    is_main?: boolean,
    updated_by?: number,
    price_id?: number | null
}