/**
 * 入口文件
 */
import React, {Component} from 'react';
import {Root} from 'native-base';
import AppNavigation from './navigation/AppNavigation';
// import {MenuProvider} from 'react-native-popup-menu';

import store from './redux/store';
import {Provider} from 'react-redux';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root>
          <AppNavigation />
        </Root>
      </Provider>
    );
  }
}
