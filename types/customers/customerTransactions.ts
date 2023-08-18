import {Customer, CatalogElement } from '../embeddedEntities/embeddedEntities';

// response for GET /api/v4/customers/transactions/{id}


export type CustomerTransactions = {
  id: number,
  comment: string | null,
  price: number,
  completed_at: number,
  customer_id: number,
  created_by: number,
  updated_by: number,
  created_at: number,
  updated_at: number,
  is_deleted: boolean,
  account_id: number,
  _embedded: {
    customer?: Customer,
    
    catalog_elements?: Array<CatalogElement>
  },
  _links?: {
    self: {
        href: string
    }
  }
}

// request for POST /api/v4/customers/{customer_id}/transactions

export type CreatedCustomerTransactions = {
  comment?: string | null,
  price?: number,
  next_price?: number,
  next_date?: number,
  completed_at?: number,
  created_by?: number,
  updated_at?: number,
  _embedded?: {
    customer?: Customer,
    catalog_elements?: Array<CatalogElement>
  },
  request_id?: string
}


