import React, {Component} from 'react';

import DetailsUi from './detailsUi';

import {
  updateNovelBookStackList,
  saveNovelCurrentChapter,
  fetchLocalOrNetNovelData,
} from '../../../../redux/actionCreator/novel';

import {connect} from 'react-redux';
import {BackHandler} from 'react-native';

class datails extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state = {
      details: navigation.getParam('details'),
    };
    this.changeStateIsNoInNovelBookStackList = this.changeStateIsNoInNovelBookStackList.bind(
      this,
    );
    this.isNoInNovelBookStackList = this.isNoInNovelBookStackList.bind(this);
  }
  componentDidMount() {
    const {navigation} = this.props;
    this.props.mapFetchLocalOrNetNovelData(this.state.details);
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.pop();
      return true;
    });
  }
  render() {
    const novelDetails = this.novelDetails;
    return (
      <DetailsUi
        {...novelDetails}
        details={this.state.details}
        navigation={this.props.navigation}
        lastNovelCapther={this.props.lastNovelCapther}
        firstNovelCapter={this.props.firstNovelCapter}
        saveNovelCurrentChapter={this.props.saveNovelCurrentChapter}
        mapUpdateNovelBookStackList={this.props.mapUpdateNovelBookStackList}
        changeStateIsNoInNovelBookStackList={
          this.changeStateIsNoInNovelBookStackList
        }
        novelBookStackList={this.props.novelBookStackList}
        isNoInNovelBookStackList={this.isNoInNovelBookStackList}
      />
    );
  }
  isNoInNovelBookStackList() {
    const {novelBookStackList} = this.props;
    for (let i = 0; i < novelBookStackList.length; i++) {
      if (novelBookStackList[i].dataSocure === this.state.details.dataSocure) {
        return true;
      }
    }
    return false;
  }
  changeStateIsNoInNovelBookStackList() {
    this.setState({
      isNoInNovelBookStackList: true,
    });
  }
}

const mapStateToProps = (state, ownProps) => {
  const {novel} = state;
  let lastNovelCapther = null,
    firstNovelCapter = null;
  if (novel.currentNovel.catalog.vs) {
    lastNovelCapther =
      novel.currentNovel.catalog.vs[novel.currentNovel.catalog.vs.length - 1];
    firstNovelCapter = novel.currentNovel.catalog.vs[0];
  }
  return {
    lastNovelCapther: lastNovelCapther,
    firstNovelCapter: firstNovelCapter,
    novelBookStackList: novel.novelBookStackList,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveNovelCurrentChapter: currentChapter => {
      dispatch(saveNovelCurrentChapter(currentChapter));
    },
    mapUpdateNovelBookStackList: data => {
      dispatch(updateNovelBookStackList(data));
    },
    mapFetchLocalOrNetNovelData: details => {
      dispatch(fetchLocalOrNetNovelData(details));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(datails);
