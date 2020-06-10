import React, { Component } from 'react'
import axios from 'axios'
import _ from 'lodash'
import Cookies from "js-cookie";
import { Link, Redirect } from 'react-router-dom';
import Logout from './logout'


export class RoomManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderThreads = this.renderThreads.bind(this);
    this.remove = this.remove.bind(this);
  }

  handleSubmit(event) {
    axios.post(`/get_rooms`, {
      key: Cookies.get("email"),
    }).then(res => {
        this.setState(
          { matches: res.data})
      }).catch(err => console.log(err));
    event.preventDefault();
  }


  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }


  renderThreads() {
    return _.map(this.state.matches, item => {
      return (
        <li className ="thread-match" key={item.room_id}>
        <Link to={'/room/' +item.room_id }>{item.room_id}</Link>
        <button id={item.room_id} onClick={this.remove}>
          Remove
        </button>
        </li>
        );
    });
  }

  remove(e) {
    console.log("etarg", e.target.id)
    axios.post('/delete_room', {
      email: Cookies.get("email"),
      key: e.target.id,
    })

    let filteredArray = this.state.matches.filter(item => item.room_id !== e.target.id)
    console.log('filtered:', filteredArray);
    this.setState({matches: filteredArray});
    this.renderThreads()
  }

  render() {
    return (
    <div>

      <form onSubmit={this.handleSubmit}>
        <input type="submit" value="View Rooms" />
      </form>
      <ul className = "thread-list">
        {this.renderThreads()}
      </ul>

      <Result />
      
      </div>
    );
  }
}

class Result extends React.Component {
  render() {
    return (
      <div> </div>
    );
  }
}

export default RoomManager


