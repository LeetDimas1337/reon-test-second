import {Task} from './task';

// response for request GET /api/v4/tasks

export type TaskList = {
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
        tasks: Array<Task>
    }
}


