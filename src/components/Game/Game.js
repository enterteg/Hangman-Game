import React, { Component } from 'react';
import axios from 'axios';

// components
import GameMenu from './GameMenu';
import Hangman from './Hangman';
import MissedLetters from './MissedLetters';
import Result from './Result';

// styles
import './Game.sass';

// constants
const API_ENDPOINT = 'http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=3&maxLength=11&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
const INITIAL_GAME_STATE = () => ({
  word: null,
  missedLetters: new Set(),
  missedTimes: 0,
  foundLetters: new Set(),
  foundWord: [],
  loading: true,
  wordFetchingError: null,
  gameOver: false,
  gameWon: false,
});

const MAX_MISSED_LETTERS = 11;

class Game extends Component {
  constructor() {
    super();
    this.state = INITIAL_GAME_STATE();
  }

  componentDidMount() {
    this.initGame({ initialLoad: true });
    window.addEventListener('keypress', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.handleKeyPress);
  }

  initGame = ({ initialLoad }) => {
    this.setState({ ...INITIAL_GAME_STATE(), initialLoad }, this.getWordFromAPI);
  }

  gameOver = () => {
    this.setState({
      gameOver: true,
      initialLoad: false,
    })
  }

  gameWon = () => {
    this.setState({
      gameWon: true,
      initialLoad: false,
    })
  }

  handleKeyPress = (e) => {
    const letter = e.key.toLowerCase();
    if (this.state.gameOver) return;
    // don't the let user trick you
    if (!(/^[a-zA-Z]$/).test(letter)) return;
    this.testLetter(letter);
  }

  testLetter = (letter) => {
    const { word, foundLetters, missedTimes, missedLetters } = this.state;
    if (word.indexOf(letter) !== -1) {
      if (!foundLetters.has(letter)) {
        foundLetters.add(letter);
        // iterate over word and for every letter that is in found letters set add it to found word
        const foundWord = word.split('').map(letter => foundLetters.has(letter) ? letter : '');

        // USER WINS
        if (!(foundWord.some(letter => letter === ''))) {
          this.gameWon();
        }

        this.setState({ foundWord });
      }
    } else {
      // if letter not in word and not in missed Letters:
      // add to missed letters and increment counter
      if (missedLetters.has(letter)) return
      const newMissedTimes = missedTimes + 1;

      // check if game over
      const gameOver = newMissedTimes === MAX_MISSED_LETTERS
      if (gameOver) {
        this.gameOver();
      }
      this.setState({
        missedLetters: missedLetters.add(letter),
        missedTimes: newMissedTimes,
      });
    }
  }

  getWordFromAPI = () => {
    axios.get(API_ENDPOINT)
      .then(response => {
        const { word } = response.data[0];
        console.warn('TU MASZ SŁOWO LAMO: ', word);
        this.setState({
          loading: false,
          word,
          // array of empty strings of size equal to word length
          foundWord: Array(word.length).fill().map(() => ''),
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          wordFetchingError: true,
        })
      })
  }

  render() {
    const {
      missedLetters,
      foundWord,
      loading,
      missedTimes,
      wordFetchingError,
      gameOver,
      gameWon,
      initialLoad,
     } = this.state;

    return (
      <div className="Game">
        <GameMenu
          loading={loading}
          restart={this.initGame}
          gameOver={gameOver}
          gameWon={gameWon}
          error={wordFetchingError}
          initialLoad={initialLoad}
        />

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
