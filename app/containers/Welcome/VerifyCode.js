'use strict';

import React, { Component } from 'react';
import {
  Alert,
  ActivityIndicator,
  Image,
  Keyboard,
  Navigator,
  StyleSheet,
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
  Text,
  Images,
} from '../../components';

import {
  AuthAPI
} from '../../utils';

class VerifyCode extends Component {

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
        <Header title='Verify Identity' />

        <Content style={styles.content} scrollable={true} scrollEnabled={false}>

          <View style={styles.formContainer}>
            
            <View style={{marginTop: 53}}>
              <Text style={styles.h4}>Enter the 6-digit code.</Text>
            </View>

            <ClqsixTextInput ref={ref => this.children.username = ref} placeholder='' style={{marginTop:45, paddingTop:0, paddingBottom:20, flex:0,justifyContent: 'flex-start'}} isRequired={true}  onChangeText={(text) => this.model.email = text}/>
            
            <Button.Simple text='Verify' style={styles.resetButton} textStyle={styles.resetButtonText} onPress={() => this.resetPassword()} />
            
          </View>

        </Content>
        
      </Page>
      );
    }

    resetPassword() {
      Keyboard.dismiss();
      this.props.navigator.push({id:'ResetPassword'});
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

export default VerifyCode;