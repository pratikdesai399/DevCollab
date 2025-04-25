import Link from 'next/link'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import { QUERY_CREATED_AT, QUERY_ORDER_BY } from '../../../utils/consts'
import DashboardIcon from '../../../public/leaderboard_light.svg'
import TicketsIcon from '../../../public/list.svg'
import HistoryIcon from '../../../public/history_light.svg'
import NewTicketIcon from '../../../public/add_circle_light.svg'
import ArchiveIcon from '../../../public/archive_light.svg'

import styles from './SideNav.module.css'

const SideNav: FunctionComponent = () => {
	const router = useRouter()

	return (
		<div className={styles.navDiv}>
			<ul>
				<div className={styles.devider}></div>
				<Link href="/tickets/dashboard">
					<li className={`${styles.navItem} ${router.pathname === '/tickets/dashboard' ? `${styles.active}` : ''}`}>
						<div className={`${styles.navElement} `}>
							<DashboardIcon className={styles.navIcon} />
							<span className={styles.navText}>Dashboard</span>
						</div>
					</li>
				</Link>

				<div className={styles.devider}></div>

				<Link href={`/tickets/feedopen?${QUERY_ORDER_BY}=${QUERY_CREATED_AT}`}>
					<li className={`${styles.navItem} ${router.pathname === '/tickets/feedopen' ? `${styles.active}` : ''}`}>
						<div className={`${styles.navElement}`}>
							<TicketsIcon className={styles.navIcon} />
							<span className={styles.navText}>Open Tickets</span>
						</div>
					</li>
				</Link>
				
				<div className={styles.devider}></div>

				<Link href="/tickets/new">
					<li className={`${styles.navItem} ${router.pathname === '/tickets/new' ? `${styles.active}` : ''}`}>
						<div className={`${styles.navElement}`}>
							<NewTicketIcon className={styles.navIcon} />
							<span className={styles.navText}>New Ticket</span>
						</div>
					</li>
				</Link>

				<div className={styles.devider}></div>

				<Link href={`/tickets/feedclosed?${QUERY_ORDER_BY}=${QUERY_CREATED_AT}`}>
					<li className={`${styles.navItem} ${router.pathname === '/tickets/feedclosed' ? `${styles.active}` : ''}`}>
						<div className={`${styles.navElement}`}>
							<ArchiveIcon className={styles.navIcon} />
							<span className={styles.navText}>Archived Tickets</span>
						</div>
					</li>
				</Link>

				<div className={styles.devider}></div>

				<Link href="/tickets/history">
					<li className={`${styles.navItem} ${router.pathname === '/tickets/history' ? `${styles.active}` : ''}`}>
						<div className={`${styles.navElement}`}>
							<HistoryIcon className={styles.navIcon} />
							<span className={styles.navText}>History</span>
						</div>
					</li>
				</Link>

				<div className={styles.devider}></div>
			</ul>
		</div>
	)
}

export default SideNav
