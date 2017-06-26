import React from 'react';
import classNames from 'classnames';

// parts of hangman
import Bar from '../../images/bar.png';
import Corpus from '../../images/corpus.png';
import Head from '../../images/head.png';
import Neck from '../../images/neck.png';
import LeftArm from '../../images/left-arm.png';
import LeftHand from '../../images/left-hand.png';
import LeftFoot from '../../images/left-foot.png';
import LeftLeg from '../../images/left-leg.png';
import RightArm from '../../images/right-arm.png';
import RightHand from '../../images/right-hand.png';
import RightFoot from '../../images/right-foot.png';
import RightLeg from '../../images/right-leg.png';

import './Hangman.sass';

const Hangman = ({ missedTimes }) => {

  return (
    <div className="Hangman">
      <div className="Hangman-Content">
        <img className="Hangman-Bar" src={Bar} />
        <img className="Hangman-Head" src={Head} />
        <img className="Hangman-Neck" src={Neck} />
        <div>
          <img className="Hangman-CorpusPart Hangman-LeftHand" src={LeftHand} />
          <img className="Hangman-CorpusPart Hangman-LeftArm" src={LeftArm} />
          <img className="Hangman-CorpusPart Hangman-Corpus" src={Corpus} />
          <img className="Hangman-CorpusPart Hangman-RightArm" src={RightArm} />
          <img className="Hangman-CorpusPart Hangman-RightHand" src={RightHand} />
        </div>
        <div className="Hangman-Legs">
          <img className="Hangman-LeftFoot" src={LeftFoot} />
          <img className="Hangman-LeftLeg" src={LeftLeg} />
          <img className="Hangman-RightLeg" src={RightLeg} />
          <img className="Hangman-RightFoot" src={RightFoot} />
        </div>
      </div>
    </div>
  );
};

export default Hangman;
