import { useRouter } from 'next/router'
import { FunctionComponent, useState } from 'react'

import { signInUser, signUpUserWithUsername } from '../../lib/firebase.service'

import styles from './Auth.module.css'

const AuthForm: FunctionComponent = () => {
	const [isLogin, setIsLogin] = useState(true)
	const [formInputs, setFormInputs] = useState({
		username: '',
		email: '',
		password: '',
		repeatPassword: '',
	})

	const router = useRouter()

	function onInputChange(
		event:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>,
		inputName: string
	) {
		const newInput = event.target.value

		setFormInputs((prevInputs) => ({ ...prevInputs, [inputName]: newInput }))
	}

	async function onSubmitForm(event: React.FormEvent) {
		event.preventDefault()

		const { username, email, password, repeatPassword } = formInputs

		if (isLogin) {
			const response = await signInUser(email, password)
			if (!response) {
			} else {
				resetForm()
			}
		} else {
			signUpUserWithUsername(email, password, username)
			resetForm()
		}
	}

	function onSwitchAuthtype() {
		setIsLogin((prevType) => !prevType)
		resetForm()
	}

	function resetForm() {
		setFormInputs({
			username: '',
			email: '',
			password: '',
			repeatPassword: '',
		})
	}

	return (
		<>
			<h3 className={styles.title}>DevCollab</h3>
			<form className={styles.form}>
				<div className={styles.inputsDiv}>
					{!isLogin && (
						<div className={styles.textField}>
							<input
								type="text"
								name="username"
								id="username"
								required
								placeholder="Username"
								onChange={(event) => onInputChange(event, 'username')}
								value={formInputs.username}
							/>
							<span></span>
						</div>
					)}

					<div className={styles.textField}>
						<input
							type="email"
							name="email"
							required
							placeholder="Email"
							id="email"
							onChange={(event) => onInputChange(event, 'email')}
							value={formInputs.email}
							/>
						<span></span>
					</div>

					<div className={styles.textField}>
						<input
							name="password"
							id="password"
							type="password"
							placeholder="Password"
							required
							onChange={(event) => onInputChange(event, 'password')}
							value={formInputs.password}
						/>
						<span></span>
					</div>

					{!isLogin && (
						<div className={styles.textField}>
							<input
								name="repeat-password"
								id="repeat-password"
								type="password"
								required
								placeholder="Repeat password"
								onChange={(event) =>
									onInputChange(event, 'repeatPassword')
								}
								value={formInputs.repeatPassword}
							/>
							<span></span>
						</div>
					)}
				</div>

				<button className={`btn ${styles.btn}`} type="submit" onClick={onSubmitForm}>
					{isLogin ? 'Login' : 'Signup'}
				</button>
				<div className={styles.switchText}>

						{isLogin
							? 'Already have an account ?'
							: "Don't have an account yet ?"}
						<button
							type="button"
							className={styles.link}
							onClick={onSwitchAuthtype}
						>
							{isLogin ? 'Signup' : 'Login'}
						</button>
				</div>
			</form>
		</>
	)
}

export default AuthForm
