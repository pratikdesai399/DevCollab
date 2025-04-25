import { FunctionComponent } from "react";
import { getTimeAgo } from "../../../utils/date.util";
import { Answer } from "../tickets.model";

import styles from './TicketDetails.module.css'

const AnswerDisplay: FunctionComponent<{answer: Answer}> = ({answer}) => {
    const formatedDate = getTimeAgo(new Date(answer.date * 1000), false)
    const fullDate = getTimeAgo(new Date(answer.date * 1000), true)

    return(
        <div className={styles.answerDiv}>
            <p><span className={styles.author}>{answer.author}</span> replied</p>
            <p className={styles.createdDate}>{formatedDate} ({fullDate})</p>
            <p className={styles.message}>{answer.post}</p>
        </div>
    )
}

export default AnswerDisplay