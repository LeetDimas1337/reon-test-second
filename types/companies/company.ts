import {Tag , Customer, Lead, CatalogElement, Contact} from '../embeddedEntities/embeddedEntities';
import { CustomField } from '../customField/customField'

// request for  GET  /api/v4/companies/id

export type Company = {
    id: number,
    name: string,
    responsible_user_id: number,
    group_id: number,
    created_by: number,
    updated_by: number,
    created_at: number,
    updated_at: number,
    closest_task_at: number | null,
    custom_fields_values?: Array<CustomField> | null,
    is_deleted?: boolean,
    account_id: number,
    _links: {
        self: {
            href: string
        }
    },
    _embedded: {
        tags?: Array<Tag>,
        contacts?: Array<Contact>,
        customers?: Array<Customer>,
        leads?: Array<Lead>,
        catalog_elements?: Array<CatalogElement>
    }
}

// request for  POST /api/v4/companies

export type CreatedCompany = {
    name?: string,
    responsible_user_id?: number,
    created_by?: number,
    updated_by?: number,
    created_at?: number,
    updated_at?: number,
    custom_fields_values?: Array<CustomField> | null,
    _embedded?: {
        tags?: Array<Tag>
    },
    request_id?: string
}

// request for PATCH /api/v4/companies

export type EditedCompany = CreatedCompany & {id: number};
