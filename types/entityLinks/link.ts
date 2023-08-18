export type Link = {
    to_entity_id?: number,
    to_entity_type: string,
    entity_id?: number,
    entity_type?: string,
    metadata?: null | Info
}

type Info = {
    catalog_id?: number,
    quantity?: number | null,
    main_contact?: boolean,
    price_id?: number | null
}

// Request for:
// POST /api/v4/leads/{entity_id}/link
// POST /api/v4/contacts/{entity_id}/link
// POST /api/v4/companies/{entity_id}/link
// POST /api/v4/customers/{entity_id}/link

export type CreatedLink = {
    to_entity_id: number,
    to_entity_type: string,
    metadata: Info| null
}