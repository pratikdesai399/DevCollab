import { Ticket } from "../components/Tickets/tickets.model";
import { QUERY_CREATED_AT, QUERY_LAST_UPDATED, QUERY_PRIORITY, QUERY_STATUS } from "./consts";


export function sortTickets(tickets: Ticket[], sortType: string): Ticket[]{
    const sortedTickets = [...tickets]

    switch(sortType){
        case QUERY_CREATED_AT: 
            sortedTickets.sort((a, b) =>  b.created_at - a.created_at )
            break
        case QUERY_LAST_UPDATED:
            sortedTickets.sort((a, b) => b.last_updated_date - a.last_updated_date)
            break
        case QUERY_PRIORITY:
            sortedTickets.sort((a, b) => {
                let x = a.priority.toLocaleLowerCase()
                let y = b.priority.toLocaleLowerCase()
                if(x < y) {return -1}
                if(y < x) {return 1}
                return 0
            })
            break
        case QUERY_STATUS:
            sortedTickets.sort((a, b) => {
                let x = a.status.toLocaleLowerCase()
                let y = b.status.toLocaleLowerCase()
                if(x < y) {return -1}
                if(y < x) {return 1}
                return 0
            })
            break
    }
    return sortedTickets
}