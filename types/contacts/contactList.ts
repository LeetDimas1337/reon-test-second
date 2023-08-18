import {Contact} from './contact';

// response for request GET /api/v4/contacts

export type ContactList = {
    _page: number,
    _links: {
        self: {
            href: string
        },
        next?: {
            href: string
        }
    }
    _embedded: {
        contacts: Array<Contact>
    }
}

