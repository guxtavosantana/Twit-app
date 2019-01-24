import React, { Component } from 'react';
import TwitterLogo from '../twitter.svg';
import './Timeline.css';
import api from '../services/api';
import Tweet from '../components/Tweet';
import socket from 'socket.io-client';
export default class Timeline extends Component {

  state = {
    tweets: [],
    tweet: '',
  }

  async componentDidMount(){
    this.subscribeToEvents();
    const response= await api.get('tweets');
    this.setState({ tweets: response.data });
  }

  handleTweetChange = e => {
    this.setState({ tweet: e.target.value })
  }

  subscribeToEvents = () => {
    const io = socket('http://localhost:3000');
    io.on('tweet', data => { 
      this.setState({ tweets: [data, ...this.state.tweets] });
    });
    io.on('like', data => { 
      this.setState({ tweets: this.state.tweets.map(
        tweet => tweet._id === data._id ? data : tweet
      )});  
    });
  }

  handleEnter = async e => {
    if (e.keyCode !== 13) {
      return;
    }
    const content = this.state.tweet;
    const autor = localStorage.getItem('@GoTwitter:username');

    await api.post("tweets", { content, autor });
    this.setState({ tweet: '' })
  }

  render() {
    return (
      <div className="timeline-wrapper">
        <img src={TwitterLogo} height={24} alt="Twitter"></img>

        <form>
          <textarea value={this.state.tweet} 
          onChange={this.handleTweetChange}
          onKeyDown={this.handleEnter}
          placeholder="O que está acontecendo?"
          ></textarea>
        </form>


        <ul className="tweet-list">
          {
            this.state.tweets.map(tweet => <Tweet key={tweet._id} tweet={tweet} />)
          }
        </ul>
      </div>
    );
  }
}
