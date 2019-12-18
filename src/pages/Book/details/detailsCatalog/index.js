import React, {Component} from 'react';

import DetailsCatalogUi from './detailsCatalogUi';

import {saveNovelCurrentChapter} from '../../../../redux/actionCreator/novel';
import {connect} from 'react-redux';

class novelCatalog extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <DetailsCatalogUi
        catalog={this.props.catalog}
        title={this.props.title}
        navigation={this.props.navigation}
        mapSaveCurrentChapter={this.props.mapSaveCurrentChapter}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {novel} = state;
  return {
    catalog: novel.currentNovel.catalog,
    title: novel.currentNovel.details.title,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    mapSaveCurrentChapter: currentChapter => {
      dispatch(saveNovelCurrentChapter(currentChapter));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(novelCatalog);
