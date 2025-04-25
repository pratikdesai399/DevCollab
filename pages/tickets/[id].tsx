import { NextPage } from "next";
import SideNav from "../../components/Tickets/SideNav/SideNav";
import TicketDetails from "../../components/Tickets/Details/TicketDetails";
import Nav from "../../components/Nav/Nav";

const TicketDetailPage: NextPage = () => {

    return (
        <>
            <Nav />
            <div className='wrapper'>
                <SideNav />
                <TicketDetails />
            </div>
        </>
    )
}

export default TicketDetailPage