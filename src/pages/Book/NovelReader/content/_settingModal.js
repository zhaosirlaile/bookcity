import React from 'react';
import {View, Text, Button, Icon} from 'native-base';
import {StyleSheet, TouchableWithoutFeedback, StatusBar} from 'react-native';
import {DIVICE} from '../../../../util/utilParams';

export default function _renderSetting(props) {
  const {novelReaderSetting, alterFontSize, alternovelReaderSetting} = props;
  return (
    <View style={settingStyles.container}>
      <StatusBar hidden={true} />
      <Text
        style={settingStyles.top}
        onPress={() => {
          props.changeStylesModalVisible(false);
        }}
      />
      <View style={settingStyles.bottom}>
        <View
          style={[settingStyles.bottomItem, {justifyContent: 'space-around'}]}>
          <Text style={settingStyles.bottomItemLeft}>字体</Text>
          <View style={settingStyles.bottomItemCenter}>
            <Button
              rounded
              bordered
              light
              onPress={() => {
                novelReaderSetting.fontSize -= 1;
                alternovelReaderSetting(novelReaderSetting);
                alterFontSize(novelReaderSetting);
              }}>
              <Icon name={'ios-remove'} light />
            </Button>
            <Text style={settingStyles.bottomItemCenterFontSize}>
              {novelReaderSetting.fontSize}
            </Text>
            <Button
              rounded
              bordered
              light
              onPress={() => {
                novelReaderSetting.fontSize += 1;
                alternovelReaderSetting(novelReaderSetting);
                alterFontSize(novelReaderSetting);
              }}>
              <Icon name={'ios-add'} />
            </Button>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              if (Number(novelReaderSetting.fontSize) === 20) {
                return;
              }
              novelReaderSetting.fontSize = 20;
              alternovelReaderSetting(novelReaderSetting);
              alterFontSize(novelReaderSetting);
            }}>
            <Text
              style={[
                settingStyles.bottomItemRight,
                {color: novelReaderSetting.fontSize === 20 ? '#999' : '#ddd'},
              ]}>
              默认
            </Text>
          </TouchableWithoutFeedback>
        </View>

        <View style={settingStyles.bottomItem}>
          <Text style={settingStyles.bottomItemLeft}>间距</Text>
          <View
            style={[
              settingStyles.bottomItemCenter,
              {justifyContent: 'space-around'},
            ]}>
            {props.spaceBetween.map((item, index) => {
              return (
                <Button
                  key={item.iconName}
                  rounded
                  bordered={
                    novelReaderSetting.spaceBetween === item.height
                      ? false
                      : true
                  }
                  warning
                  onPress={() => {
                    novelReaderSetting.spaceBetween = item.height;
                    alternovelReaderSetting(novelReaderSetting);
                    alterFontSize(novelReaderSetting);
                  }}
                  small>
                  <Icon name={item.iconName} style={item.style} />
                </Button>
              );
            })}
          </View>
        </View>

        <View style={settingStyles.bottomItem}>
          <Text style={settingStyles.bottomItemLeft}>主题</Text>
          <View style={settingStyles.bottomItemCenter}>
            {props.themeColors.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={`colorTheme${index}`}
                  onPress={() => {
                    novelReaderSetting.themeColor = item;
                    props.alternovelReaderSetting(novelReaderSetting);
                  }}>
                  <View
                    style={[
                      settingStyles.bottomTheme,
                      {backgroundColor: item},
                      novelReaderSetting.themeColor === item
                        ? settingStyles.bottomThemeActive
                        : null,
                    ]}
                  />
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </View>

        <View style={settingStyles.bottomItem}>
          <Text style={settingStyles.bottomItemLeft}>翻页</Text>
          <View style={settingStyles.bottomItemCenter}>
            <Button bordered warning small rounded>
              <Text>仿真</Text>
            </Button>
            <Button bordered warning small rounded>
              <Text>上下</Text>
            </Button>
            <Button bordered warning small rounded>
              <Text>淡入</Text>
            </Button>
            <Button bordered={false} warning small rounded>
              <Text>覆盖</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}

const settingStyles = StyleSheet.create({
  container: {
    width: DIVICE.DEVICE_WIDTH,
    height: DIVICE.DEVICE_HEIGHT,
  },
  top: {
    flex: 1,
  },
  bottom: {
    height: 300,
    backgroundColor: '#3A3A3A',
    paddingRight: 10,
  },
  bottomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 15,
  },
  bottomItemLeft: {
    margin: 10,
    marginRight: 30,
    fontSize: 14,
    color: '#999',
  },
  bottomItemCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  bottomItemCenterFontSize: {
    height: 45,
    width: 45,
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  bottomItemRight: {
    marginLeft: 30,
    margin: 10,
    marginRight: 30,
    color: '#ddd',
  },
  bottomTheme: {
    height: 50,
    width: 50,
  },
  bottomThemeActive: {
    borderColor: '#FF9727',
    borderWidth: 1,
  },
});
