import {Tag , Company,  Lead, CatalogElement, Contact, Segment} from '../embeddedEntities/embeddedEntities';
import { CustomField } from '../customField/customField'

// response for GET /api/v4/customers/{id}


export type Customer = {
  id: number,
  name: string,
  next_price: number,
  next_date: number,
  responsible_user_id: number,
  status_id: number,
  periodicity: number,
  created_by: number,
  updated_by: number,
  created_at: number,
  updated_at: number,
  closest_task_at: number | null,
  is_deleted: boolean,
  custom_fields_values?: Array<CustomField> | null,
  ltv: number,
  purchases_count: number,
  average_check: number,
  account_id: number,
  _embedded: {
    tags?: Array<Tag>,
    companies?: Array<Company>,
    contacts?: Array<Contact>,
    leads?: Array<Lead>,
    catalog_elements?: Array<CatalogElement>,
    segments?: Array<Segment>
  },
  _links?: {
    self: {
        href: string
    }
  }
}

// request for POST /api/v4/customers

export type CreatedCustomer = {
  name?: string,
  next_price?: number,
  next_date?: number,
  responsible_user_id?: number,
  periodicity?: number,
  created_by?: number,
  updated_by?: number,
  created_at?: number,
  updated_at?: number,
  custom_fields_values?: Array<CustomField> | null,
  _embedded?: {
    tags?: Array<Tag>,
   
  },
  request_id?: string
}

// request for PATCH /api/v4/customers

export type EditedCustomer =  CreatedCustomer & {id: number};

