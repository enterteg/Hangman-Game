import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import classNames from 'classnames';

import './Letter.sass';
const Letter = ({ letter, disabled }) => {
  const letterClasses = classNames('Letter', {
    'Letter--disabled': disabled,
  });

  return (
    <div className={letterClasses}>
      <CSSTransitionGroup
        transitionEnterTimeout={500}
        transitionLeave={false}
        transitionName="Letter-Bounce"
      >
        {letter ? <div>{letter}</div> : null}
      </CSSTransitionGroup>
    </div>
  );
};

export default Letter;
