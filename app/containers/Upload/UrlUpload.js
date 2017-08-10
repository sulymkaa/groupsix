'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Navigator,
    Image,
    TabBarIOS,
    TabBarItemIOS,
    Dimensions,
    Alert,
    Keyboard,
    TextInput,
} from 'react-native';

import {
  ClqsixTextInput,
  CustomNavigator,
  FullScreen,
  KeyboardSpacer,
  ScrollView,
  Images,
} from '../../components';

class UrlUpload extends Component {

  url = '';
  caption = '';

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FullScreen style={styles.container}>
        <ScrollView
          ref="scrollView"
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          scrollEnabledOnKeyboard={true}
          style={{flex: 1, width: '100%'}} contentContainerStyle={{alignItems: 'flex-start'}}>

          <Image style={{marginLeft: 42, marginTop: 54}} source={Images.LinkCircle_Blue_51x51} />
        
          <ClqsixTextInput
            style={{marginLeft: 40, marginRight:40, paddingTop:20, borderBottomWidth: 0,}}
            needValidation={false}
            placeholder="Type or paste a URL"            
            onChangeText={(text) => this.url = text}
            />

          <ClqsixTextInput
            style={{
              marginLeft: 55,
              marginRight:40,
              marginTop: 16,
              paddingLeft: 12.5,
              height: 40,
              borderBottomWidth: 0,
              borderLeftWidth: 1,
              borderLeftColor:'#a3a3a3',
            }}
            underlineColorAndroid='transparent'
            textStyle={{fontWeight:'300'}}
            needValidation={false}
            placeholder="Write a caption..."
            onChangeText={(text) => this.caption = text}
            />
        </ScrollView>

        <View style={{width: '100%', height: 45, flexDirection:'row'}}>
          <Image style={{width: 19, height: 19.97, marginLeft: 42,}} source={Images.Cliqsix_21x22} />
        </View>

        <View style={{width: '100%', height:50, flexDirection: 'row', backgroundColor: '#000', paddingHorizontal: 20,}}>
          <View style={{flex: 1, alignItems:'flex-start', justifyContent:'center'}}>
            <TouchableOpacity onPress={() => this.props.navigator.pop()}>
              <Image source={Images.BackChevronLeft_White_9x16} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, alignItems:'flex-end', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this._onPost()}>
              <Text style={{color:'#fff', fontFamily: 'SF UI Text', fontSize: 15, fontWeight:'bold'}}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
        <KeyboardSpacer/>
      </FullScreen>
    );
  }

  _onPost() {
    if (this.props.onPost) {
      this.props.onPost({
        url : this.url,
        caption: this.caption
      });
    }
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    backgroundColor:'#fff'
  },
});

export default UrlUpload;