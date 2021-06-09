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

        </Switch>

      </Router>
    </UserContext.Provider>
  );
}

export default App;