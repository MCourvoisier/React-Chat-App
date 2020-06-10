import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from 'axios';
import logoImg from "./images/logo.png";
import Cookies from "js-cookie";
import { Card, Logo, Form, Input, Button, Error } from "./components/login_components";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  handleSubmit(event) {
    axios.post('/signup_request', {
      email: this.state.email,
      password: this.state.password,
    }).then(res => {
      if(res.data == true) {
        //Cookie should be more complex than this but it'll do for now (terrible security)
        Cookies.set('email', this.state.email, { expires: 1 });
        window.location.reload();
      }
      else
        alert('Invalid credentials');

    }).catch(err => console.log(err));
  }
  

  render() {

    //Rework this with private routes
     if(typeof Cookies.get("email") !== "undefined"){
        return(<Redirect to="/manager" />);
     }

    return(
        <Card >
          <Logo src={logoImg} />
          <Form>

            <Input
              type="text"
              name="email"
              value={this.state.email}
              placeholder="email"
              onChange={this.handleChange}
            />

            <Input
              type="text"
              name="password"
              value={this.state.password}
              placeholder="password"
              onChange={this.handleChange}
            />
            <Button onClick={this.handleSubmit}>Sign Up</Button>
          </Form>
          <Link to="/login">Have an account?</Link>
            
        </Card>
      )
  }
}

export default Login


