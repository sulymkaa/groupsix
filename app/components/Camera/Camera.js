'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import Camera from 'react-native-camera';

import ImagePicker from 'react-native-image-picker';

import PhotoCamera from './PhotoCamera';

import VideoCamera from './VideoCamera';

import Images from '../Images'

const styles = StyleSheet.create({
  fullscreen: {
    position:'absolute',
    left:0,
    top:0,
    right:0,
    bottom:0
  },
  container: {
    flex: 1,
    flexDirection:'row',
    paddingHorizontal:20,
    paddingVertical:15,
  },
  leftPanel: {
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'flex-end'
  },
  rightPanel: {
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'flex-end'
  }
})

export default class ClqsixCamera extends Component {

  static Photo = PhotoCamera;
  static Video = VideoCamera;

  camera = null;
  videoUri = null;

  constructor(props) {
    super(props);
    this.state = {
      capturing : false,
    }
  }

  _onRequestFlash() {
    if (!this.state.capturing && this.props.onRequestFlash) {
      this.props.onRequestFlash();
    }
  }

  _onRequestSelf() {
    if (!this.state.capturing && this.props.onRequestSelf) {
      this.props.onRequestSelf();
    }
  }

  render() {
    let {onCaptured, children, ...props} = this.props;
    if (this.props.video === true) {
      props.captureMode = Camera.constants.CaptureMode.video;
    }
    if (this.props.flash === true) {
      props.flashMode = Camera.constants.FlashMode.on;
    } else {
      props.flashMode = Camera.constants.FlashMode.off; //auto
    }
    
    //props.orientation = Camera.constants.Orientation.portrait;

    props.aspect = Camera.constants.Aspect.fill;

    if (this.props.front === true) {
      props.type = Camera.constants.Type.front;
    } else {
      props.type = Camera.constants.Type.back;
    }

    return (
      <Camera ref={ref=>this.camera=ref} {...props}>
        <View style={styles.fullscreen}>
          <View style={styles.container}>
            <View style={styles.leftPanel}>
              <TouchableOpacity onPress={() => this.launchLibrary()} accessible={!this.isCapturing()}>
                <Image source={Images.Camera.ChooseLibrary} />
              </TouchableOpacity>
            </View>
            <View style={styles.rightPanel}>
              <TouchableOpacity style={{marginRight:30}} onPress={() => this._onRequestFlash()} accessible={!this.isCapturing()}>
                <Image source={Images.Camera.Flash} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._onRequestSelf()} accessible={!this.isCapturing()}>
                <Image source={Images.Camera.Self} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        { children }
      </Camera>
    );
  }

  isCapturing() {
    return this.state.capturing === true;
  }

  launchImageLibrary() {
    ImagePicker.launchImageLibrary(
      {
        quality: 1.0,
        allowsEditing: false,
        mediaType: 'photo'
      },
      (response) => {this._onPickImage(response);}
    );
  }

  launchVideoLibrary() {
    ImagePicker.launchImageLibrary(
      {
        quality: 1.0,
        allowsEditing: false,
        mediaType: 'video',
      },
      (response) => {this.onPickImage(response);}
    );
  }

  launchLibrary() {
    if (!this.caputring) {
      if (this.props.video === true) {
        this.launchVideoLibrary();
      } else{
        this.launchImageLibrary();
      }
    }
  }

  capture() {
    var mode = (this.props.video === true)?Camera.constants.CaptureMode.video:Camera.constants.CaptureMode.still;
    const options = {mode: mode};
    this.videoUri = null;
    if (this.props.video === true) {
      this.setState({
        capturing: true
      });
    }
    this.camera.capture({metadata: options})
    .then((data) => {
      alert(JSON.stringify(data));
      if (this.props.video === true) {
        this.videoUri = data.mediaUri;
        this._onCaptured(data.mediaUri);
      } else {
        this._onCaptured(data.mediaUri);
      }
    })
    .catch(err => {
      if (this.state.capturing) {
        this.setState({
          capturing: false
        });
      }
      console.error(err);      
    });
  }

  _stopCapture() {
    this.camera.stopCapture();
    if (this.state.capturing) {
      this.setState({
        capturing: false
      });
    }
  }

  stopCapture() {
    this._stopCapture();
    if (this.props.onCaptured && this.videoUri) {
      this._onCaptured(this.videoUri);
      this.videoUri = null;
    }
  }

  killCapture() {
    this._stopCapture();
    this.videoUri = null;
  }

  toggleCapture() {
    if (!this.state.capturing) {
      this.capture();
    } else {
      this.stopCapture();
    }
  }

  _onPickImage(response) {
    
    if (response.didCancel) {
      console.log('User cancelled photo picker');
    }
    else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    }
    else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    }
    else {
      this._onCaptured(response.uri);
    }
  }

  _onCaptured(uri) {
    if (this.props.onCaptured) {
      this.props.onCaptured({
        uri: uri
      });
    }
  }
}
