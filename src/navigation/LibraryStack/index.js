import {
  createStackNavigator,
  StackViewStyleInterpolator,
} from 'react-navigation-stack';

import Library from '../../pages/Library';
import DetailsStack from './DetailsStack';
// import NovelReaderContent from '../pages/NovelReader/content';

// import NovelReaderCatalog from '../pages/NovelReader/catalog';

import NovelReaderStack from './NovelReaderStack';

import searchStack from './searchStack';

export default createStackNavigator(
  {
    Library: {
      screen: Library,
      navigationOptions: {
        header: null,
      },
    },
    LibrarySearchStack: {
      screen: searchStack,
      navigationOptions: {
        header: null,
      },
    },
    LibararyDetailsStack: {
      screen: DetailsStack,
      navigationOptions: {
        header: null,
      },
    },
    LibraryNovelReaderStack: {
      screen: NovelReaderStack,
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
