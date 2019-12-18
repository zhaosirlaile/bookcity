import React, {Component} from 'react';
import {View, StyleSheet, Text, StatusBar} from 'react-native';

import {Icon} from 'native-base';
import {DEFAULT_COLOR} from '../../../../util/utilParams';

export default class Login extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={style.wrap}>
        <View style={style.header}>
          <View style={style.headerLeft}>
            <Icon
              onPress={() => {
                navigation.goBack();
              }}
              name="ios-arrow-back"
              style={style.headerColor}
            />
          </View>
          <View style={style.headerCenter}>
            <Text style={[style.headerColor, style.headerCenterText]}>
              免责声明
            </Text>
          </View>
          <View style={style.headerRight} />
        </View>

        <StatusBar backgroundColor={DEFAULT_COLOR} />
        <View style={style.body} />
      </View>
    );
  }
}

const style = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 56,
    backgroundColor: DEFAULT_COLOR,
    flexDirection: 'row',
  },
  headerLeft: {
    flexDirection: 'row',
    width: 25,
    alignItems: 'center',
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenterText: {
    fontSize: 18,
  },
  headerRight: {
    flexDirection: 'row',
    width: 25,
    alignItems: 'center',
    marginRight: 15,
    justifyContent: 'space-between',
  },
  headerColor: {
    color: '#fff',
  },
  body: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  Text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
});
