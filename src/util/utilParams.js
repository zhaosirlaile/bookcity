/**
 * 本文件提供一些公共的属性
 */
import {Dimensions, Platform} from 'react-native';

// 关于设备的一些公共属性
export const DIVICE = {
  DEVICE_WIDTH: Dimensions.get('window').width,
  DEVICE_HEIGHT: Dimensions.get('screen').height,
  DEVICE_PLATFORM: Platform.OS,
};

export const DEFAULT_COLOR = '#FF9744';

export const MARGIN_TOP = 27;

// 创建本APP要访问的URL地址
export const GLOBEL_URL = 'url地址'; // 这是一个自己的服务器

export const GLOBEL_CHAPTER_URL = `${GLOBEL_URL}fetchOneChapterContent?url=https://read.qidian.com/chapter/`;

export const GLOBEL_NOVEL_CATALOGLIST_URL =
  'https://book.qidian.com/ajax/book/category?_csrfToken=p6gyXOaJcIFoY9HZGjbj6E6RSYnHiGAehw3UfuPO&bookId=';

export const GLOBEL_NOVEL_CHAPTER_URL = `${GLOBEL_URL}fetchOneChapterContent?url=https://read.qidian.com/chapter/`;

export const GLOBEL_SEARCH_KEY =
  'https://m.qidian.com/majax/search/auto?kw=&_csrfToken=p6gyXOaJcIFoY9HZGjbj6E6RSYnHiGAehw3UfuPO';

export const GLOBEL_SEARCH = `${GLOBEL_URL}fetchSearchList?url=https://www.qidian.com/search?kw=`;
// 关于小说阅读器的一些公共属性
export const NOVEL_READER = {
  NOVEL_READER_BODY_HEIGHT: DIVICE.DEVICE_HEIGHT - 60, // 注：我的顶部和底部各30，加起来60
  NOVEL_READER_BODY_WIDTH: DIVICE.DEVICE_WIDTH - 20,
  NOVEL_READER_THEME_COLOR: '#d5efd2',
};

export const MALE_NOVEL_STATE = ['最热', '最新', '完结'];
