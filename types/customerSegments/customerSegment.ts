import { CustomField } from '../customField/customField'

//response for GET /api/v4/customers/segments/{id}

export type CustomerSegment = {
  id: number,
  created_at: number,
  updated_at: number,
  name: string,
  customers_count: number,
  color: string,
  custom_fields_values: Array<CustomField> | null,
  available_products_price_types: Array<number> | null,
  account_id: number,
  _links: {
    self:{
      href: string
    }
  }
}

// request for POST /api/v4/customers/segments

export type CreatedCustomerSegment = {
  name?: string,
  available_products_price_types?: Array<number> | null,
  color?: string,
  custom_fields_values: Array<CustomField> | null
}


// request for PATCH /api/v4/customers/segments/{id}

export type EditedCustomerSegment = {
  name?: string,
  available_products_price_types?: Array<number> | null,
  color?: string,
  custom_fields_values: Array<CustomField> | null
}