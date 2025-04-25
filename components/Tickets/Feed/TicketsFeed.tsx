import Link from 'next/link'
import { useRouter } from 'next/router'
import { FunctionComponent, useEffect, useState } from 'react'

import { useAppSelector } from '../../../hooks'

import { sortTickets } from '../../../utils/sortTickets.util'
import Filter from '../Filter/Filter'

import TicketPreview from './TicketPreview'
import { Status, Ticket } from './../tickets.model'

import styles from './TicketsFeed.module.css'

const TicketsFeed: FunctionComponent<{isOpenTicketsFeed: boolean}> = ({isOpenTicketsFeed}) => {
	const [sortedTickets, setSortedTickets] = useState<Ticket[]>([])
	const tickets = useAppSelector((state) => state.tickets.tickets)
	const router = useRouter()
	
	useEffect(() => {
		if (!router.isReady || tickets.length === 0) return
		
		const openTickets = tickets.filter(ticket => (ticket.status === Status.Open || ticket.status === Status.Pending))
		const closedTickets = tickets.filter(ticket => ticket.status === Status.Closed || ticket.status === Status.Resolved)
		const feedTickets = isOpenTicketsFeed ? openTickets : closedTickets
		if (router.query.orderBy && !Array.isArray(router.query.orderBy)) {
			setSortedTickets(sortTickets(feedTickets, router.query.orderBy))
		} else {
			setSortedTickets(feedTickets)
		}
	}, [tickets, isOpenTicketsFeed, router.query.orderBy, router.isReady])

	const ticketsDisplay = sortedTickets.map((ticketItem) => <TicketPreview key={ticketItem.id} ticket={ticketItem} />)

	return (
		<div className='content-div'>
			<div className='top-bar-background'>
                <div className='container'>
                    <div className='top-bar'>
                        <h3 className='page-title'>{isOpenTicketsFeed ? 'Open' : 'Archived'} Tickets</h3>
                    </div>
                </div>
            </div>
                    <div className='container'>
                        <div className={styles.filterBar}>
                            {isOpenTicketsFeed ? 
							<Filter isOpenTicketsFeed={true} /> :
							<Filter isOpenTicketsFeed={false} />}
                            <Link href="/tickets/new">
                                <button type="button" className={`btn btn-primary btn-small ${styles.newTicketBtn}`}>
                                    New Ticket
                                </button>
                            </Link>
                        </div>
                    </div>
			<div className='container'>
				<div className={styles.previewsDiv}>
					{ticketsDisplay}
				</div>
			</div>
		</div>
	)
}

export default TicketsFeed
