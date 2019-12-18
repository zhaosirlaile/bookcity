import React, {Component} from 'react';
import {View, Image, StyleSheet, Text, StatusBar, FlatList} from 'react-native';

import {Icon, Thumbnail} from 'native-base';
// import Toast from '../../components/Toast';
import {DEFAULT_COLOR} from '../../../util/utilParams';

export default class AccountSafe extends Component {
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
              账户与安全
            </Text>
          </View>
          <View style={style.headerRight} />
        </View>

        <StatusBar backgroundColor={DEFAULT_COLOR} />
        <View style={style.body}>
          <Text>账户与安全</Text>
        </View>
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
});
