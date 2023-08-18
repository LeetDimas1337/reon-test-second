import { CustomField } from '../customField/customField'

// response to a request GET /api/v4/catalogs/{catalog_id}/elements/{id}


export type CatalogElement = {
    id: number,
    catalog_id: number,
    name: string,
    created_by: number,
    updated_by: number,
    created_at: number,
    updated_at: number,
    is_deleted: boolean | null,
    custom_fields_values?: Array<CustomField> | null,
    account_id: number,
    _links: {
        self?: {
            href: string
        }
    }
}

// request  for response POST  /api/v4/catalogs/elements

export type CreatedCatalogElement = {
    name: string,
    custom_fields_values: Array<CustomField> | null,
    request_id?: string
}

// request  for   PATCH /api/v4/catalogs/{catalog_id}/elements

export type EditedCatalogElement = {
    id?: number,
    name: string,
    custom_fields_values?: Array<CustomField> | null,
    request_id?: string
}


