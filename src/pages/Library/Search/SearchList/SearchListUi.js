import React from 'react';
import {Spinner, Icon, Text, View} from 'native-base';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  Image,
  StatusBar,
} from 'react-native';

import style from '../../../../util/utilStyles';
import {DEFAULT_COLOR} from '../../../../util/utilParams';

export default props => {
  const {searchKey, navigation} = props;
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
        <View
          style={[
            style.headerCenter,
            {
              justifyContent: 'flex-start',
              flexDirection: 'row',
              marginLeft: 20,
            },
          ]}>
          <Text style={[style.headerColor, style.headerCenterText]}>
            {searchKey}
          </Text>
        </View>
        <View style={style.headerRight} />
      </View>

      <StatusBar backgroundColor={DEFAULT_COLOR} />
      <View style={style.wrap}>
        <FlatList
          ItemSeparatorComponent={() => {
            return <View style={styles.ItemSeparator} />;
          }}
          keyExtractor={item => item.dataSocure}
          data={props.searchList}
          renderItem={({item}) => {
            return _renderItem(
              item,
              props.mapFetchLocalOrNetNovelData,
              navigation,
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View
                style={[
                  style.wrap,
                  {
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                <Spinner color={DEFAULT_COLOR} />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

function _renderItem(item, mapFetchLocalOrNetNovelData, navigation) {
  const stateColor = item.state === '完结' ? '#00c98d' : '#499fff';
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('LibararyDetailsStack', {details: item});
      }}>
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <Image source={{uri: `http:${item.imgUrl}`}} style={styles.itemImg} />
        </View>
        <View style={styles.itemRight}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.itemRightText}>作者：{item.author}</Text>
          <Text style={styles.itemRightText} numberOfLines={2}>
            简介：{item.introduce}
          </Text>
          <View style={styles.itemRightText}>
            <View style={[styles.itemRightTextView, {borderColor: stateColor}]}>
              <Text style={[styles.itemRightTextSub, {color: stateColor}]}>
                {item.state}
              </Text>
            </View>
            <View style={styles.itemRightTextView}>
              <Text style={styles.itemRightTextSub}>{item.type}</Text>
            </View>
            <View style={styles.itemRightTextView}>
              <Text style={styles.itemRightTextSub}>
                {parseInt(item.fontTotal)}万
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    color: '#C1C1C1',
  },
  headerText: {
    color: '#C1C1C1',
    fontSize: 18,
  },
  wrap: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 150,
    padding: 15,
  },
  ItemSeparator: {
    height: 15,
    backgroundColor: '#aaa',
    opacity: 0.2,
  },
  itemLeft: {
    width: 100,
  },
  itemRight: {
    flex: 1,
    height: 120,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    color: '#333',
  },
  itemRightText: {
    fontSize: 14,
    color: '#999',
    flexDirection: 'row',
  },
  itemRightTextView: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 5,
    paddingLeft: 8,
    paddingRight: 8,
  },
  itemRightTextSub: {
    fontSize: 12,
    color: '#E0E0E0',
  },
  itemImg: {
    width: 90,
    height: 120,
  },
});
