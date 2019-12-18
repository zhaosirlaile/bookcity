import {
  createStackNavigator,
  StackViewStyleInterpolator,
} from 'react-navigation-stack';

import catalog from '../../pages/Library/NovelReader/catalog';
import content from '../../pages/Library/NovelReader/content';
export default createStackNavigator(
  {
    LibraryContent: {
      screen: content,
      navigationOptions: {
        header: null,
      },
    },
    LibraryCatalog: {
      screen: catalog,
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
