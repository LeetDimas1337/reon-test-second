//request for POST /api/v4/contacts/chats

export type linkedChat = {
    chat_id: string,
    contact_id: number,
    request_id?: string
}