import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Ticket, Answer, TicketChanges } from "../components/Tickets/tickets.model"
import { HistoryElem, HistoryChange, ChangeType } from "../components/Tickets/History/history.model"

const initialTicketState: {tickets: Ticket[], history: HistoryElem[]} = {tickets: [], history: []}

const ticketsSlice = createSlice({
    name: 'tickets',
    initialState: initialTicketState,
    reducers: {
        add(state, action: PayloadAction<{ticket: Ticket, historyElem: HistoryElem}>){
            const newTicket = action.payload.ticket
            state.tickets.unshift(newTicket)

            state.history.push(action.payload.historyElem)
        },
        setTickets(state, action: PayloadAction<Ticket[]>){
            state.tickets = action.payload
        },
        setHistory(state, action: PayloadAction<HistoryElem[]>){
            state.history = action.payload
        },
        addReply(state, action: PayloadAction<{id: string, answer: Answer, historyElem: HistoryElem}>){
            const ticketIndex = state.tickets.findIndex(ticket => ticket.id === action.payload.id)
            state.tickets[ticketIndex].answers.push(action.payload.answer)
            state.tickets[ticketIndex].last_updated_date = action.payload.answer.date

            state.history.push(action.payload.historyElem)
        },
        updateTicket(state, action:PayloadAction<{id: string, changes: TicketChanges, historyElem: HistoryElem}>){
            const ticketIndex = state.tickets.findIndex(ticket => ticket.id === action.payload.id)
            state.tickets[ticketIndex] = {...state.tickets[ticketIndex], ...action.payload.changes}

            //updating history array
            state.history.push(action.payload.historyElem)
        },
        deleteTicket(state, action: PayloadAction<{id: string, historyElem: HistoryElem}>){
            state.tickets = state.tickets.filter(ticket => ticket.id !== action.payload.id)

            state.history.push(action.payload.historyElem)
        }
    }
})

export default ticketsSlice.reducer

export const ticketsActions = ticketsSlice.actions