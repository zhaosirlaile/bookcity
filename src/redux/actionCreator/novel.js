import {
  ALTER_NOVELREADER_SETTING,
  SET_NOVEL_CURRENTNOVEL,
  SAVE_NOVEL_CURRENT_CHAPTER,
  SET_NOVEL_CHAPTER_DOWNLOADSTATUS,
  UPDATA_NOVEL_BOOKSTACKLIST,
  INIT_NOVEL_READERSETTING,
} from '../actionTypes/novel';

import {
  GLOBEL_NOVEL_CATALOGLIST_URL,
  GLOBEL_NOVEL_CHAPTER_URL,
} from '../../util/utilParams';
import {fetchCatalogList, fetchChapter} from '../../dataStore';
import AsyncStorage from '@react-native-community/async-storage';

/**
 *
 * @param {Object} novelReaderSetting
 */
export const alternovelReaderSetting = novelReaderSetting => {
  return {
    type: ALTER_NOVELREADER_SETTING,
    novelReaderSetting,
  };
};

export const setNovelCurrentNovel = oneNovel => {
  return {
    type: SET_NOVEL_CURRENTNOVEL,
    ...oneNovel,
  };
};

export const saveNovelCurrentChapter = currentChapter => {
  return {
    type: SAVE_NOVEL_CURRENT_CHAPTER,
    currentChapter,
  };
};

export const fetchLocalOrNetNovelData = function(details) {
  const {dataSocure} = details,
    id = dataSocure.split('/')[4];
  const url = `${GLOBEL_NOVEL_CATALOGLIST_URL}${id}`;
  return dispatch => {
    fetchCatalogList(url, details)
      .then(res => {
        dispatch(setNovelCurrentNovel(res));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const setNovelChapterDownloadStatus = function(data) {
  return {
    type: SET_NOVEL_CHAPTER_DOWNLOADSTATUS,
    data,
  };
};

export const updateNovelBookStackList = function(data) {
  return {
    type: UPDATA_NOVEL_BOOKSTACKLIST,
    data,
  };
};

export const initNovelReanderSetting = function(data) {
  return {
    type: INIT_NOVEL_READERSETTING,
    data,
  };
};
