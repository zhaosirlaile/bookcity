/**
 * 创建仓库（store）
 */
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducer/rootReducer';

export default createStore(rootReducer, applyMiddleware(thunk));
