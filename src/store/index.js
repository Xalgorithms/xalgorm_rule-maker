import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

export const configureStore = () => {
  const middleWare = [];
  const loggerMiddleware = createLogger({
    predicate: () => process.env.NODE_ENV === 'development',
  });
  middleWare.push(thunk);
  middleWare.push(loggerMiddleware);

  const initialState = {};
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleWare),
  );

  return store;
};
