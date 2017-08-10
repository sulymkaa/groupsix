'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
} from 'react-native';

const styles = StyleSheet.create({
  image : {
    width: 45,
    height: 45,
    marginRight: 20,
  },
  empty: {
    borderWidth: 0.5,
    borderColor: '#a4a4a4',
  }
});

class VisualIcon extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    let {source, ...props} = this.props;
    if (source) {
      props.source = source;
      props.style=[styles.image, this.props.style];
      return (
        <Image {...props} /> 
      )
    }
    props.style=[styles.image, styles.empty, this.props.style];
    return (
      <View {...props}/>
    ) 
  }
};

export default VisualIcon  ;