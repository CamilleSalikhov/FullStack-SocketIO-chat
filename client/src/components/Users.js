import React, { Component } from 'react';
import uuid from 'uuid'

export default class Users extends Component {

    onClick = (e) => {
        if(e.target.value === this.props.currentRoom) {
            return
        }
        console.log(e.target.value);
        this.props.socket.emit('change room', e.target.value);
        this.props.resetMessages();
    }


    render() {
        let renderUsers = this.props.rooms.map(room => <button key={uuid.v4()} onClick={this.onClick} value={room} >{room}</button>);
        return (
            <div style = {{flexBasis:'30%', background:'lightGrey',display:'flex', flexDirection:'column'}}>
                Click to switch room!
                <div className="btn-group-vertical">

                </div>
                {renderUsers}
            </div>
        )
    }
}
