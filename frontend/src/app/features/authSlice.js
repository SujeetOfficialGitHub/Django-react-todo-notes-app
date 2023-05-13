import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'

export const signup = createAsyncThunk('auth/signup', async({enteredData}, {rejectWithValue}) => {
    try{
        const res = await axios.post(`/api/accounts/register/`, enteredData)
        return res.data
    }catch(error){
        return rejectWithValue(error.response.data.errors)
    }
});

export const login = createAsyncThunk('auth/login', async({enteredData}, {rejectWithValue}) => {
    try{
        const res = await axios.post(`/api/accounts/login/`, enteredData)
        return res.data
    }catch(error){
        return rejectWithValue(error.response.data.errors)
    }
});

const authInitialState = {
    token : localStorage.getItem('token') ? localStorage.getItem('token') : '',

};
const AuthSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    loading: false,
    errors: '',
    message: '',
    reducers: {
        resetState: (state) => {
            state.errors = '';
            state.message = '';
        },
        logout: (state) => {
            state.token = ''
            localStorage.removeItem('token')
        }

    },
    extraReducers: (builder) => {
        builder
            // Signup states 
            .addCase(signup.pending, (state, action) => {
                state.loading = true
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false
                state.message = action.payload.message
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload
                console.log(action)
            })

            // Login states 
            .addCase(login.pending, (state, action) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.message = action.payload.message
                state.token = action.payload.token.access
                localStorage.setItem('token',action.payload.token.access)
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload
                console.log(action)
            })
    }
})

export const AuthActions = AuthSlice.actions;
export default AuthSlice.reducer