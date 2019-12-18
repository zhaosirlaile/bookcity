import React, {useRef} from 'react';
import {Icon, Text, View, Thumbnail, Spinner} from 'native-base';

let faltRef;

import {
  StyleSheet,
  Platform,
  FlatList,
  TouchableWithoutFeedback,
  Modal,
  StatusBar,
} from 'react-native';

import {DIVICE, MALE_NOVEL_STATE, DEFAULT_COLOR} from '../../util/utilParams';

import {FEMALE_NOVEL, MALE_NOVEL} from './config';

import style from '../../util/utilStyles';

export default props => {
  const {myChangeState, changeActiveClassNovel} = props;
  return (
    <View style={style.wrap}>
      <View style={style.header}>
        <View style={style.headerLeft}>
          <Text style={[style.headerColor, {width: 50, fontSize: 20}]}>
            书城
          </Text>
        </View>
        <View style={[style.headerCenter, styles.headerCenter]}>
          <View style={styles.segment}>
            <Text
              onPress={() => {
                if (props.isNoGender === true) {
                  return;
                }
                props.changeMaleorFemaleNovel(!props.isNoGender);
              }}
              style={[
                styles.segmentFont,
                props.isNoGender === true ? styles.segmentFontActive : null,
              ]}>
              男生
            </Text>
            <Text
              onPress={() => {
                if (props.isNoGender === false) {
                  return;
                }
                props.changeMaleorFemaleNovel(!props.isNoGender);
              }}
              style={[
                styles.segmentFont,
                props.isNoGender === false ? styles.segmentFontActive : null,
              ]}>
              女生
            </Text>
          </View>
        </View>
        <View style={style.headerRight}>
          <Icon
            name="search"
            style={style.headerColor}
            onPress={() => {
              props.navigation.navigate('LibrarySearchStack');
            }}
          />
        </View>
      </View>

      <StatusBar backgroundColor={DEFAULT_COLOR} />

      <View style={[style.body, {backgroundColor: '#F5F6F6'}]}>
        <View style={styles.container}>
          <FlatList
            ref={flatList => (faltRef = flatList)}
            data={props.novelList}
            renderItem={({item}) => _renderRealNovelItem(item, props)}
            onEndReached={x => {
              props.loadMoreNovel();
            }}
            onEndReachedThreshold={0.2}
            ListFooterComponent={() => {
              return _renderRealNovelFooterComponent(props);
            }}
            getItemLayout={(data, index) => ({
              length: 93,
              offset: 93 * index,
              index,
            })}
            ListEmptyComponent={() => {
              return (
                <View>
                  <Spinner color={DEFAULT_COLOR} />
                </View>
              );
            }}
            keyExtractor={(item, index) => `${item.key}${index}`}
          />
        </View>
        <View style={styles.containerTop}>
          <TouchableWithoutFeedback
            onPress={() => {
              myChangeState({isNoModal: !props.isNoModal});
            }}>
            <View style={styles.containerTopWrap}>
              <Text style={styles.containerTopText}>
                {props.active.subActive && props.active.subActive.key}
              </Text>
              <Text style={styles.containerTopText}>最新</Text>
              <Icon style={styles.containerTopIcon} name={'ios-arrow-down'} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.novelNav}>
          <FlatList
            keyExtractor={(item, index) => {
              return item + index;
            }}
            initialNumToRender={20}
            data={props.maleorFemaleNovel}
            renderItem={({item}) => {
              let activeItem = null;
              if (props.active.key === item.key) {
                activeItem = styles.novelNavActiveItem;
              }
              return (
                <Text
                  onPress={() => {
                    if (item.key === props.active) {
                      return;
                    }
                    myChangeState(
                      {active: {...item, subActive: item.childClass[0]}},
                      () => {
                        changeActiveClassNovel();
                      },
                    );
                  }}
                  style={[styles.novelNavItem, activeItem]}
                  key={item.key}>
                  {item.key}
                </Text>
              );
            }}
          />
        </View>
      </View>
      {_renderModalBody(props)}
    </View>
  );
};
function _renderModalBody(props) {
  const {myChangeState} = props;
  return (
    <Modal animationType={'fade'} transparent={true} visible={props.isNoModal}>
      <View style={styles.modalTop} />
      <View style={styles.modalBody}>
        <View style={styles.modalBodyContent}>
          <View style={styles.modalBodyContentWrap}>
            <View
              style={[
                styles.modalBodyContentWrapItem,
                {justifyContent: 'space-between', marginRight: 27},
              ]}>
              <Text style={styles.modalBodyContentWrapText}>排序</Text>
              <TouchableWithoutFeedback
                onPress={() => {
                  myChangeState({isNoModal: !props.isNoModal});
                }}>
                <View style={styles.modalBodyContentWrapItem}>
                  <Text
                    style={[
                      styles.modalBodyContentWrapText,
                      {color: '#FF8E14'},
                    ]}>
                    收起
                  </Text>
                  <Icon
                    name={'ios-arrow-up'}
                    style={[
                      styles.modalBodyContentWrapText,
                      {fontSize: 16, marginLeft: 5, color: '#FF8E14'},
                    ]}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.modalBodyContentWrapItem}>
              {MALE_NOVEL_STATE.map(item => {
                return (
                  <Text key={item} style={styles.modalBodyContentWrapItemText}>
                    {item}
                  </Text>
                );
              })}
            </View>
          </View>
          <View style={styles.modalBodyContentWrap}>
            <Text style={styles.modalBodyContentWrapText}>分类标签</Text>
            <View style={styles.modalBodyContentWrapItem}>
              {(() => {
                if (!props.active.subActive) {
                  return;
                }
                return props.active.childClass.map(item => {
                  return (
                    <Text
                      key={item.key}
                      style={styles.modalBodyContentWrapItemText}
                      onPress={() => {
                        const newActive = props.active;
                        newActive.subActive = item;
                        faltRef.scrollToOffset({
                          animated: true,
                          viewPosition: 0,
                          index: 0,
                        });
                        props.myChangeState(
                          {active: newActive, isNoModal: false},
                          () => {
                            props.changeActiveClassNovel(item);
                          },
                        );
                      }}>
                      {item.key}
                    </Text>
                  );
                });
                // }
                // }
              })()}
            </View>
          </View>
        </View>
        <Text
          style={{flex: 1}}
          onPress={() => {
            myChangeState({isNoModal: !props.isNoModal});
          }}
        />
      </View>
      <View style={styles.modalBottom} />
    </Modal>
  );
}

