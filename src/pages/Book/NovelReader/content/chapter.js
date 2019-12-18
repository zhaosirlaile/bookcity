/**
 * 一章的内容分解成行
 */

import {NOVEL_READER} from '../../../../util/utilParams';
// 正则表达式：匹配中文的标点符号
const reg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;

/**
 *  生成一章的数据
 * @param {Array} chapterData
 * @param {Object} novelReaderSetting
 */
export const commonCreate = (
  chapterDetail,
  chapterData,
  novelReaderSetting,
  details,
) => {
  const {fontSize, spaceBetween} = novelReaderSetting;
  // 一行的文字的数量
  const ROW_FONT_NUMBER = parseInt(
      NOVEL_READER.NOVEL_READER_BODY_WIDTH / fontSize,
    ),
    // 行高 = 字体大小 + 行间距
    HIGHT_LINE = fontSize + spaceBetween,
    // 一页的行数
    ROW_NUMBER = parseInt(NOVEL_READER.NOVEL_READER_BODY_HEIGHT / HIGHT_LINE);
  let array = [],
    page_number_count = 0,
    current_page = [];
  while (chapterData.length) {
    let currentParagraph = chapterData.splice(0, 1)[0];
    if (currentParagraph.indexOf('true') === 0) {
      currentParagraph = currentParagraph.substr(4, currentParagraph.length);
    } else {
      currentParagraph = '  ' + currentParagraph;
    }
    // 划分过后的 paragraph, 是 Array
    let splice_paragraph = countRow(currentParagraph, ROW_FONT_NUMBER);
    page_number_count += splice_paragraph.length;
    current_page.push(currentParagraph);
    // 判断是否一页的行数超出了，超出了添加到array 中
    if (page_number_count > ROW_NUMBER) {
      current_page.pop();
      const add_row_number =
        ROW_NUMBER - (page_number_count - splice_paragraph.length);

      current_page.push(splice_paragraph.splice(0, add_row_number).join(''));
      chapterData.unshift('true' + splice_paragraph.join(''));
      array.push({
        data: current_page,
        ...chapterDetail,
        title: details.title,
      });
      current_page = [];
      page_number_count = 0;
    } else if (page_number_count === ROW_NUMBER) {
      array.push({
        data: current_page,
        ...chapterDetail,
        title: details.title,
      });
      current_page = [];
      page_number_count = 0;
    }
  }
  if (current_page.length >= 0) {
    array.push({
      data: current_page,
      ...chapterDetail,
      title: details.title,
    });
  }

  return array;
};

export const createChapter = (
  chapterDetail,
  chapterData,
  novelReaderSetting,
  details,
) => {
  const {fontSize, spaceBetween} = novelReaderSetting;
  // 一行的文字的数量
  const ROW_FONT_NUMBER = parseInt(
      NOVEL_READER.NOVEL_READER_BODY_WIDTH / fontSize,
    ),
    // 行高 = 字体大小 + 行间距
    HIGHT_LINE = fontSize + spaceBetween,
    // 首页的行数
    FIRST_PAGE_NUMBER = parseInt(
      (NOVEL_READER.NOVEL_READER_BODY_HEIGHT - 120) / HIGHT_LINE,
    );
  let array = [],
    page_number_count = 0,
    current_page = [];
  while (page_number_count <= FIRST_PAGE_NUMBER) {
    let currentParagraph = '  ' + chapterData.splice(0, 1)[0],
      splice_paragraph = countRow(currentParagraph, ROW_FONT_NUMBER);
    page_number_count += splice_paragraph.length;
    current_page.push(currentParagraph);
  }
  if (page_number_count !== FIRST_PAGE_NUMBER) {
    let end_paragraph = countRow(current_page.pop(), ROW_FONT_NUMBER);
    chapterData.unshift(
      end_paragraph.splice(-(page_number_count - FIRST_PAGE_NUMBER)).join(''),
    );
    current_page.push(end_paragraph.join(''));
    chapterData[0] = 'true' + chapterData[0];
  }
  array = commonCreate(chapterDetail, chapterData, novelReaderSetting, details);
  // console.log(current_page, x);
  array.unshift({
    data: current_page,
    ...chapterDetail,
    title: details.title,
    isNoChapterFirstPage: true,
  });
  return array;
};

export default createChapter;

function countRow(paragraph, ROW_FONT_NUMBER) {
  let resultArr = [],
    i = 0;
  paragraph = paragraph.split('');
  while (paragraph.length > 0) {
    i++;
    if (i === ROW_FONT_NUMBER) {
      if (reg.test(paragraph[0])) {
        paragraph.unshift(resultArr[resultArr.length - 1].pop());
        resultArr.push(paragraph.splice(0, i - 1));
      } else {
        resultArr.push(paragraph.splice(0, i));
      }
      i = 0;
    }
    // let row = paragraph.splice(0, ROW_FONT_NUMBER);
    // if (reg.test(row[0])) {
    //   console.log(resultArr);
    //   const up_last_font = resultArr[resultArr.length - 1].pop();
    //   row.unshift(up_last_font);
    //   if (row.length === ROW_FONT_NUMBER + 1) {
    //     const current_last_font = row.pop();
    //     paragraph.unshift(current_last_font);
    //   }
    // }
    // resultArr.push(row);
  }

  for (let i = 0; i < resultArr.length; i++) {
    resultArr[i] = resultArr[i].join('');
  }
  return resultArr;
}
