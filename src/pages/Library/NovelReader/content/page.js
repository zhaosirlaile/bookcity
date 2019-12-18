import React from 'react';
import {View, Text, Icon} from 'native-base';
import {StyleSheet} from 'react-native';

import {DIVICE} from '../../../../util/utilParams';

export default function page(item, novelReaderSetting, key) {
  return (
    <View style={styles.pageWrap}>
      <View style={styles.pageTop}>
        <Text style={styles.pageTopText}>{item.cN}</Text>
        <Text style={styles.pageTopText}>{item.title}</Text>
      </View>
      <View style={styles.pageCenter}>
        {_renderCenter(item, novelReaderSetting, key)}
      </View>
      <View style={styles.pageBottom}>
        <View style={styles.pageBottomLeft}>
          <Icon name="ios-battery-full" style={styles.pageBottomIcon} />
          <Text style={styles.pageBottomText}>11:24</Text>
        </View>
        <View style={styles.pageBottomRight}>
          <Text style={styles.pageBottomText}>23.48%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageWrap: {
    width: DIVICE.DEVICE_WIDTH,
    height: DIVICE.DEVICE_HEIGHT,
  },

  pageTop: {
    width: DIVICE.DEVICE_WIDTH,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  pageTopText: {
    fontSize: 10,
  },
  pageBottom: {
    width: DIVICE.DEVICE_WIDTH,
    height: 30,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  pageBottomLeft: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageBottomRight: {
    justifyContent: 'center',
  },
  pageBottomText: {
    fontSize: 10,
  },
  pageBottomIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  pageCenter: {
    width: DIVICE.DEVICE_WIDTH,
    height: DIVICE.DEVICE_HEIGHT - 60,
    paddingLeft: 15,
    paddingRight: 15,
  },
  pageCenterTitle: {
    fontSize: 26,
    height: 100,
    textAlignVertical: 'bottom',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 20,
    marginBottom: 20,
    paddingLeft: 10,
  },
  pageCenterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

function _renderCenter(item, novelReaderSetting, key) {
  const {data, isNoChapterFirstPage} = item,
    {fontSize, spaceBetween} = novelReaderSetting;
  let resultArr = [];
  if (isNoChapterFirstPage) {
    resultArr.push(
      <Text
        numberOfLines={1}
        key={item.cN + 'title'}
        style={[
          styles.pageCenterTitle,
          {
            color:
              novelReaderSetting.themeColor === '#1A100F' ? '#594F4E' : '#333',
          },
        ]}>
        {item.cN}
      </Text>,
    );
  }
  data.forEach((one, index) => {
    if (one[0] === ' ' && one[1] === ' ') {
      one = one.substr(2, one.length);
      resultArr.push(
        <Text
          style={{
            fontSize: novelReaderSetting.fontSize,
            lineHeight:
              novelReaderSetting.fontSize + novelReaderSetting.spaceBetween,
            textAlignVertical: 'center',
            color:
              novelReaderSetting.themeColor === '#1A100F' ? '#594F4E' : '#333',
          }}
          key={key + ',' + index}>
          &emsp;&emsp;{one}
        </Text>,
      );
    } else {
      resultArr.push(
        <Text
          style={{
            fontSize: novelReaderSetting.fontSize,
            lineHeight:
              novelReaderSetting.fontSize + novelReaderSetting.spaceBetween,
            textAlignVertical: 'center',
            color:
              novelReaderSetting.themeColor === '#1A100F' ? '#594F4E' : '#333',
          }}
          key={key + ',' + index}>
          {one}
        </Text>,
      );
    }
  });
  return <View>{resultArr}</View>;
}
