import React, {useRef} from 'react';
import {StyleSheet, TouchableOpacity, StatusBar} from 'react-native';

import Toast from '../../../../components/Toast';
let toast;
import {View, Text, Icon, Button, Thumbnail, Spinner} from 'native-base';

import {DEFAULT_COLOR} from '../../../../util/utilParams';
import style from '../../../../util/utilStyles';

export default props => {
  return _renderIsNoSpainner(props);
};

function _renderIsNoSpainner(props) {
  const {details} = props,
    isNo = props.isNoInNovelBookStackList(),
    stateColor = details.state === '完结' ? '#00c98d' : '#499fff';
  return (
    <View style={style.wrap}>
      <View style={style.header}>
        <View style={style.headerLeft}>
          <Icon
            onPress={() => {
              props.navigation.pop();
            }}
            name="ios-arrow-back"
            style={style.headerColor}
          />
        </View>
        <View style={style.headerCenter}>
          <View />
        </View>
      </View>
      <StatusBar backgroundColor={DEFAULT_COLOR} />

      <Toast ref={x => (toast = x)} />
      <View style={[style.body, styles.container]}>
        <View style={styles.One}>
          <View style={styles.OneLeft}>
            <Thumbnail
              style={styles.OneLeftImage}
              square
              source={{uri: `https://${details.imgUrl}`}}
            />
          </View>
          <View style={styles.OneRight}>
            <Text style={styles.OneRightTitle}>{details.title}</Text>

            <View style={styles.OneRightRow}>
              <Text style={styles.OneRightText}>作者：</Text>
              <Text style={styles.OneRightAuthor}>{details.author}</Text>
            </View>
            <View style={styles.OneRightRow}>
              <Text style={styles.OneRightText}>分类：</Text>
              <Text style={styles.OneRightClass}>{details.type}</Text>
            </View>
            <View style={styles.OneRightRow}>
              <Text style={styles.OneRightText}>状态：</Text>
              <Text
                style={[
                  {color: stateColor, borderColor: stateColor},
                  styles.OneRightState,
                ]}>
                {details.state}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (!props.lastNovelCapther) {
              return;
            }
            props.navigation.navigate('LibraryDetailsCatalog');
          }}>
          <View style={styles.two}>
            <View style={styles.twoLeft}>
              <Icon name={'ios-menu'} />
              <Text style={styles.twoLeftText}>查看目录</Text>
            </View>
            {(() => {
              if (props.lastNovelCapther) {
                return (
                  <Text style={styles.twoCenterText} numberOfLines={1}>
                    更新至：{props.lastNovelCapther.cN}
                  </Text>
                );
              } else {
                return (
                  <View>
                    <Spinner />
                  </View>
                );
              }
            })()}

            <Icon name={'ios-arrow-forward'} />
          </View>
        </TouchableOpacity>

        <View style={styles.three}>
          <View style={styles.introduce}>
            <Text style={styles.introduceText}>{details.introduce}</Text>
          </View>
        </View>
      </View>
      <View style={style.bottom}>
        <Button
          large
          block
          style={styles.footerLeft}
          transparent
          onPress={() => {
            const {
              mapUpdateNovelBookStackList,
              details,
              novelBookStackList,
            } = props;
            if (!isNo) {
              let arr = novelBookStackList;
              arr.push(details);
              toast.showAfterSecondClose(1, '成功添加到书架', 'bottom');
              mapUpdateNovelBookStackList(arr);
            } else {
              toast.showAfterSecondClose(1, '已经加入书架了', 'bottom');
              return;
            }
          }}>
          <Text
            style={[
              styles.fonterText,
              {
                color: isNo === false ? '#333' : '#999',
              },
            ]}>
            {isNo === false ? '加入书架' : '已经加入书架'}
          </Text>
        </Button>
        <Button
          large
          block
          style={styles.footerRight}
          onPress={() => {
            props.saveNovelCurrentChapter(props.firstNovelCapter);
            props.navigation.navigate('LibraryNovelReaderStack');
          }}>
          <Text style={styles.fonterText}>立即阅读</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  One: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 30,
  },
  OneLeft: {},
  OneLeftImage: {
    width: 120,
    height: 160,
  },
  OneRight: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'space-between',
  },
  OneRightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  OneRightText: {
    fontSize: 14,
    color: '#999',
  },
  OneRightTitle: {
    marginTop: 5,
    marginBottom: 15,
    fontSize: 17,
    color: '#555',
    fontWeight: 'bold',
  },
  OneRightState: {
    borderWidth: 1,
    width: 30,
    textAlign: 'center',
    fontSize: 12,
  },
  OneRightAuthor: {
    color: '#999',
  },
  OneRightClass: {
    color: '#999',
  },
  two: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  twoLeft: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  twoLeftText: {
    marginLeft: 10,
  },
  twoCenterText: {
    color: '#999',
    fontSize: 15,
    marginLeft: 10,
    width: 200,
  },
  three: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#f9f9f9',
  },
  introduce: {
    borderTopColor: '#f0f0f0',
    borderTopWidth: 1,
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  introduceText: {
    fontSize: 16,
    color: '#999',
  },
  footerLeft: {
    flex: 1,
  },
  footerRight: {
    flex: 1,
    backgroundColor: '#FF870D',
  },
  fonterText: {
    fontSize: 18,
  },
});
