/**
 * 测试一下 reducer
 */

import {getBykey, saveBykey, deleteBykey} from '../../dataStore/AsyncStorage';

const defaultState = {
  searchHistoryList: [],
};

import {
  ADD_SEARCH_HISTORY,
  CLEAR_SEARCH_HISTORY,
  INIT_SEARCH_HISTORY,
} from '../actionTypes/search';

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case ADD_SEARCH_HISTORY:
      if (!isNoArr(newState.searchHistoryList, action.data)) {
        newState.searchHistoryList.push(action.data);
        saveBykey('searchHistoryList', newState.searchHistoryList);
      }
      return newState;
    case INIT_SEARCH_HISTORY:
      newState.searchHistoryList = action.data;
      return newState;
    case CLEAR_SEARCH_HISTORY:
      newState.searchHistoryList = [];
      deleteBykey('searchHistoryList');
      console.log(action);
      return newState;
  }
  return state;
};

function isNoArr(arr, item) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === item) {
      return true;
    }
  }
  return false;
}
