// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from 'firebase/auth'
import {
	getFirestore,
	collection,
	getDocs,
	setDoc,
	doc,
	getDoc,
	updateDoc,
	arrayUnion,
	deleteDoc,
} from 'firebase/firestore/lite'
import { HistoryElem } from '../components/Tickets/History/history.model'

import { Answer, Ticket, TicketChanges } from '../components/Tickets/tickets.model'
import { historyConverter, ticketConverter } from '../utils/firestore-converters'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: 'G-24XB66C4ED',
}

// Initialize Firebase
// const app = initializeApp(firebaseConfig)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const db = getFirestore(app)
const auth = getAuth(app)
// const analytics = getAnalytics(app);

const historyDocId = "N4mNDv3i9zTrBp1OelxB"

const ticketsCollec = collection(db, 'tickets').withConverter(ticketConverter)
const historyDoc = doc(collection(db, "history"), historyDocId).withConverter(historyConverter)

//=== Tickets functions
export async function getTicketsFromDatabase() {	
	const querySnapshot = await getDocs(ticketsCollec)
	const result = querySnapshot.docs.map((doc) => doc.data())
	return result
}

export async function getHistoryFromDatabase(){
	const docSnap = await getDoc(historyDoc)
	if(docSnap.exists()){
		return docSnap.data()
	} else {
		return null
	}
}

export async function getTicket(id: string){
	const docSnap = await getDoc(doc(ticketsCollec, id))
	if(docSnap.exists()){
		return docSnap.data()
	} else {
		return null
	}
}

export async function postTicket(ticket: Ticket, historyElem: HistoryElem) {
	const writeDoc =  setDoc(doc(ticketsCollec, ticket.id), ticket)
	const updateHistory = updateDoc(historyDoc, {
		history: arrayUnion(historyElem)
	})
	await Promise.all([writeDoc, updateHistory])
}

export async function addAnswerToTicket(id: string, answer: Answer, historyElem: HistoryElem){
	const ticketRef = doc(ticketsCollec, id)
	const addAnswer = updateDoc(ticketRef, {
		answers: arrayUnion(answer),
		last_updated_date: answer.date
	})
	const updateHistory = updateDoc(historyDoc, {
		history: arrayUnion(historyElem)
	})
	await Promise.all([addAnswer, updateHistory])
}

export async function updateTicket(id: string, changes: TicketChanges, historyElem: HistoryElem){
	const ticketRef = doc(ticketsCollec, id)
	const updateTicketPromise= updateDoc(ticketRef, changes)
	const updateHistory = updateDoc(historyDoc, {
		history: arrayUnion(historyElem)
	})
	await Promise.all([updateTicketPromise, updateHistory])
}

export async function deleteTicket(id: string, historyElem: HistoryElem){
	const ticketRef = doc(ticketsCollec, id)
	const deleteTicket =  deleteDoc(ticketRef)
	const updateHistory = updateDoc(historyDoc, {
		history: arrayUnion(historyElem)
	})
	await Promise.all([deleteTicket, updateHistory])
}


//===Auth functions
//? comment gerer le return quand fail en returnant une falsy value + error info (pour manage l'UX en fonction de l'error) ?
export async function signUpUserWithUsername(
	email: string,
	password: string,
	username: string
) {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		)
		const user = userCredential.user

		try {
			await updateProfile(user, {
				displayName: username,
			})
		} catch (error: any) {
			console.log(error.message)
		}

		return user
	} catch (error: any) {
		console.log(error.message)
		return null
	}
}

export async function signInUser(email: string, password: string) {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		)
		const user = userCredential.user

		return user
	} catch (error: any) {
		console.log(error.message)
		return null
	}
}

export async function logout() {
	try {
		signOut(auth)
	} catch (error) {
		console.log(error)
	}
}

export { auth }
