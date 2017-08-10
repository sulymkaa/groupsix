import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  LayoutAnimation,
  TouchableOpacity
} from 'react-native';


var CroppingView = React.createClass({
  propTypes: {
    cropTop: React.PropTypes.number,
    cropLeft: React.PropTypes.number,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
  },
  
  getDefaultProps() {
    return {
      cropTop: 0,
      cropLeft: 0
    }
  },

  render() {
    return (
      <View style={[{
        position: 'absolute',
        overflow: 'hidden',
        top: this.props.cropTop,
        left: this.props.cropLeft,
        height: this.props.height,
        width: this.props.width,
        backgroundColor: 'transparent'
        }, this.props.style]}>
        <View style={{
          position: 'absolute',
          top: this.props.cropTop * -1,
          left: this.props.cropLeft * -1,
          backgroundColor: 'transparent'
        }}>
          {this.props.children}
        </View>
      </View>
    );
  }
});