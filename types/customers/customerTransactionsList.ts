import { CustomerTransactions } from './customerTransactions';

// response for GET /api/v4/customers/transactions

export type CustomerTransactionsList = {
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
    transactions: Array<CustomerTransactions>
  }
}

