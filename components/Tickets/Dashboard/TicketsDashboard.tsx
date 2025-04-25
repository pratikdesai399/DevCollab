import { FunctionComponent } from 'react'
import dynamic from 'next/dynamic'

import { useAppSelector } from '../../../hooks'
import { Priority, Project, Status, Type } from '../tickets.model'

const PieChartComponentWithoutSSR = dynamic(import('./PieChartComponent'), { ssr: false })
import styles from './TicketDashboard.module.css'

const TicketsDashboard: FunctionComponent = () => {
	const tickets = useAppSelector((state) => state.tickets.tickets)

	const ticketsCount = tickets.length
	const projectsCount = Object.values(Project).length - 1

	const openTicketsCount = tickets.filter((ticket) => ticket.status === Status.Open).length
	const resolvedTicketsCount = tickets.filter((ticket) => ticket.status === Status.Resolved).length
	const closedTicketsCount = tickets.filter((ticket) => ticket.status === Status.Closed).length
	const pendingTicketsCount = tickets.filter((ticket) => ticket.status === Status.Pending).length
	const archivedTicketsCount = closedTicketsCount + resolvedTicketsCount

	const prioLowTicketsCount = tickets.filter((ticket) => ticket.priority === Priority.Low).length
	const prioMediumTicketsCount = tickets.filter((ticket) => ticket.priority === Priority.Medium).length
	const prioHighTicketsCount = tickets.filter((ticket) => ticket.priority === Priority.High).length
	const prioUrgentTicketsCount = tickets.filter((ticket) => ticket.priority === Priority.Urgent).length

	const newFeatureTicketsCount = tickets.filter((ticket) => ticket.type === Type.NewFeature).length
	const designTicketsCount = tickets.filter((ticket) => ticket.type === Type.Design).length
	const bugTicketsCount = tickets.filter((ticket) => ticket.type === Type.Bug).length
	const typeOtherTicketsCount = tickets.filter((ticket) => ticket.type === Type.Other).length

	const portfolioTicketsCount = tickets.filter((ticket) => ticket.project === Project.Portfolio).length
	const ticketTicketsCount = tickets.filter((ticket) => ticket.project === Project.Tickets).length
	const habitTicketsCount = tickets.filter((ticket) => ticket.project === Project.Habits).length
	const otherTicketsCount = tickets.filter((ticket) => ticket.project === Project.Other).length

	const pieData1 = [
		{ name: 'Open', value: openTicketsCount },
		{ name: 'Resolved', value: resolvedTicketsCount },
		{ name: 'Pending', value: pendingTicketsCount },
		{ name: 'Closed', value: closedTicketsCount },
	]
	const pieData2 = [
		{ name: 'Low', value: prioLowTicketsCount },
		{ name: 'Medium', value: prioMediumTicketsCount },
		{ name: 'High', value: prioHighTicketsCount },
		{ name: 'Urgent', value: prioUrgentTicketsCount },
	]

	const pieColors = ['#20C98B', '#9B9EA3', '#2CABE3', '#FFC36D']

	return (
		<div className="content-div">
			<div className='top-bar-background'>
				<div className={styles.centerContainer}>
					<div className={`top-bar ${styles.responsiveGrid}`}>
						<h3 className='page-title'>Dashboard - Project and Ticket Statistics.</h3>
						<h3 className='page-title'>Developed and maintained by Pratik Desai - MCS@TAMU</h3>
					</div>
				</div>
			</div>

			<div className={styles.centerContainer}>
				<div className={`${styles.responsiveGrid} ${styles.topStatsDiv}`}>
					<div className={`${styles.card} ${styles.color1}`}>
						<p>Number of tickets : {ticketsCount}</p>
					</div>
					<div className={`${styles.card} ${styles.color2}`}>
						<p>Active projects : {projectsCount}</p>
					</div>
					<div className={`${styles.card} ${styles.color3}`}>
						<p>Open tickets : {openTicketsCount}</p>
					</div>
					<div className={`${styles.card} ${styles.color4}`}>
						<p>Archived tickets : {archivedTicketsCount}</p>
					</div>
				</div>

				<div className={`${styles.responsiveGrid} ${styles.chartsTitle}`}>
					<h3>Tickets by :</h3>
				</div>

				<div className={styles.pieChartsDiv}>
					<div className={styles.pieDiv}>
						<h3 className={styles.pieTitle}>Status</h3>
						<PieChartComponentWithoutSSR data={pieData1} colors={pieColors} />
					</div>
					<div className={styles.pieDiv}>
						<h3 className={styles.pieTitle}>Priority</h3>
						<PieChartComponentWithoutSSR data={pieData2} colors={pieColors} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default TicketsDashboard
