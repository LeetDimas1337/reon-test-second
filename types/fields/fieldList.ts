import { Field } from "./field"

// Response for :
// GET /api/v4/leads/custom_fields
// GET /api/v4/contacts/custom_fields
// GET /api/v4/companies/custom_fields
// GET /api/v4/customers/custom_fields
// GET /api/v4/customers/segments/custom_fields
// GET /api/v4/catalogs/{catalog_id}/custom_fields

export type FieldList = {
    _total_items: number,
    _page: number,
    _page_count: number,
    _links: {
        self: {
            href: string
        },
        next?: {
            href: string
        },
        last?: {
            href: string
        }
    },
    _embedded: {
        custom_fields: Array<Field>
    }
}   

