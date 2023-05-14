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

// Post request
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
        return rejectWithValue(error.response.data.errors)
    }
} )

// Delete request 
export const deleteTodoNote = createAsyncThunk('todoNotes/deleteTodoNote', async({token, slug}, {rejectWithValue}) => {
    try{
        const res = await axios.delete(`/api/todonotes/${slug}/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return res.data
    }catch(error){
        return rejectWithValue(error.response.data.errors)
    }
} )

// Put request 
export const updateTodoNote = createAsyncThunk('todoNotes/updateTodoNote', async({token, editId, enteredData}, {rejectWithValue}) => {
    try{
        const res = await axios.put(`/api/todonotes/${editId}/`, enteredData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return res.data
    }catch(error){
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
            .addCase(allTodoNotes.pending, (state) => {
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
                state.todoNotesList = [action.payload, ...state.todoNotesList]
                state.message = "Notes Added Successfully"
            })
            .addCase(addTodoNotes.rejected, (state, action) => {
                state.loading = false;
                console.log(action)
            })
            
            // Delete todo notes 
            .addCase(deleteTodoNote.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteTodoNote.fulfilled, (state, action) => {
                state.loading = false;
                state.todoNotesList = state.todoNotesList.filter(item => item.slug !== action.payload.slug)

            })
            .addCase(deleteTodoNote.rejected, (state, action) => {
                state.loading = false;
                console.log(action)
            })

            // Update todo notes 
            .addCase(updateTodoNote.pending, (state) => {
                state.loading = true
            })
            .addCase(updateTodoNote.fulfilled, (state, action) => {
                state.loading = false;
                let updatedState = state.todoNotesList.map(item => {
                    if (item.id === action.payload.id){
                        return action.payload
                    }else{
                        return item
                    }
                })
                state.todoNotesList = updatedState

            })
            .addCase(updateTodoNote.rejected, (state, action) => {
                state.loading = false;
                console.log(action)
            })
    }
})

export default TodoNotesSlice.reducer