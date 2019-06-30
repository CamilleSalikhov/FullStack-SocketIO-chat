import React, { Component } from 'react';
import uuid from 'uuid'

export default class ChatForm extends Component {
    state = {
        input:'',
    }



    handleClick = (e) => {
        e.preventDefault();
        let today = new Date();
         let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + '|' + today.getHours() + ':' + today.getMinutes();
        this.props.socket.emit('new_message', {
            message: this.state.input,
            room:this.props.currentRoom,
            sender:this.props.user,
            date:date
        });

    }

    handleChange = (e) => {
        this.setState({input:e.target.value})
    }

    render() {
        let messages = this.props.messages.map(e => 
        <div key = {uuid.v4()} style={{background:'lightGrey', borderStyle:'solid', borderColor:'grey', marginBottom:'5px'}} >
            <div style={{textAlign:'start'}} >{e.sender+':'}</div>
            <div style={{textAlign:'start'}}>{e.date}</div>
        <div style={{textAlign:'start'}}>{e.message}</div>
        </div>)
        return (
            <div style={{flexBasis:'70%'}}>
                <div style={{background:'#282c34', color:'white'}}>{`You are in the ${this.props.currentRoom} room`}</div>
                {messages}
                <form style={{display:'flex', flexDirection:'column', marginTop:'30px'}}>
                    <textarea value={this.state.input} placeholder='Enter the message' onChange={this.handleChange}>
                    </textarea>
                    <button onClick={this.handleClick} type='submit'>submit</button>
                    <div style={{background:'lightBlue'}}>You are logged in as  {this.props.user}</div>
                </form>
                
            </div>
        )
    }
}
