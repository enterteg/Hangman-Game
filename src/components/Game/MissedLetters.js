import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import './MissedLetters.sass';

const MissedLetters = ({ letters }) => (
  <div className="MissedLetters">
    <div className="MissedLetters-Header">
      You Missed:
    </div>
    <div className="MissedLetters-Letters">
      <CSSTransitionGroup
        transitionName="Letter-Bounce"
        transitionEnterTimeout={500}
        transitionLeave={false}
      >
        {Array.from(letters).map((letter, idx) => (
          <div
            className="MissedLetters-Letter"
            key={`letter_${idx}`}
          >
            {letter}
          </div>
        ))}
      </CSSTransitionGroup>
    </div>
  </div>
);

export default MissedLetters;
