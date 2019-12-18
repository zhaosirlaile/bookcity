import {
  createStackNavigator,
  StackViewStyleInterpolator,
} from 'react-navigation-stack';

import Search from '../../pages/Library/Search/Search';
import SearchList from '../../pages/Library/Search/SearchList';
export default createStackNavigator(
  {
    LibrarySearch: {
      screen: Search,
      navigationOptions: {
        header: null,
      },
    },
    LibrarySearchList: {
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
