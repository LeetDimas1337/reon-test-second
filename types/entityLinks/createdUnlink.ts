// Request for:
// POST /api/v4/leads/{entity_id}/unlink
// POST /api/v4/contacts/{entity_id}/unlink
// POST /api/v4/companies/{entity_id}/unlink
// POST /api/v4/customers/{entity_id}/unlink

export type CreatedUnlink = {
    to_entity_id: number,
    to_entity_type: string,
    metadata: Info| null
}

type Info = {
    catalog_id?: number,
    updated_by?: number
}