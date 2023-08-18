import { CustomFieldGroup } from "./customFieldGroup";

// Response for 
// GET /api/v4/leads/custom_fields/groups/{id}
// GET /api/v4/contacts/custom_fields/groups/{id}
// GET /api/v4/companies/custom_fields/groups/{id}
// GET /api/v4/customers/custom_fields/groups/{id}

export type CustomFieldGroups = {
  _total_items: number,
  _embedded: {
    custom_field_groups: Array<CustomFieldGroup>
  }
}

