// response to a request GET /api/v4/catalogs/id

export type Catalog = {
    id: number,
    name: string,
    created_by : number,
    updated_by: number,
    created_at: number,
    updated_at: number,
    sort: number,
    type: string, 
    can_add_elements: boolean, 
    can_show_in_cards: boolean,
    can_link_multiple: boolean,
    can_be_deleted: boolean,
    sdk_widget_code: number | null,
    account_id: number,
    _links: {
        self?: {
            href: string
        }
    }
}

// resquest for response POST /api/v4/catalogs

export type CreatedCatalog = {
    name: string,
    type?: string,
    sort?: number,
    can_add_elements?: boolean,
    can_link_multiple?: boolean,
    request_id?: string
}

// resquest for response PATCH /api/v4/catalogs

export type EditedCatalog = {
    name: string,
    can_add_elements?: boolean,
    can_link_multiple?: boolean,
    request_id?: string
}