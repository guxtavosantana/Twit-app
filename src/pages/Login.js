import React, { Component } from 'react';

import './Login.css';
import TwitterLogo from  '../twitter.svg';
export default class Login extends Component {
  state = {
    username: '',
  };

  handleInputChange = (e) => {
    this.setState({ username: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { username } = this.state;
    
    if (!username.length) {
      return;
    }

    localStorage.setItem("@GoTwitter:username", username);
    this.props.history.push('/timeline');
  };

  render() {
    return (
        <div className="login-wrapper">
            <img src={TwitterLogo} alt="Twitter"></img>
            <form onSubmit={this.handleSubmit}>
              <input 
                type="text" placeholder="Nome de usuário" 
                value={this.state.username}
                onChange={this.handleInputChange}
                ></input>
              <button type="submit">entrar</button>
            </form>
        </div>        
    );
  }
}
