import React, { Component } from 'react';
import './Tweet.css';
import likeImg from '../like.svg';
import api from '../services/api';

export default class Tweet extends Component {



handleLike= async () => {
    const { _id } = this.props.tweet;
    await api.post(`likes/${_id}`);
}
  render() {
    const { tweet } = this.props;
    return (
        <li className="tweet">
            <strong>{tweet.autor}</strong>
            <p>{tweet.content}</p>
            <button type="button" onClick={this.handleLike}>
                <img src={likeImg} alt="like" ></img>
                {tweet.likes}
            </button>

        </li>
    );
  }
}
