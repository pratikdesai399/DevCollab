import { FunctionComponent } from 'react'
import DropdownMenu from './Dropdown/dropdownMenu'
import DropdownToggler from './Dropdown/dropdownToggler'

import styles from './Filter.module.css'

const Filter: FunctionComponent<{isOpenTicketsFeed: boolean}> = ({isOpenTicketsFeed}) => {

	return (
		<div className={styles.filterDiv}>
			<p>Sort by : </p>
			<DropdownToggler isOpenTicketsFeed={isOpenTicketsFeed}>
				<DropdownMenu />
			</DropdownToggler>
		</div>
	)
}

export default Filter
