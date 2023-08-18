import { Tag } from './tag';

// Response for
// GET /api/v4/{entity_type:leads|contacts|companies|customers}/tags

export type TagList = {
  _page: number,
  _links?: {
    self?: {
      href: string
    },
    next?: {
      href: string
    }
  },
  _embedded: {
    tags: Array<Tag>
  }
}

