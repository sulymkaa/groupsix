'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Navigator,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {
  Button,
  ClqsixTextInput,
  Content,
  Footer,
  Header,
  Page,
  Images,
} from '../../components';

import {
  AuthAPI
} from '../../utils';

class ResetPassword extends Component {

  children = {
    page: null,
    username: null,
    password: null,
    scrollEnabled: false,
  };

  username = '';

  password = '';

  didDismount = false;


  constructor(props) {
    super(props);
    this.state = {
      borderColor: 'gray',
    }
  }

  render() {
    return (
      <Navigator renderScene={this.renderScene.bind(this)} navigator={this.props.navigator} navigationBar={<Navigator.NavigationBar routeMapper={Page.NavigationBarRouteMapper}/>}/>
    );
  }
  
  renderScene(route, navigator) {
    return (
      <Page ref={ref => this.children.page = ref}>
        <Header title='New Password' />

        <Content style={styles.content} scrollable={true} scrollEnabled={this.state.scrollEnabled}>
          <View style={styles.imageContainer}>
            <Image source={Images.Cliqsix_59x60} style={styles.image} />
          </View>

          <View style={styles.formContainer}>
            
            <ClqsixTextInput ref={ref => this.children.password = ref} placeholder='New password (6+ characters)' style={styles.formControl} isRequired={true} minLength={6} onChangeText={(text) => this.password = text} secureTextEntry={true}/>
            
            <ClqsixTextInput ref={ref => this.children.repassword = ref} placeholder='Re-enter new password' style={styles.formControl} isRequired={true} minLength={6} onChangeText={(text) => this.password = text} secureTextEntry={true}/>
            
          </View>

        </Content>

        <Button.Simple text='Confirm' style={styles.resetButton} textStyle={styles.resetButtonText} onPress={() => {}}/>
      </Page>
      );
    }

    gotoForgotPassword() {
      this.props.navigator.push({id: 'ForgotPassword'});
    }

    login() {
      if (this.children.username.isValid() && this.children.password.isValid()) {
        this.children.page.showActivityIndicator();
        AuthAPI.signInWithEmailAndPassword(this.username,this.password)
        .then(() => {
          if(!!this && !!this.children && !!this.children.page) {
            this.children.page.hideActivityIndicator();
            if(!!this.props.onLoginSuccess) this.props.onLoginSuccess();
          }
        })
        .catch(error => {
          if (!!this && !!this.children && !!this.children.page) {
            this.children.page.hideActivityIndicator();
            !!error.message && error.message !== '' &&  alert(error.message);
          }
        });
      }
    }
}

const styles = StyleSheet.create({
  
  content: {
    flexDirection: 'row', 
    alignItems : 'flex-start',
    paddingHorizontal: 31,
  },

  imageContainer: {
    justifyContent:'flex-start',
    alignItems: 'center',
    marginTop: 47,
  },

  image: {
    width: 43,
    height: 45
  },

  formContainer: {
    flex: 1,
    marginLeft: 35,
    marginTop: 30,
  },

  formControl: {
    borderColor: '#adadad',
    borderBottomWidth: 1,
    height: 60,
  },
  
  passwordForgetLink: {
  },

  passwordForgetLinkText: {
    color:'gray',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    textDecorationColor: 'gray'
  },

  startButton: {
    width:'100%',
    alignItems:'flex-end',
  },

  startButtonText: {
    fontWeight: 'bold'
  },

  resetButton: {
    width: '100%',
    marginTop: 46,
  },

  resetButtonText: {
    fontWeight: 'bold',
    fontFamily: 'SF UI Text',
  }
  
});

export default ResetPassword;