function _renderRealNovelItem(item, props) {
  const {navigation, maleActive} = props;
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        const details = {
          ...item,
          type: props.active.key,
        };
        navigation.navigate('LibraryDetailsPage', {
          details,
        });
      }}>
      <View style={styles.novelItem}>
        <View style={styles.novelItemLeft}>
          <Thumbnail
            square
            source={{
              uri: `https:${item.imgUrl}`,
            }}
            style={styles.novelItemLeftImg}
          />
        </View>
        <View style={styles.novelItemRight}>
          <Text style={styles.novelItemRightTitle}>{item.title}</Text>
          <Text numberOfLines={2} style={styles.novelItemRightIntroduce} note>
            {item.introduce}
          </Text>
          <Text style={styles.novelItemRightAnchor} note>
            {item.author}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

function _renderRealNovelFooterComponent(props) {
  const {novelList} = props;
  const state = ['正在加载中...', '已经到底了O(∩_∩)O哈哈~'];
  const stateStr = novelList.length < 20 ? state[1] : state[0];
  const isNoEmpty = novelList.length === 0 ? true : false; // 判断 props.noveList 是否为空数组 ： true 表示为空数组 ，false 反之
  return (
    <View
      style={[
        styles.containerFooterLoaderWrap,
        {opacity: isNoEmpty ? 0.0 : 1.0},
      ]}>
      <Text style={styles.containerFooterLoaderWrapText}>{stateStr}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerCenter: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  segment: {
    flexDirection: 'row',
    width: 120,
    borderRadius: 20,
  },
  segmentFont: {
    padding: 5,
    flex: 1,
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  segmentFontActive: {
    borderBottomColor: '#fff',
    borderBottomWidth: 3,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    width: DIVICE.DEVICE_WIDTH - 100,
    marginTop: 50,
    paddingLeft: 5,
    marginLeft: 100,
  },
  containerFooterLoaderWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  containerFooterLoaderWrapText: {
    color: '#999',
    fontSize: 13,
  },
  containerTop: {
    position: 'absolute',
    backgroundColor: '#fff',
    // zIndex: 1,
    height: 50,
    width: DIVICE.DEVICE_WIDTH - 100,
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    flexDirection: 'row',
  },
  containerTopWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  containerTopText: {
    color: '#FF870B',
    marginLeft: 5,
  },
  containerTopIcon: {
    marginLeft: 10,
    color: '#FF870B',
    fontSize: 18,
  },
  content: {
    marginTop: 50,
    flexDirection: 'row',
    marginBottom: 20,
  },
  novelNav: {
    position: 'absolute',
    height: 750,
    left: 0,
  },
  novelNavItem: {
    height: 50,
    backgroundColor: '#F5F6F6',
    width: 100,
    color: '#9E9E9E',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    ...Platform.select({
      ios: {
        lineHeight: 50,
      },
      android: {},
    }),
  },
  novelNavActiveItem: {
    backgroundColor: '#fff',
    borderLeftWidth: 4,
    borderLeftColor: '#FF8400',
    color: '#FF8400',
  },
  novel: {
    width: DIVICE.DEVICE_WIDTH - 100,
    backgroundColor: '#fff',
    // height: 300,
    marginLeft: 100,
    paddingLeft: 0,
  },
  novelItem: {
    marginTop: 10,
    flexDirection: 'row',
  },
  novelItemLeft: {
    // marginLeft: -15,
  },
  novelItemLeftImg: {
    width: 70,
    height: 93,
  },
  novelItemRight: {
    marginLeft: 10,
    height: 90,
    justifyContent: 'space-between',
    // marginLeft: 5,
  },
  novelItemRightTitle: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  novelItemRightIntroduce: {
    width: DIVICE.DEVICE_WIDTH - 180,
    fontSize: 12,
    color: '#999',
  },
  novelItemRightAnchor: {
    fontSize: 11,
    color: '#999',
  },
  modal: {},
  modalTop: {
    height: 56,
  },
  modalBody: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBodyContent: {
    height: 200,
    backgroundColor: '#fff',
  },
  modalBodyContentWrap: {
    marginLeft: 20,
    marginTop: 10,
  },
  modalBodyContentWrapItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
  },
  modalBodyContentWrapText: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  modalBodyContentWrapItemText: {
    backgroundColor: '#FFF5EA',
    color: '#FF8E14',
    width: 80,
    fontSize: 13,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    marginRight: 10,
    marginTop: 10,
    borderRadius: 13,
    height: 25,
    ...Platform.select({
      ios: {
        lineHeight: 50,
      },
      android: {},
    }),
  },
  modalBottom: {
    height: 50,
    // backgroundColor: 'red',
  },
});
