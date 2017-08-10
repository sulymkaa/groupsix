'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Navigator,
    Image,
    TabBarIOS,
    TabBarItemIOS,
    Dimensions,
    Keyboard,
} from 'react-native';

import {
  ClqsixTextInput,
  CustomNavigator,
  FullScreen,
  KeyboardSpacer,
  ScrollViewWrapper,
  Text,
  Alert,
  Images,
} from '../../components';

import {
  FirebaseStorageAPI,
} from '../../utils';

class VideoUploadFirst extends Component {

  constructor(props) {
    super(props);
    this.state = {
      saved : false,
      showSavedMessage: false,
    }
  }

  savePhoto() {
    if (!this.state.saved) {
      FirebaseStorageAPI.uploadVideoOnFirebase(this.props.videoSource.uri, function(downloadUrl){
        this.savedVideo = {
          uri: downloadUrl,
        };
        this.setState({
          saved: true,
          showSavedMessage: true,
        });
      }, function(error){

      });
    }
  }

  render() {
    return (
      <FullScreen style={styles.container}>

        <Image style={styles.image} source={this.props.videoSource || Images.Cliqsix_1932x1952} />


        <View style={{flex: 1, width: '100%', justifyContent: 'flex-end'}}>
          
          <View style={{width: '100%', flexDirection: 'row', marginBottom:50, paddingHorizontal:43.5,}}>
            <View style={{alignItems:'flex-start', justifyContent:'flex-start', marginRight:46.5}}>
              <TouchableOpacity onPress={() => this.saveVideo()}>
                <Text style={{fontWeight:'bold', color:'#a3a3a3', textDecorationLine:'underline'}}>{this.state.saved ? 'Saved' : 'Save'}</Text>
              </TouchableOpacity>
            </View>

            <View style={{alignItems:'flex-start', justifyContent:'flex-start'}}>
              <TouchableOpacity onPress={() => {}}>
                <Text style={{fontWeight:'bold', color:'#a3a3a3'}}>Crop ></Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{width: '100%', height:50, flexDirection: 'row', backgroundColor: '#24D770', paddingHorizontal: 20,}}>
            <View style={{flex: 1, alignItems:'flex-start', justifyContent:'center'}}>
              <TouchableOpacity onPress={() => this.props.navigator.pop()}>
                <Image source={Images.BackChevronLeft_White_9x16} />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, alignItems:'flex-end', justifyContent: 'center'}}>
              <TouchableOpacity onPress={() => this._onNext()}>
                <Text style={{color:'#fff', fontFamily: 'SF UI Text', fontSize: 15, fontWeight:'bold'}}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Alert visible={this.state.showSavedMessage===true} style={{backgroundColor:'#0095F7'}} text="Saved" onRequestClose={() => this.setState({showSavedMessage:false})}/>
      </FullScreen>
    );
  }

  _onNext() {
    if (!this.state.saved) {
      this.saveVideo();
    } else {
      if (this.props.onNext) {
        this.props.onNext(this.savedVideo);
      }
    }
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor:'#fff'
  },
  image: {
    width: 376,
    height: 376,
  }
});

export default VideoUploadFirst;