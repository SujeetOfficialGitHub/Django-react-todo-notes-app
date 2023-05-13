import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import Contact from '../pages/contact/Contact'
import NoMatch from '../pages/noMatch/NoMatch';
const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='*' element={<NoMatch/>} />
    </Routes>
  )
}

export default Routers