import {Status} from './piplineStatus'

// response for request GET /api/v4/leads/pipelines/{pipeline_id}/statuses
export type PipelinesStatusList = {
    _total_items: number,
    _embedded: {
        statuses: Array<Status>
    }
}

