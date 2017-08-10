'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  ActionSheet,
} from '../ActionSheet'

import {
  StyleAPI
} from '../../utils';

const styles = StyleSheet.create({

});

class Alert extends Component {

  constructor(props) {
    super(props);
  }

  
  show () {
    this.refs.inner.show();
  }

  hide () {
    this.refs.inner.hide();
    this._onHide();
  }
  

  render() {
    let {text, style, onHide, ...props} = this.props;
    let texts = !!text ? (texts = !!text.push ? text : [text]) : undefined;
    props.style= [{justifyContent:'center', alignItems: 'center'}];

    if (text) {
      texts = !!text.push ? text : [text];
    }
    let mergedStyle = StyleAPI.mergeStyle(style);
    let {padding, paddingTop, paddingRight, paddingBottom, paddingLeft, paddingHorizontal, paddingVertical, ...otherStyle} = mergedStyle;
    let contentStyle = {};
    padding && (contentStyle.padding=padding);
    paddingTop && (contentStyle.paddingTop=paddingTop);
    paddingRight && (contentStyle.paddingRight=paddingRight);
    paddingLeft && (contentStyle.paddingLeft=paddingLeft);
    paddingBottom && (contentStyle.paddingBottom=paddingBottom);
    paddingVertical && (contentStyle.paddingVertical=paddingVertical);
    paddingHorizontal && (contentStyle.paddingHoroizontal=paddingHoroizontal);

    props.animationType = 'none';

    return (
      <ActionSheet.Container ref="inner" {...props}>
        <View style={[{marginLeft: 35, marginRight:35, marginBottom: 20, backgroundColor: '#24d770', minHeight: 150},  otherStyle, {flexDirection: 'row',}]}>
          <View style={[{paddingHorizontal: 28, paddingVertical: 26,}, contentStyle, {flex:1, flexDirection:'column'}]}>
            {props.children}
            {texts && texts.map((item, i) => 
              <Text key={i} style={{fontFamily: 'SF UI Text', fontWeight: 'bold', fontSize: 15, color: 'white'}}>
                {item}
              </Text>
            )}
          </View>
        </View>
      </ActionSheet.Container>
    );
  }

  _onHide() {
    if (this.props.onHide) {
      this.props.onHide();
    }
  }
}

export default Alert;



        