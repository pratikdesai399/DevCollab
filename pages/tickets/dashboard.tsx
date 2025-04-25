import { NextPage } from "next";
import Nav from "../../components/Nav/Nav";
import TicketsDashboard from "../../components/Tickets/Dashboard/TicketsDashboard";
import SideNav from "../../components/Tickets/SideNav/SideNav";

const Dashboard: NextPage = () => {

    return(
        <>
            <Nav />
            <div className='wrapper'>
                <SideNav />
                <TicketsDashboard />
            </div>
        </>
    )
}

export default Dashboard