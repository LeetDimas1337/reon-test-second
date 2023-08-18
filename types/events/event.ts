import { TaskEvent, 
  RobotRepileEvent, 
  TransactionEvent, 
  NoteEvent, 
  NpsEvent, 
  MessageEvent, 
  TagEvent, 
  LeadStatusChangedEvent, 
  CustomerStatusChanged, 
  CustomerLinkedEvent, 
  EntityResponsibleChangedEvent, 
  TaskDeadlineChangedEvent, 
  TaskTypeChangedEvent, 
  CustomFieldValueChangedEvent} from './typeEvents';

//response for GET /api/v4/events/{id}

export type Event = {
  id: string,
  type: string,
  entity_id: number,
  entity_type: string,
  created_by: number,
  created_at: number,
  value_after: Array<TaskEvent | RobotRepileEvent | TransactionEvent |NoteEvent |NpsEvent 
  | MessageEvent| TagEvent| LeadStatusChangedEvent| CustomerStatusChanged | CustomerLinkedEvent |
  EntityResponsibleChangedEvent | TaskDeadlineChangedEvent | TaskTypeChangedEvent | CustomFieldValueChangedEvent> | null,
  value_before: Array<TaskEvent | RobotRepileEvent | TransactionEvent |NoteEvent |NpsEvent 
  | MessageEvent| TagEvent| LeadStatusChangedEvent| CustomerStatusChanged | CustomerLinkedEvent |
  EntityResponsibleChangedEvent | TaskDeadlineChangedEvent | TaskTypeChangedEvent | CustomFieldValueChangedEvent> | null,
  account_id: number,
  _links: {
    self: {
        href: string
    }
  },
  _embedded: {
    entity: {
      id: number,
      _links: {
        self: {
            href: string
        }
      }
    }
  }
}

