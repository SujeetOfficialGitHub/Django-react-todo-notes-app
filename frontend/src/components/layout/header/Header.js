import React, { useState } from 'react'
import classes from './Header.module.css'
import { Link, NavLink } from 'react-router-dom'
import {AiOutlineMenu} from 'react-icons/ai'
import {ImCancelCircle} from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux'
import { AuthActions } from '../../../app/features/authSlice'
import { searchActions } from '../../../app/features/searchSlice'

const Header = (props) => {
    const [openNav, setOpenNav] = useState(false)
    const [searchByTitle, setSearchByTitle] = useState('')

    const isLoggedIn = useSelector(state => state.auth.token);

    const dispatch = useDispatch()

    const openNavbarHandler = () => {
        setOpenNav(true)
    }
    const closeNavbarHandler = () => {
        setOpenNav(false)
    }
    const logoutHandler = () => {
        dispatch(AuthActions.logout())
    }
    const searchTitleHandler = (e) => {
        setSearchByTitle(e.target.value)
        dispatch(searchActions.searchByTitle(e.target.value))
    }
  return (
    <header className={classes.header}>
        <Link to="/" className={classes.logo}>TODONotes</Link>

        <form className={classes['search-form']}>
            <input type="search" value={searchByTitle} onChange={searchTitleHandler} placeholder='Search title here...' />
        </form>

        <nav className={`${classes.nav} ${openNav ? classes['nav-toggle'] : ''}`}>
            <NavLink to="/">Home</NavLink>
            {isLoggedIn && <NavLink to="/add-view-notes">Add&View</NavLink>}
            {!isLoggedIn && <button onClick={props.openLoginFormHandler}>Login</button>}
            {!isLoggedIn && <button onClick={props.openSignupFormHandler}>Signup</button>}
            {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
        </nav>
        {openNav ?
            <ImCancelCircle className={classes['close-menu']} onClick={closeNavbarHandler} />
            : <AiOutlineMenu className={classes['open-menu']} onClick={openNavbarHandler} />
        }
    </header>
  )
}

export default Header