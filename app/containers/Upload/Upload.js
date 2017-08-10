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

import ImagePicker from 'react-native-image-picker';

import firebase from 'firebase';

import {
  ClqsixTextInput,
  CustomNavigator,
  FullScreen,
  KeyboardSpacer,
  ScrollViewWrapper,
  PhotoCamera,
  VideoCamera,
  Images,
} from '../../components';

import {
  VisualModel,
} from '../../models';

import ImageUploadFirst from './ImageUploadFirst';
import ImageUploadThird from './ImageUploadThird';

import VideoUploadFirst from './VideoUploadFirst';
import VideoUploadThird from './VideoUploadThird';

import UrlUpload from './UrlUpload';
import TextUpload from './TextUpload';


class Upload extends Component {

  navigator = null;
  imageSource = null;
  videoSource = null;

  imageUrl = null;

  constructor(props) {
    super(props);
    this.state={
      modal: null
    };
  }

  launchCamera() {
    this.imageSource = null;
    ImagePicker.launchCamera(
      {
        quality: 1.0,
        allowsEditing: false,
      },
      (response) => {this._onPhotoTaken(response);}
    );
  }

  _onPhotoTaken(response) {
    
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
      let source = { uri: response.uri };
    // You can also display the image using data:
    // let source = { uri: 'data:image/jpeg;base64,' + response.data };
      this.imageSource = source;
      this.navigator.push({
        id: 'Image'
      });
    }
  }

  _onUploadText() {
    this.navigator.push({
      id: 'Text'
    });
  }

  _onUploadLink() {
    this.navigator.push({
      id: 'Link'
    });
  }

  _onUploadImage() {
    this.setState({
      modal: 'PhotoCamera',
    })
  }

  _onUploadComp() {
    if (this.props.onUploadComp) {
      this.props.onUploadComp();
    }
  }

  _onUploadVideo() {
    this.setState({
      modal: 'VideoCamera',
    })
  }

  _onClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  _onTakenPhoto(photo) {
    this.imageSource = photo;
    this.setState({
      modal: null,
    });
    this.navigator.push({
      id: 'Image1'
    });  
  }

  _onTakenVideo(video) {
    this.videoSource = video;
    this.setState({
      modal: null,
    });
    this.navigator.push({
      id: 'Video1'
    });
  }
  
  render() {
    return (
      <Navigator ref={ref => this.navigator = ref} initialRoute={{id: 'Start'}} renderScene={this.renderScene.bind(this)}/>
    );
  }

  renderScene(route, navigator) {
    var routeId = route.id;
    if (routeId === 'Start') {
      return this.renderDefault();
    }
    
    if (routeId === 'Image1') {
      return <ImageUploadFirst navigator = {this.navigator} imageSource = {this.imageSource}  onNext={(imageSource) => {this.imageSource = imageSource; this.navigator.push({id: "Image3"});}}/>
    }
    if (routeId === 'Image3') {
      return <ImageUploadThird navigator = {this.navigator} imageSource = {this.imageSource}  onPost={(photo) => this.postImage(photo)}/>
    }

    if (routeId === 'Video') {      
      return <VideoUpload navigator = {this.navigator} onTakenVideo={(video) => this._onTakenVideo(video)}/>
    }
    if (routeId === 'Video1') {
      return <VideoUploadFirst navigator = {this.navigator} videoSource = {this.videoSource}  onNext={(videoSource) => {this.videoSource = videoSource; this.navigator.push({id: "Video3"});}}/>
    }
    if (routeId === 'Video3') {
      return <VideoUploadThird navigator = {this.navigator} videoSource = {this.videoSource}  onPost={(video) => this.postVideo(video)}/>
    }

    if (routeId === 'Link') {
      return <UrlUpload navigator = {this.navigator} onPost={(link) => this.postLink(link)} />
    }
    if (routeId === 'Text') {
      return <TextUpload navigator = {this.navigator} onPost={(text) => this.postText(text)} />
    }
  }

  renderDefault() {
    return (
      <FullScreen style={styles.container}>
        <CustomNavigator style={styles.navigator} leftButton = {<Image source={Images.Cancel_Black_13x13}/>} onLeftButtonPress={() => this._onClose()} />
        <View style={{flex: 1, width: '100%', justifyContent:'center'}}>
          <FullScreen.Row style={{paddingHorizontal: 82, flexDirection:'row'}}>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <View style={{alignItems:'center'}}>
                <TouchableOpacity onPress={() => this._onUploadImage()}>
                  <Image source={Images.UploadPhoto_70x70} />
                </TouchableOpacity>
                <Text style={{marginTop:8}}>Photo</Text>
              </View>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <View style={{alignItems:'center'}}>
                <TouchableOpacity onPress={() => this._onUploadVideo()}>
                  <Image source={Images.UploadVideo_78x78} />
                </TouchableOpacity>
                <Text style={{marginTop:8}}>Video</Text>
              </View>
            </View>
          </FullScreen.Row>

          <FullScreen.Row style={{marginTop:2, paddingLeft:50, paddingRight:36, flexDirection:'row'}}>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <View style={{alignItems:'center'}}>
                <TouchableOpacity onPress={() => this._onUploadLink()}>
                  <Image source={Images.UploadLink_51x41} />
                </TouchableOpacity>
                <Text style={{marginTop:8}}>Link</Text>
              </View>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <TouchableOpacity onPress={() => this._onUploadComp()}>
                <Image source={Images.UploadComp_133x107} />
              </TouchableOpacity>
              <Text style={{marginTop:8}}>Compilation</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <View style={{alignItems:'flex-end'}}>
                <TouchableOpacity onPress={() => this._onUploadText()}>
                  <Image source={Images.UploadText_60x45} />
                </TouchableOpacity>
                <Text style={{marginTop:8}}>Text</Text>
              </View>
            </View>
          </FullScreen.Row>

          <FullScreen.Row style={{marginTop:26}}>
            <Image source={Images.UploadMoment_247x46} />
          </FullScreen.Row>
        </View>
        <Text style={{marginBottom: 23, fontFamily:'SF UI Text', fontSize: 17, fontWeight:'bold', textAlign:'center', color:'#a3a3a3'}}>Post to CLQSIX</Text>
        
        {this.state.modal && <FullScreen style={{backgroundColor:'#000'}} />}
        <PhotoCamera visible = {this.state.modal === 'PhotoCamera'} onCaptured={(photo) => this._onTakenPhoto(photo)} onRequestClose={() => this.setState({modal:null})}/>
        <VideoCamera visible = {this.state.modal === 'VideoCamera'} onCaptured={(video) => this._onTakenVideo(video)} onRequestClose={() => this.setState({modal:null})}/>
      </FullScreen>
    );
  }

  postVisual(visual) {
    let _this = this;
    VisualModel.push(visual)
    .then(() => {
      if (!!_this.navigator) {
        _this.navigator.popToTop();
      }
    })
    .catch((error) => {
      aleert(error.message);
    })
  }

  postImage(photo) {
    let {source, caption} = photo;
    let post = {
      type: 'image',
      source: {uri: photo.uri},
      caption: caption,
    }
    this.postVisual(post);
  }

  postLink(link) {
    let {url, caption} = link;
    this.postVisual({
      type: 'link',
      url: url,
      caption: caption,
    });
  }

  postText(text) {
    this.postVisual({
        type: 'text',
        text: text,
      }
    );
  }

  postVideo(video) {
    let {source, caption} = video;
    
    let post = {
      type: 'video',
      source: {uri: video.uri},
      caption: caption,
    }
    this.postVisual(post);
  }

  postComp(comp) {
    this.navigator.popToTop();
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent : 'center',
    backgroundColor: '#fff'
    //justifyContent: 'flex-end',
    //flex: 1,
  },
  navigator: {
    marginBottom: 0,
  }
});

export default Upload;