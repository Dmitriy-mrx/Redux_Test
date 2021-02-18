import { SET_GAME } from '../actionTypes';

export default function gameReducer(state = null, { type, payload }) {
  switch (type) {
    case SET_GAME:
      return payload;
    default:
      return state;
  }
}
