'use strict';

import React, { Component } from 'react';
import {
  Alert,
  ActivityIndicator,
  Image,
  Keyboard,
  Navigator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Button,
  Content,
  Footer,
  Header,
  Page,
  ClqsixTextInput,
  Images,
} from '../../components';

import {
  AuthAPI
} from '../../utils';

class ForgotPassword extends Component {

  children = {
    page: null,
    username: null,
    password: null,
    scrollEnabled: false,
  }

  model = {
    email : null
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navigator renderScene={this.renderScene.bind(this)} navigator={this.props.navigator} navigationBar={<Navigator.NavigationBar routeMapper={Page.NavigationBarRouteMapper}/>}/>
    );
  }
  
  renderScene(route, navigator) {
    return (
      <Page ref={ref => this.children.page = ref}>
        <Header title='Forgot Password' />

        <Content style={styles.content} scrollable={true} scrollEnabled={false}>

          <View style={styles.formContainer}>
            
            <View style={{marginTop: 53}}>
              <Text style={styles.h4}>We'll send you a code</Text>
              <Text style={styles.h4}>to reset your password.</Text>
            </View>

            <ClqsixTextInput ref={ref => this.children.username = ref} placeholder='Enter Email' style={{marginTop:45, paddingTop:0, paddingBottom:20, flex:0,justifyContent: 'flex-start'}} isRequired={true} dataType='email' keyboardType='email-address' onChangeText={(text) => this.model.email = text} errorMessages={{email:'Email is invalid or not in our system'}} />
            
            <Button.Simple text='Reset Password' style={styles.resetButton} textStyle={styles.resetButtonText} onPress={() => this.resetPassword()} />
            
          </View>

        </Content>
        
      </Page>
      );
    }

    resetPassword() {
      if (!this.children.username.isValid()) {
        this.children.username.focus();
        return;
      }
      
      Keyboard.dismiss();

      AuthAPI.sendPasswordResetEmail(this.model.email)
      .then(() => {
        this.props.navigator.push({id:'VerifyCode'});
      })
      .catch(() => {
        console.warn(1);
        this.props.navigator.push({id:'VerifyCode'});
      })
    }
}

const styles = StyleSheet.create({
  
  content: {
    flexDirection: 'row', 
    justifyContent : 'flex-start',
    paddingHorizontal: 25,
  },

  h4: {
    fontFamily: 'SF UI Text',
    fontSize: 15
  },

  formContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
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

export default ForgotPassword;