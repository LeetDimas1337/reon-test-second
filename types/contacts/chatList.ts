// request for GET /api/v4/contacts/chats

export type ChatList = {
    _total_items: number,
    _embedded: {
        chats: Array<Chat>
    }
}

type Chat = {
    chat_id: string,
    contact_id: number,
    id: number
}

