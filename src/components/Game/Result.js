import React from 'react';

import Letter from './Letter';
import './Result.sass';

const Result = ({ foundWord }) => {
  const renderLetters = () => (
    // max length of foundWord: 11 letters -> 10 indicies
    Array(11).fill().map((undef, idx) => {
      // if letter exists - show it
      if (foundWord[idx] !== undefined) {
        return <Letter key={`letter_${idx}`} letter={foundWord[idx]} />;
      }
      // else render disabled field - means word is shorter than 11 letters
      return <Letter key={`letter_${idx}`} disabled />;
    })
  );

  return (
    <div className="Result">
      {renderLetters()}
    </div>
  );
};

export default Result;
