export type Tag = {
  id?: number,
  name?: string,
  color?: string | null
}

// Request for PATCH /api/v4/{entity_type:leads|contacts|companies|customers}

export type EditedTag = {
  id: number,
  _embedded: {
    tags: Array<Tag>
  }
}

// Request for PATCH /api/v4/{entity_type:leads|contacts|companies|customers}

export type DeletedTag = {
  _embedded: {
    tags: Array<Tag> | null
  }
}