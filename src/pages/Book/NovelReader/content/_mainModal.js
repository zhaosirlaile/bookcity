import React from 'react';
import {View, Text, Icon} from 'native-base';
import {StyleSheet, TouchableHighlight} from 'react-native';

import {DIVICE} from '../../../../util/utilParams';

export default function _renderControlStation(props) {
  const {details, novelReaderSetting} = props;
  return (
    <View style={styles.contentContainer}>
      <View style={styles.controlContentTop}>
        <View style={styles.controlContentTopOne}>
          <Icon
            name="arrow-back"
            style={styles.controlContentTopColor}
            size={25}
            onPress={() => {
              props.myChangeState({
                isNoShowStatuBar: true,
                isNoShowNovelControl: false,
                stylesModalVisible: true,
              });
              props.navigation.pop();
            }}
          />
          <Text style={[styles.controlContentTopColor, {fontSize: 20}]}>
            {details.title}
          </Text>
          <Icon
            name="ios-more"
            style={styles.controlContentTopColor}
            size={25}
          />
        </View>
      </View>
      <Text
        onPress={() => {
          props.myChangeState({
            isNoShowNovelControl: false,
            isNoShowStatuBar: true,
          });
        }}
        style={{flex: 1}}
      />
      <View style={styles.controlContentBottom}>
        <View style={styles.controlContentBottomTwo}>
          <TouchableHighlight
            onPress={() => {
              const {navigation} = props;
              props.myChangeState({isNoShowNovelControl: false});
              navigation.navigate('catalog');
            }}
            style={styles.controlContentBottomTwoItem}>
            <View style={styles.controlContentBottomTwoItem}>
              <Icon
                name="ios-list"
                style={styles.controlContentBottomTwoIcon}
              />
              <Text style={styles.controlContentBottomTwoText}>目录</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              novelReaderSetting.themeColor = '#1A100F';
              props.alternovelReaderSetting(novelReaderSetting);
            }}
            style={styles.controlContentBottomTwoItem}>
            <View style={styles.controlContentBottomTwoItem}>
              <Icon
                name="ios-moon"
                style={styles.controlContentBottomTwoIcon}
              />
              <Text style={styles.controlContentBottomTwoText}>夜间</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.controlContentBottomTwoItem}
            onPress={() => {
              props.myChangeState({
                isNoShowStatuBar: true,
                isNoShowNovelControl: false,
                stylesModalVisible: true,
              });
            }}>
            <View style={styles.controlContentBottomTwoItem}>
              <Icon
                name="ios-settings"
                style={styles.controlContentBottomTwoIcon}
              />
              <Text style={styles.controlContentBottomTwoText}>选项</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.controlContentBottomTwoItem}>
            <View style={styles.controlContentBottomTwoItem}>
              <Icon
                name="ios-options"
                style={styles.controlContentBottomTwoIcon}
              />
              <Text style={styles.controlContentBottomTwoText}>其他</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  controlContent: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: DIVICE.DEVICE_WIDTH,
    height: DIVICE.DEVICE_HEIGHT,
  },
  controlContentTop: {
    backgroundColor: '#333',
    height: 56,
    marginTop: DIVICE.DEVICE_PLATFORM === 'ios' ? 20 : 0,
    paddingLeft: 15,
    paddingRight: 15,
  },
  controlContentTopColor: {
    color: '#fff',
  },
  controlContentTopOne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 55,
  },
  controlContentTopTwo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 25,
  },
  controlContentTopTwoText: {
    fontSize: 12,
    color: '#C6C6C6',
  },
  controlContentTopText: {
    marginRight: 14,
    color: '#C3C3C3',
    fontSize: 16,
  },
  controlContentBottom: {
    paddingLeft: 15,
    paddingRight: 15,
    height: 80,
    backgroundColor: '#333',
  },
  controlContentBottomTwo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
  },
  controlContentBottomTwoItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  controlContentBottomTwoIcon: {
    fontSize: 26,
    color: '#C3C3C3',
  },
  controlContentBottomTwoText: {
    marginTop: 10,
    fontSize: 12,
    color: '#C3C3C3',
  },
});
