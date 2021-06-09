import React, { useState } from 'react';
import '../Login/Lgin.css'
import '../ForgetPassword/Forgetpassword.css'
import * as firebase from "firebase/firebase";
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../Login/loginManager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignRight, faArrowRight, faBookReader, faChild, faCoffee, faGraduationCap, faHome, faQuran, faSchool, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faBuromobelexperte, faGoogle } from '@fortawesome/free-brands-svg-icons';


function Login() {
  const newaccountbtnlgin = () => {
    history.push('/login');
  }
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''

  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  }

  const fbSignIn = () => {
    handleFbSignIn()
      .then(res => {
        handleResponse(res, true);
      })

  }

  const signOut = () => {
    handleSignOut()
      .then(res => {
        handleResponse(res, false);
      })
  }

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  }

  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 5;
      const passwordHasNumber = /\d{0}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })
    }
    e.preventDefault();
  }

  const resetPassword = email => {
    var auth = firebase.auth();
    auth.sendPasswordResetEmail(email)
      .then(() => {
        alert('Please check the email by clicking OK')
      }).catch(function (error) {

      });
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '80px' }}>

      <br />
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}!</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }

      <h3 className="d-flex justify-content-center LginTitel">

        New password set form</h3>
      <form onSubmit={handleSubmit}>

        <br />
        <input className="contactinput1" type="text" name="email" onBlur={handleBlur} placeholder=" Your Email" />
        <br />



        <br />
        <input style={{ outline: 'none' }} onClick={() => resetPassword(user.email)} className="Contactb" type="submit" value={newUser ? 'সাইন আপ' : 'Click'} /> <br />
        {user.isSignedIn ? <button className="Contactbtn" onClick={signOut}>Sign Out</button> :
          <button style={{ outline: 'none' }} className="newaccountbtn" onClick={newaccountbtnlgin}> New account</button>
        }
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      { user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>}
    </div>
  );
}

export default Login;