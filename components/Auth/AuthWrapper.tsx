import { onAuthStateChanged } from "firebase/auth";
import { FunctionComponent, useEffect } from "react";
import { useRouter } from "next/router";

import { useAppDispatch } from "../../hooks";
import { authActions } from "../../store/auth";
import { auth } from '../../lib/firebase.service'


const AuthWrapper: FunctionComponent<{ children: JSX.Element[] | JSX.Element }> = (props) =>{
    const dispatch = useAppDispatch()
	const router = useRouter()

	useEffect(() => {
		const publicPathnames = ['/', '/auth']

		onAuthStateChanged(auth, (user) => {
			if (user) {
				const userInfos = { username: user.displayName, id: user.uid }
				dispatch(authActions.login(userInfos))

				if(publicPathnames.includes(router.pathname)){
					router.replace('/tickets/feedopen?orderBy=created_at')
				}
			} else {
				dispatch(authActions.logout())
				
				if(!publicPathnames.includes(router.pathname)){
					router.replace('/')
				}
			}
		})
	}, [dispatch, router])
    return <>{props.children}</>
}

export default AuthWrapper