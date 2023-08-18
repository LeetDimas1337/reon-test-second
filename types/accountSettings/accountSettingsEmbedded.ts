export type UserGroup = {
    id: number,
    name: string,
    uuid: string | null
}

export type TaskType= {
    id: number,
    name: string,
    color: string | null,
    icon_id: number | null,
    code: string | null
}