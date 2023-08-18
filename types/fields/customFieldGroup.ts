export  type CustomFieldGroup = {
  id: string,
  name: string,
  sort: number,
  entity_type: string,
  is_predefined: boolean,
  type: string,
  _links?: {
    self: {
        href: string
    }
  }
}

// Request for
// POST /api/v4/leads/custom_fields/groups
// POST /api/v4/contacts/custom_fields/groups
// POST /api/v4/companies/custom_fields/groups
// POST /api/v4/customers/custom_fields/groups

export type CreatedGroupsField = {
  name: string,
  sort: number,
  request_id?: string
}

// Request for
// PATCH /api/v4/leads/custom_fields/groups/{id}
// PATCH /api/v4/contacts/custom_fields/groups/{id}
// PATCH /api/v4/companies/custom_fields/groups/{id}
// PATCH /api/v4/customers/custom_fields/groups/{id}

export type EditedGroupsField = {
  name: string,
  sort: number,
  fields: Array<number>
}