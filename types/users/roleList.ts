import { Role } from './role';

// response for GET /api/v4/roles

export type RoleList = {
  _total_items: number,
  _page: number,
  _page_count: number,
  _links?: {
    self?: {
      href: string
    }
  },
  _embedded: {
    roles: Array<Role>
  }
}

