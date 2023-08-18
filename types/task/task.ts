export type Task = {
    id: number,
    created_by: number,
    updated_by: number,
    created_at: number,
    updated_at: number,
    responsible_user_id: number,
    group_id: number,
    entity_id: number,
    entity_type: string,
    is_completed: boolean,
    task_type_id: number,
    text: string,
    duration: number,
    complete_till: number,
    result?: TaskResult | null | Array<void>
    account_id: number,
    _links: {
        self: {
            href: string
        }
    }
}

// request for POST /api/v4/tasks

export type CreatedTask = {
    responsible_user_id?: number,
    entity_id?: number,
    entity_type?: string,
    is_completed?: boolean,
    task_type_id?: number,
    text: string,
    duration?: number,
    complete_till: number,
    result?: TaskResult | null | Array<void>,
    created_by?: number,
    updated_by?: number,
    created_at?: number,
    updated_at?: number,
    request_id?: string
    
}

// request for PATCH /api/v4/tasks

export type EditedTask = {
    id: number,
    responsible_user_id?: number,
    entity_id?: number,
    entity_type?: string,
    is_completed?: boolean,
    task_type_id?: number,
    text: string,
    duration?: number,
    complete_till: number,
    result?: TaskResult | null | Array<void>,
    created_by?: number,
    updated_by?: number,
    created_at?: number,
    updated_at?: number,
    request_id?: string
}

// request for POST PATCH /api/v4/tasks
// Отдельно рассмотрим выполнение задачи, которое является частым случаем редактирования.
// Метод позволяет редактировать задачи пакетно.
// Также вы можете добавить ID задачи в метод для редактирования конкретной задачи (/api/v4/tasks/{id}).

export type CompletedTask = {
    is_completed?: boolean,
    result?: TaskResult | null | Array<void>,
}

type TaskResult = {
    text: string 
}