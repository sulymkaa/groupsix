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
import Images from '../Images'

class PhotoCamera extends Component {

  photo = null;

  constructor(props) {
    super(props);
    this.state={
      cameraFront: false,
      cameraFlash: true,
    };
  }

  capture() {
    this.refs.camera.capture();
  }

  _onCaptured(source) {
    if (this.props.onCaptured) {
      this.props.onCaptured(onCaptured);
    }
  }

  _onRequestClose() {
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
    props.video = false;

    return (
      <Modal visible={visible === true} transaprent={transaprent===true} animationType={animationType || 'none'} onRequestClose={() => this._onRequestClose()}>
        <Camera ref="camera" {...props}/>
        <View style={styles.control}>
          <TouchableOpacity onPress={() => this.capture()}>
            <Image source={Images.Camera.TakePhoto} />
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
    height:500,
    width: '100%',
  },

  control: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
});

export default PhotoCamera;