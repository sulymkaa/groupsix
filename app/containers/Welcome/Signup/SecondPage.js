'use strict';

import React, { Component } from 'react';

import {
  Dimensions,
  Image,
  Keyboard,
  Navigator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

import {
  Button,
  ClqsixTextInput,
  Content,
  DropDownList,
  Footer,
  Header,
  Options,
  Page,
  Alert,
  Images,
} from '../../../components'

import {
  AuthAPI,
  FirebaseStorageAPI,
} from '../../../utils';

const ScreenSize  = Dimensions.get('window');
const ScreenWidth = ScreenSize.width < ScreenSize.height ? ScreenSize.width : ScreenSize.height;

const ContentPaddingHorizontal = 24;
const ContentPaddingTop = 20;
const ContentPaddingLeft = 50;

const AvatarWidth = 180;
const AvatarHeight = AvatarWidth;
const AvatarButtonWidth = 162;
const AvatarButtonHeight = 35;
const AvatarButtonTop = AvatarHeight - AvatarButtonHeight / 2;
const AvatarButtonLeft = (ScreenWidth - ContentPaddingHorizontal - ContentPaddingLeft - AvatarButtonWidth);

const styles = StyleSheet.create({
  
  content: {
    flexDirection: 'column',
    alignItems : 'flex-start',
    paddingHorizontal: ContentPaddingHorizontal,
    paddingLeft: ContentPaddingLeft,
  },

  avatarContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginTop: 10,
  },

  avatarContent: {
    width: AvatarWidth,
    height: AvatarHeight,
  },

  addAvatarButtonContainer: {
    borderWidth: 0.5,
    borderColor: '#a3a3a3',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    backgroundColor:'white',
    width: AvatarButtonWidth,
    height: AvatarButtonHeight,
    left: AvatarButtonLeft,
    top: AvatarButtonTop,
  },

  addAvatarButton: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },

  addAvatarButtonText: {
    fontFamily: 'SF UI Text',
    fontWeight: '600',
    fontSize: 13,
    color: '#A3A3A3',
  },

  avatar: {
    width:'100%',
    height: '100%'
  },

  formContainerWrapper: {
    flex:1,
    flexDirection: 'row',
    marginTop: 37.5
  },

  formContainer: {
    flex: 1,
    flexDirection:'column',
    paddingLeft: 49
  },

  ageInput: {
    height: 60,
  },

  inputGroup: {
    flexDirection:'row',
    
  },
  
  skipLink: {
  },

  skipLinkText: {
    color:'gray',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    textDecorationColor: 'gray'
  },  
  
  footer: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  passwordForgetLink: {
    borderBottomWidth:1,
    borderColor: 'gray'
  },

  passwordForgetLinkText: {
    color:'gray'
  },

  startButton: {
    width:'100%',
    alignItems:'flex-end'
  },

  startButtonText: {
    fontWeight: 'bold'
  },
});

class SecondPage extends Component {

  keyboardShowListener = null;
  keyboardHideListener = null;

