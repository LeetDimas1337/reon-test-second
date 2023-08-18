import { Catalog } from './catalog';

// response for request GET /api/v4/catalogs

export type CatalogList = {
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
        catalogs: Array<Catalog>
    }
}

