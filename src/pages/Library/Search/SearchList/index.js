import React, {Component} from 'react';

import SearchListUi from './SearchListUi';

import {fetchNetDataNoSave} from '../../../../dataStore/index';
import {GLOBEL_SEARCH} from '../../../../util/utilParams';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state = {
      searchKey: navigation.getParam('searchKey'),
      searchList: [],
    };
  }
  componentDidMount() {
    const url = `${GLOBEL_SEARCH}${this.state.searchKey}`;
    fetchNetDataNoSave(url)
      .then(res => {
        this.setState({
          searchList: res,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return <SearchListUi {...this.state} navigation={this.props.navigation} />;
  }
}

export default SearchPage;
