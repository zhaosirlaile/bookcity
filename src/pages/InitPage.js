import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, StatusBar} from 'react-native';

import {DIVICE} from '../util/utilParams';
import {
  updateNovelBookStackList,
  initNovelReanderSetting,
} from '../redux/actionCreator/novel';
import {connect} from 'react-redux';
import {getBykey} from '../dataStore/AsyncStorage';

class initPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeNubmer: 3,
    };
  }
  componentDidMount() {
    const {navigate} = this.props.navigation;
    this.timer = setInterval(() => {
      if (this.state.timeNubmer === 0) {
        navigate('Main');
      }
      this.setState({
        timeNubmer: this.state.timeNubmer - 1,
      });
    }, 1000);
    getBykey('novelBookStackList')
      .then(data => {
        if (!(data === null)) {
          data = JSON.parse(data);
          this.props.mapUpdateNovelBookStackList(data);
        }
      })
      .catch(err => {
        console.log(err);
      });
    getBykey('novelReaderSetting')
      .then(data => {
        if (!(data === null)) {
          data = JSON.parse(data);
          this.props.mapInitNovelReanderSetting(data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentWillUnMount() {
    this.timer && clearTimeout(this.timer);
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#363636" />
        <Image
          style={{width: DIVICE.DEVICE_WIDTH, height: DIVICE.DEVICE_HEIGHT}}
          source={require('../images/init_background.jpg')}
        />
        <Text
          onPress={() => {
            this.props.navigation.navigate('Main');
          }}
          style={{
            position: 'absolute',
            right: 20,
            top: 20,
            color: '#fff',
            fontSize: 15,
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderRadius: 5,
            padding: 5,
          }}>
          跳过 {this.state.timeNubmer}
        </Text>
        <Text
          style={{
            color: '#fff',
            fontSize: 22,
            position: 'absolute',
            width: DIVICE.DEVICE_WIDTH,
            textAlign: 'center',
            bottom: 70,
          }}>
          本软件开源
        </Text>
        <Text
          style={{
            color: '#fff',
            fontSize: 12,
            position: 'absolute',
            width: DIVICE.DEVICE_WIDTH,
            textAlign: 'center',
            bottom: 40,
          }}>
          注：不可用于商业用途，只能用于学习、交流
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    color: 'black',
  },
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    mapUpdateNovelBookStackList: data => {
      dispatch(updateNovelBookStackList(data));
    },
    mapInitNovelReanderSetting: data => {
      dispatch(initNovelReanderSetting(data));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(initPage);
