import React from 'react'
import homeImage from '../../assets/homeImage.jpg';
import { Image } from 'react-bootstrap';
import classes from './Home.module.css'
import { useSelector } from 'react-redux';
const Home = () => {
  const token = useSelector(state => state.auth.token)
  return (
    <div className={classes.home}>
      {!token && 
      <h3 className={classes.message}>
        Welcome to our TODO NOTES APP <br />
        Please login to get option for add and view notes
      </h3>}
      <Image src={homeImage} />
    </div>
  )
}

export default Home