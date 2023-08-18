// Resspone for 
// GET /api/v4/leads/custom_fields/{id}
// GET /api/v4/contacts/custom_fields/{id}
// GET /api/v4/companies/custom_fields/{id}
// GET /api/v4/customers/custom_fields/{id}
// GET /api/v4/customers/segments/custom_fields/{id}
// GET /api/v4/catalogs/{catalog_id}/custom_fields/{id}

export type Field = {
  id: number,
  name?: string,
  code?: string,
  sort?: number,
  type?: number | string, //ошибка в документации?
  account_id?: number,
  entity_type?: string,
  is_predefined?: boolean,
  is_deletable?: boolean,
  is_visible?: boolean,
  is_required?: boolean,
  settings?: any,
  remind?: string | null,
  currency?: any,
  enums: Array<EnumsItem> | null,
  nested?: Array<NestedItem> | null,
  is_api_only: boolean,
  group_id: string | null,
  required_statuses: Array<Status> | null,
  hidden_statuses?: Array<HiddenStatus>,
  chained_lists?: Array<ChinedList>,
  tracking_callback?: string,
  search_in?: string | null,
  _links?: {
    self: {
        href: string
    },
  }
}   

// request for :
// POST /api/v4/leads/custom_fields
// POST /api/v4/contacts/custom_fields
// POST /api/v4/companies/custom_fields
// POST /api/v4/customers/custom_fields
// POST /api/v4/customers/segments/custom_fields
// POST /api/v4/catalogs/{catalog_id}/custom_fields

export type CreatedField = {
  type: string, 
  name: string,
  code?: string,
  sort?: number,
  group_id?: string,
  is_api_only?: boolean,
  required_statuses?: Array<Status> | null,
  setting?: any,
  is_visible?: boolean,
  is_required?: boolean,
  remind?: string | null,
  enums?: Array<EnumsItem> | null,
  nested?: Array<NestedItem> | null,
  tracking_callback?: string,
  hidden_statuses?: Array<HiddenStatus>,
  chained_lists?: Array<ChinedList> | null,
  search_in?: string | null,
  currency?: string | null,
  _links?: {
    self: {
        href: string
    },
  }
}   

// request for :
// PATCH /api/v4/leads/custom_fields
// PATCH /api/v4/contacts/custom_fields
// PATCH /api/v4/companies/custom_fields
// PATCH /api/v4/customers/custom_fields
// PATCH /api/v4/customers/segments/custom_fields
// PATCH /api/v4/catalogs/{catalog_id}/custom_fields

export type EditedField = {
  id?: number,
  name: string,
  code?: string,
  sort?: number,
  group_id?: string,
  is_api_only?: boolean,
  required_statuses?: Array<Status> | null,
  setting?: any,
  is_visible?: boolean,
  is_required?: boolean,
  remind?: string | null,
  enums?: Array<EnumsItem> | null,
  nested?: Array<NestedItem> | null,
  tracking_callback?: string,
  hidden_statuses?: Array<HiddenStatus>,
  chained_lists?: Array<ChinedList> | null,
  search_in?: string | null,
  currency?: string | null
}   

type EnumsItem = {
  value: string,
  sort: number,
  code?: string | null,
}

type NestedItem = {
  id?: number,
  parent_id?: number | null,
  value?: string,
  sort?: number,
  request_id?: string,
  parent_request_id: string
}

type Status = {
  status_id?: number,
  pipeline_id?: number,
}

type HiddenStatus  = {
  status_id?: number,
  pipeline_id?: number,
}

type ChinedList = {
  title: string | null,
  catalog_id: number,
  parent_catalog_id: number
}