import React, { Component } from 'react'
import './App.css';
import Login from './components/Login';
import io from 'socket.io-client';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import ChatRoom from './components/ChatRoom';
import uuid from 'uuid'


export default class App extends Component {

  state = {
    user: null,
    socket:null,
    rooms:[],
    messages:[],
    currentRoom:'user',
    usersInRoom:[]
    
  }

  componentDidMount() {
    const socket = io("http://localhost:5000");
    socket.on('connect', ()=> {
      console.log('connected from client')
    })
    socket.on('new message', (message, sender) => this.setState({messages:this.state.messages.concat([
      {
        message,
        sender
      }
    ])}));
    this.setState({socket});
    socket.on('rooms_update', rooms => this.setState({rooms:rooms}));
    socket.on('new roommate', (who, where) => {
      this.setState({
        currentRoom:where,

      })

    })
    socket.on('users in room', users => this.setState({
      usersInRoom:users
    }))
    socket.on('leaving room', who => this.setState({
      usersInRoom:this.state.usersInRoom.filter(e => e !== who)
    }))
  }

  setUser = (name) => {
    this.setState({
      user:name,
      currentRoom:name
    })
  }

  resetMessages = () => {
    this.setState({
      messages:[]
    })
  }



  render() {
    let {rooms, user, socket, messages,currentRoom, usersInRoom} = this.state;
    let routes = rooms.map(e =>
    <Route path={`/${e}`} key={e} render={props => <ChatRoom key={uuid.v4()} usersInRoom={usersInRoom} resetMessages={this.resetMessages} currentRoom={currentRoom} socket={socket} user={user} rooms={rooms} messages={messages} />} />)
    let renderValue;
    user ? renderValue = <Redirect to={`/${user}`} /> : renderValue = <p>Start to chat!</p>;

   
    
    return (
      
      <BrowserRouter>
      <div className="App">
      <header className="App-header">
        Chat app
      </header>
      {renderValue}
      <Route exact path='/' render = {props => <Login setUser={this.setUser} rooms={rooms} socket={this.state.socket} />} />
      {routes}
      </div>
      </BrowserRouter>
    )
  }
}

