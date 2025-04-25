import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
	username: null | string
	id: null | string
}

const initialAuthState: AuthState = {username: null, id: null}

const authSlice = createSlice({
	name: 'auth',
	initialState: initialAuthState,
	reducers: {
		login(state, action: PayloadAction<AuthState>) {
			return action.payload
		},
		logout(state) {
			return initialAuthState
		},
	},
})

export default authSlice.reducer
export const authActions = authSlice.actions