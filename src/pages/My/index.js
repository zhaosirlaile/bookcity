import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  FlatList,
  TouchableHighlight,
} from 'react-native';

const ListArr = [
  {
    key: 1,
    name: '账户与安全',
    navigatorName: 'AccountSafe',
    iconName: '',
  },
  {
    key: 2,
    name: '清除缓存',
    navigatorName: '',
    iconName: '',
  },
  {
    key: 3,
    name: '主题设置',
    navigatorName: 'ThemeSetting',
    iconName: '',
  },
  {
    key: 4,
    name: '版本更新',
    navigatorName: '',
    iconName: '',
  },
  {
    key: 5,
    name: '版本介绍',
    navigatorName: 'VersionIntroduce',
    iconName: '',
  },
  {
    key: 6,
    name: '关于我们',
    navigatorName: 'AboutMe',
    iconName: '',
  },
];

import {connect} from 'react-redux';
import {clearCache} from '../../redux/actionCreator/global';

import {Icon} from 'native-base';
import Toast from '../../components/Toast';
import {DEFAULT_COLOR} from '../../util/utilParams';

class MyPage extends Component {
  render() {
    return (
      <View style={style.wrap}>
        <Toast ref="toast" />
        <View style={style.header}>
          <View style={style.headerCenter} />
          <View style={style.headerRight}>
            <Icon style={style.headerColor} name="ios-more" />
          </View>
        </View>
        <StatusBar backgroundColor={DEFAULT_COLOR} />
        <View style={style.body}>
          <View style={style.login}>
            <Icon
              name="person"
              style={[style.loginHeaderImage, style.loginHeaderImageColor]}
            />
            <Text style={style.loginStateOrName}>未登录</Text>
            <View
              style={{
                width: 800,
                top: 25,
                height: 800,
                backgroundColor: '#f0f0f0',
                position: 'absolute',
                elevation: -1,
                borderRadius: 400,
              }}
            />
          </View>
          <View style={style.List}>
            <FlatList
              data={ListArr}
              keyExtractor={item => item.key}
              renderItem={({item}) => {
                return this._renderItem(item);
              }}
              ItemSeparatorComponent={() => {
                return <View style={{backgroundColor: '#f0f0f0', height: 1}} />;
              }}
            />
          </View>
          <View />
        </View>
      </View>
    );
  }
  _renderItem(item) {
    const {navigation} = this.props;
    let renderRight;
    if (item.name === '版本更新') {
      renderRight = <Text style={{color: '#ccc'}}>当前版本已经是最新版本</Text>;
    }
    if (item.name === '清除缓存') {
      renderRight = <Text />;
    }
    return (
      <TouchableHighlight
        // activeOpacity={0.1}
        underlayColor="rgba(34, 26, 38, 0.1)"
        onPress={() => {
          if (item.name === '清除缓存') {
            this.props.mapClearCache();
            this.refs.toast.showAfterSecondClose(1, '清除成功');
          }
          navigation.navigate(item.navigatorName);
        }}>
        <View style={style.ListItem}>
          <View style={style.ListItemLeft}>
            <Text style={style.ListItemLeftText}>{item.name}</Text>
          </View>
          <View style={style.ListItemRight}>
            {renderRight ? (
              renderRight
            ) : (
              <Icon style={style.ListItemRightIcon} name="ios-arrow-forward" />
            )}
          </View>
        </View>
      </TouchableHighlight>
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
  headerLeft: {},
  headerCenter: {
    flex: 1,
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
  login: {
    height: 100,
    backgroundColor: DEFAULT_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginHeaderImage: {
    width: 70,
    height: 70,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: '#ddd',
  },
  loginHeaderImageColor: {
    borderWidth: 1,
    textAlign: 'center',
    borderColor: '#fff',
    backgroundColor: '#fff',
    borderRadius: 40,
    textAlignVertical: 'center',
    fontSize: 40,
    color: '#f0f0f0',
  },
  loginStateOrName: {
    borderRadius: 1000,
    marginTop: 7,
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#999',
  },
  List: {
    marginTop: 50,
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  ListItem: {
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
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    mapClearCache: () => {
      dispatch(clearCache());
    },
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(MyPage);
