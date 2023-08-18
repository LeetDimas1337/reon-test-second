import { User } from './user';

// response for GET /api/v4/users

export type UserList = {
  _total_items: number,
  _page: number,
  _page_count: number,
  _links?: {
    self?: {
      href: string
    }
  },
  _embedded: {
    users: Array<User>
  }
}

