import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import TodoNotesSlice from "./features/todoNotesSlice";
import todoNoteDetailSlice from "./features/todoNoteDetailSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        todoNotes: TodoNotesSlice,
        todoNoteDetail: todoNoteDetailSlice
    }
})

export default store