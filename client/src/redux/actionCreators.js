import { AUTHENTICATE, LOGOUT, SET_GAME, CHECK_ANSWER } from './actionTypes';

export function authenticateAC(id, login, score) {
  return {
    type: AUTHENTICATE,
    payload: {
      id,
      login,
      score,
    },
  };
}

export function logoutAC() {
  return {
    type: LOGOUT,
  };
}

export function setGameAC(games) {
  return {
    type: SET_GAME,
    payload: games
  };
}
