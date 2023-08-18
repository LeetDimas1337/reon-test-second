import { EntityData, StatuSright} from './nestedEntities'

// response for GET /api/v4/roles/{id}


export type Role = {
  id: number,
  name: string,
  rights: {
    leads: EntityData,
    contacts: EntityData,
    companies: EntityData,
    tasks: EntityData,
    mail_access: boolean,
    catalog_access: boolean | null,
    is_admin?: boolean | null,
    is_free?: boolean | null,
    is_active?: boolean | null,
    group_id?: number | null,
    role_id?: number | null,
    status_rights: Array<StatuSright> | null,
  },
  _links?: {
    self?: {
      href: string
    }
  },
  _embedded?: {
    users?: Array<any> | null,
  }
}

// request for POST /api/v4/roles

export type CreatedRole = {
  name: string,
  rights: {
    leads: EntityData,
    contacts: EntityData,
    companies: EntityData,
    tasks: EntityData,
    mail_access: boolean,
    catalog_access: boolean | null,
    status_rights: Array<StatuSright> | null,
  },
  request_id?: string
}

// requset for PATCH /api/v4/roles

export type EditedRole = {
  id?: number,
  name: string,
  rights: {
    leads?: EntityData,
    contacts?: EntityData,
    companies?: EntityData,
    tasks?: EntityData,
    mail_access?: boolean,
    catalog_access?: boolean | null,
    status_rights?: Array<StatuSright> | null,
  }
}