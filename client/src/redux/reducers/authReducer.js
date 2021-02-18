import { AUTHENTICATE, LOGOUT } from '../actionTypes';

export default function authReducer(state = null, { type, payload }) {
  switch (type) {
    case AUTHENTICATE:
      return {
        id: payload.id,
        login: payload.login,
        score: payload.score,
      };
    case LOGOUT:
      return null;
    default:
      return state;
  }
}
