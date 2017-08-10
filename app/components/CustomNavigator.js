'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Navigator,
    Image,
    ScrollView,
    TabBarIOS,
    TabBarItemIOS,
    Dimensions,
    Alert,
} from 'react-native';



class CustomNavigator extends Component {

  constructor(props) {
    super(props);
  }

  _onLeftButtonPress() {
    if (this.props.onLeftButtonPress) {
      this.props.onLeftButtonPress();
    }
  }

  _onRightButtonPress() {
    if (this.props.onRightButtonPress) {
      this.props.onRightButtonPress();
    }
  }

  render() {
    var containerStyle = [styles.containerIOSDefault,  this.props.style, styles.containerIOS];
    var title = this.props.children || this.props.title;
    return (
      <View style={containerStyle}>
        <View style={styles.leftButton}>
          { this.props.leftButton &&
            <TouchableOpacity onPress={() => this._onLeftButtonPress()}>
              { this.props.leftButton }
            </TouchableOpacity>
          }
        </View>
        <View style={styles.title}> 
          { title || <Text></Text> }
        </View>
        <View style={styles.rightButton}>
          { this.props.rightButton && 
            <TouchableOpacity onPress={() => this._onRightButtonPress()}>
              { this.props.rightButton }
            </TouchableOpacity>
          }
        </View> 
      </View>
    );
  }
};

const styles = StyleSheet.create({
  containerIOSDefault: {
    height: 64,
    paddingTop: 22,
    paddingHorizontal: 15,
  },

  containerIOS: {
    flexDirection:'row',
  },

  leftButton: {
    alignItems: 'flex-start', justifyContent:'center'
  },

  title: {
    flex:1, alignItems: 'center', justifyContent:'center', flexDirection:'row'
  },

  rightButton: {
    alignItems: 'flex-end', justifyContent:'center'
  }


});

export default CustomNavigator;