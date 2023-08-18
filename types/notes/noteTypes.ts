export type CommonType = {
  text: string
}

export type CallinType = {
  uniq: string,
  duration: number,
  source: string,
  link: string,
  phone: string
}

export type CallOutType = {
  uniq: string,
  duration: number,
  source: string,
  link: string,
  phone: string
}

export type ServiceMessageType = {
  service: string,
  text: string
}

export type MessageCshierType = {
  status: string,
  text: string
}

export type GeolocationType = {
  text: string,
  address: string,
  longitude: string,
  latitude: string
}

export type SmsInType = {
  text: string,
  phone: string
}

export type SmsOutType = {
  text: string,
  phone: string
}