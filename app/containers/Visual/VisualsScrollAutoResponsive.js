/* ================================================================
 * autoresponsive_react_native_sample by xdf(xudafeng[at]126.com)
 *
 * first created at : Mon Jun 02 2014 20:15:51 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright 2015 xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';

import VisualsAutoResponsive from './VisualsAutoResponsive';

const SCREEN_WIDTH = Dimensions.get('window').width;

let styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    width: SCREEN_WIDTH,
    flexGrow: 1,
  },
});

class VisualsScrollAutoResponsive extends React.Component {

  render() {
    let {itemMargin, children, items, filter, fnFilter, renderItem, onSelectItem, style, contentStyle, ...props} = this.props;
    props.style=[style, styles.container];
    let autoResProps = {
      itemMargin : itemMargin,
      items: items,
      renderItem: renderItem,
      onSelectItem: onSelectItem,
      filter: filter,
      fnFilter: fnFilter,
      style: contentStyle
    };
    
    return (
      <ScrollView {...props}>
        {children}
        <VisualsAutoResponsive {...autoResProps} />
      </ScrollView>
    );
  }
}

module.exports = VisualsScrollAutoResponsive;
