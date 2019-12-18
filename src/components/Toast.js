import React, {Component} from 'react';
import {StyleSheet, Dimensions, Animated, Easing} from 'react-native';
import PropTypes from 'prop-types';

const HEIGHT = Dimensions.get('screen').height,
  WIDTH = Dimensions.get('screen').width,
  beforePostion = {
    center: 0.5,
    bottom: 0.85,
    top: 0.1,
  };
export default class Toast extends Component {
  /**
   * message: 要提示的信息
   * position: 提示信息在屏幕中的位置(x,y)
   *  - top 上方 居中
   *  - center 居中 居中
   *  - bottom 下方 居中
   */
  static defaultProps = {
    message: '',
    position: 'center',
  };
  static propTypes = {
    message: PropTypes.string,
    position: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      fade: new Animated.Value(0),
      message: this.props.message,
      position: this.props.position,
    };
  }
  componentDidMount() {
    // this.showToast();
  }
  /**
   * 关闭toast
   */
  closeToast() {
    this.state.fade.setValue(1);
    Animated.timing(this.state.fade, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.elastic(1),
    }).start();
  }
  /**
   * 显示多少秒后关闭，一般调用这个
   * @param {Number} seconde
   */
  showAfterSecondClose(seconde, message, position) {
    this.setState({
      message,
      position,
    });
    this.showToast();
    setTimeout(() => {
      this.closeToast();
    }, seconde * 1000);
  }
  /**
   * 显示toast
   */
  showToast() {
    this.state.fade.setValue(0);
    Animated.timing(this.state.fade, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.elastic(1),
    }).start();
  }
  render() {
    const positionLevel = beforePostion[this.state.position]
      ? beforePostion[this.state.position]
      : 0.5;
    return (
      <Animated.View
        style={[
          styles.wrap,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            opacity: this.state.fade,
            // width: ToastWidth,
            top: HEIGHT * positionLevel - 20,
            // left: WIDTH / 2 - ToastWidth / 2,
            transform: [
              {
                scale: this.state.fade,
                translateY: this.state.fade.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -20],
                }),
              },
            ],
          },
        ]}>
        <Animated.Text ref="message" style={styles.wrapText}>
          {this.state.message}
        </Animated.Text>
        {/* </View> */}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH,
    zIndex: 999,
    elevation: 999,
  },
  wrapText: {
    color: '#fff',
    fontSize: 18,
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 5,
    fontWeight: 'bold',
  },
});
