import React from "react";
import io from "socket.io-client";
import Cookies from "js-cookie";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import "./main.css"
import Logout from "./logout"


class Main extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: [],
            usernames: []
        };


        //this.socket = io('localhost:8000');
        this.socket = io();

        this.socket.on('RECEIVE_MESSAGE', function(data){
            add_message(data);
        });

        const add_message = data => {
            this.setState({messages: [...this.state.messages, data]});
        };

        this.send_message = e => {
            e.preventDefault();

            //Send message via socket.io
            this.socket.emit('SEND_MESSAGE', {
                username: Cookies.get("email"),
                message: this.state.message
            })

            //Add post to history
            axios.post(`/send_history`, {
              key: this.props.match.params.id,
              username: Cookies.get("email"),
              message: this.state.message
            })


            this.setState({message: ''});

        }


    this.fetch_history = e => {
        axios.post(`/fetch_history`, {
          key: this.props.match.params.id,
        }).then(res => {
            this.setState(
                {messages: res.data})
          }).catch(err => console.log(err));
        e.preventDefault();
      }
    }


//Fetches chat logs on load
    componentDidMount(){
        axios.post(`/fetch_history`, {
          key: this.props.match.params.id,
        }).then(res => {
            this.setState(
                {messages: res.data})
          }).catch(err => console.log(err))
    }



    render(){

        if(typeof Cookies.get("email") === "undefined"){
            return(<Redirect to="/login" />);
         }

        return (
            <div className="container">
            <div style = {{float:'right'}}>
                <Logout></Logout>
            </div>

                <div className="row">
                    <div className="col-4">
                        <div classsName="card">
                            <div className="card-body">
                                <div className="card-title">ChatApp</div>
                                <hr/>
                                <div className="messages">
                                    {this.state.messages.map(message => {
                                        return (
                                            <div>{message.username}: {message.message}</div>
                                        )
                                    })}
                                </div>

                            </div>
                            <div className="card-footer">
                                <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                                <br/>
                                <button onClick={this.send_message} className="btn btn-primary form-control">Send</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;





