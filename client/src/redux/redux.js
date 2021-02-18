import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from './reducers/authReducer';
import gameReducer from './reducers/gameReducer';

const preloadedState = window.localStorage.getItem('state') || '{"authenticate": false }';

const store = createStore(
  combineReducers({
    authenticate: authReducer,
    game: gameReducer,
  }),
  JSON.parse(preloadedState),
  composeWithDevTools(),
);

store.subscribe(() => {
  window.localStorage.setItem('state', JSON.stringify(store.getState()));
});

export default store;
