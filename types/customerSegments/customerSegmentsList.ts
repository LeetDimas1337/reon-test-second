import { CustomerSegment } from './customerSegment';

// response for GET /api/v4/customers/segments

export type CustomerSegmentsList = {
  _total_items: number,
  _page: number,
  _page_count: number,
  _links: {
    self:{
      href: string
    }
  },
_embedded: {
  segments: Array<CustomerSegment>
  }
}

