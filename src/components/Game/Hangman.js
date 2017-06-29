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
  const classHelper = (baseClass, minVal) => (
    classNames(baseClass, {
      [`${baseClass}--visible`]: missedTimes >= minVal,
    })
  );

  const headClasses = classHelper('Hangman-Head', 1);
  const neckClasses = classHelper('Hangman-Neck', 2);
  const corpusClasses = classHelper('Hangman-CorpusPart Hangman-Corpus', 3);
  const rightArmClasses = classHelper('Hangman-CorpusPart Hangman-RightArm', 4);
  const leftArmClasses = classHelper('Hangman-CorpusPart Hangman-LeftArm', 5);
  const rightHandClasses = classHelper('Hangman-CorpusPart Hangman-RightHand', 6);
  const leftHandClasses = classHelper('Hangman-CorpusPart Hangman-LeftHand', 7);

  const rightLegClasses = classHelper('Hangman-RightLeg', 8);
  const leftLegClasses = classHelper('Hangman-LeftLeg', 9);
  const rightFootClasses = classHelper('Hangman-RightFoot', 10);
  const leftFootClasses = classHelper('Hangman-LeftFoot', 11);


  return (
    <div className="Hangman">
      <div className="Hangman-Content">
        <img alt="hangmanPart" className="Hangman-Bar" src={Bar} />
        <img alt="hangmanPart" className={headClasses} src={Head} />
        <img alt="hangmanPart" className={neckClasses} src={Neck} />

        <div className="Hangman-CorpusParts">
          <img alt="hangmanPart" className={leftHandClasses} src={LeftHand} />
          <img alt="hangmanPart" className={leftArmClasses} src={LeftArm} />
          <img alt="hangmanPart" className={corpusClasses} src={Corpus} />
          <img alt="hangmanPart" className={rightArmClasses} src={RightArm} />
          <img alt="hangmanPart" className={rightHandClasses}src={RightHand} />
        </div>

        <div className="Hangman-Legs">
          <img alt="hangmanPart" className={leftFootClasses} src={LeftFoot} />
          <img alt="hangmanPart" className={leftLegClasses} src={LeftLeg} />
          <img alt="hangmanPart" className={rightLegClasses} src={RightLeg} />
          <img alt="hangmanPart" className={rightFootClasses} src={RightFoot} />
        </div>
      </div>
    </div>
  );
};

export default Hangman;
