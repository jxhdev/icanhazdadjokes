import React, { Component } from 'react';

export default class Joke extends Component {
  render() {
    return (
      <div>
        <li>{this.props.text}</li>
        <button>Upvote</button>
        <button>Downvote</button>
      </div>
    );
  }
}
