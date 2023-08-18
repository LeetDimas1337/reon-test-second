// Request for:
// POST /api/v4/leads/unlink
// POST /api/v4/contacts/unlink
// POST /api/v4/companies/unlink
// POST /api/v4/customers/unlink

export type AllCreatedUnlink = {
    entity_id: number,
    to_entity_id: number,
    to_entity_type: string,
    metadata: Info| null
}

type Info = {
    catalog_id?: number,
    updated_by?: number
}
