import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './GameMenu.sass';

import { GAME_STATES } from './Config.js';

class GameMenu extends React.Component {
  renderButton = (label, onClick, loading) => (
    <button
      className={classNames('GameMenu-Button', { 'GameMenu-Button--loading': loading })}
      onClick={onClick}
    >
      {label}
    </button>
  )

  renderContent = () => {
    const { restart, gameState } = this.props;
    let text;
    let buttonText;
    let onClick;

    switch (gameState) {
      case GAME_STATES.LOADING:
        text = 'Hangman';
        buttonText = '';
        onClick = () => {}; // do nothing
        break;

      case GAME_STATES.INITIAL_LOAD:
        text = 'Hangman';
        buttonText = 'Start Game';
        onClick = this.props.startGame;
        break;

      case GAME_STATES.GAME_OVER:
        text = 'Game Over';
        buttonText = 'New Word';
        onClick = restart;
        break;

      case GAME_STATES.GAME_WON:
        text = 'You Won!';
        buttonText = 'One more time!';
        onClick = restart;
        break;

      case GAME_STATES.FETCH_ERROR:
        text = 'Something went wrong :(';
        buttonText = 'Try Again'
        onClick = restart;
        break;
    }

    return (
      <div className="GameMenu-Content">
        {text}
        {this.renderButton(buttonText, onClick, gameState === GAME_STATES.LOADING)}
      </div>
    )
  }

  render() {
    const { gameState } = this.props;
    const menuClasses = classNames('GameMenu', {
      'GameMenu--hidden': gameState === GAME_STATES.GAME_STARTED,
    });

    return (
      <div className={menuClasses}>
        {this.renderContent()}
      </div>
    );
  }
}

GameMenu.propTypes = {
  restart: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  gameState: PropTypes.number.isRequired,
}

export default GameMenu;
