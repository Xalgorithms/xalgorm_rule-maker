import * as types from '../constants/types';

const INITIAL_STATE = [];

function packageReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.PACKAGES_FETCHED: {
      return [...action.data];
    }
    default: return state;
  }
}

export default packageReducer;