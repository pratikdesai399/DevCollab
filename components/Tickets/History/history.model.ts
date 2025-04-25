import { TicketChanges } from "../tickets.model"

export interface HistoryElem {
    ticket_title: string
    ticket_id: string
	update_time: number
    change: HistoryChange
}

export interface HistoryChange {
    change_type: ChangeType
    author: string
    changes?: TicketChanges
}

export interface HistoryDocumentInDatabase {
    history: HistoryElem[]
}

export enum ChangeType {
    New = 'New Ticket',
	Reply = 'Reply',
	Update = 'Update',
	Delete = 'Delete',
}