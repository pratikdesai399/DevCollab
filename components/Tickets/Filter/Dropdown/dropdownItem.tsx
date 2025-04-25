import { FunctionComponent } from 'react'

import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { sortByActions } from '../../../../store/sortBy'
import { dropdownActions } from '../../../../store/dropdown'
import { displaySortBy } from '../../../../utils/sortDisplay'
import Checkmark from '../../../../public/check-mark.svg'

import styles from './dropdown.module.css'

const DropdownItem: FunctionComponent<{ sort: string }> = ({ sort }) => {
	const currentSort = useAppSelector(state => state.sortBy)
	const dispatch = useAppDispatch()
	function handleClick() {
		dispatch(dropdownActions.toggle())
		dispatch(sortByActions.set(sort))
	}

	const isCurrentActive = (currentSort === sort)

	const sortDisplay = displaySortBy(sort)

	const activeClass = isCurrentActive ? styles.active : ''

	return (
		<a className={`${styles.item} ${activeClass}`} onClick={handleClick}>
			<span className={styles.sortText}>{sortDisplay}</span>
			{isCurrentActive && <Checkmark className={styles.checkmark} height={10} width={10}/>}
		</a>
	)
}

export default DropdownItem