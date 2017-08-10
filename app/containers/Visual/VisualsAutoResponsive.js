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
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';

import {
  Text,
  Options,
  AutoResponsive,
  Images,
} from '../../components';

import VisualPostOptions from './VisualPostOptions';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: SCREEN_WIDTH,
    flex: 1,
  },
  
  title: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  titleText: {
    color: '#d0bbab',
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
  },
  text: {
    textAlign: 'center',
    fontSize: 60,
    fontWeight: 'bold',
    color: 'rgb(58, 45, 91)',
  },

  option: {
    height:68,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal:25,
  },

  optionBorder: {
    borderTopColor:'#cccccc',
    borderTopWidth: 0.5,
  }
  
});

class VisualsAutoResponsive extends React.Component {

  refPostOptions = null;

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  renderUsername(item) {
    return (
      <Text style={{fontSize: 12, fontWeight: 'bold', color: '#000'}}>{item.posterName || 'Username'}</Text>
    )
  }

  renderCaption(item) {
    return !!item.caption ?
      (
        <Text style={{marginTop: 8, fontSize: 12, fontWeight: '300', color: '#000'}}>
          {item.caption}
        </Text>
      ) :
      null;
  }

  renderMoreButton(item) {
    return (
      <View style={{flexGrow:1, alignItems:'flex-end', justifyContent:'center'}}>
        <TouchableOpacity onPress={() => {
            this.refPostOptions.showPostOptions(item);
          }}>
          <Image source={Images.More_Gray_20x5} />
        </TouchableOpacity>
      </View>
    );
  }

  renderChild(item, i, props) {
    if (item.type === 'link') {
      return (
        <View {...props}>
          <TouchableOpacity onPress={() => this._onItemPress(item, i)}>
            <View style={{width: '100%', height: 58, justifyContent: 'center', alignItems:'center', backgroundColor:'#f4f4f4'}}>
              <Text style={{fontSize: 10, fontWeight:'bold', color: '#0095F7'}}>{item.url}</Text>
            </View>
          </TouchableOpacity>
          <View style={{width: '100%', marginTop: 11, flexDirection:'row'}}>
            <Image source={item.posterImage || Images.Cliqsix_26x26} style={{width: 17, height: 17, marginRight: 6}} />
            {this.renderUsername(item)}
            {this.renderMoreButton(item)}
          </View>
          {this.renderCaption(item)}
        </View>
      );
    }
    if (item.type === 'text') {
      return (
        <View {...props}>
          <TouchableOpacity onPress={() => this._onItemPress(item, i)}>
            <View style={{width: '100%', paddingVertical: 26, paddingHorizontal:32, justifyContent: 'center', alignItems:'flex-start', backgroundColor:'#f4f4f4'}}>
              <Text style={{fontFamily:'SF UI Text', fontSize: 13, fontWeight:'300'}}>{item.text}</Text>
            </View>
          </TouchableOpacity>
          <View style={{width: '100%', marginTop: 11, flexDirection:'row'}}>
            <Image source={item.posterImage || Images.Cliqsix_26x26} style={{width: 17, height: 17, marginRight: 6}} />
            {this.renderUsername(item)}
          </View>
        </View>
      );
    }
    if (item.type === 'image') {
      return (
        <View {...props}>
          <TouchableOpacity onPress={() => this._onItemPress(item, i)}>
            <Image style={{width: '100%', height: 200,}} source={item.source || MARK_ICON} />
          </TouchableOpacity>
          <View style={{width: '100%', marginTop: 11, flexDirection:'row'}}>
            <Image source={item.posterImage || Images.Cliqsix_26x26} style={{width: 17, height: 17, marginRight: 6}} />
            {this.renderUsername(item)}
          </View>
          {this.renderCaption(item)}
        </View>
      );
    }
    if (item.type === 'video') {
      return (
        <View {...props}>
          <TouchableOpacity onPress={() => this._onItemPress(item, i)}>
            <Image style={{width: '100%', height: 200,}} source={item.source || MARK_ICON} />
          </TouchableOpacity>
          <View style={{width: '100%', marginTop: 11, flexDirection:'row'}}>
            <Image source={item.posterImage || Images.Cliqsix_26x26} style={{width: 17, height: 17, marginRight: 6}} />
            {this.renderUsername(item)}
          </View>
          {this.renderCaption(item)}
        </View>
      );
    }
  }

  _onItemPress(item, i) {
    let bContinue = true;
    if (item.onSelectItem) {
      bContinue = item.onSelectItem(item, i);
    }
    if (bContinue !== false && this.props.onSelectItem) {
      this.props.onSelectItem(item, i);
    }
  }

  

  render() {
    let {children, childrenPos, onSelectItem, renderItem, itemMargin, ...props} = this.props;
    props = {
      ...props,
      childrenPos: !!childrenPos ? childrenPos : 'before',
      itemMargin: itemMargin || 20,
      renderItem : (item, i, itemProps) => {
        return !!renderItem ? renderItem(item,i, itemProps) : this.renderChild(item, i, {
          ...itemProps,
        });
      },
      style: [this.props.style, styles.container]
    };
    return (
      <AutoResponsive {...props}>
        <VisualPostOptions ref={ref => this.refPostOptions = ref} />
      </AutoResponsive>
    );
  }
}
module.exports = VisualsAutoResponsive;