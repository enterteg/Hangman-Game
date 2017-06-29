import React, { Component } from 'react';
import axios from 'axios';

// components
import GameMenu from './GameMenu';
import Hangman from './Hangman';
import MissedLetters from './MissedLetters';
import Result from './Result';

// config
import {
  API_ENDPOINT,
  INITIAL_GAME_STATE,
  GAME_STATES,
  MAX_MISSED_LETTERS,
} from './Config';

// styles
import './Game.sass';

class Game extends Component {
  constructor() {
    super();
    this.state = INITIAL_GAME_STATE();
  }

  componentDidMount() {
    this.getWordFromAPI();
  }

  initGame = () => {
    this.setState(INITIAL_GAME_STATE(this.state.gameState), this.getWordFromAPI);
  }

  componentWillUnmount() {
    // if listener was added
    if (this.gameState !== GAME_STATES.INITIAL_LOAD) {
      window.removeEventListener('keypress', this.handleKeyPress);
    }
  }

  startGame = () => {
    window.addEventListener('keypress', this.handleKeyPress);
    this.setState({
      gameState: GAME_STATES.GAME_STARTED,
    });
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
    // if given letter is in word
    if (word.indexOf(letter) !== -1) {
      // if not found before
      if (!foundLetters.has(letter)) {
        foundLetters.add(letter);
        // iterate over word and for every letter that is in found letters set add it to found word
        const foundWord = word.split('').map(letter => foundLetters.has(letter) ? letter : '');

        // USER WINS
        if (!(foundWord.some(letter => letter === ''))) {
          this.setState({
            gameState: GAME_STATES.GAME_WON,
            foundWord,
          })
        } else {
          this.setState({ foundWord });
        }
      }
    } else {
      // if letter already in missed letters do nothing
      if (missedLetters.has(letter)) return;
      // if letter not in word and not in missed Letters:
      // add to missed letters and increment counter
      const newMissedTimes = missedTimes + 1;

      // check if game over
      const gameOver = newMissedTimes === MAX_MISSED_LETTERS

      const newState = Object.assign({
        missedLetters: missedLetters.add(letter),
        missedTimes: newMissedTimes,
      }, gameOver ? { gameState: GAME_STATES.GAME_OVER } : {}, )

      this.setState(newState);
    }
  }

  getWordFromAPI = () => {
    const initialLoad = this.state.gameState === GAME_STATES.INITIAL_LOAD;
    this.setState({
      gameState: GAME_STATES.LOADING,
    });

    axios.get(API_ENDPOINT)
      .then(response => {
        const { word } = response.data[0];
        console.warn('IF YOU ARE WEAK: ', btoa(word.toLowerCase()));
        this.setState({
          gameState: initialLoad ? GAME_STATES.INITIAL_LOAD : GAME_STATES.GAME_STARTED,
          word: word.toLowerCase(),
          // array of empty strings of size equal to word length
          foundWord: Array(word.length).fill().map(() => ''),
        });
      })
      .catch(err => {
        this.setState({
          gameState: GAME_STATES.FETCH_ERROR,
        })
      })
  }

  render() {
    const {
      missedLetters,
      foundWord,
      missedTimes,
      gameState,
     } = this.state;

    return (
      <div className="Game">
        <GameMenu
          gameState={gameState}
          startGame={this.startGame}
          restart={this.initGame}
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
