import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'
import ticketsReducer from './tickets'
import sortByReducer from './sortBy'
import dropdownReducer from './dropdown'

const store = configureStore({
	reducer: {
		tickets: ticketsReducer,
        auth: authReducer,
		sortBy: sortByReducer,
		dropdown: dropdownReducer
	},
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch