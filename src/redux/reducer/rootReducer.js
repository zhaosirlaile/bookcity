/**
 * 测试一下 reducer
 */
import {combineReducers} from 'redux';
import search from './search';
import novel from './novel';
import globle from './globle';

export default combineReducers({
  search,
  novel,
  globle,
});
