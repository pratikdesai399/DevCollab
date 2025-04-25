import { FunctionComponent } from "react";

import AuthForm from "./AuthForm";

import styles from "./Auth.module.css"

const Auth: FunctionComponent = () => {

    return(
        <div className={styles.wrapperDiv}>
            <div className={styles.card}>
                <AuthForm />
            </div>
        </div>
        
    )
}

export default Auth