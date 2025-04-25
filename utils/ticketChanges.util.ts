import { Ticket, TicketChanges } from "../components/Tickets/tickets.model";

export function findChanges(newTicket: TicketChanges, oldTicket: Ticket){
    const changedKeys = Object.keys(newTicket).filter(key => {
        const typedKey = key as keyof TicketChanges
        return (key === 'last_updated_date' || oldTicket[typedKey] !== newTicket[typedKey])
    })

    const newTicketAsArray = Object.entries(newTicket)
    const changesArray = newTicketAsArray.filter(([key, value]) => changedKeys.includes(key))
    const changesObject = Object.fromEntries(changesArray) as TicketChanges
    return changesObject
}

export function trimChanges(changes: TicketChanges){
    const changeAsArray = Object.entries(changes)
    const trimmedArray = changeAsArray.filter(([key, value]) => key !== 'last_updated_date')
    const trimmedObject = Object.fromEntries(trimmedArray) as TicketChanges
    return trimmedObject
}