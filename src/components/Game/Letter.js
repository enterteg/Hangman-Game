import React from 'react';
import classNames from 'classnames';
import './Letter.sass';

const Letter = ({ letter, disabled }) => {
  const letterClasses = classNames('Letter', {
    'Letter--disabled': disabled,
  });

  return (
    <div className={letterClasses}>
      {letter}
    </div>
  );
};

export default Letter;
