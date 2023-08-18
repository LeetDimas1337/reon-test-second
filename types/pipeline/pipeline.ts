import {Status} from './piplineStatus'

// request GET /api/v4/leads/pipelines

export type Pipeline = {
    id: number,
    name: string,
    sort: number,
    is_main: boolean,
    is_unsorted_on: boolean,
    is_archive: boolean,
    account_id: number,
    _links: {
        self: {
            href: string
        }
    },
    _embedded: {
        statuses: Array<PipelineColumn>
    }
}

// request  POST /api/v4/leads/pipelines

export type CreatedPipeline = {
    name: string,
    sort: number,
    is_main: boolean,
    is_unsorted_on: boolean,
    _embedded?: {
        statuses: Array<Status>
    }
    request_id?: string
}

// request  PATCH /api/v4/leads/pipelines/{id}

export type EditedPipeline = {
    name?: string,
    sort?: number,
    is_main?: boolean,
    is_unsorted_on?: boolean,
}

type PipelineColumn = {
    id: number,
    name: string,
    sort: number,
    is_editable: boolean,
    pipeline_id: number,
    color: string,
    type: number,
    account_id: number,
    _links: {
        self: {
            href: string
        }
    }
}

