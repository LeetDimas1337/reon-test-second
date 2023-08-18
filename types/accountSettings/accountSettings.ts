import { UserGroup } from './accountSettingsEmbedded'
import { TaskType } from './accountSettingsEmbedded'

// response for request GET /api/v4/account

export type AccountSettings = {
    id: number,
    name: string,
    subdomain: string,
    created_at: number,
    created_by: number,
    updated_at: number,
    updated_by: number,
    current_user_id: number,
    country: string,
    customers_mode: string,
    currency?: string,
    currency_symbol?: string,
    is_unsorted_on: boolean,
    mobile_feature_version?: number,
    is_loss_reason_enabled: boolean,
    is_helpbot_enabled: boolean,
    is_technical_account: boolean,
    contact_name_display_order: number,
    amojo_id?: string,
    uuid?: string,
    version?: number,
    _links: {
        self: {
            href: string
        }
    },
    _embedded?: {
        amojo_rights: {
            can_direct: boolean,
            can_create_groups: boolean
        },
        users_groups: Array<UserGroup>,
        task_types: Array<TaskType>,
        entity_names: any,
        datetime_settings?: {
            date_pattern: string
            short_date_pattern: string,
            short_time_pattern: string,
            date_formant: string,
            time_format: string,
            timezone: string,
            timezone_offset: string
        }
    }
}



