/**
 * novelReader 的一些公共属性
 */

import {getBykey, saveBykey, clear} from '../../dataStore/AsyncStorage';
const defaultState = {
  currentNovel: {
    catalog: {},
    details: {},
    currentChapter: {},
  },
  novelReaderSetting: {
    fontSize: 20,
    themeColor: '#CFDEC1',
    spaceBetween: 15,
    animation: '',
  },
  novelBookStackList: [],
};

import {
  ALTER_NOVELREADER_SETTING,
  SET_NOVEL_CURRENTNOVEL,
  SAVE_NOVEL_CURRENT_CHAPTER,
  SET_NOVEL_CHAPTER_DOWNLOADSTATUS,
  UPDATA_NOVEL_BOOKSTACKLIST,
  INIT_NOVEL_READERSETTING,
} from '../actionTypes/novel';

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case ALTER_NOVELREADER_SETTING:
      newState.novelReaderSetting = action.novelReaderSetting;
      return newState;
    case SET_NOVEL_CURRENTNOVEL:
      newState.currentNovel.details = action.details;
      newState.currentNovel.currentChapter = action.currentChapter;
      newState.currentNovel.catalog = action.catalog;
      return newState;
    case SAVE_NOVEL_CURRENT_CHAPTER:
      newState.currentNovel.currentChapter = action.currentChapter;
      return newState;
    case SET_NOVEL_CHAPTER_DOWNLOADSTATUS:
      const index = _countCurrentChapterInCatalogListOfIndex(
        newState.currentNovel.catalog.vs,
        action.data,
      );
      newState.currentNovel.catalog.vs[index] = action.data;
      return newState;
    case UPDATA_NOVEL_BOOKSTACKLIST:
      newState.novelBookStackList = action.data;
      saveBykey('novelBookStackList', action.data);
      return newState;
    case INIT_NOVEL_READERSETTING:
      newState.novelReaderSetting = action.data;
      return newState;
  }
  return state;
};

function _countCurrentChapterInCatalogListOfIndex(catalogList, currentChapter) {
  for (let i = 0; i < catalogList.length; i++) {
    if (catalogList[i].uuid === currentChapter.uuid) {
      return i;
    }
  }
}
