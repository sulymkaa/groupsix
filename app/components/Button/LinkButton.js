'use strict';

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

class LinkButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress && this.props.onPress.bind(this)}>
        <View style={[styles.container, this.props.style || {}]}>
          <Text style={[styles.text, this.props.style && this.props.style.color && {color: this.props.style.color}, this.props.textStyle || {}]}>
            {this.props.text || 'Link'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

LinkButton.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  text: React.PropTypes.string,
  style: View.propTypes.style,
  textStyle: Text.propTypes.style,
};

const styles = StyleSheet.create({
    container: {
    },
      
    text: {
      fontFamily: 'SF UI Text',
      color: '#0095F7',
      fontSize: 15,
    }
});

export default LinkButton;