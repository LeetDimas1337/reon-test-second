import { Note } from './note';

// response for  GET /api/v4/{entity_type}/notes

export type NoteList = {
  _page: number,
  _links: {
    self: {
        href: string
    },
    next?: {
        href: string
    }
  },
  _embedded: {
    notes: Array<Note> | null
  }
}

