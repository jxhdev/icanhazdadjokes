import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';
import uuid from 'uuid/v1';
import { PacmanLoader, CircleLoader, HashLoader } from 'react-spinners';
import './JokeList.css';

export default class JokeList extends Component {
  constructor(props) {
    super();
    this.seenJokes = new Set();
    this.state = {
      jokes: [],
      loading: true,
      loadingMessage: 'Loading...'
    };
  }
  getJokes = async () => {
    while (this.state.jokes.length < 20) {
      const res = await axios.get('https://icanhazdadjoke.com', {
        headers: { Accept: 'application/json' }
      });
      if (!this.seenJokes.has(res.data.joke)) {
        this.seenJokes.add(res.data.jokes);
        this.setState({
          jokes: [...this.state.jokes, res.data.joke]
        });
      } else {
        console.log('duplicate found!');
      }
    }
    this.setState({
      loading: false,
      loadingMessage: ''
    });
  };
  componentWillMount = async () => {
    // try {
    //   if (this.state.jokes.length < 20) {
    //     while (this.state.jokes.length < 20) {
    //       const res = await axios.get('https://icanhazdadjoke.com', {
    //         headers: { Accept: 'application/json' }
    //       });
    //       if (!this.seenJokes.has)
    //     }
    //   }
    // } catch (e) {
    //   console.log('error', e);
    // }
    this.setState({ loading: true });
    if (this.state.jokes.length === 20) {
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
  };
  render() {
    if (!this.state.loading) {
      var jokes = (
        <ul>
          {this.state.jokes.map(j => {
            return <Joke text={j} key={uuid()} />;
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
