// response for request GET /api/v4/leads/pipelines/{pipeline_id}/statuses/{id}

export type Status = {
    id?: number,
    name?: string,
    sort?:number, 
    is_editable?: boolean,
    pipeline_id?:number,
    color?: string,
    type?: number,
    account_id?: number,
    _links?: {
        self: {
            href: string
        }
    },
}

// response for request  POST /api/v4/leads/pipelines/{pipeline_id}/statuses

export type CreatedStatus = {
    name: string,
    sort:number, 
    color?: string,
    request_id?: string
}

// request  for POST/api/v4/leads/pipelines/{pipeline_id}/statuses/{id}

export type EditedPipelinesStatuse = {
    name: string,
    sort: number,
    color: string
}