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
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';

import {
  Text,
  Images,
} from '../../components';

const styles = StyleSheet.create({
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
  },

  reportOption: {
    color:'#EF4345'
  }
  
});

class VisualPostOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visiblePostOptions: false,
      selectSharePostOption: false,
      selectSavePostOption: false,
      selectReportPostOption: false,
    }
  }

  render() {
    return (
      <Modal visible = {this.state.visiblePostOptions === true} transparent={true} onRequestClose={() => this.hidePostOptions()}>
          <View style={{position:'absolute', left:0, top:0, right:0, bottom:0, backgroundColor:'#000', opacity:0.6}} />
          <View style={{position:'absolute', left:0, top:0, right:0, bottom:0}}>
            <View style={{flexGrow:1, flexDirection:'row'}}>
              <TouchableOpacity style={{width:'100%', flexGrow:1}} onPress={() => this.hidePostOptions()} />
            </View>
            {this.renderScene()}
          </View>
      </Modal>
    )
  }

  renderScene() {
    if (this.state.selectReportPostOption) {
      return this.renderReportOptions();
    }
    return this.renderPostOptions();
  }

  renderPostOption(text, onPress, style) {
    let disabled = false;
    if (this.state.selectSharePostOption) {
      if (text !== 'Share') {
        disabled = true;
      }
    }
    if (disabled) {
      return <Text style={{color:'#a3a3a3'}}>{text}</Text>
    }

    let textStyle=[];
    if (!!style) textStyle.push(style);

    return (
      <TouchableOpacity onPress={() => !!onPress && onPress()}>
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
    )
  }

  renderPostOptions() {
    let showShare = this.props.hideShare !== true;
    return (
      <View style={{flexShrink:1, justifyContent:'flex-start', backgroundColor:'white'}}>
        <View style={{marginTop:22,marginBottom:20,paddingLeft:21}}>
          <TouchableOpacity onPress={() => {
              if (this.state.selectSharePostOption) this.showPostOptions();
              else this.hidePostOptions()
            }}
          >
            <Image source={Images.Cancel_Black_13x13} />
          </TouchableOpacity>
        </View>
        {showShare &&
          <View style={styles.option}>
            {!this.state.selectSharePostOption && this.renderPostOption('Share', ()=>this.selectSharePostOption())}
            {this.state.selectSharePostOption && (<Text>http://clqsix.com/view</Text>)}
            {this.state.selectSharePostOption &&
              (<View style={{flexGrow:1, alignItems:'flex-end', justifyContent:'center'}}>
                <TouchableOpacity>
                  <Text style={{color:'#0095F7',fontWeight:'bold'}}>Copy</Text>
                </TouchableOpacity>
              </View>)
            }
          </View>
        }
        <View style={[styles.option, showShare ? styles.optionBorder : {}]}>
          {this.renderPostOption('Save', ()=>{
            
          })}
        </View>
        <View style={[styles.option, styles.optionBorder]}>
          {this.renderPostOption('Report', ()=>{
            this.selectReportPostOption()
          })}
        </View>
      </View>
    );
  }

  renderReportOptions() {
    return (
      <View style={{flexShrink:1, justifyContent:'flex-start', backgroundColor:'white'}}>
        <View style={{marginTop:22,marginBottom:20,paddingLeft:21}}>
          <TouchableOpacity onPress={() => this.showPostOptions()}>
            <Image source={Images.BackChevron_Black_16x9} />
          </TouchableOpacity>
        </View>
        <View style={styles.option}>
          {this.renderPostOption("It's Spam", ()=>{
            
          }, styles.reportOption)}
        </View>
        <View style={[styles.option, styles.optionBorder]}>
          {this.renderPostOption("It's Inappropriate", ()=>{
            
          }, styles.reportOption)}
        </View>
      </View>
    );
  }

  showPostOptions(item) {
    this.setState({
      visiblePostOptions: true,
      selectSharePostOption: false,
      selectReportPostOption: false,
      selectSavePostOption: false,
    });
  }

  hidePostOptions() {
    this.setState({
      visiblePostOptions: false,
      selectSharePostOption: false,
      selectReportPostOption: false,
      selectSavePostOption: false,
    });
  }

  selectSharePostOption(item) {
    this.setState({
      selectSharePostOption: true,
      selectReportPostOption: false,
      selectSavePostOption: false,
    });
  }

  selectReportPostOption(item) {
    this.setState({
      selectSharePostOption: false,
      selectReportPostOption: true,
      selectSavePostOption: false,
    });
  }

  selectSavePostOption(item) {
    this.setState({
      selectSharePostOption: false,
      selectReportPostOption: false,
      selectSavePostOption: true,
    });
  }
}
module.exports = VisualPostOptions;