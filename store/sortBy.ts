import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialSortState = 'created_at'

const sortBySlice = createSlice({
    name: 'sortBy',
    initialState: initialSortState,
    reducers: {
        set(state, action: PayloadAction<string>){
            return action.payload
        }
    }
})

export default sortBySlice.reducer
export const sortByActions = sortBySlice.actions