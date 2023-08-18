export type Tag = {
    id: number,
    name: string,
    color: string | null 
}

export type Company = {
    id: number,
    _links?: {
        self: {
            href: string
        }
    }
}

export type Customer = {
    id: number,
    _links?: {
        self: {
            href: string
        }
    }
}

export type Lead = {
    id: number,
    _links?: {
        self: {
            href: string
        }
    }
}

export type CatalogElement = {
   id: number,
   metadata?: {
    quantity: number | null,
    catalog_id: number,
    price_id?: number | null
    }

}

export type Contact = {
    id: number,
    is_main?: boolean | null
    _links?: {
        self: {
            href: string
        }
    }
}

export type Segment = {
    id: number,
    _links?: {
        self: {
            href: string
        }
    }
}
