import { LeadData } from './lead'

// response for request GET /api/v4/leads

export type leadsList = {
    _page: number,
    _links:  {
        self?: {
            href: string
        },
        next?: {
            href: string
        },
        first?: {
            href: string
        },
        prev?: {
            href: string
        }
    },
    _embedded: {
        leads: Array<LeadData> 
    }
};

