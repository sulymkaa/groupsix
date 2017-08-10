'use strict';

import React, { Component } from 'react';
import {
  Keyboard,
  Image,
  Navigator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Button,
  ClqsixTextInput,
  Content,
  Footer,
  Header,
  Page,
  Images,
} from '../../../components';

class FirstPage extends Component {

  keyboardShowListener = null;
  keyboardHideListener = null;

  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    this.keyboardShowListener = Keyboard.addListener("keyboardWillShow", function(){
      if (!!this.refs.content) {
        this.refs.content.setScrollEnabled(true);
      }
    }, this);

    this.keyboardHideListener = Keyboard.addListener("keyboardWillHide", function(){
      if(!!this.refs.content) {
        this.refs.content.scrollTo({x:0, y:0, animated:true});
        this.refs.content.setScrollEnabled(false);
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

  gotoNextPage() {
    if (!this.refs.name.isValid()) {
      this.refs.name.focus();
      return;
    }
    if (!this.refs.email.isValid()) {
      this.refs.email.focus();
      return;
    }
    if (!this.refs.password.isValid()){
      this.refs.password.focus();
      return;
    }

    Keyboard.dismiss();
    
    this.props.navigator.push({id: 2});

  }

  scrollToRef(component) {
    this.refs.content.scrollToRef(component);
  }

  _setName(value) {
    if (this.props.model) {
      this.props.model.name = value;
    }
  }

  _setEmail(value) {
    if (this.props.model) {
      this.props.model.email = value;
    }
  }

  _setPassword(value) {
    if (this.props.model) {
      this.props.model.password = value;
    }
  }

  render(route) {
    var _this = this;
    return (
      <Page>
        
        <Header title='Sign Up'/>

        <Content ref="content" style={styles.content} scrollable={true} scrollEnabled={this.props.scrollEnabled === true}>

          <View style={[styles.imageContainer,  {justifyContent:'center', alignItems:'center'}]}>
            <Image source={Images.Cliqsix_59x60} style={styles.image}/>
          </View>

          <View style={[styles.formContainer]}>

            <ClqsixTextInput style={styles.formControl} ref='name'
              placeholder='Profile name'
              needValidation={false}
              isRequired={true}
              onChangeText={(text) => this._setName(text)}
              onSubmitEditing={() => this.refs.email.focus()}
              onFocus={() => this.scrollToRef(this.refs.name)}/>
          
            <ClqsixTextInput style={styles.formControl} ref='email'
              placeholder='Email' 
              isRequired={true} 
              dataType='email' 
              keyboardType='email-address' 
              onChangeText={(text) => this._setEmail(text)} 
              onSubmitEditing={() => this.refs.password.focus()} 
              onFocus={() => this.scrollToRef(this.refs.email)}/>
          
            <ClqsixTextInput style={styles.formControl} ref='password' 
              placeholder='Password (6+ characters)' 
              isRequired={true} 
              minLength={6} 
              onChangeText={(text) => this._setPassword(text)} 
              secureTextEntry={true} 
              onFocus={() => this.scrollToRef(this.refs.password)}/>
          </View>
        </Content>

        <Footer style={{flexDirection:'row', alignItems: 'center', justifyContent:'center', height: 50, backgroundColor:'white'}}>
          <View style={{alignItems: 'center', justifyContent:'center'}}>
            <Button.Link text='Referral Code?' textStyle={styles.passwordForgetLinkText} style={styles.passwordForgetLink} onPress={() => {}}/>
          </View>
          <View style={{alignItems: 'center', justifyContent:'center', marginLeft: 76}}>
            <Button.Link text='Terms' textStyle={styles.passwordForgetLinkText} style={styles.passwordForgetLink} onPress={() => {}}/>
          </View>
        </Footer>

        <Footer>
          <Button.Simple text='Next' style={styles.nextButton} textStyle={styles.nextButtonText} onPress={() => this.gotoNextPage()} />
        </Footer>
      </Page>
    );
  }
}


const contentPaddingHorizontal = 35;
//const contentPaddingTop = 35;

const styles = StyleSheet.create({
  
  content: {
    flex: 1,
    flexDirection: 'row', 
    alignItems : 'flex-start',
    paddingHorizontal: contentPaddingHorizontal,
  },

  imageContainer: {
    justifyContent:'flex-start',
    alignItems: 'flex-start',
    marginTop: 47,
    
  },

  image: {
    width: 43,
    height: 45
  },

  formContainer: {
    flex: 1,
    marginLeft: 35,
    marginTop: 39,
  },

  inputGroup: {
    flexDirection:'row',
    
  },

  formControl: {
    paddingVertical: 20,
  },

  footerContainer: {
    
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderColor: '#f4f4f4',
  },

  footer: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  passwordForgetLink: {
  },

  passwordForgetLinkText: {
    color:'gray',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    textDecorationColor: 'gray'
  },

  nextButton: {
    width:'100%',
    alignItems:'flex-end',
  },

  nextButtonText: {
    fontWeight: 'bold'
  }
});
export default FirstPage;