import { FunctionComponent, useEffect, useRef } from 'react'

import { useAppDispatch } from '../../../../hooks'
import { dropdownActions } from '../../../../store/dropdown'
import { QUERIES } from '../../../../utils/consts'

import DropdownItem from './dropdownItem'

import styles from './dropdown.module.css'

const DropdownMenu: FunctionComponent<{}> = () => {
	const ref = useRef<HTMLDivElement>(null)
	const dispatch = useAppDispatch()

	useEffect(() => {

		const handleClick = (e: any) =>{
			console.log(e)
			if (ref.current && !ref.current.contains(e.target)) {
				dispatch(dropdownActions.close())
			  }

		}

		document.addEventListener("mousedown", handleClick)

		return(() => {
			document.removeEventListener("mousedown", handleClick)
		})
	}, [ref, dispatch])

	const queriesItems = QUERIES.map((query, index) => <DropdownItem key={index} sort={query} />)

	return (
		<div ref={ref} className={styles.dropdown}>
			<div className={styles.menu}>
				{queriesItems}
			</div>
		</div>
	)
}

export default DropdownMenu