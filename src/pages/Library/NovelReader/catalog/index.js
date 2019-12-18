import React, {Component} from 'react';

import NovelCatalogUi from './catalogUi';

import {connect} from 'react-redux';
import {saveNovelCurrentChapter} from '../../../../redux/actionCreator/novel';

class novelReaderCatalog extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(1);
  }
  render() {
    return (
      <NovelCatalogUi
        catalog={this.props.catalog}
        currentChapter={this.props.currentChapter}
        details={this.props.details}
        navigation={this.props.navigation}
        mapSaveCurrentChapter={this.props.mapSaveCurrentChapter}
      />
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    mapSaveCurrentChapter: currentChapter => {
      dispatch(saveNovelCurrentChapter(currentChapter));
    },
  };
};

const mapStateToProps = (state, ownProps) => {
  const {novel} = state;
  return {
    catalog: novel.currentNovel.catalog,
    currentChapter: novel.currentNovel.currentChapter,
    details: novel.currentNovel.details,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(novelReaderCatalog);
