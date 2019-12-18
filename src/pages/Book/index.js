import React, {Component} from 'react';

import BookUI from './BookUI';
import {
  updateNovelBookStackList,
  setNovelCurrentNovel,
} from '../../redux/actionCreator/novel';

import {connect} from 'react-redux';
const MORE = ['列表样式', '管理书架', '备份书架', '获取书架'];

class BookPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      enable: true,
      selected: false,
      isConnect: true,
    };
  }
  onValueChange(value) {
    this.setState({
      selected: value,
    });
  }
  changeSelected(self) {
    return function() {
      return self;
    };
  }
  componentDidMount() {
    const {novelBookStackList} = this.props;
  }
  render() {
    return (
      <BookUI
        {...this.state}
        {...this.props}
        goSearchPage={this.goSearchPage}
        changeSelected={this.changeSelected(this)}
        MORE={MORE}
        novelBookStackList={this.props.novelBookStackList}
        mapSetNovelCurrentNovel={this.props.mapSetNovelCurrentNovel}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {novel} = state;
  return {
    novelBookStackList: novel.novelBookStackList,
    currentNovel: novel.currentNovel,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    mapSetNovelCurrentNovel: data => {
      dispatch(setNovelCurrentNovel(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookPage);
