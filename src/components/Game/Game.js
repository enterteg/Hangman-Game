import React, { Component } from 'react';
import axios from 'axios';

// components
import Hangman from './Hangman';
import MissedLetters from './MissedLetters';
import Result from './Result';

// styles
import './Game.sass';

// constants
const API_ENDPOINT = 'http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=3&maxLength=11&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
const INITIAL_GAME_STATE = {
  loading: true,
  missedLetters: new Set(),
  foundLetters: new Set(),
  word: null,
  foundWord: [],
  missedTimes: 0,
  gameEnd: false,
};

class Game extends Component {
  constructor() {
    super();
    this.state = INITIAL_GAME_STATE;
  }

  componentDidMount() {
    window.addEventListener('keypress', this.handleKeyPress);
    this.getWordFromAPI();
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.handleKeyPress);
  }

  restart = () => {
    this.setState(INITIAL_GAME_STATE);
  }
  handleKeyPress = (e) => {
    const letter = e.key.toLowerCase();
    // don't let user trick you
    if (!(/[a-zA-Z]+/).test(letter)) return;
    this.testLetter(letter);
  }

  testLetter = (letter) => {
    const { word, foundLetters, missedTimes, missedLetters } = this.state;
    if (word.indexOf(letter) !== -1) {
      if (!foundLetters.has(letter)) {
        foundLetters.add(letter);
        // iterate over word and for every letter that is in found letters set add it to found word
        const foundWord = word.split('').map(letter => foundLetters.has(letter) ? letter : '');
        this.setState({ foundWord });
      }
    } else {
      // if letter not in word - add to missed letters and increment counter
      const newMissedTimes = missedTimes + 1;
      if (newMissedTimes === 10) {
        this.setState({
          gameEnd: true,
        })
      } else {
        this.setState({
          missedLetters: missedLetters.add(letter),
          missedTimes: newMissedTimes,
        });
      }
    }
  }

  getWordFromAPI = () => {
    axios.get(API_ENDPOINT)
      .then(response => {
        const { word } = response.data[0];
        console.log(word);
        this.setState({
          loading: false,
          word,
          // array of empty strings of size equal to word length
          foundWord: Array(word.length).fill().map(() => ''),
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  restartGame = () => {
    this.setState(INITIAL_GAME_STATE);
  }

  renderLoading = () => (
    <div className="Game-Loading">
      Loading...
      <div className="Game-LoadingSpinner" />
    </div>
  )

  render() {
    const { missedLetters, foundWord, loading, missedTimes } = this.state;
    return (
      <div className="Game">
        {loading && this.renderLoading()}
        <div className="Game-TopSection">
          <Hangman missedTimes={missedTimes} />
          <MissedLetters letters={missedLetters} />
        </div>
        <Result foundWord={foundWord} />
      </div>
    );
  }
}

export default Game;
