'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Navigator,
  Image,
  ScrollView,
} from 'react-native';

import {
  Button,
  Content,
  Footer,
  Header,
  Page,
  Images,
} from '../../components';

import {
  SeparatorLineColor,
} from '../../styles/GlobalStyles';

class Welcome extends Component {
  
  render() {
    return (
      <Navigator renderScene={this.renderScene.bind(this)} navigator={this.props.navigator}/>
    );
  }

  renderScene(route, navigator) {
    var imageItems = this.props.images || testImages;
    return (
      <Page>
        <Header style={styles.header}>
          <ScrollView automaticallyAdjustContentInsets={true} horizontal={true} showsHorizontalScrollIndicator={false} style={{}} alwaysBounceHorizontal={true} centerContent={true}>
          {THUMB_URLS.map(createThumbRow)}
          </ScrollView>
        </Header>

        <Content style={styles.content}>
          <View style={styles.avatarContainer}>
            <View>
              <View style={styles.avatar}>
                <Image style={styles.avatarImage} resizeMode='contain' resizeMethod='scale' source={Images.Cliqsix_59x60}/>
                <Text style={styles.avatarTitle}>CLQSIX</Text>
              </View>
              <Text style={styles.avatarText}>collaborate with friends</Text>
            </View>
          </View>
          <Button.Simple onPress={this.gotoSignup.bind(this)}  text='Sign Up' style={styles.signupButton} textStyle={styles.signupButtonText} />
        </Content>

        <Footer style={styles.footer}>
          <Text style={styles.loginQuestion}>Have an account? </Text>
          <Button.Link onPress={this.gotoLogin.bind(this)} text='Log In' textStyle={styles.loginButton}/>
        </Footer>
      </Page>
      );
    }
    
    gotoSignup() {
    this.props.navigator.push({ id : 'Signup'});  
  }
  
  gotoLogin() {
    this.props.navigator.push({ id : 'Login'});
  }
}

const testImages = [
  {
    key: 1,
    source : "../../assets/images/test/1.png",
  },
  {
    key: 2,
    source : '../../assets/images/test/2.png',
  },
  {
    key: 3,
    source : '../../assets/images/test/3.png',
  }
];

class Thumb extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return (
      <View style={styles.image}>
        <Image style={styles.image} source={{uri: this.props.source}} />
      </View>
    );
  }
}

var THUMB_URLS = [
  'http://lorempixel.com/400/200',
  'http://lorempixel.com/400/200',
  'http://lorempixel.com/400/200',
  'http://lorempixel.com/400/200',
];

var createThumbRow = (uri, i) => <Thumb key={i} source={uri} />;

const styles = StyleSheet.create({
  header: {
    alignItems:'flex-start',
    height: 82,
    marginTop: 20,
  },

  content: {
    justifyContent:'center'
  },

  avatarContainer: {
    alignItems:'center',
    marginTop: -23,
  },

  avatar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: -8,
  },

  avatarImage: {
    width: 59,
    height: 61.27,
    marginTop: 12,
  },

  avatarTitle: {
    fontFamily: 'Alegre Sans',
    fontSize: 80,
    letterSpacing: 2.33,
    paddingHorizontal: 15,
    backgroundColor: 'transparent',    
  },

  avatarText: {
    fontFamily: 'SF UI Text',
    fontSize: 17,
    letterSpacing: 2,
    color:'black',
  },

  signupButton: {
    marginTop: 40,
    marginLeft:25,
    marginRight:25,
    height: 46,
  },

  signupButtonText: {
    fontWeight: 'bold',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    height: 92,
    borderTopWidth: 1,
    borderColor: SeparatorLineColor,
  },

  loginQuestion: {
    fontSize: 15,
    color: '#a3a3a3',
    fontWeight: 'bold',
    fontFamily: 'SF UI Text',
  },

  loginButton: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'SF UI Text',
  },

  image: {
    height:62,
    width:80,
  }
  
});

export default Welcome;