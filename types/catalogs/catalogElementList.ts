import {CatalogElement} from './catalogElement';

// response to a request GET /api/v4/catalogs/{catalog_id}/elements

export type CatalogElementList = {
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
        elements: Array<CatalogElement>
    }
}


