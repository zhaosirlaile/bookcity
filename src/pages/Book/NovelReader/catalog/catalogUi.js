import React from 'react';
import {
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';

import {View, Text, Icon} from 'native-base';

import {DIVICE, DEFAULT_COLOR} from '../../../../util/utilParams';
import style from '../../../../util/utilStyles';

export default props => {
  const {navigation, currentChapter} = props;
  return (
    <View style={style.wrap}>
      <View style={styles.header}>
        <View style={style.headerLeft}>
          <Icon
            style={style.headerColor}
            name={'ios-arrow-back'}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <View style={styles.headerCenter}>
          <Text style={styles.headerText}>《{props.details.title}》</Text>
        </View>
        <View style={style.headerRight} />
      </View>
      <StatusBar backgroundColor={'#3A3A3A'} hidden={false} />
      <View style={styles.two}>
        <Text style={[styles.twoText, styles.twoTextActive]}>目录</Text>
        <Text
          style={[
            styles.twoText,
            {
              borderLeftColor: '#404040',
              borderLeftWidth: 1,
            },
          ]}>
          标签
        </Text>
      </View>
      <View style={[styles.container]}>{_renderFlatList(props)}</View>
    </View>
  );
};

function _renderFlatList(props) {
  const currentChapterIndex = props.currentChapter.uuid,
    catalogList = props.catalog.vs;
  return (
    <FlatList
      data={catalogList}
      ItemSeparatorComponent={() => {
        return <Text style={{height: 1, backgroundColor: '#f0f0f0'}} />;
      }}
      initialScrollIndex={props.currentChapter.uuid - 8}
      renderItem={({item, index}) => {
        return (
          <TouchableWithoutFeedback
            onPress={() => {
              props.mapSaveCurrentChapter(item);
              props.navigation.pop();
              props.navigation.pop();
              props.navigation.navigate('NovelReaderStack');
            }}>
            <View style={styles.row}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={[
                  styles.flatListText,
                  item.uuid === currentChapterIndex
                    ? styles.currentReader
                    : null,
                ]}>
                {item.cN}
              </Text>
              {item.download === true ? (
                <Text
                  style={[
                    {fontSize: 16, color: '#999'},
                    item.uuid === currentChapterIndex
                      ? styles.currentReader
                      : null,
                  ]}>
                  已下载
                </Text>
              ) : null}
            </View>
          </TouchableWithoutFeedback>
        );
      }}
      keyExtractor={item => {
        return item.uuid;
      }}
      getItemLayout={(data, index) => ({
        length: 46,
        offset: 46 * index,
        index,
      })}
      initialNumToRender={100}
      removeClippedSubviews={true}
    />
  );
}
const styles = StyleSheet.create({
  header: {
    marginTop: 27,
    backgroundColor: '#3A3A3A',
    height: 55,
    flexDirection: 'row',
  },
  headerIconstyle: {
    width: 40,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 20,
  },
  headerCenter: {
    position: 'absolute',
    width: DIVICE.DEVICE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
  },
  headerText: {
    fontSize: 18,
    left: 0,
    color: '#C7C7C7',
    top: 0,
  },
  headerColor: {
    color: '#B9B9B9',
  },
  two: {
    borderTopColor: '#404040',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#3A3A3A',
  },
  twoText: {
    height: 40,
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: '#999',
    textAlignVertical: 'center',
  },
  twoTextActive: {
    color: '#DE985D',
    borderBottomColor: '#DE985D',
    borderBottomWidth: 3,
  },
  flatListText: {
    fontSize: 18,
    textAlignVertical: 'center',
    width: DIVICE.DEVICE_WIDTH * 0.7,
  },
  container: {
    flex: 1,
  },
  currentReader: {
    color: '#F66F17',
  },
  tab: {
    backgroundColor: '#3A3A3A',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20,
    height: 60,
  },
});
