import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Get Single Todo notes 
export const singleTodoNote = createAsyncThunk('todoNotes/singleTodoNote', async({token, slug}) => {
    try{
        const res = await axios.get(`/api/todonotes/${slug}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return res.data
    }catch(error){
        console.log(error)
    }
} )

const TodoNoteDetailSlice = createSlice({
    name: 'TodoNotes',
    initialState: {
        singleTodoNoteItem : {},
        loading: false,
        errors: '',
        message: ''
    },
    extraReducers: (builder) => {
        builder
            // single todo notes 
            .addCase(singleTodoNote.pending, (state) => {
                state.loading = true
            })
            .addCase(singleTodoNote.fulfilled, (state, action) => {
                state.loading = false;
                state.singleTodoNoteItem = action.payload
                
            })
            .addCase(singleTodoNote.rejected, (state, action) => {
                state.loading = false;
                console.log(action)
            })
    }
})

export default TodoNoteDetailSlice.reducer