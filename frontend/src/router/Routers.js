import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import NoMatch from '../pages/noMatch/NoMatch';
import { useSelector } from 'react-redux';
import AddViewNotes from '../pages/add&viewnotes/AddViewNotes';
import SingleTodoNote from '../pages/singleTodonote/SingleTodoNote';
const Routers = () => {
  const isLoggedIn = useSelector(state => state.auth.token)
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/add-view-notes' element={isLoggedIn ? <AddViewNotes/> : <Home/>} />
        <Route path='/add-view-notes/:slug' element={isLoggedIn ? <SingleTodoNote/> : <Home/>} />
        <Route path='*' element={<NoMatch/>} />
    </Routes>
  )
}

export default Routers