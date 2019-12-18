import React, {PureComponent} from 'react';
import {Dimensions} from 'react-native';

import {GLOBEL_NOVEL_CATALOGLIST_URL} from '../../../../util/utilParams';
import {saveBykey} from '../../../../dataStore/AsyncStorage';
import ContentFaltListUi from './contentFaltListUi';

const EVERY_GET_CHAPTER_TOTAL = 4;

import {connect} from 'react-redux';

let cacheChapter = [];

import {
  alternovelReaderSetting,
  saveNovelCurrentChapter,
  setNovelChapterDownloadStatus,
} from '../../../../redux/actionCreator/novel';
import {fetchChapter} from '../../../../dataStore';

import createChapter, {commonCreate} from './chapter';
import {themeColors, spaceBetween} from './config';

class NovelRenderContent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      acitveChapterIndex: null,
      isNoShowStatuBar: true,
      isNoShowSetting: false,
      isNoShowNovelControl: false,
      stylesModalVisible: false,
      gotoFlatViewPage: null,
    };
    this.changeStylesModalVisible = this.changeStylesModalVisible.bind(this);
    this.countCurrentChapterInCatalogListOfIndex = this.countCurrentChapterInCatalogListOfIndex.bind(
      this,
    );
    this.addNextChapter = this.addNextChapter.bind(this);
    this.addPrevChapter = this.addPrevChapter.bind(this);
    this.myChangeState = this.myChangeState.bind(this);
    this.handelNovel = this.handelNovel.bind(this);
    this.alterFontSize = this.alterFontSize.bind(this);
  }
  componentDidMount() {
    this.getData();
  }

  myChangeState(obj, callback) {
    this.setState(obj, callback && callback());
  }
  componentWillUnmount() {
    const {currentChapter, catalog, details} = this.props;
    const url = GLOBEL_NOVEL_CATALOGLIST_URL + details.dataSocure.split('/')[4];
    saveBykey(url, {
      currentChapter,
      catalog,
      details,
    });
    saveBykey('novelReaderSetting', this.props.novelReaderSetting);
  }
  handelNovel(e, scroll) {
    const {catalog, currentChapter} = this.props,
      catalogList = catalog.vs,
      centerY = Dimensions.get('window').height / 3,
      centerX = Dimensions.get('window').width / 2,
      x = e.nativeEvent.pageX,
      y = e.nativeEvent.pageY;
    if (x < centerX) {
      if (y > centerY && y < centerY * 2 && x > centerX / 2) {
        this.setState({
          isNoShowStatuBar: false,
          isNoShowNovelControl: true,
        });
      }
    } else {
      if (y > centerY && y < centerY * 2 && x < (centerX / 2) * 3) {
        this.setState({
          isNoShowNovelControl: true,
          isNoShowStatuBar: false,
        });
      }
    }
  }
  changeStylesModalVisible(bool) {
    // true 显示， false 消失
    this.setState({
      stylesModalVisible: bool,
    });
  }

  /**
   * 修改字体的大小
   * @param {Number} fontsize
   */
  alterFontSize(novelReaderSetting) {
    let data = this.state.data.splice(
        this.state.gotoFlatViewPage - 1,
        this.state.data.length,
      ),
      pusthData = this.setupStartRender(data, novelReaderSetting);
    this.state.data.push(...pusthData);
  }

  render() {
    return (
      <ContentFaltListUi
        details={this.props.details}
        novelReaderSetting={this.props.novelReaderSetting}
        {...this.state}
        themeColors={themeColors}
        alterFontSize={this.alterFontSize}
        changeStylesModalVisible={this.changeStylesModalVisible}
        spaceBetween={spaceBetween}
        currentChapter={this.props.currentChapter}
        navigation={this.props.navigation}
        saveCurrentChapter={this.props.saveCurrentChapter}
        countCurrentChapterInCatalogListOfIndex={
          this.countCurrentChapterInCatalogListOfIndex
        }
        addNextChapter={this.addNextChapter}
        catalog={this.props.catalog}
        addPrevChapter={this.addPrevChapter}
        myChangeState={this.myChangeState}
        handelNovel={this.handelNovel}
        alternovelReaderSetting={this.props.alternovelReaderSetting}
      />
    );
  }

  /**
   * 返回章节在目录中的位置：
   *  bool：
   *  - true , 返回章节
   *  - false , 返回章节所在目录的下标
   * @param {Object} chapter
   * @param {Boolean} bool
   */
  countCurrentChapterInCatalogListOfIndex(chapter, bool) {
    const {catalog} = this.props,
      catalogList = catalog.vs;
    for (let i = 0; i < catalogList.length; i++) {
      if (catalogList[i].uuid === chapter.uuid) {
        return bool ? catalogList[i] : i;
      }
    }
  }

  getData() {
    const {currentChapter, catalog} = this.props,
      catalogList = catalog.vs,
      currentChapterIndexInCatalogList = this.countCurrentChapterInCatalogListOfIndex(
        currentChapter,
        false,
      ), // 当前章在目录中的下标
      currentArry = this.loadData(currentChapterIndexInCatalogList);
    cacheChapter.push(...currentArry);
    // 表示当前章附近章的数据（Array）
    currentArry.forEach((item, index) => {
      this.getChapterDataAndSetDownload(item);
    });
  }

  /**
   * 向data添加数据，并给添加下载的标记
   * @param {Object} chapter 章节信息
   * @param {Boolean} bool 堆栈尾部或头部添加
   *  - true 表示头部添加
   *  - false 表示尾部添加 默认
   */
  getChapterDataAndSetDownload(chapter) {
    const {details, novelReaderSetting} = this.props;
    this.getChapterDataAndSetDownloadState(chapter)
      .then(res => {
        cacheChapter.push(chapter);
        let data = createChapter(chapter, res, novelReaderSetting, details);
        this.state.data.push(...data);
        if (this.state.gotoFlatViewPage === null) {
          if (data[0].id === this.props.currentChapter.id) {
            this.setState({
              gotoFlatViewPage: this.state.data.length - data.length,
            });
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  addPrevChapter(chapterIndex, flatView) {
    const {details, novelReaderSetting} = this.props;

    const nereByChapter = this.loadData(chapterIndex);
    nereByChapter.forEach(item => {
      if (!this.isNoInData(item)) {
        this.getChapterDataAndSetDownloadState(item)
          .then(res => {
            cacheChapter.unshift(item);
            let prevAddData = createChapter(
                item,
                res,
                novelReaderSetting,
                details,
              ),
              data = this.state.data;
            data.unshift(...prevAddData);
            flatView.scrollToIndex({
              viewPosition: 0,
              index: this.state.gotoFlatViewPage + prevAddData.length - 1,
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  }

  addNextChapter(chapterIndex) {
    const {details, novelReaderSetting} = this.props;
    const nereByChapter = this.loadData(chapterIndex);

    nereByChapter.forEach(item => {
      if (!this.isNoInData(item, true)) {
        this.getChapterDataAndSetDownloadState(item)
          .then(res => {
            cacheChapter.push(item);
            this.state.data.push(
              ...createChapter(item, res, novelReaderSetting, details),
            );
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  }

  /**
   * 重新渲染，在修改字体大小，行间距的时候使用。
   * @param {Array} data
   */
  setupStartRender(data, novelReaderSetting) {
    // console.log(data);
    const connectArr = [],
      resultArr = [];
    connectArr.push(data.shift());
    data.forEach(item => {
      if (item.uuid === connectArr[connectArr.length - 1].uuid) {
        connectArr[connectArr.length - 1].data.push(...item.data);
      } else {
        connectArr.push(item);
        connectArr[connectArr.length - 1].data.push(...item.data);
      }
    });
    connectArr.forEach(item => {
      let resultItemData = [];
      item.data.forEach(item => {
        if (item[0] === ' ' && item[1] === ' ') {
          resultItemData.push(item.trim());
        } else {
          resultItemData[resultItemData.length - 1] =
            resultItemData[resultItemData.length - 1] + item;
        }
      });
      item.data = resultItemData;
      resultItemData = [];
    });

    connectArr.map((item, index) => {
      if (item.isNoChapterFirstPage) {
        resultArr.push(
          ...createChapter(
            {
              cN: item.cN,
              cU: item.cU,
              cnt: item.cnt,
              download: item.download,
              id: item.id,
              sS: item.sS,
              uT: item.uT,
              uuid: item.uuid,
            },
            item.data,
            novelReaderSetting,
            {title: item.title},
          ),
        );
      } else {
        resultArr.push(
          ...commonCreate(
            {
              cN: item.cN,
              cU: item.cU,
              cnt: item.cnt,
              download: item.download,
              id: item.id,
              sS: item.sS,
              uT: item.uT,
              uuid: item.uuid,
            },
            item.data,
            novelReaderSetting,
            {title: item.title},
          ),
        );
      }
    });
    return resultArr;
  }

  getChapterDataAndSetDownloadState(chapter) {
    const {details, novelReaderSetting} = this.props;
    const url = chapter.cU;
    return new Promise((resolve, reject) => {
      fetchChapter(url)
        .then(res => {
          if (res.download && res.download === true) {
            this.props.setDownloadStatus({
              ...chapter,
              download: res.download,
            });
            res = res.data;
          }
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * 返回当前章附近4章的目录
   * @param {Number} index 下标
   */
  loadData(index) {
    const {catalog} = this.props,
      catalogList = catalog.vs;
    if (index === 0) {
      return catalogList.slice(0, EVERY_GET_CHAPTER_TOTAL);
    } else if (index === catalogList.length - 1) {
      return catalogList.slice(index - 4, index);
    } else {
      return catalogList.slice(index - 1, index - 1 + EVERY_GET_CHAPTER_TOTAL);
    }
  }

  /**
   * 检查该章节是否在存在在缓存中
   * @param {Object} addCurrentChapterItem
   * @param {Boolean} boolean
   * boolean 表示按照什么顺序进行查找
   *  - true 表示向后查找
   *  - false 表示向前查找 默认
   */
  isNoInData(addCurrentChapterItem, boolean) {
    if (boolean) {
      for (let i = 0; i < cacheChapter.length; i++) {
        if (addCurrentChapterItem.uuid === cacheChapter[i].uuid) {
          return true;
        }
      }
    } else {
      for (let i = cacheChapter.length - 1; i >= 0; i--) {
        if (addCurrentChapterItem.uuid === cacheChapter[i].uuid) {
          return true;
        }
      }
    }

    return false;
  }
}

const mapStateToProps = (state, ownProps) => {
  const {novel} = state;
  return {
    novelReaderSetting: novel.novelReaderSetting,
    currentChapter: novel.currentNovel.currentChapter,
    catalog: novel.currentNovel.catalog,
    details: novel.currentNovel.details,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    alternovelReaderSetting: novelReaderSetting => {
      dispatch(alternovelReaderSetting(novelReaderSetting));
    },
    saveCurrentChapter: currentChapter => {
      dispatch(saveNovelCurrentChapter(currentChapter));
    },
    setDownloadStatus: chapter => {
      dispatch(setNovelChapterDownloadStatus(chapter));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NovelRenderContent);
