import React, { Component } from 'react';

export default class Joke extends Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.upvote(this.props.id)}>Upvote</button>
        <button onClick={() => this.props.downvote(this.props.id)}>
          Downvote
        </button>

        <p style={{ display: 'inline-block', marginRight: '10px' }}>
          {this.props.votes}
        </p>
        <li style={{ display: 'inline-block' }}>{this.props.text}</li>
      </div>
    );
  }
}
