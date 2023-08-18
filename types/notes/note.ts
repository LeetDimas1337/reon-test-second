import { CommonType,
   CallinType, 
   CallOutType, 
   ServiceMessageType, 
   MessageCshierType, 
   GeolocationType, 
   SmsInType, 
   SmsOutType 
} from './noteTypes';

// Получение примечания по ID
// GET /api/v4/{entity_type}/notes/{id}
// GET /api/v4/{entity_type}/{entity_id}/notes/{id}

export type Note = {
  id: number,
  entity_id: number,
  created_by: number,
  updated_by: number,
  created_at: number,
  updated_at: number,
  responsible_user_id: number,
  group_id: number,
  note_type: string,
  params: CommonType | CallinType | CallOutType | ServiceMessageType | MessageCshierType 
  | GeolocationType | SmsInType | SmsOutType,
  account_id: number,
  _links: {
    self: {
        href: string
    }
  }
}

// request for
// POST /api/v4/{entity_type}/notes
// POST /api/v4/{entity_type}/{entity_id}/notes

export type CreatedNote = {
  entity_id: number,
  created_by?: number,
  note_type: string,
  params: CommonType | CallinType | CallOutType | ServiceMessageType | MessageCshierType 
  | GeolocationType | SmsInType | SmsOutType,
  request_id?: string,
  is_need_to_trigger_digital_pipeline?: boolean
}

// request for
// PATCH /api/v4/{entity_type}/notes
// PATCH /api/v4/{entity_type}/{entity_id}/notes
// PATCH /api/v4/{entity_type}/{entity_id}/notes/{id}

export type EditedNote = {
  id?: number,
  entity_id: number,
  note_type: string,
  params:  CommonType | CallinType | CallOutType | ServiceMessageType | MessageCshierType 
  | GeolocationType | SmsInType | SmsOutType,
}