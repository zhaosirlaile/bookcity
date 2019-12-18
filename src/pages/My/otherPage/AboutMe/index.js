import React, {Component} from 'react';
import {
  View,
  TouchableHighlight,
  Image,
  StyleSheet,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';

import {Icon} from 'native-base';
const ListArr = [
  {
    key: 1,
    name: '免责声明',
    navigatorName: 'Disclaimer',
    iconName: '',
  },
  {
    key: 2,
    name: '用户隐私保护政策',
    navigatorName: 'UserPrivacyPolicy',
    iconName: '',
  },
  {
    key: 3,
    name: '联系客服QQ：*********',
    navigatorName: '',
    iconName: '',
  },
  {
    key: 4,
    name: '联系邮箱：********qq.com',
    navigatorName: '',
    iconName: '',
  },
];
import {DEFAULT_COLOR, DIVICE} from '../../../../util/utilParams';

export default class AboutMe extends Component {
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
              关于我们
            </Text>
          </View>
          <View style={style.headerRight} />
        </View>

        <StatusBar backgroundColor={DEFAULT_COLOR} />
        <View style={style.body}>
          <View style={style.Top}>
            <Image
              style={style.TopImage}
              source={require('../../../../images/logo_noback.png')}
            />
            <Text style={style.TopText}>趣味书屋</Text>
          </View>
          <View style={style.center}>
            <FlatList
              ItemSeparatorComponent={() => {
                return <View style={{backgroundColor: '#f0f0f0', height: 1}} />;
              }}
              data={ListArr}
              renderItem={({item}) => {
                return _renderItem(item, this.props.navigation);
              }}
            />
          </View>
          <View>
            <Text style={style.bottom}>@版权：zhaosir</Text>
          </View>
        </View>
      </View>
    );
  }
}

function _renderItem(item, navigation) {
  return (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate(item.navigatorName);
      }}>
      <View style={style.ListItem}>
        <View style={style.ListItemLeft}>
          <Text style={style.ListItemLeftText}>{item.name}</Text>
        </View>
        <View style={style.ListItemRight}>
          <Icon style={style.ListItemRightIcon} name="ios-arrow-forward" />
        </View>
      </View>
    </TouchableHighlight>
  );
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
  Top: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 70,
  },
  TopImage: {
    width: 90,
    height: 90,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  TopText: {
    marginTop: 18,
    color: '#999',
    fontSize: 20,
  },
  center: {
    marginTop: 20,
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  ListItem: {
    // padding
    height: 60,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  ListItemLeft: {},
  ListItemRight: {},
  ListItemLeftText: {
    fontSize: 18,
    color: '#777',
  },
  ListItemRightIcon: {
    color: '#777',
  },
  bottom: {
    marginTop: 15,
    width: DIVICE.DEVICE_WIDTH,
    fontSize: 15,
    textAlign: 'center',
    color: '#777',
  },
});
