import React, {useRef} from 'react';
import {Icon, Text, View} from 'native-base';
import {TextInput, StyleSheet, StatusBar} from 'react-native';

import style from '../../../../util/utilStyles';
import {DEFAULT_COLOR} from '../../../../util/utilParams';

import {hotList} from './config';

let input;

export default props => {
  const {searchHistoryList, navigation} = props;
  return (
    <View style={style.wrap}>
      <View style={style.header}>
        <View style={style.headerLeft}>
          <Icon
            onPress={() => {
              navigation.pop();
            }}
            name="ios-arrow-back"
            style={style.headerColor}
          />
        </View>
        <View style={[style.headerCenter, styles.searchCenter]}>
          <Icon style={styles.searchCenterIcon} name="ios-search" />
          <TextInput
            placeholder="请输入书名..."
            autoFocus={true}
            value={props.searchInputValue}
            onChangeText={value => {
              props.changeSearchInputValue(value);
            }}
            style={{
              flex: 1,
              marginLeft: 10,
              color: '#777',
            }}
            ref={x => (input = x)}
            onSubmitEditing={() => {
              props.submitSearchInputValue();
            }}
          />
        </View>
        <View style={[style.headerRight, styles.searchInputRight]}>
          <Text
            onPress={() => {
              input.props.onSubmitEditing();
            }}
            style={style.headerColor}>
            搜索
          </Text>
        </View>
      </View>
      <StatusBar backgroundColor={DEFAULT_COLOR} />
      <View style={style.body}>
        <View style={styles.hotSearchWrap}>
          <Text style={[styles.rowHeight, styles.hotSearchWrapHeader]}>
            热门搜索
          </Text>
          <View style={styles.hotSearchList}>
            {hotList.map((item, index) => {
              let hotColor;
              if (index === 2 || index === 5 || index === 9) {
                hotColor = '#E79651';
              } else {
                hotColor = '#E9E9E9';
              }
              return (
                <Text
                  onPress={() => {
                    props.changeSearchInputValue(item);
                    setTimeout(() => {
                      input.props.onSubmitEditing();
                    }, 0);
                  }}
                  style={[
                    styles.hotSearchListItem,
                    {
                      color: hotColor === '#E9E9E9' ? '#333' : hotColor,
                      borderColor: hotColor,
                    },
                  ]}
                  key={item + index}>
                  {item}
                </Text>
              );
            })}
          </View>
        </View>
        <View style={styles.searchHistoryWrap}>
          <View style={styles.searchHistoryTop}>
            <Text style={styles.searchHistoryBottomHeaderItem}>搜索历史</Text>
            <Icon
              key={'clear'}
              style={[styles.searchHistoryBottomHeaderItem, {fontSize: 22}]}
              onPress={() => {
                props.mapClearSearchHistory();
              }}
              name="ios-trash"
            />
          </View>

          <View style={styles.searchHistoryList}>
            {searchHistoryList.map((item, index) => {
              return (
                <Text
                  onPress={() => {
                    props.changeSearchInputValue(item);
                    setTimeout(() => {
                      input.props.onSubmitEditing();
                    }, 0);
                  }}
                  style={styles.searchHistoryItem}
                  key={item + index}>
                  {item}
                </Text>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#F5F5F5',
  },
  searchCenter: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 40,
    borderRadius: 5,
    marginLeft: 7,
    marginTop: 8,
    justifyContent: 'flex-start',
  },
  searchCenterIcon: {
    color: '#999',
    fontSize: 20,
    marginLeft: 10,
  },
  searchInputRight: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 50,
    paddingLeft: 10,
  },
  hotSearchWrap: {
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
  },
  hotSearchList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  hotSearchListItem: {
    marginTop: 15,
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    marginRight: 7,
    borderRadius: 20,
    textAlignVertical: 'center',
    borderWidth: 1,
    borderColor: '#EDEDED',
  },
  searchHistoryItem: {
    marginTop: 15,
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    marginRight: 7,
    borderRadius: 20,
    textAlignVertical: 'center',
    borderWidth: 1,
    borderColor: '#EDEDED',
  },
  searchHistoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  hotSearchWrapHeader: {
    textAlignVertical: 'center',
    borderBottomColor: '#EFEFEF',
    borderBottomWidth: 1,
    fontSize: 18,
    color: '#A1A1A1',
  },
  rowHeight: {
    height: 50,
  },
  searchHistoryWrap: {
    marginTop: 20,
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
  },
  searchHistoryTop: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#EFEFEF',
    borderBottomWidth: 1,
  },
  searchHistoryBottomHeaderItem: {
    textAlignVertical: 'center',
    fontSize: 17,
    color: '#A1A1A1',
  },
});
