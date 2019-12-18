/**
 * 所有的路由都导入在这个文件下
 */
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import InitNavigation from './InitNavigation';

import MainNavigaion from './MainNavigaion';

let AppNav = createSwitchNavigator(
  {
    Init: InitNavigation,
    Main: MainNavigaion,
  },
  {
    navigationOptions: {
      header: null,
    },
  },
);

// And the app container
export default createAppContainer(AppNav);
