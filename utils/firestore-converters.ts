import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, WithFieldValue } from "firebase/firestore/lite";
import { HistoryDocumentInDatabase } from "../components/Tickets/History/history.model";
import { Ticket } from "../components/Tickets/tickets.model";


export const ticketConverter: FirestoreDataConverter<Ticket> = {
    toFirestore(ticket: WithFieldValue<Ticket>): DocumentData{
        return ticket
    },

    fromFirestore(snapshot: QueryDocumentSnapshot): Ticket{
        const data = snapshot.data()!
		return data as Ticket
    }
}

export const historyConverter: FirestoreDataConverter<HistoryDocumentInDatabase> = {
    toFirestore(history: WithFieldValue<HistoryDocumentInDatabase>): DocumentData{
        return history
    },

    fromFirestore(snapshot: QueryDocumentSnapshot): HistoryDocumentInDatabase{
        const data = snapshot.data()!
        return data as HistoryDocumentInDatabase
    }
}