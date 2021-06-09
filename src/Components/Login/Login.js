import React, { useState } from 'react';
import './Lgin.css'
import { useContext } from 'react';
import { UserContext } from '../../App';
import * as firebase from "firebase/firebase";
import "firebase/auth";
import firebaseConfig from '../Login/firebase.config';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './loginManager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignRight, faArrowRight, faBookReader, faChild, faCoffee, faGraduationCap, faHome, faQuran, faSchool, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faBuromobelexperte, faGoogle } from '@fortawesome/free-brands-svg-icons';


function Login() {
  const resatpasswordbtn = () => {
    history.push('/resetpassword');
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
  let { from } = location.state || { from: { pathname: "/registration" } };

  const googleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
      const { displayName, email } = result.user;
      const sinedInUser = { name: displayName, email }
      setLoggedInUser(sinedInUser);
      history.push('/registration');

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
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



  return (
    <div style={{ textAlign: 'center', marginTop: '74px' }}>

      <br />


      <h3 className="d-flex justify-content-center LginTitel">
        Create an account or log in</h3>
      <form onSubmit={handleSubmit}>
        {newUser && <input className="contactinput1" name="name" type="text" onBlur={handleBlur} placeholder=" Your name" />}
        <br />
        <input className="contactinput1" type="text" name="email" onBlur={handleBlur} placeholder=" Your Email" />
        <br />
        <input className="contactinput1" type="password" name="password" onBlur={handleBlur} placeholder=" Six digit password" /> <br />
        <button style={{ outline: 'none' }} htmlFor="newUser" className="Co" onClick={resatpasswordbtn}>Reset Password</button>
        <button style={{ outline: 'none' }} htmlFor="newUser" className="Contact" onClick={() => setNewUser(!newUser)} name="newUser" id="">New Account</button>
        <br />
        <input className="Contactb" type="submit" value={newUser ? 'Create Account' : 'Log-In'} /> <br />

      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      { user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>}
    </div>
  );
}

export default Login;