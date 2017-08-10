'use strict';

import React, { Component } from 'react';
import {
  Image,
  Modal,
  Navigator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';

import {
  Button,
  Content,
  Footer,
  FullScreen,
  Header,
  Page,
  Images,
} from '../../components'

class Start extends Component {

/*
  render() {
    return (
      <Navigator renderScene={this.renderScene.bind(this)}/>
    );
  }
*/
//  renderScene(route, navigator) {
  render() {
    return (
      <Page>
        <Content style={styles.content}>
          <View style={{marginTop: 30, alignItems:'center'}}>
            <Image source={Images.Cliqsix_59x60} style={styles.image}/>
          </View>
          <View style={{marginTop:55, alignItems:'center'}}>
            <Text style={styles.text}>CLQSIX is made for</Text>
            <Text style={styles.text}><Text style={{fontSize: 40, color:'black'}}>artists</Text> like</Text>
            <Text style={styles.text}>you.</Text>
          </View>
          <View style={{marginTop:100, paddingHorizontal: 70, alignItems:'center'}}>
            <Text style={styles.comment}>“We created CLQSIX for you to build together. Welcome to the age of COLLABORATION.”</Text>
            <Text style={[styles.comment, {}]}> </Text>
            <Text style={[styles.comment, {marginTop:-3, width: '100%',textAlign:'right', paddingRight:10}]}>- cokeem</Text>
          </View>
          <Button.Simple style={{marginTop: 62}} text='Start' onPress={()=>{this._onStart()}}/>
        </Content>
      </Page>
    );
  }

  _onStart() {
    if (!!this.props.onStart) {
      this.props.onStart();
    }
  }
}

const styles = StyleSheet.create({
  
  content: {
    justifyContent:'center',
    paddingHorizontal: 25,
    //justifyContent: 'flex-start',
  },

  image: {
    width: 70,
    height: 73.26,
  },

  text: {
    fontFamily: 'SF UI Text',
    fontWeight: 'bold',
    fontSize: 22,
  },

  comment: {
    fontFamily: 'SF UI Text',
    fontSize: 13,
    color:'#A3A3A3',
  }
  
});

export default Start;