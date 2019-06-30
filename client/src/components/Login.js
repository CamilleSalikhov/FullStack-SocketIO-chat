import React, { Component } from 'react'

export default class Login extends Component {
    state = {
        input:''
    }


    onChange = (e) => {
        this.setState({
            input:e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let newString = this.state.input.replace(/\s/g,'');
        if(!newString) {
            alert('invalid nickname')
            return
        } else if (this.props.rooms.find(e => e === newString)) {
            alert('nickname already exists');
            return
        } else { 
        const {socket} = this.props;
        this.props.setUser(newString);
        socket.emit('add_user', newString);
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <p>Nickname should not contain spaces</p>
                <input  type='text' value={this.state.input} onChange={this.onChange}></input>
                <button type='submit'>Log in</button>
                </form>
            </div>
        
        )
    }
}