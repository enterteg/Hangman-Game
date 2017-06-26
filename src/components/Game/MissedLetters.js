import React from 'react';

import './MissedLetters.sass';

const MissedLetters = ({ letters }) => (
  <div className="MissedLetters">
    <div className="MissedLetters-Header">
      You Missed:
    </div>
    <div className="MissedLetters-Letters">
      {Array.from(letters)}
    </div>
  </div>
);

export default MissedLetters;
