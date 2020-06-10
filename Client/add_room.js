import React, { Component } from 'react'
import axios from 'axios'
import Cookies from "js-cookie";
import Logout from './logout'
import { Link, Redirect } from "react-router-dom";


export class AddRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.publish = this.publish.bind(this)
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  handleSubmit(event) {
    axios.post('/add_room', {
      email: Cookies.get("email"),
      key: this.state.room,
    }).catch(err => console.log(err));
  }

    alert("Room added!");
    event.preventDefault();
  }

  publish() {
    alert(this.state.thread)
  }

  render() {

    //Redirect to login if cookie doesn't exist
    //Rework with private routes later
    if(typeof Cookies.get("email") === "undefined"){
        return(<Redirect to="/login" />);
     }

    return (
      <div>
     <div style = {{float:'right'}}>
            <Logout></Logout>
        </div>
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" name="room" placeholder="Enter Room Name" value={this.state.room} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Add Room" />
      </form>
      </div>
    );
  }
}

export default AddRoom


