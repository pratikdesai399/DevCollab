import { useRouter } from 'next/router'
import { FunctionComponent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks'

import { sortByActions } from '../../../../store/sortBy'
import { displaySortBy } from '../../../../utils/sortDisplay'
import Caret from '../../../../public/caret.svg'

import styles from './dropdown.module.css'
import { dropdownActions } from '../../../../store/dropdown'

const DropdownToggler: FunctionComponent<{ isOpenTicketsFeed: boolean, children?: JSX.Element[] | JSX.Element }> = (props) => {
	const [isMounted, setIsMounted] = useState(false)
	const sortBy = useAppSelector(state => state.sortBy)
	const open = useAppSelector(state => state.dropdown)
	const router = useRouter()
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (isMounted) {
			const currentQuery = router.query.orderBy
			if (sortBy !== currentQuery) {
				const feedUrl = props.isOpenTicketsFeed ? '/tickets/feedopen' : '/tickets/feedclosed'
				router.push(`${feedUrl}?orderBy=${sortBy}`)
			}
		} else {
			setIsMounted(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sortBy])

	useEffect(() => {
		if (router.isReady) {
			if (router.query.orderBy && !Array.isArray(router.query.orderBy)) dispatch(sortByActions.set(router.query.orderBy))
		}
	}, [router.isReady, dispatch, router.query.orderBy])

	const sortByDisplay = displaySortBy(sortBy)

	return (
		<div className={styles.togglerDiv}>
			<button className={`btn ${styles.togglerBtn}`} onClick={() => dispatch(dropdownActions.toggle())}>
				{`${sortByDisplay} `}
				<Caret height={9} width={9} />
			</button>
			{open && props.children}
		</div>
	)
}

export default DropdownToggler
