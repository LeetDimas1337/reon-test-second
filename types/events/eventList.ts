import { Event } from './event';

// Response for GET /api/v4/events

export type EventList = {
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
    events: Array<Event> | null
  }
}

