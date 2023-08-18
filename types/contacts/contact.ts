import {Tag , Company, Customer, Lead, CatalogElement} from '../embeddedEntities/embeddedEntities';
import { CustomField } from '../customField/customField'

export type Contact = {
    id: number,
    name: string,
    first_name: string,
    last_name: string,
    responsible_user_id: number,
    group_id: number,
    created_by: number,
    updated_by: number,
    created_at: number,
    updated_at: number,
    is_deleted?: boolean,
    is_unsorted?: boolean,
    closest_task_at: number | null,
    custom_fields_values?: Array<CustomField> | null,
    account_id: number,
    _links: {
        self: {
            href: string
        }
    }
    _embedded: {
        tags?: Array<Tag>,
        companies?: Array<Company>,
        customers?: Array<Customer>,
        leads?: Array<Lead>,
        catalog_elements?: Array<CatalogElement>
    }

}

// request for  POST /api/v4/contacts and PATCH /api/v4/contacts

export type CreatedContact = {
    name?: string,
    first_name?: string,
    last_name?: string,
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


// request for PATCH /api/v4/contacts

export type EditedContact = CreatedContact & {id: number};
