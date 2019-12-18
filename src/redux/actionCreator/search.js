import {
  ADD_SEARCH_HISTORY,
  CLEAR_SEARCH_HISTORY,
  INIT_SEARCH_HISTORY,
} from '../actionTypes/search';

export const addSearchHistory = data => {
  return {
    type: ADD_SEARCH_HISTORY,
    data,
  };
};

export const clearSearchHistory = () => {
  return {
    type: CLEAR_SEARCH_HISTORY,
  };
};

export const initSearchHistory = data => {
  return {
    type: INIT_SEARCH_HISTORY,
    data,
  };
};
