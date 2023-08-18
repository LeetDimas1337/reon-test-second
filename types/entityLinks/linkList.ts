import { Link } from './link'

//Response :
// GET /api/v4/leads/{entity_id}/links
// GET /api/v4/contacts/{entity_id}/links
// GET /api/v4/companies/{entity_id}/links
// GET /api/v4/customers/{entity_id}/links

export type LinkList = {
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

