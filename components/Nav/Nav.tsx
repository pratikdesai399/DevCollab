import Link from 'next/link'
import { useAppSelector } from '../../hooks'
import { logout } from '../../lib/firebase.service'

import LogoutIcon from '../../public/logout.svg'

import styles from './Nav.module.css'

export default function Nav() {
	const user = useAppSelector((state) => state.auth)

	async function handleLogout() {
		await logout()
	}

	return (
		<div className={styles.nav}>
			<div className={styles.logoDiv}>
				<h3 className={styles.expendedTitle}>DevCollab</h3>
			</div>
			<ul className={styles.linkList}>
				{!user.id && (
					<li>
						<Link href="/auth">Login</Link>
					</li>
				)}
				{user.id && <li>{user.username}</li>}
				{user.id && <li className={styles.logout} onClick={handleLogout}>Logout <LogoutIcon className={styles.logoutIcon} /></li>}
			</ul>
		</div>
	)
}
