import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const allTodoNotes = createAsyncThunk('todoNotes/allTodoNotes', async({token}) => {
    try{
        const res = await axios.get('/api/todonotes/', {
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

export const addTodoNotes = createAsyncThunk('todoNotes/addTodoNotes', async({token, enteredData}, {rejectWithValue}) => {
    try{
        const res = await axios.post('/api/todonotes/',enteredData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return res.data
    }catch(error){
        console.log(error)
        return rejectWithValue(error.response.data.errors)
    }
} )

const TodoNotesSlice = createSlice({
    name: 'TodoNotes',
    initialState: {
        todoNotesList : [],
        loading: false,
        errors: '',
        message: ''
    },
    extraReducers: (builder) => {
        builder
            // Fetch all todo notes 
            .addCase(allTodoNotes.pending, (state, action) => {
                state.loading = true
            })
            .addCase(allTodoNotes.fulfilled, (state, action) => {
                state.loading = false;
                state.todoNotesList = action.payload
            })
            .addCase(allTodoNotes.rejected, (state, action) => {
                state.loading = false;
                console.log(action)
            })
            
            // Add todo notes 
            .addCase(addTodoNotes.pending, (state, action) => {
                state.loading = true
            })
            .addCase(addTodoNotes.fulfilled, (state, action) => {
                state.loading = false;
                state.todoNotesList = [...state.todoNotesList, action.payload]
                state.message = "Notes Add Successfully"
            })
            .addCase(addTodoNotes.rejected, (state, action) => {
                state.loading = false;
                console.log(action)
            })
    }
})

export default TodoNotesSlice.reducer