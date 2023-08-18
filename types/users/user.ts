import { EntityData, StatuSright, Role, Group} from './nestedEntities'

// response for GET /api/v4/users/{id}

export type User = {
  id: number,
  name: string,
  email: string,
  lang: string,
  rights: {
    leads: EntityData,
    contacts: EntityData,
    companies: EntityData,
    tasks: EntityData,
    mail_access: boolean,
    catalog_access: boolean | null,
    is_admin: boolean | null,
    is_free: boolean | null,
    is_active: boolean | null,
    group_id: number | null,
    role_id: number | null,
    status_rights: Array<StatuSright> | null,
  },
  _links?: {
    self?: {
      href: string
    }
  },
  _embedded?: {
    roles: Array<Role> | null,
    groups: Array<Group> | null,
  }
}

// requset for POST /api/v4/users/{id}

export type CreatedUser = {
  name?: string,
  email?: string,
  password?: string,
  lang?: string,
  rights?: {
    leads?: EntityData,
    contacts?: EntityData,
    companies?: EntityData,
    tasks?: EntityData,
    mail_access?: boolean,
    catalog_access?: boolean | null,
    is_free?: boolean | null,
    is_active: boolean | null,
    group_id: number | null,
    role_id: number | null,
    status_rights: Array<StatuSright> | null
  },
  request_id?: string
}

