import { combineReducers } from 'redux';

import packageReducer from './package';

const rootReducer = combineReducers({
  packages: packageReducer,
});

export default rootReducer;