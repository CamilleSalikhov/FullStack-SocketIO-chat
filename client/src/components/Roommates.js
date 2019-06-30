import React, { Component } from 'react';
import uuid from 'uuid'

export default class Roommates extends Component {
    render() {
        let usersInRoom = this.props.usersInRoom.map(e => <div key={uuid.v4()}>{e}</div>)
        return (
            <div>
                <div style={{background:'lightBlue'}}>users in {this.props.currentRoom} room:</div>
                {usersInRoom}
            </div>
        )
    }
}
