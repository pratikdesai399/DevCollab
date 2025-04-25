import { createSlice } from "@reduxjs/toolkit"
const initialDropdownState = false
const dropdownSlice = createSlice({
    name: 'dropdown',
    initialState: initialDropdownState,
    reducers: {
        toggle(state){
            return !state
        },
        close(state){
            return false
        }
    }
})

export default dropdownSlice.reducer
export const dropdownActions = dropdownSlice.actions