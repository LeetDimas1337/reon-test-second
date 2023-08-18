export type EntityData = {
  view?: string,
  edit?: string,
  add?: string,
  delete?: string,
  export?: string
}

export type StatuSright = {
  entity_type: string,
  pipeline_id: number,
  status_id: number,
  rights: EntityData
}

export type Role = {
  id?: number,
  name?: string,
  _links?: {
    self?: {
      href: string
    }
  }
}

export type Group = {
  id?: number,
  name?: string
}
