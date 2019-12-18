import React from 'react';
import {Container, View, Spinner} from 'native-base';

import {StyleSheet, Text, Modal, StatusBar, FlatList} from 'react-native';

const renderData = [];
import _renderSettingModal from './_settingModal';
import _renderMainModal from './_mainModal';

import chapter from './chapter';
import page from './page';
let flatView = null,
  renderOne = 1;

import {DIVICE} from '../../../../util/utilParams';

export default props => {
  const {changeTotalChapterData, novelReaderSetting, data, details} = props;
  return (
    <Container
      style={[
        styles.container,
        {
          backgroundColor: novelReaderSetting.themeColor,
        },
      ]}>
      <StatusBar
        translucent={true}
        hidden={props.isNoShowStatuBar}
        backgroundColor={'#333'}
        showHideTransition={'fade'}
      />
      <Modal
        visible={props.isNoShowNovelControl}
        animationType={'fade'}
        transparent={true}
        onRequestClose={() => {
          props.myChangeState({
            isNoShowNovelControl: false,
            isNoShowStatuBar: true,
          });
        }}>
        {_renderMainModal(props)}
      </Modal>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={props.stylesModalVisible}>
        {_renderSettingModal(props)}
      </Modal>
      {/* 当前的小说阅读区 */}
      <FlatList
        ref={util => (flatView = util)}
        ListEmptyComponent={() => {
          return (
            <View style={styles.spinnerWrap}>
              <Spinner />
              <Text style={styles.spinnerText}>正在记载中...</Text>
            </View>
          );
        }}
        removeClippedSubviews={true}
        onTouchEnd={e => {
          props.handelNovel(e, flatView);
        }}
        data={props.data}
        keyExtractor={(item, index) => {
          return item.cN + index;
        }}
        scrollEventThrottle={0}
        pagingEnabled={true}
        horizontal={true}
        renderItem={({item, index}) => {
          return page(item, novelReaderSetting, index);
        }}
        initialNumToRender={20}
        initialScrollIndex={props.gotoFlatViewPage}
        getItemLayout={(data, index) => ({
          length: DIVICE.DEVICE_WIDTH,
          offset: DIVICE.DEVICE_WIDTH * index,
          index,
        })}
        onMomentumScrollEnd={event => {
          const xOffsetIndex = Math.ceil(
              Math.round(event.nativeEvent.contentOffset.x) /
                parseInt(DIVICE.DEVICE_WIDTH),
            ),
            {
              myChangeState,
              currentChapter,
              addNextChapter,
              addPrevChapter,
              catalog,
            } = props;
          myChangeState({gotoFlatViewPage: xOffsetIndex});
          if (currentChapter && currentChapter.cN === data[xOffsetIndex].cN) {
            return;
          }
          const catalogList = catalog.vs,
            chapterIndex = props.countCurrentChapterInCatalogListOfIndex(
              data[xOffsetIndex],
            ),
            alterCurrentChapter = catalogList[chapterIndex];
          props.saveCurrentChapter(alterCurrentChapter);
          // true 是下一章 ， false 是上一章
          if (alterCurrentChapter.uuid > props.currentChapter.uuid) {
            addNextChapter(chapterIndex);
          } else {
            addPrevChapter(chapterIndex, flatView);
          }
        }}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    width: DIVICE.DEVICE_WIDTH,
    height: DIVICE.DEVICE_HEIGHT,
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  spinnerWrap: {
    width: DIVICE.DEVICE_WIDTH,
    height: DIVICE.DEVICE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerText: {
    color: '#999',
  },
});

let debounce = fn => {
  clearTimeout(debounce.id);
  debounce.id = setTimeout(() => {
    fn();
  }, 50);
};
