/* eslint-disable prettier/prettier */
/* eslint-disable radix */
/**
 * 公共的方法
 */
import {DIVICE, NOVEL_READER} from './utilParams';

export const get = (url, callback) => {
  fetch(url, {
    // body: JSON.stringify({
    //   url: url,
    // }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    method: 'get', // *GET, POST, PUT, DELETE, etc.
  })
    .then(function(response) {
      return response.text();
    })
    .then(function(res) {
      callback(JSON.parse(res));
    })
    .catch(err => {
      console.error(err);
    });
};

export const getdata = url => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      method: 'get', // *GET, POST, PUT, DELETE, etc.
    })
      .then((response) =>  {
        if (response.ok) {
          return response.json();
        }
      })
      .then(function(responseData) {
        resolve(responseData);
      })
      .catch(err => {
        reject(err);
      });
  });

};

/**
 *  生成一章的数据
 * @param {Array} currentChapterData
 * @param {Object} novelReaderSetting
 */
export const chapterArrayByFontSizeAndHeight = function(currentChapterData, novelReaderSetting) {
  const {fontSize,spaceBetween} = novelReaderSetting;
  // 一行的文字的数量
  const ROW_FONT_NUMBER = parseInt(NOVEL_READER.NOVEL_READER_BODY_WIDTH / fontSize),
  // 行高 = 字体大小 + 行间距
    HIGHT_LINE = fontSize + spaceBetween,
  // 一页的行数
    ROW_NUMBER = parseInt(NOVEL_READER.NOVEL_READER_BODY_HEIGHT / HIGHT_LINE);
  let PAGE_NUMBER = null;
  var array = [];
  for (let i = 0; i < currentChapterData.length; i++) {
    let section = `  ${currentChapterData[i]}`;
    array.push(..._createSection(section,ROW_FONT_NUMBER));
  }
  PAGE_NUMBER = Math.ceil(array.length / ROW_NUMBER);
  return {
    pageCount: PAGE_NUMBER,
    data: array,
    rowCount: ROW_NUMBER,
    rowFontCount: ROW_FONT_NUMBER,
  };
};

function _createSection(section,ROW_FONT_NUMBER) {
  let arr = [], row = '';

  let sectionArr = section.split('');
  while (sectionArr.length !== 0) {
    row = sectionArr.splice(0,ROW_FONT_NUMBER);
    if (row[0] === '。' || row[0] === '，' || row[0] === '！' || row[0] === '、' || row[0] === '？') {
      let prevEleFinally = arr[arr.length - 1].pop(),
        currEleFinally = null;
      if (row.length >= ROW_FONT_NUMBER) {
        currEleFinally = row.pop();
        sectionArr.unshift(currEleFinally);
      }
      row.unshift(prevEleFinally);
    }
    arr.push(row);
  }
  return arr;
}

export const countRowNumberByHeight = (height,fontSize,fontRowheight) => {
  const HIGHT_LINE = fontSize + fontRowheight;
  return parseInt((NOVEL_READER.NOVEL_READER_BODY_HEIGHT - height) / HIGHT_LINE);
};

/**
 *
 * @param {Array} arr
 */
export const connectRowBecomeChapterPage = (obj) =>  {
  const {data, rowCount} = obj;
  const resultArr = [];
  let arr = null;
  resultArr.push(data.splice(0,rowCount - 4));
  while (data.length > 0) {
    arr = data.splice(0,rowCount);
    resultArr.push(arr);
  }
  return resultArr;
};
