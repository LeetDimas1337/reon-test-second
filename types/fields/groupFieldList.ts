//Request for:
// GET /api/v4/leads/custom_fields/groups
// GET /api/v4/contacts/custom_fields/groups
// GET /api/v4/companies/custom_fields/groups
// GET /api/v4/customers/custom_fields/groups

export type GroupFieldList = {
  id: string,
  name: string,
  sort: number,
  entity_type: string,
  is_predefined: boolean,
  type: string,
  _links: {
    self: {
        href: string
    },
  }
}

