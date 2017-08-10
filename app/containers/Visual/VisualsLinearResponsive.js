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
  TouchableOpacity
} from 'react-native';

import {
  Text,
} from '../../components';

class VisualsLinearReponsive extends React.Component {

  itemPos = 'left';

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  _onSelectItem(item, i) {
    if (!!this.props.onSelectItem) {
      this.props.onSelectItem(item, i);
    }
  }

  renderUsername(item) {
    return (
      <Text style={{color:'#a3a3a3',fontSize:12}}>{item.posterName || ''}</Text>
    )
  }

  renderTextItem(item,i,style) {
    return (
      <View key={i} style={[style]}>
        <View style={{width:250,alignItems:'flex-start'}}>
          <TouchableOpacity onPress={()=>this._onSelectItem(item,i)}>
            <View style={{width:'100%',backgroundColor:'#f4f4f4',paddingHorizontal:45,paddingVertical:45,marginBottom:10}} >
              <Text style={{fontSize:14,fontWeight:'300',color:'#000'}}>{item.text || ''}</Text>
            </View>
          </TouchableOpacity>
          {this.renderUsername(item)}
        </View>
      </View>
    )
  }

  renderLinkItem(item,i,style) {
    return (
      <View key={i} style={[style]}>
        <View style={{width:250,alignItems:'flex-start'}}>
          <TouchableOpacity onPress={()=>this._onSelectItem(item,i)}>
            <View style={{width:'100%',backgroundColor:'#f4f4f4',paddingHorizontal:45,paddingVertical:45,marginBottom:10}} >
              <Text style={{fontSize:14,fontWeight:'300',color:'#0095F7'}}>{item.url || ''}</Text>
            </View>
          </TouchableOpacity>
          {this.renderUsername(item)}
        </View>
      </View>
    )
  }

  renderImageItem(item, i, style) {
    return (
      <View key={i} style={[style]}>
        <View style={{width:250,alignItems:'flex-start'}}>
          <TouchableOpacity onPress={()=>this._onSelectItem(item,i)}>
            <Image style={{width:250,height:250,marginBottom:10}} source={item.imageSource} />
          </TouchableOpacity>
          {this.renderUsername(item)}
        </View>
      </View>
    )
  }

  renderVideoItem(item, i, style) {
    return (
      <View key={i} style={[style]}>
        <View style={{width:250,alignItems:'flex-start'}}>
          <TouchableOpacity onPress={()=>this._onSelectItem(item,i)}>
            <Image style={{width:250,height:250,marginBottom:10}} source={item.imageSource} />
          </TouchableOpacity>
          {this.renderUsername(item)}
        </View>
      </View>
    )
  }

  renderCompItem(item,i, style) {
    return (
      <View key={i} style={[style]}>
        <View style={{width:250,alignItems:'flex-start'}}>
          <TouchableOpacity onPress={()=>this._onSelectItem(item,i)}>
            <Image style={{width:250,height:250,marginBottom:10}} source={item.avatarSource} />
          </TouchableOpacity>
          <Text style={{fontSize:12,marginBottom:3}}>COMP: {!!item.name && item.text}</Text>
          {this.renderUsername(item)}
        </View>
      </View>
    )
  }

  renderChild(item, i) {
    let pos;
    if (i == 0) {
      this.itemPos = 'left';
    }
    if (item.type==='video' || item.type==='text' || item.type === 'link') {
      pos = 'center';
    } else {
      pos = this.itemPos;
      this.itemPos = pos === 'left' ? 'right' : 'left';
    }

    let style = {width:'100%', justifyContent:'flex-start', marginBottom:50};
    if (pos === 'left') {
      style = {...style, alignItems:'flex-start'};
    } else if (pos === 'right') {
      style = {...style, alignItems:'flex-end'};
    } else if (pos === 'center') {
      style = {...style, alignItems:'center'};
    }
    if (item.type === 'text') {
      return this.renderTextItem(item, i, style);
    }

    if (item.type === 'link') {
      return this.renderLinkItem(item, i, style);
    }

    if (item.type === 'image') {
      return this.renderImageItem(item, i, style);
    }

    if (item.type === 'video') {
      return this.renderVideoItem(item, i, style);
    }

    if (item.type === 'comp') {
      return this.renderCompItem(item, i, style);
    }
    return null;
  }

  render() {
    let {style, children, items, ...props} = this.props;
    props.style = [style, styles.container];

    return (
      <View {...props}>
        <View style={{width:'100%'}}>
          {children}
          {!!this.props.items && this.props.items.map((item, i) => this.renderChild(item,i))}
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flexDirection:'row',
  },
}

module.exports = VisualsLinearReponsive;
