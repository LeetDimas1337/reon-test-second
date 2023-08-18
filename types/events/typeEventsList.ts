// respone for GET /api/v4/events/types

export type TypeEventsList = {
  _total_items: number,
  _links: {
    self: {
        href: string
    }
  },
  _embedded: {
    events_types: Array<EventType>
  }
}

type EventType = {
  key: string,
  type: number,
  lang: string
}

