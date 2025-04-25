import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent, useState } from "react";
import { signInUser } from "../../lib/firebase.service";

import styles from "./Landing.module.css"

const Landing: FunctionComponent = () => {
    const [isLoggingIn, setIsLoggingIn] = useState(false)

    const router = useRouter()

    async function loginDemo(){
        const demoEmail = 'pratikdesai399@gmail.com'
        const demoPassword = 'Password'
        setIsLoggingIn(true)
        const response = await signInUser(demoEmail, demoPassword)
        setIsLoggingIn(false)
			if (!response) {
			} else {
				router.push('/tickets/feedopen?orderBy=created_at')
			}
    }

    return(
        <div className={styles.wrapperDiv}>
            <div className={styles.card}>
                <h1 className={styles.logoTitle}>DevCollab</h1>
                <p className={styles.description}>DevCollab is a project managing web application.</p>
                <button className={`btn ${styles.btn} ${styles.btnDemo}`} onClick={loginDemo}>{isLoggingIn ? 'Logging In..' : 'Try as Demo User'}</button>
                <Link href='/auth'>
                    <button className={`btn ${styles.btn} ${styles.btnAuth}`}>Login / Signup</button>
                </Link>
            </div>
        </div>
    )
}

export default Landing