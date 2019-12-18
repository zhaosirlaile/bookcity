/**
 * 初始页：放广告的地方
 */
import {createStackNavigator} from 'react-navigation-stack';
import InitPage from '../pages/InitPage';

export default createStackNavigator({
  InitPage: {
    screen: InitPage,
    navigationOptions: {
      header: null,
    },
  },
});
