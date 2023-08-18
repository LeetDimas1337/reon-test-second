export type TaskEvent = {
  task: {
    text: string
  }
}

export type RobotRepileEvent = {
  helpbot: {
    id: number
  }
}

export type TransactionEvent = {
  transaction: {
    id: number
  }
}

export type NoteEvent = {
  note: {
    id: number
  }
}

export type NpsEvent = {
  nps: {
    rate: number
  }
}

export type MessageEvent = {
  message: {
    id: string
  }
}

export type TagEvent = {
  tag: {
    name: string
  }
}

export type LeadStatusChangedEvent = {
  lead_status: {
    id: number,
    pipeline_id: number
  }
}

export type CustomerStatusChanged = {
  customer_status: {
    id: number
  }
}

export type CustomerLinkedEvent = {
  link: {
    entity: {
      type: string,
      id: number
    }
  }
}

export type EntityResponsibleChangedEvent = {
  responsible_user: {
   id: number
  }
}

export type TaskDeadlineChangedEvent = {
  task_deadline: {
    timestamp: number
  }
}

export type TaskTypeChangedEvent = {
  task_type: {
    id: number
  }
}

export type CustomFieldValueChangedEvent = {
  custom_field_value: {
    field_id: number,
    field_type: number,
    enum_id: number,
    text: string
  }
}