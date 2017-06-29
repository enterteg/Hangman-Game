export const API_ENDPOINT = 'https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=3&maxLength=11&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';

export const GAME_STATES = {
  INITIAL_LOAD: 0,
  LOADING: 1,
  GAME_STARTED: 2,
  GAME_OVER: 3,
  GAME_WON: 4,
  FETCH_ERROR: 5,
};

// function to always create new Sets
export const INITIAL_GAME_STATE = (gameState) => ({
  word: null,
  missedLetters: new Set(),
  missedTimes: 0,
  foundLetters: new Set(),
  foundWord: [],
  gameState: gameState || GAME_STATES.INITIAL_LOAD,
});

export const MAX_MISSED_LETTERS = 11;
