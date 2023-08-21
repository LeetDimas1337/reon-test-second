import {Contact} from "../types/embeddedEntities/embeddedEntities";

type DealResponse = {
    _embedded: {
        contacts: Array<Contact>
    }
}