import {
  createStackNavigator,
  StackViewStyleInterpolator,
} from 'react-navigation-stack';

import catalog from '../../pages/Book/NovelReader/catalog';
import content from '../../pages/Book/NovelReader/content';
export default createStackNavigator(
  {
    content: {
      screen: content,
      navigationOptions: {
        header: null,
      },
    },
    catalog: {
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
