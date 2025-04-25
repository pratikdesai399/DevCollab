import { Timestamp } from 'firebase/firestore/lite'
import { useRouter } from 'next/router'
import { FunctionComponent, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { deleteTicket, updateTicket } from '../../../lib/firebase.service'
import { ticketsActions } from '../../../store/tickets'
import { QUERY_CREATED_AT } from '../../../utils/consts'
import { findChanges } from '../../../utils/ticketChanges.util'
import { ChangeType, HistoryChange, HistoryElem } from '../History/history.model'
import { Priority, Project, Status, Ticket, TicketChanges, Type } from '../tickets.model'

import styles from './UpdateTicketForm.module.css'

const UpdateTicketForm: FunctionComponent<{ ticket: Ticket }> = ({ ticket }) => {
	const [formInputs, setFormInputs] = useState<TicketChanges>({
		status: ticket.status,
		priority: ticket.priority,
		type: ticket.type,
		project: ticket.project,
		last_updated_date: ticket.last_updated_date,
	})
	const [didInputsChange, setDidInputChange] = useState(false)
	const [isUpdating, setIsUpdating] = useState(false)
	const dispatch = useAppDispatch()
    const router = useRouter()
	const user = useAppSelector(state => state.auth)

	function onInputChange(event: React.ChangeEvent<HTMLSelectElement>, inputName: string) {
		setDidInputChange(true)
		const newInput = event.target.value

		setFormInputs((prevInputs) => ({ ...prevInputs, [inputName]: newInput }))
	}

	async function onSubmitForm(event: React.FormEvent) {
		event.preventDefault()
        const newTicket: TicketChanges = {...formInputs, last_updated_date: Timestamp.now().seconds}
		await handleUpdateTicket(newTicket)
	}

	async function handleResolveTicket(event: React.FormEvent) {
		event.preventDefault()
		setFormInputs(prevInputs => ({...prevInputs, status: Status.Resolved}))
		const changes: TicketChanges = { status: Status.Resolved, last_updated_date: Timestamp.now().seconds }
		handleUpdateTicket(changes)
	}

	async function handleUpdateTicket(newTicket: TicketChanges){
		setIsUpdating(true)
		const ticketChanges = findChanges(newTicket, ticket)
		const author = user.username ?? 'anonymous'
		const ticket_title = ticket.title
		const ticket_id = ticket.id

		const historyChange: HistoryChange = {
			change_type: ChangeType.Update,
			changes: ticketChanges,
			author
		}
		const historyElem: HistoryElem = {
			ticket_title,
			ticket_id,
			update_time: ticketChanges.last_updated_date,
			change: historyChange
		}
		await updateTicket(ticket.id, ticketChanges, historyElem)
		dispatch(ticketsActions.updateTicket({ id: ticket.id, changes: ticketChanges, historyElem }))
		setIsUpdating(false)
	}

    async function handleDelete(){
		const ticket_title = ticket.title
		const ticket_id = ticket.id
		const deleteTime = Timestamp.now().seconds
		const change: HistoryChange = {
			change_type: ChangeType.Delete,
			author: user.username ?? 'anonymous'
		}
		const historyElem: HistoryElem = {
			ticket_title,
			ticket_id,
			update_time: deleteTime,
			change
		}

        await deleteTicket(ticket.id, historyElem)
        dispatch(ticketsActions.deleteTicket({id: ticket.id, historyElem}))
        router.push(`/tickets/feedopen?orderBy=${QUERY_CREATED_AT}`)
    }

	return (
		<>
			<form>
				<label className={styles.label} htmlFor="status">Status</label>
				<select  className={styles.select} name="status" id="status" onChange={(event) => onInputChange(event, 'status')} value={formInputs.status}>
					{Object.values(Status).map((status, i) => (
						<option key={i} value={status}>
							{status}
						</option>
					))}
				</select>

				<label className={styles.label} htmlFor="priority">Priority</label>
				<select  className={styles.select} name="priority" id="priority" onChange={(event) => onInputChange(event, 'priority')} value={formInputs.priority}>
					{Object.values(Priority).map((priority, i) => (
						<option key={i} value={priority}>
							{priority}
						</option>
					))}
				</select>

				<label className={styles.label} htmlFor="type">Type</label>
				<select  className={styles.select} name="type" id="type" onChange={(event) => onInputChange(event, 'type')} value={formInputs.type}>
					{Object.values(Type).map((type, i) => (
						<option key={i} value={type}>
							{type}
						</option>
					))}
				</select>

				<label className={styles.label} htmlFor="project">Project</label>
				<select  className={styles.select} name="project" id="project" onChange={(event) => onInputChange(event, 'project')} value={formInputs.project}>
					{Object.values(Project).map((project, i) => (
						<option key={i} value={project}>
							{project}
						</option>
					))}
				</select>

				<button disabled={!didInputsChange} className={`btn btn-primary ${styles.btn} ${styles.updateBtn}`} type="submit" onClick={onSubmitForm}>
					{isUpdating ? 'Updating...' : 'Update'}
				</button>
			</form>
			{ticket.status !== Status.Resolved && (
				<button className={`btn btn-primary ${styles.btn} ${styles.resolveBtn}`} type="submit" onClick={handleResolveTicket}>
					Resolve
				</button>
			)}
                <button type="button" className={`btn btn-primary ${styles.btn} ${styles.deleteBtn}`} onClick={handleDelete}>
					Delete
				</button>
		</>
	)
}

export default UpdateTicketForm
