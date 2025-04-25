import { FunctionComponent } from "react";

import { useAppSelector } from '../../../hooks'
import HistoryItem from "./HistoryItem";

import styles from "./History.module.css"

const TicketsHistory: FunctionComponent = () => {
    const history = useAppSelector(state => state.tickets.history)

    const reversedHistory = history.slice().reverse()

    const historyItems = reversedHistory.map((element, index) => <HistoryItem key={index} historyElement={element} />)

    return(
        <div className="content-div">
            <div className='top-bar-background'>
                <div className='container'>
                    <div className='top-bar'>
                        <h3 className='page-title'>History</h3>
                    </div>
                </div>
            </div>
             <div className='container'>
                <div className={styles.historyTableDiv}>
                    {historyItems}
                </div>
             </div>
        </div>
    )
}

export default TicketsHistory