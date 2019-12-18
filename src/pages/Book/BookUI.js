import React from 'react';
import {Button, Icon, Text, View, ActionSheet} from 'native-base';

import {
  GLOBEL_NOVEL_CATALOGLIST_URL,
  DEFAULT_COLOR,
} from '../../util/utilParams';

import style from '../../util/utilStyles';

import {fetchCatalogList} from '../../dataStore/index';

import {
  StyleSheet,
  Dimensions,
  Image,
  TouchableHighlight,
  FlatList,
  StatusBar,
} from 'react-native';

/**
 * 渲染单个novel组件的ui
 * @param {int} index
 * @param {string} url
 * @param {string} title
 */
function novelItem(detail, navigation, mapSetNovelCurrentNovel) {
  const {title, imgUrl, dataSocure} = detail;
  return (
    <TouchableHighlight
      activeOpacity={1}
      underlayColor="#fff"
      onPress={() => {
        let params = dataSocure.split('/')[4],
          url = GLOBEL_NOVEL_CATALOGLIST_URL + params;
        fetchCatalogList(url, detail)
          .then(data => {
            mapSetNovelCurrentNovel(data);
            navigation.navigate('NovelReaderStack');
          })
          .catch(err => {
            console.log(err);
          });
      }}>
      <View style={styles.novleItem}>
        <Image source={{uri: `http:${imgUrl}`}} style={styles.novleItemImage} />
        <Text numberOfLines={1} style={styles.novleItemText}>
          {title}
        </Text>
      </View>
    </TouchableHighlight>
  );
}
/**
 * 渲染最后一行不够的novel组件ui
 * @param {int} index
 */

function emptyItem() {
  return <View style={styles.novleItem} />;
}

/**
 * 主要是返回个导入本地的文件库
 * @private
 */
function funItem(navigation) {
  const BUTTONS = [
    {text: '去找书', icon: 'ios-add', iconColor: '#aaa', key: 'find'},
    {text: '导入本地图书', icon: 'download', iconColor: '#aaa', key: 'export'},
  ];
  return (
    <View style={[styles.novleItem, styles.aloneFun]}>
      <Button
        onPress={() => {
          ActionSheet.show(
            {
              options: BUTTONS,
              title: '更多操作',
            },
            buttonIndex => {
              switch (buttonIndex) {
                case 0:
                  navigation.navigate('LibraryPage');
                  break;
                case 1:
                  console.log('导入本地书吧');
                  break;
              }
            },
          );
        }}>
        <View style={styles.novleAdd}>
          <Icon name="add" style={{color: '#aaa', fontSize: 50}} />
        </View>
      </Button>
      <Text style={styles.novleItemText} />
    </View>
  );
}

export default props => {
  const {navigation, novelBookStackList, mapSetNovelCurrentNovel} = props;
  let data = novelBookStackList.concat({add: true}),
    len = 3 - (data.length % 3);
  for (let i = 0; i < len; i++) {
    data.push({
      empty: true,
    });
  }
  return (
    <View style={style.wrap}>
      <View style={style.header}>
        <View style={style.headerLeft} />
        <View style={style.headerCenter}>
          <Text style={[style.headerColor, style.headerCenterText]}>
            趣味书屋
          </Text>
        </View>
        <View style={style.headerRight}>
          <Icon
            onPress={() => {
              navigation.navigate('SearchStack');
            }}
            name="search"
            style={style.headerColor}
          />
        </View>
      </View>
      <StatusBar backgroundColor={DEFAULT_COLOR} />
      <View style={style.body}>
        <FlatList
          keyExtractor={item => {
            return item.dataSocure;
          }}
          numColumns={3}
          columnWrapperStyle={styles.flatListWrap}
          data={data}
          renderItem={({item}) => {
            if (item.add) {
              return funItem(navigation);
            } else if (item.empty) {
              return emptyItem();
            } else {
              return novelItem(item, navigation, mapSetNovelCurrentNovel);
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#fff',
  },
  novleItemImage: {
    width: 100,
    height: 125,
    borderRadius: 5,
  },
  content: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  flatListWrap: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  novleItem: {
    width: 100,
    marginTop: 20,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  novleItemText: {
    fontSize: 14,
    width: 100,
    textAlign: 'left',
  },

  novleAdd: {
    width: 100,
    height: 125,
    backgroundColor: '#DEDEDE',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  down: {
    position: 'absolute',
    top: 51,
    right: 0,
    width: 120,
    height: 120,
    backgroundColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
    shadowOpacity: 0.5,
    elevation: 10,
  },
  downButton: {
    height: 30,
    borderBottomWidth: 1,
    borderColor: '#f9f9f9',
    width: 120,
    backgroundColor: '#fff',
    elevation: 0,
  },
  downText: {
    color: '#000',
    width: 120,
    textAlign: 'center',
  },
  downWindon: {},
  moreStyle: {
    color: '#fff',
    height: 37,
    marginLeft: 10,
    marginRight: 10,
  },
  menuItemStyle: {
    color: '#999',
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderBottomColor: '#f0f0f0',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
