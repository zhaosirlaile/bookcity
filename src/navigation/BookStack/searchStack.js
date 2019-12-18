import {
  createStackNavigator,
  StackViewStyleInterpolator,
} from 'react-navigation-stack';

import Search from '../../pages/Book/Search/Search';
import SearchList from '../../pages/Book/Search/SearchList';
export default createStackNavigator(
  {
    Search: {
      screen: Search,
      navigationOptions: {
        header: null,
      },
    },
    SearchList: {
      screen: SearchList,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    transitionConfig: () => ({
      screenInterpolator: StackViewStyleInterpolator.forHorizontal,
    }),
  },
);
