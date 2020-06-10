import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import logoImg from "./images/logo.png";
import Cookies from "js-cookie";
import { Card, Logo, Form, Input, Button, Error } from "./components/login_components";

export class Logout extends React.Component {

	  constructor(props) {
	    super(props);
	    this.logout = this.logout.bind(this);
	  }

	 logout() {
	    Cookies.remove("email");
	  }

	  render() {
	    return(
	    	<div id="container">
	    		<Link to = '/login'>
		        	<button onClick={this.logout}> logout </button>
		        </Link>
		        <Link to = '/manager'>
		        	<button> manager </button>
		        </Link>
	        </div>
	      )
	  }
}


export default Logout







