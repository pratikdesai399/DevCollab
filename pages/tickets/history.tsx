import { NextPage } from "next";
import Nav from '../../components/Nav/Nav'
import TicketsHistory from "../../components/Tickets/History/TicketsHistory";
import SideNav from "../../components/Tickets/SideNav/SideNav";

const History : NextPage = () => {

    return(
        <>
            <Nav />
            <div className='wrapper'>
                <SideNav />
                <TicketsHistory />
            </div>
        </>
    )
}

export default History