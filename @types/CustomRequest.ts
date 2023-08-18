import {Request} from 'express'
import {LeadData} from "../types/lead/lead";
import {DealHookData} from "./AmoTypes";

export type TypedRequestBody<T> = Request<object, object, T, object>

export type TypedRequestQuery<T> = Request<object, object, object, T>

export type DealHookKeys = "update" | "add"

export type DealHookBody = {
    leads: {
        [x in DealHookKeys]: DealHookData[]
    }
}


