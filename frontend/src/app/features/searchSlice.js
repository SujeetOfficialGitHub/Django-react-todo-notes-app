import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        title: ''
    },
    reducers: {
        searchByTitle(state, action){
            // console.log(action)
            state.title = action.payload
        }
    }

})

export const searchActions = searchSlice.actions
export default searchSlice.reducer;