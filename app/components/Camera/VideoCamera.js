'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Modal,
} from 'react-native';

import Camera from './Camera';
import Images from '../Images';

class VideoCamera extends Component {

  photo = null;

  constructor(props) {
    super(props);
    this.state={
      cameraFront: false,
      cameraFlash: true,
    };
  }

  capture() {
    this.refs.camera.capture({mode: Camera.constants.CaptureMode.video});
  }

  stopCapture() {
    this.refs.camera.stopCapture();
  }

  toggleCapture() {
    this.refs.camera.toggleCapture();
  }

  _onCaptured(source) {
    if (this.props.onCaptured) {
      this.props.onCaptured(onCaptured);
    }
  }

  _onRequestClose() {
    this.refs.camera.killCapture();
    if (this.props.onRequestClose) {
      this.props.onRequestClose();
    }
  }

  render() {
    let {visible, transaprent, animationType, onRequestClose, ...props} = this.props;
    props.front = this.state.cameraFront;
    props.style = styles.preview;
    props.onRequestSelf = () => this.setState({cameraFront: !this.state.cameraFront});
    props.onRequestFlash = () => this.setState({cameraFlash: !this.state.cameraFlash});
    props.video = true;

    return (
      <Modal visible={visible === true} transaprent={transaprent===true} animationType={animationType || 'none'} onRequestClose={() => this._onRequestClose()}>
        <Camera ref="camera" {...props}/>
        <View style={styles.control}>
          <TouchableOpacity onPress={() => this.toggleCapture()}>
            <Image source={Images.Camera.RecordVideo} />
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor:'#000'
  },

  preview: {
    height: 376,
    width: '100%',
  },

  control: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
});

export default VideoCamera;