  content = null;
  customGender = null;

  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      gender: null,
    };
  }

  async componentWillMount() {
    this.keyboardShowListener = Keyboard.addListener("keyboardWillShow", function(){
      if(!!this.content) {
        this.content.setScrollEnabled(true);
      }
    }, this);

    this.keyboardHideListener = Keyboard.addListener("keyboardWillHide", function(){
      if(!!this.content){
        this.content.scrollTo({x:0, y:0, animated:true});
        this.content.setScrollEnabled(false);
      }
    }, this);
  }

  async componentWillDismount() {
    if (this.keyboardShowListener) {
      Keyboard.removeListener(this.keyboardShowListener);
      this.keyboardShowListener = null;
    }

    if (this.keyboardHideListener) {
      Keyboard.removeListener(this.keyboardHideListener);
      this.keyboardHideListener = null;
    }
  }

  changeAvatar(source) {
    this.props.model.avatarSource = source;
    this.setState({
      avatarSource: source
    });
  }


  scrollToRef(component) {
    this.content.scrollToRef(component);
  }

  _setAge(value) {
    if (this.props.model) {
      this.props.model.age = value;
    }
  }

  _setGender(value) {
    if (!!this.props.model) {
      this.props.model.gender = value;
      this.setState({
        gender: value
      });
    }
  }
  
  render() {

    let avatarSource = this.state.avatarSource || this.props.model.avatarSource || Images.Profile_Gray_180x180;
    let avatarButtonText = this.state.avatarSource ? 'Add profile photo' : 'Edit profile photo';
    var _this = this;
    

    return (
      <Page ref='page'>

        <Header title='Sign Up' />

        <Content ref={(ref) => this.content = ref} style={styles.content} scrollable={true} scrollEnabled={this.props.scrollEnabled === true}>
        
          <View style={styles.avatarContainer}>
            <View style={styles.avatarContent}>
              <Image source={avatarSource} style={styles.avatar}/>
            </View>

            <View style={styles.addAvatarButtonContainer}>
              <TouchableOpacity style={styles.addAvatarButton} onPress={() => this.refs.imageChooser.show()}>
                <Text style={styles.addAvatarButtonText}>{avatarButtonText}</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.formContainerWrapper}>
            <View style={styles.formContainer}>
              <DropDownList.Gender onSelectItem={(item) => this._setGender(item)} value = {this.state.gender || this.props.model.gender}/>
              <ClqsixTextInput
                ref='age'
                needValidation={false}
                style={styles.ageInput}
                placeholder='Age'
                keyboardType='numeric' 
                onChangeText={(text) => this._setAge(text)}
                onFocus={() => this.scrollToRef(this.refs.age)}
                maxLength={2}
                value = {this.props.model.age}
                />
            </View>
          </View>
        </Content>

        <Footer style={{flexDirection:'row', alignItems: 'center', justifyContent:'center', height: 50, backgroundColor:'white'}}>
          <View style={{alignItems: 'center', justifyContent:'center'}}>
            <Button.Link text='Skip' textStyle={styles.skipLinkText} style={styles.skipLink} onPress={() => {this.skip()}}/>
          </View>
        </Footer>
        
        <Footer>
          <Button.Simple text='Done' style={styles.startButton} textStyle={styles.startButtonText} onPress={() => {this.signupWithAvatar()}} />
        </Footer>
        
        <Options.ImageChooser ref="imageChooser" onImageSelected={(source) => this.changeAvatar(source)} />
        <Alert ref="alert"
          style={{backgroundColor:'#24d770'}} 
          text={['You must be 13 or older', 'to use CLQSIX.']}
          onRequestClose={() => this.refs.alert.hide()}/>
      </Page>
    );
  }

  signup(model) {
    let _this = this, _model = model || this.props.model;
    AuthAPI.createUserWithEmailAndPassword( _model)
    .then(() => {
      if (!!_this.refs.page)
        _this.refs.page.hideActivityIndicator();

      if (!!_this.props.onSignupSuccess)
        _this.props.onSignupSuccess();

    })
    .catch(error => {
      if (_this.refs.page)
        _this.refs.page.hideActivityIndicator();

      alert(error.message);
    });
  }

  signupWithAvatar() {
    if (this.props.model.age < 13) {
      this.refs.alert.show();
      return;
    }
	let _this = this;
    Keyboard.dismiss();
    this.refs.page.showActivityIndicator();

    let {avatarSource, ...model} = this.props.model;
    
    if (!avatarSource) {
      this.signup(model);
      return;
    }
    
    FirebaseStorageAPI.uploadImageOnFirebase(avatarSource.uri)
    .then(downloadUri => {
        model.photoURL = downloadUri;
        _this.signup(model);
    })
    .catch(error => {
      Alert.alert('Error', error.message);
        if (_this.refs.page) _this.refs.page.hideActivityIndicator();
    });
  }

  skip() {
    let _this = this, {name, email, password} = this.props.model;
    Keyboard.dismiss();
    this.refs.page.showActivityIndicator();
    this.signup({
      name: name,
      email: email,
      password: password
    });
  }
}

export default SecondPage;