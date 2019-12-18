import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import BookStack from './BookStack';
import LibraryStack from './LibraryStack';
import MyStack from './MyStack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default createBottomTabNavigator(
  {
    BookPage: {
      screen: BookStack,
      navigationOptions: {
        tabBarLabel: '书架',
        tabBarIcon: ({tintColor, focused}) => {
          return (
            <MaterialIcons
              name={'chrome-reader-mode'}
              size={26}
              style={{
                color: tintColor,
              }}
            />
          );
        },
      },
    },
    LibraryPage: {
      screen: LibraryStack,
      navigationOptions: {
        tabBarLabel: '书城',
        tabBarIcon: ({tintColor, focused}) => {
          return (
            <MaterialIcons
              name={'widgets'}
              size={26}
              style={{
                color: tintColor,
              }}
            />
          );
        },
      },
    },
    MyPage: {
      screen: MyStack,
      navigationOptions: {
        tabBarLabel: '我的',
        tabBarIcon: ({tintColor, focused}) => {
          return (
            <MaterialIcons
              name={'person'}
              size={26}
              style={{
                color: tintColor,
              }}
            />
          );
        },
      },
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      const {routes} = navigation.state;
      let flat = true;
      if (routes && routes.length > 1) {
        flat = false;
      }
      return {
        tabBarVisible: flat,
      };
    },
    tabBarOptions: {
      activeTintColor: '#FF9744',
      inactiveTintColor: '#cccccc',
    },
  },
);
