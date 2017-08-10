'use strict';

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

class SimpleButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress && this.props.onPress.bind(this)}>
        <View style={[styles.container, this.props.style || {}]}>
          <Text style={[styles.text, this.props.textStyle || {}]}>
            {this.props.text || 'Simple Button'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

SimpleButton.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  text: React.PropTypes.string,
  style: View.propTypes.style,
  textStyle: Text.propTypes.style
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#0095F7',
        borderWidth: 0,
        paddingHorizontal: 20,
        paddingVertical: 15,
        shadowColor: 'darkgrey',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowOpacity: 0.0,
        shadowRadius:1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
      fontFamily: 'SF UI Text',
      color: 'white',
      fontSize: 15,
    }

});

export default SimpleButton;