import Link from 'next/link'
import { FunctionComponent } from 'react'

import { getTimeAgo } from '../../../utils/date.util'
import { Priority, Status, Ticket } from '../tickets.model'

import styles from './TicketPreview.module.css'

const TicketPreview: FunctionComponent<{ ticket: Ticket }> = ({ ticket }) => {
	const formatedCreatedDate = getTimeAgo(new Date(ticket.created_at * 1000), false)
	const formatedUpdatedDate = getTimeAgo(new Date(ticket.last_updated_date * 1000), false)

	let ticketDivStatusStyle = ''
	let iconStatusStyle = ''
	let iconPriorityStyle = ''
	switch (ticket.status) {
		case Status.Open:
			ticketDivStatusStyle = styles.openStatus
			iconStatusStyle = styles.iconOpenStatus
			break
		case Status.Pending:
			ticketDivStatusStyle = styles.pendingStatus
			iconStatusStyle = styles.iconPendingStatus
			break
		case Status.Closed:
			ticketDivStatusStyle = styles.closedStatus
			iconStatusStyle = styles.iconClosedStatus
			break
		case Status.Resolved:
			ticketDivStatusStyle = styles.resolvedStatus
			iconStatusStyle = styles.iconResolvedStatus
			break
	}

	switch (ticket.priority) {
		case Priority.Low:
			iconPriorityStyle = styles.priorityLow
			break
		case Priority.Medium:
			iconPriorityStyle = styles.priorityMedium
			break
		case Priority.High:
			iconPriorityStyle = styles.priorityHigh
			break
		case Priority.Urgent:
			iconPriorityStyle = styles.priorityUrgent
			break
	}

	return (
		<div className={`${styles.ticketDiv} ${ticketDivStatusStyle}`}>
			<div className={styles.leftArea}>
				<Link href={`/tickets/${ticket.id}`}>
					<a className={styles.ticketTitle}>{ticket.title}</a>
				</Link>
				<p className={styles.createdText}>
					<span className={styles.ticketAuthor}>{ticket.author}</span>{' '}
					<span className={styles.ticketDate}>
						· Created {formatedCreatedDate} {ticket.created_at !== ticket.last_updated_date && `· Last updated : ${formatedUpdatedDate} `}
					</span>
				</p>
			</div>
			<div className={styles.rightArea}>
				<div className={styles.infosDiv}>
					<p className={styles.statusParagraph}>
						Status <i className={`${iconStatusStyle} fa-solid fa-bars-staggered`}></i> <span className={styles.statusText}>{ticket.status}</span>
					</p>
					<p className={styles.priorityParagraph}>
						Priority <i className={`${iconPriorityStyle} fa-solid fa-hourglass-empty`}></i> <span className={styles.priorityText}>{ticket.priority}</span>
					</p>
				</div>
				<div>
					<Link href={`/tickets/${ticket.id}`}>
						<button className={`btn btn-primary btn-delete btn-details`}>Details</button>
					</Link> 
				</div>
			</div>
		</div>
	)
}

export default TicketPreview
