import {
  createStackNavigator,
  StackViewStyleInterpolator,
} from 'react-navigation-stack';

import AboutMe from '../../pages/My/otherPage/AboutMe/index';
import Disclaimer from '../../pages/My/otherPage/AboutMe/Disclaimer';
import UserPrivacyPolicy from '../../pages/My/otherPage/AboutMe/UserPrivacyPolicy';

export default createStackNavigator(
  {
    AboutMe: {
      screen: AboutMe,
      navigationOptions: {
        header: null,
      },
    },
    Disclaimer: {
      screen: Disclaimer,
      navigationOptions: {
        header: null,
      },
    },
    UserPrivacyPolicy: {
      screen: UserPrivacyPolicy,
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
