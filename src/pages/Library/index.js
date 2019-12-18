import React, {Component} from 'react';

import LibraryUi from './LibraryUi';

import {fetchNetDataNoSave} from '../../dataStore/index';
import {GLOBEL_URL} from '../../util/utilParams';

import {MALE_NOVEL, FEMALE_NOVEL} from './config';

import {fetchLocalOrNetNovelData} from '../../redux/actionCreator/novel';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNoGender: true, // true 是男生，false 是女生
      active: {},
      subActive: '',
      maleorFemaleNovel: [],
      isNoModal: false,
      novelList: [],
      currentPageNumber: 1,
    };
    this.myChangeState = this.myChangeState.bind(this);
    this.changeActiveClassNovel = this.changeActiveClassNovel.bind(this);
    this.loadMoreNovel = this.loadMoreNovel.bind(this);
    this.changeSubActiveClassNovel = this.changeSubActiveClassNovel.bind(this);
    this.changeMaleorFemaleNovel = this.changeMaleorFemaleNovel.bind(this);
  }
  componentDidMount() {
    this.changeMaleorFemaleNovel(true);
    // this.changeActiveClassNovel(MALE_NOVEL[0]);
  }

  /**
   * 改变this.state.maleorFemaleNovel的值
   * @param {Boolean} isNoGender
   *   str 等于：
   *  - true  : '男生'
   *  - false : '女生'
   */
  changeMaleorFemaleNovel(isNoGender) {
    if (isNoGender === true) {
      this.setState(
        {
          maleorFemaleNovel: MALE_NOVEL,
          isNoGender: true,
          active: {
            ...MALE_NOVEL[0],
            subActive: MALE_NOVEL[0].childClass[0],
          },
        },
        () => {
          this.changeActiveClassNovel();
        },
      );
    } else {
      this.setState(
        {
          maleorFemaleNovel: FEMALE_NOVEL,
          isNoGender: false,
          active: {
            ...FEMALE_NOVEL[0],
            subActive: FEMALE_NOVEL[0].childClass[0],
          },
        },
        () => {
          this.changeActiveClassNovel();
        },
      );
    }
  }
  /**
   * 修改 state 中的值
   * @param {Object}  obj
   * 修改的对象
   * @param {Function} callback
   * 回调函数
   */
  myChangeState(obj, callback) {
    this.setState(obj, () => {
      callback && callback();
    });
  }
  changeActiveClassNovel() {
    this.setState({
      novelList: [],
    });
    const url = `${GLOBEL_URL}fetchClassNovel?url=${
      this.state.active.subActive.url
    }${1}`;
    console.log(url);
    fetchNetDataNoSave(url)
      .then(data => {
        this.setState({
          novelList: data,
          currentPageNumber: 1,
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
  changeSubActiveClassNovel(item) {
    this.setState({
      novelList: [],
      isNoModal: false,
    });
    const url = `${GLOBEL_URL}fetchClassNovel?url=${item.url}${1}`;
    fetchNetDataNoSave(url)
      .then(data => {
        this.setState({
          novelList: data,
          currentPageNumber: 1,
          subActive: item.key,
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
  loadMoreNovel() {
    const {subActive} = this.state.active,
      currentPage = (this.state.currentPageNumber += 1),
      url = `${GLOBEL_URL}fetchClassNovel?url=${subActive.url}${currentPage}`;
    fetchNetDataNoSave(url)
      .then(data => {
        let oldArr = this.state.novelList,
          newArr = data,
          lastArr;
        oldArr.push(...newArr);
        lastArr = oldArr;
        this.setState({
          novelList: lastArr,
          currentPageNumber: currentPage,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <LibraryUi
        {...this.state}
        navigation={this.props.navigation}
        loadMoreNovel={this.loadMoreNovel}
        fetchLocalOrNetNovelData={this.props.fetchLocalOrNetNovelData}
        myChangeState={this.myChangeState}
        changeActiveClassNovel={this.changeActiveClassNovel}
        changeSubActiveClassNovel={this.changeSubActiveClassNovel}
        changeMaleorFemaleNovel={this.changeMaleorFemaleNovel}
      />
    );
  }
}

export default Library;
