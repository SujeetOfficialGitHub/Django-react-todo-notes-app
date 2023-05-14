import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import TodoNotesSlice from "./features/todoNotesSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        todoNotes: TodoNotesSlice
    }
})

export default store