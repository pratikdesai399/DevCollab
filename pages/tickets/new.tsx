import { NextPage } from "next";
import Nav from '../../components/Nav/Nav'
import SideNav from "../../components/Tickets/SideNav/SideNav";
import NewTicketForm from "../../components/Tickets/NewTicketForm";

const NewTicket: NextPage = () => {
    return (
        <>
            <Nav />
            <div className='wrapper'>
                <SideNav />
                <NewTicketForm />
            </div>
        </>
    )
}

export default NewTicket