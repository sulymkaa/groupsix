'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Navigator,
  Image,
  Alert,
  Modal,
} from 'react-native';

import {
  Button,
  ClqsixTextInput,
  Content,
  Footer,
  Header,
  Page,
  ScrollView,
  Text,
  KeyboardSpacer,
  CustomNavigator,
  ModalActivityIndicator,
  Images,
} from '../../components';

import {
  AuthAPI
} from '../../utils';

class Login extends Component {

  children = {
    page: null,
    username: null,
    password: null,
    scrollEnabled: false,
  };

  username = '';

  password = '';

  didDismount = false;

  fnComponentDidUpdate = null;

  constructor(props) {
    super(props);
    this.state = {
      borderColor: 'gray',
      showActivityIndicator: false
    }
  }

  componentWillUpdate(nextProps, nextState) {
  }

  componentDidUpdate() {

  }

  render() {
    return (
      <View style={styles.container}>
        <CustomNavigator leftButton={<Image source={Images.BackChevronLeft_Black_9x16}/>} onLeftButtonPress={()=>this.props.navigator.pop()}>
          <Text style={{fontWeight:'bold'}}>Log In</Text>
        </CustomNavigator>
        <ScrollView ref={ref => this.children.scrollView = ref} scrollEnabled={false} scrollEnabledOnKeyboard={true}>
          <View style={{flexDirection:'row'}}>
            <View>
              <Image source={Images.Cliqsix_59x60} style={styles.loginIcon} resizeMode='contain' resizeMethod='scale' />
            </View>
            <View style={styles.loginInputGroup}>
              <ClqsixTextInput ref={ref => this.children.username = ref}
                style={styles.input}
                styleWithMessage={styles.inputWithMessage}
                errorMessageStyle={styles.errorMessage}
                suffixIcon={false}
                isRequired={true}
                placeholder='Email or username'
                dataType='email'
                keyboardType='email-address'
                onChangeText={(text) => this.username = text}
                onSubmitEditing={() => this.children.password.focus()} />
              <ClqsixTextInput ref={ref => this.children.password = ref}
                style={styles.input}
                styleWithMessage={styles.inputWithMessage}
                suffixIcon={false}
                isRequired={true}
                placeholder='Password'
                onChangeText={(text) => this.password = text}
                secureTextEntry={true}
                errorMessages={{required:"Please enter your password!"}} />
            </View>
          </View>
        </ScrollView>

        
        <TouchableOpacity style={styles.forgotPasswordLink} onPress={() => this.gotoForgotPassword()}>
          <Text style={styles.forgotPasswordLinkText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.login()}>
          <View style={styles.startButton}>
            <Text style={styles.startButtonText}>Start</Text>
          </View>
        </TouchableOpacity>

        <KeyboardSpacer/>

        <ModalActivityIndicator visible={this.state.showActivityIndicator} modal={false} />

      </View>
    )
  }

  gotoForgotPassword() {
    this.props.navigator.push({id: 'ForgotPassword'});
  }

  login() {
    this.children.username.runValidation();
    this.children.password.runValidation();
    if (this.children.username.isValid() && this.children.password.isValid()) {
      this.setState({
        showActivityIndicator: true
      });

      AuthAPI.signInWithEmailAndPassword(this.username,this.password)
      .then(() => {
        if(!!this.props.onLoginSuccess){
          setTimeout(() => {
            this.props.onLoginSuccess()
          }, 1);
        }
        this.setState({
          showActivityIndicator: false
        });  
      })
      .catch(error => {
        if(!!error.message && error.message !== '') alert(error.message);
        this.setState({
          showActivityIndicator: false
        });  
      });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    alignItems:'stretch'
  },

  loginIcon: {
    width:43,height:45,marginLeft:31,marginRight:35, marginTop:48
  },

  loginInputGroup: {
    flex:1,paddingRight:25,paddingTop:31.5
  },

  input: {
    height:60,
    paddingVertical: 21.5
  },

  inputWithMessage: {
    height:87,
  },

  forgotPasswordLink: {
    alignItems:'center'
  },

  forgotPasswordLinkText: {
    textDecorationLine:'underline', textDecorationStyle:'solid', textDecorationColor:'#a3a3a3', fontSize:15, color:'#a3a3a3'
  },

  startButton: {
    flexDirection:'row', height:50, backgroundColor:'#0095F7', alignItems:'center', justifyContent:'flex-end',paddingRight:16, marginTop:19
  },

  startButtonText: {
    fontSize:15, fontWeight:'bold',color:'white'
  },

  
});

export default Login;