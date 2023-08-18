import { Link } from './link'

//Response :
// GET /api/v4/leads/links
// GET /api/v4/contacts/links
// GET /api/v4/companies/links
// GET /api/v4/customers/links

export type AllLinkList = {
    _total_items: number,
    _links: {
        self: {
            href: string
        }
    },
    _embedded: {
        links: Array<Link>
    }
}

