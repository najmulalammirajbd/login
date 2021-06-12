import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Login from '../src/Components/Login/Login';
import { createContext } from 'react';

import Registration from './Components/Registration/Registration';

import Forgetpassword from './Components/ForgetPassword/Forgetpassword';
import Pay from './Components/Pay/Pay';
import About from './Components/About/About';
import Redy from './Components/Redy/Redy';

export const UserContext = createContext();

function App(props) {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>

        <Switch>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/home">
            <Login />
          </Route>
          <Route path="/resetpassword">
            <Forgetpassword />
          </Route>
          <PrivateRoute path="/registration">
            <Registration />
          </PrivateRoute>
          <PrivateRoute path="/pay">
            <Pay />
          </PrivateRoute>
          <PrivateRoute path="/redy">
            <Redy />
          </PrivateRoute>
          <Route path='/about'>
            <About></About>
          </Route>
        </Switch>

      </Router>
    </UserContext.Provider>
  );
}

export default App;