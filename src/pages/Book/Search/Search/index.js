import React, {Component} from 'react';

import SearchUi from './searchUi';

import {connect} from 'react-redux';
import {
  addSearchHistory,
  clearSearchHistory,
  initSearchHistory,
} from '../../../../redux/actionCreator/search';

import {getBykey} from '../../../../dataStore/AsyncStorage';

class SearchListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInputValue: '',
    };
    this.changeSearchInputValue = this.changeSearchInputValue.bind(this);
    this.submitSearchInputValue = this.submitSearchInputValue.bind(this);
  }
  componentDidMount() {
    getBykey('searchHistoryList')
      .then(data => {
        data = JSON.parse(data);
        if (data !== null) {
          this.props.mapInitSearchHistory(data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  changeSearchInputValue(value) {
    this.setState({
      searchInputValue: value,
    });
  }
  submitSearchInputValue() {
    if (this.state.searchInputValue.length === 0) {
      return;
    }
    this.goToSearchList();
    this.props.mapAddSearchHistory(this.state.searchInputValue);
  }
  goToSearchList() {
    const {navigation} = this.props;
    navigation.navigate('SearchList', {
      searchKey: this.state.searchInputValue,
    });
    // console.log(navigation, this.props);
  }
  render() {
    return (
      <SearchUi
        {...this.state}
        searchHistoryList={this.props.searchHistoryList}
        mapClearSearchHistory={this.props.mapClearSearchHistory}
        changeSearchInputValue={this.changeSearchInputValue}
        submitSearchInputValue={this.submitSearchInputValue}
        navigation={this.props.navigation}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {search} = state;
  return {
    searchHistoryList: search.searchHistoryList,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    mapAddSearchHistory: data => {
      dispatch(addSearchHistory(data));
    },
    mapClearSearchHistory: () => {
      dispatch(clearSearchHistory());
    },
    mapInitSearchHistory: data => {
      dispatch(initSearchHistory(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchListPage);
