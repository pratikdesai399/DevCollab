import { FunctionComponent, useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { getHistoryFromDatabase, getTicketsFromDatabase } from "../../lib/firebase.service";
import { ticketsActions } from "../../store/tickets";

const FetchWrapper: FunctionComponent<{ children: JSX.Element[] | JSX.Element }> = (props) =>{
    const dispatch = useAppDispatch()

	useEffect(() => {
		const fetchTickets = async () => {
			const tickets = await getTicketsFromDatabase()
			dispatch(ticketsActions.setTickets(tickets))
		}

		const fetchHistory = async () => {
			const history = await getHistoryFromDatabase()
			if(history){
				dispatch(ticketsActions.setHistory(history.history))
			}
		}
		fetchTickets()
		fetchHistory()
	}, [dispatch])
    
    return <>{props.children}</>
}

export default FetchWrapper