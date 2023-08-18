
import { Pipeline } from './pipeline'
// response for request GET /api/v4/leads/pipelines

export type PipelineList = {
    _total_items: number,
    _links: {
        self: {
            href: string
        }
    },
    _embedded: {
        pipelines: Array<Pipeline>
    }
}

