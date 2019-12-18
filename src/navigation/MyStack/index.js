import {
  createStackNavigator,
  StackViewStyleInterpolator,
} from 'react-navigation-stack';

import My from '../../pages/My';
import AboutMe from './AboutMeStack';
import AccountSafe from '../../pages/My/otherPage/AccountSafe';
import Login from '../../pages/My/otherPage/Login';
import ThemeSetting from '../../pages/My/otherPage/ThemeSetting';
import VersionIntroduce from '../../pages/My/otherPage/VersionIntroduce';
import VersionUpdate from '../../pages/My/otherPage/VersionUpdate';

export default createStackNavigator(
  {
    My: {
      screen: My,
      navigationOptions: {
        header: null,
      },
    },
    AboutMe: {
      screen: AboutMe,
      navigationOptions: {
        header: null,
      },
    },
    AccountSafe: {
      screen: AccountSafe,
      navigationOptions: {
        header: null,
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
    ThemeSetting: {
      screen: ThemeSetting,
      navigationOptions: {
        header: null,
      },
    },
    VersionIntroduce: {
      screen: VersionIntroduce,
      navigationOptions: {
        header: null,
      },
    },
    VersionUpdate: {
      screen: VersionUpdate,
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
