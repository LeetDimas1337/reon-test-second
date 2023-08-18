import { CustomerStatus } from './customerStatus';

// response for GET /api/v4/customers/statuses

export type CustomerStatusList = {
  _total_items: number,
  _links: {
      self: {
          href: string
      }
  }
  _embedded: {
    statuses: Array<CustomerStatus>
  }
}

