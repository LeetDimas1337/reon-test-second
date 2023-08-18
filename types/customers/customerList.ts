import { Customer } from './customer'

// response for GET /api/v4/customers

export type CustomerList = {
  _page: number,
  _links: {
      self: {
          href: string
      },
      next?: {
          href: string
      }
  }
  _embedded: {
    customers: Array<Customer>
  }
}

