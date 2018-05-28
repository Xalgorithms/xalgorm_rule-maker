import * as api from '../api';
import * as types from '../constants/types';

export function fetchPackages() {
  return (dispatch) => {
    api.fetchPackages().then((data) => {
      dispatch({
        type: types.PACKAGES_FETCHED,
        data,
      });
    });
  };
};
