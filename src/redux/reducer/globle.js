/**
 * 全局的一些属性 的一些公共属性
 */

import {clear} from '../../dataStore/AsyncStorage';

import {CLEAR_CACHE} from '../actionTypes/global';

export default (state = {}, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case CLEAR_CACHE:
      clear();
      return newState;
  }
  return state;
};
