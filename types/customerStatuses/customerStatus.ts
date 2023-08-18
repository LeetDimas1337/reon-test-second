// response for GET /api/v4/customers/statuses/{id}

export type CustomerStatus = {
  id: number,
  name: string,
  sort: number,
  is_default: boolean,
  color: string,
  type: number,
  conditions: Array<Array<any>> | null,
  account_id: number,
  _links: {
    self: {
        href: string
    }
  }
}

// request for POST /api/v4/customers/statuses

export type CreatedCustomerStatuses = {
  name: string,
  sort: number,
  color?: string,
  request_id?: string
}

// request for PATCH /api/v4/customers/statuses/{id}

export type EditedCustomerStatuses = {
  name?: string,
  sort?: number,
  color?: string,
  request_id?: string
}
