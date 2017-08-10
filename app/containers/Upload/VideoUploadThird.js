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

class VideoUploadThird extends Component {

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
          style={{flex: 1, width: '100%'}} contentContainerStyle={{alignItems: 'center'}}>

          <Image style={styles.image} source={this.props.videoSource || Images.Cliqsix_1932x1952} />
          
          <ClqsixTextInput ref="name"
            style={{marginLeft: 40, marginRight:40, height: 50, borderBottomWidth: 0,}}
            needValidation={false}
            placeholder="Write a caption..."
            onChangeText={(text) => this.caption = text}
            onFocus={() => this.refs.scrollView.scrollToRef(this.refs.name)}
            />
        </ScrollView>
        <KeyboardSpacer/>

        
        <View style={{width: '100%', height: 45, flexDirection:'row'}}>
          <Image style={{width: 19, height: 19.97, marginLeft: 42,}} source={Images.Cliqsix_21x22} />
        </View>

        <View style={{width: '100%', height:50, flexDirection: 'row', backgroundColor: '#24D770', paddingHorizontal: 20,}}>
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
      </FullScreen>
    );
  }

  _onPost() {
    if (this.props.onPost) {
      this.props.onPost({
        source: this.props.videoSource,
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
  image: {
    width: 376,
    height: 376,
  }
});

export default VideoUploadThird;