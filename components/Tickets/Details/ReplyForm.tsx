import { FunctionComponent, useState } from 'react'

import styles from './ReplyForm.module.css'

const ReplyForm: FunctionComponent<{ title: string; toggle: () => void; submit: (reply: string) => void }> = ({ title, toggle, submit }) => {
	const [input, setInput] = useState('')

	function onSubmitForm(e: React.FormEvent) {
		e.preventDefault()
		submit(input)
		toggle()
	}

	return (
		<div className={styles.replyDiv}>
			<form>
				<p className={styles.replyingInfo}>Replying to : <span className={styles.title}>{title}</span></p>
				<textarea className={styles.textArea} name="post" id="post" onChange={(event) => setInput(event.target.value)} value={input} />

				<button className={`btn btn-primary btn-cancel `} type="button" onClick={toggle}>
					Cancel
				</button>
				<button className={`btn btn-primary`} type="submit" onClick={onSubmitForm}>
					Submit
				</button>
			</form>
		</div>
	)
}

export default ReplyForm
