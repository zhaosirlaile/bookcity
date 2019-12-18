import {
  createStackNavigator,
  StackViewStyleInterpolator,
} from 'react-navigation-stack';

import Book from '../../pages/Book';
import NovelReaderStack from './NovelReaderStack';
import DetailsStack from './DetailsStack';
import SearchStack from './searchStack';
export default createStackNavigator(
  {
    Book: {
      screen: Book,
      navigationOptions: {
        header: null,
      },
    },
    SearchStack: {
      screen: SearchStack,
      navigationOptions: {
        header: null,
      },
    },
    NovelReaderStack: {
      screen: NovelReaderStack,
      navigationOptions: {
        header: null,
      },
    },
    DetailsStack: {
      screen: DetailsStack,
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
