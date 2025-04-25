import { NextPage } from 'next'
import Nav from '../../components/Nav/Nav'
import TicketsFeed from '../../components/Tickets/Feed/TicketsFeed'
import SideNav from '../../components/Tickets/SideNav/SideNav'

const Tickets: NextPage = () => {

	return (
		<>
			<Nav />
			<div className='wrapper'>
				<SideNav />
				<TicketsFeed isOpenTicketsFeed={false} />
			</div>
		</>
	)
}

export default Tickets