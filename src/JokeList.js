import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';
import uuid from 'uuid/v1';
import { PacmanLoader, CircleLoader, HashLoader } from 'react-spinners';
import './JokeList.css';
var numJokes = 20;
export default class JokeList extends Component {
  constructor(props) {
    super();
    this.seenJokes = new Set();
    this.state = {
      jokes: [],
      loading: false,
      loadingMessage: 'Loading...'
    };
  }
  getJokes = async () => {
    try {
      while (this.state.jokes.length < numJokes) {
        const res = await axios.get('https://icanhazdadjoke.com', {
          headers: { Accept: 'application/json' }
        });
        if (!this.seenJokes.has(res.data.joke)) {
          this.seenJokes.add(res.data.jokes);
          this.setState({
            jokes: [
              ...this.state.jokes,
              { joke: res.data.joke, id: uuid(), votes: 0 }
            ]
          });
        } else {
          console.log('duplicate found!');
        }
      }
      this.setState({
        loading: false,
        loadingMessage: ''
      });
    } catch (e) {
      console.log(e);
    }
  };
  componentWillMount = async () => {
    try {
      this.setState({ loading: true });
      if (this.state.jokes.length === numJokes) {
        this.setState(
          {
            jokes: [],
            loading: true,
            loadingMessage: 'Loading...'
          },
          this.getJokes
        );
      } else {
        this.getJokes();
      }
    } catch (e) {
      console.log(e);
    }
  };

  sortJokes = () => {
    const sortedJokes = [...this.state.jokes].sort((a, b) => a.votes < b.votes);
    this.setState({
      jokes: sortedJokes
    });
  };

  handleUpvote = id => {
    console.log('hey!');
    this.setState({
      jokes: this.state.jokes.map(joke => {
        if (joke.id === id) {
          joke.votes = joke.votes + 1;
        }
        return joke;
      })
    });
    this.sortJokes();
  };

  handleDownvote = id => {
    this.setState({
      jokes: this.state.jokes.map(joke => {
        if (joke.id === id) {
          joke.votes = joke.votes - 1;
        }
        return joke;
      })
    });
    this.sortJokes();
  };
  render() {
    if (!this.state.loading) {
      var jokes = (
        <ul>
          {this.state.jokes.map(j => {
            return (
              <Joke
                text={j.joke}
                id={j.id}
                key={j.id}
                votes={j.votes}
                upvote={this.handleUpvote}
                downvote={this.handleDownvote}
              />
            );
          })}
        </ul>
      );
    } else {
      jokes = (
        <div className="sweetSpinner">
          <HashLoader color={'#123abc'} loading={this.state.loading} />
        </div>
      );
    }
    return (
      <div>
        <div>{jokes}</div>
        <button onClick={this.componentWillMount}>
          Generate New Shitty Jokes
        </button>
      </div>
    );
  }
}
