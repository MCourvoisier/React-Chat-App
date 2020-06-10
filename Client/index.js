import React, {Component, useState} from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Testform from './testform'
import Login from "./login";
import Signup from "./signup"
import Main from "./main"
import AddRoom from "./add_room"
import Logout from "./logout"
import CheckThreads from "./room_manager";

import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';


//Rework these routes using Private routes and better authentication/cookies
ReactDOM.render((
  <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/room/:id" component={Main} />

        <Route path="/manager" render={props =>
        	<div>
        		<AddRoom />
        		<CheckThreads/>
        	</div>
        } />

        <Route path='*' component={Login}/>
      </Switch>
  </BrowserRouter>


),
document.getElementById('root'));



