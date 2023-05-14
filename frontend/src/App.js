import './App.css';
import Header from './components/layout/header/Header';
import Routers from './router/Routers';
import Login from './components/layout/login/Login';
import Signup from './components/layout/signup/Signup';
import { useState} from 'react';
import Footer from './components/layout/footer/Footer';

function App() {
  const [openLoginForm, setOpenLoginForm] = useState(false)
  const [openSignupForm, setOpenSignupForm] = useState(false)
  const openLoginFormHandler = () => {
    setOpenLoginForm(true)
  }
  const closeLoginFormHandler = () => {
    setOpenLoginForm(false)
  }
  const openSignupFormHandler = () => {
    setOpenSignupForm(true)
  }
  const closeSignupFormHandler = () => {
    setOpenSignupForm(false)
  }
  return (
    <>
      {openLoginForm && <Login closeLoginFormHandler={closeLoginFormHandler}/>}
      {openSignupForm && <Signup closeSignupFormHandler={closeSignupFormHandler} />}
      <Header 
        openLoginFormHandler={openLoginFormHandler}
        openSignupFormHandler={openSignupFormHandler}
      />
      <Routers/>
      <Footer />
    </>
  );
}

export default App;
