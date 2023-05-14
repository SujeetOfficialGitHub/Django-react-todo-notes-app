import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import TodoNotesSlice from "./features/todoNotesSlice";
import todoNoteDetailSlice from "./features/todoNoteDetailSlice";
import searchSlice from "./features/searchSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        todoNotes: TodoNotesSlice,
        todoNoteDetail: todoNoteDetailSlice,
        searchTitle: searchSlice
    }
})

export default store