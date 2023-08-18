import {Tag , Company,  CatalogElement, Contact} from '../embeddedEntities/embeddedEntities';
import { CustomField } from '../customField/customField'

// response for request GET /api/v4/leads/{id}

export type LeadData = {
    id?: number,
    name?: string,
    price?: number,
    responsible_user_id?: number,
    group_id?: number,
    status_id?: number,
    pipeline_id?: number,
    loss_reason_id?: number | null,
    created_by?: number,
    updated_by?: number,
    created_at?: number,
    updated_at?: number,
    closed_at?: number | null,
    closest_task_at?: null,
    is_deleted?: boolean,
    custom_fields_values?: Array<CustomField> | null,
    score?: number | null,
    source_id?: number | null,
    account_id?: number,
    labor_cost?: number | null,
    is_price_computed?: boolean,
    is_price_modified_by_robot?: boolean,
    _links?: {
        self: {
            href: string
        }
    }
    _embedded?: {
        loss_reason?: Array<lossReasonData> | null,
        tags?: Array<Tag> | null,
        contacts?: Array<Contact>,
        companies?: Array<Company>,
        catalog_elements?: Array<CatalogElement>,
    }
}

type lossReasonData = {
    id: number,
    name: string,
    sort: number,
    created_at: number, 
    updated_at: number,
    _links: {
        self: {
            href: string
        }
    }
}

