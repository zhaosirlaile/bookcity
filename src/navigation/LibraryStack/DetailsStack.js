import {
  createStackNavigator,
  StackViewStyleInterpolator,
} from 'react-navigation-stack';

import detailsCatalog from '../../pages/Library/details/detailsCatalog';
import details from '../../pages/Library/details/details';
export default createStackNavigator(
  {
    LibraryDetailsPage: {
      screen: details,
      navigationOptions: {
        header: null,
      },
    },
    LibraryDetailsCatalog: {
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
