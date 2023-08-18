import {Contact} from "../types/embeddedEntities/embeddedEntities";

interface DealResponse {
    _embedded: {
        contacts: Array<Contact>
    }
}