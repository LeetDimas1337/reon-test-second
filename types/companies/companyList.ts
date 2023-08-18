import {Company} from './company';

// response for request GET  /api/v4/companies

export type CompanyList = {
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
        companies: Array<Company>
    }
}


