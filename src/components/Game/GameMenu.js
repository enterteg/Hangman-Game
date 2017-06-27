import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './GameMenu.sass';

class GameMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  startGame = () => {
    this.setState({
      visible: false,
    });
  }

  renderButton = (label, onClick, loading) => (
    <button
      className={classNames('GameMenu-Button', { 'GameMenu-Button--loading': loading })}
      onClick={onClick}
    >
      {label}
    </button>
  )

  renderContent = () => {
    const { error, restart, loading, gameOver, initialLoad, gameWon } = this.props;
    let text;
    let buttonText;
    let onClick = this.startGame;

    // ERROR:
    if (error) {
      text = 'Something went wrong :(';
      buttonText = 'Try Again'
      onClick = restart;
    }

    // GAME OVER
    if (gameOver) {
      text = <span key="GameOver">Game Over</span>;
      buttonText = 'New Word';
      onClick = restart;
    }

    // GAME Won
    if (gameWon) {
      text = <span key="GameWon">Game Won</span>;
      buttonText = 'One more time!';
      onClick = restart;
    }

    // GAME START
    if (initialLoad) {
      text = <span key="Hangman">Hangman</span>;
      buttonText = 'Start Game';
    }

    // LOADING
    if (loading) {
      text = <span key="Loading">Loading...</span>;
      buttonText = '';
      onClick = () => {}; // do nothing
    }

    return (
      <div className="GameMenu-Content">
        <CSSTransitionGroup
          transitionEnterTimeout={0}
          transitionLeaveTimeout={300}
          transitionName="GameMenu-FadeIn"
        >
          {text}
        </CSSTransitionGroup>
        {this.renderButton(buttonText, onClick, loading)}
      </div>
    )
  }

  render() {
    const { visible } = this.state;
    const { gameOver, loading, gameWon } = this.props;
    const menuClasses = classNames('GameMenu', {
      'GameMenu--hidden': !loading && !visible && !gameOver && !gameWon,
    });

    return (
      <div className={menuClasses}>
        {this.renderContent()}
      </div>
    );
  }
}

GameMenu.propTypes = {
  loading: PropTypes.bool.isRequired,
  gameOver: PropTypes.bool.isRequired,
}

export default GameMenu;
