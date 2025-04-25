import { Timestamp } from 'firebase/firestore/lite'
import { useRouter } from 'next/router'
import { FunctionComponent, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { postTicket } from '../../lib/firebase.service'
import { ticketsActions } from '../../store/tickets'
import { QUERY_CREATED_AT } from '../../utils/consts'
import { Priority, Status, Type, Ticket, Project } from './tickets.model'

import styles from './NewTicketForm.module.css'
import { ChangeType, HistoryChange, HistoryElem } from './History/history.model'

const NewTicketForm: FunctionComponent = () => {
	const [formInputs, setFormInputs] = useState({
		title: '',
		post: '',
		priority: Priority.Medium,
		type: Type.NewFeature,
		project: Project.Habits
	})

	const user = useAppSelector((state) => state.auth)
	const dispatch = useAppDispatch()
	const router = useRouter()

	function onInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, inputName: string) {
		const newInput = event.target.value

		setFormInputs((prevInputs) => ({ ...prevInputs, [inputName]: newInput }))
	}

	function onCancel() {
		router.push(`/tickets/feedopen?orderBy=${QUERY_CREATED_AT}`)
	}

	function isFormValid(){
		return (formInputs.title !== '' && formInputs.post !== '')
	}

	function onSubmitForm(event: React.FormEvent) {
		event.preventDefault()

		if(!isFormValid()){
			return 
		}

		const currentDate = Timestamp.now().seconds
		const newTicket: Ticket = {
			title: formInputs.title,
			author: user.username || 'anonymous',
			message: formInputs.post,
			id: uuidv4(),
			created_at: currentDate,
			last_updated_date: currentDate,
			priority: formInputs.priority,
			status: Status.Open,
			type: formInputs.type,
			project: formInputs.project,
			answers: [],
		}

		const change: HistoryChange = {
			change_type: ChangeType.New,
			author: newTicket.author
		}
		const historyElem: HistoryElem = {
			ticket_title: newTicket.title,
			ticket_id: newTicket.id,
			update_time: newTicket.last_updated_date,
			change
		}
		postTicket(newTicket, historyElem)
		//todo need to put un if que la post req success
		dispatch(ticketsActions.add({ticket: newTicket, historyElem}))

		router.push(`/tickets/feedopen?orderBy=${QUERY_CREATED_AT}`)
	}

	return (
		<div className="content-div">
			<div className='top-bar-background no-margin'>
                <div className='container'>
                    <div className='top-bar'>
                        <h3 className='page-title'>New Ticket</h3>
                    </div>
                </div>
            </div>
			<div className="container white-container">
				<form className={styles.form}>

					<label htmlFor="title" className={styles.label}>Title</label>
					<input
						required={true}
						className={styles.input}
						type="text"
						name="title"
						id="title"
						onChange={(event) => onInputChange(event, 'title')}
						value={formInputs.title}
					/>

					<label className={styles.label} htmlFor="priority">Priority</label>
					<select  className={styles.select} name="priority" id="priority" onChange={(event) => onInputChange(event, 'priority')} value={formInputs.priority}>
						{Object.values(Priority).map((priority, i) => (
							<option key={i} value={priority}>
								{priority}
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

					<label className={styles.label} htmlFor="type">Type</label>
					<select  className={styles.select} name="type" id="type" onChange={(event) => onInputChange(event, 'type')} value={formInputs.type}>
						{Object.values(Type).map((type, i) => (
							<option key={i} value={type}>
								{type}
							</option>
						))}
					</select> 

					<label htmlFor="post" className={styles.label}>Message</label>
					<textarea className={styles.textArea} name="post" id="post" onChange={(event) => onInputChange(event, 'post')} value={formInputs.post} />

					<div>
						<button className={`btn btn-primary btn-cancel ${styles.btn}`} type="button" onClick={onCancel}>
							Cancel
						</button>

						<button className={`btn btn-primary ${styles.btn}`} type="submit" onClick={onSubmitForm}>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default NewTicketForm
