import React, { Component } from 'react';
import Users from './Users';
import ChatForm from './ChatForm';
import {Redirect} from 'react-router-dom';
import Roommates from './Roommates'

export default class ChatRoom extends Component {
    render() {
        let {user, socket, rooms, messages, currentRoom, resetMessages, usersInRoom} = this.props;
        let shouldRedirect = <Roommates usersInRoom={usersInRoom} currentRoom={currentRoom} />;
        if(!user && user !== '' && user !== 0) {
            shouldRedirect = <Redirect to ='/' />
        }
        return (
            <div style={{display:'flex'}}>
                {shouldRedirect}
                <Users rooms={rooms} socket={socket} currentRoom={currentRoom} resetMessages={resetMessages} />
                <ChatForm socket = {socket} user={user} currentRoom={currentRoom} messages = {messages} />
            </div>
        )
    }
}
