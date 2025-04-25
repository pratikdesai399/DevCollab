import { QUERY_CREATED_AT, QUERY_LAST_UPDATED, QUERY_PRIORITY, QUERY_STATUS } from "./consts";

export function displaySortBy(sort: string){
    switch(sort){
        case QUERY_CREATED_AT: return 'Date created'
        case QUERY_LAST_UPDATED: return 'Last modified'
        case QUERY_STATUS: return 'Status'
        case QUERY_PRIORITY: return 'Priority'
        default: return 'Unknown Sorting'
    }
}