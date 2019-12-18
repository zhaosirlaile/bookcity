import {
  createStackNavigator,
  StackViewStyleInterpolator,
} from 'react-navigation-stack';

import detailsCatalog from '../../pages/Book/details/detailsCatalog';
import details from '../../pages/Book/details/details';
export default createStackNavigator(
  {
    detailsPage: {
      screen: details,
      navigationOptions: {
        header: null,
      },
    },
    detailsCatalog: {
      screen: detailsCatalog,
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
