'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Navigator,
    Image,
    ScrollView,
    TabBarIOS,
    TabBarItemIOS,
    Dimensions,
    Alert,
    Modal,
} from 'react-native';

import {
  Button,
  ClqsixTextInput,
  Text,
  CustomNavigator,
  FullScreen,
  ScrollViewWrapper,
  Options,
  Images,
} from '../../components';

import {
  AuthAPI
} from '../../utils'

const HorizontalPaging = ScrollViewWrapper.HorizontalPaging;
const ImageScrollView = ScrollViewWrapper.ImageScrollView;

class JoinClique extends Component {

  constructor(props) {
    super(props);
    this.state = {
      avatarImage : null,
    }
  }

  _onRequestClose() {
    if (this.props.onRequestClose) {
      return this.props.onRequestClose();
    }
  }

  changeAvatar(source) {
    this.setState({
      avatarImage: source
    });
  }

  render() {
    let currentUser = this.state.currentUser || AuthAPI.currentUser();
    let avatarImage = this.state.avatarImage || Images.CliqueAvatar_Gray_180x180;
    let editAvatar = !this.state.avatarImage ? 'Add' : 'Edit';

    return (
      <FullScreen>
        <CustomNavigator
          style={{marginBottom:0}}
          leftButton = {<Image source={Images.BackChevron_Black_16x9}/>}
          onLeftButtonPress={() => this._onRequestClose()}
        >
          <Text style={{fontFamily:'SF UI Text', fontSize: 17, marginLeft:8, fontWeight:'bold'}}>Join Clique</Text>
        </CustomNavigator>

        <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:60,fontWeight:'900',color:'#24d770',marginTop:-140}}>@</Text>
          <Text style={{marginTop:11, fontSize:17,fontWeight:'bold'}}>No Invites Yet</Text>
          <View style={{marginTop:6, width:205,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:15,fontWeight:'300'}}>When a friend invites you to join a clique, it’ll appear here.</Text>
          </View>
        </View>

      </FullScreen>
    );
  }
};

const styles = StyleSheet.create({
  pageContainer: {
    height:175,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 25,
  },

  page: {
    alignItems:'center',
    justifyContent:'center'
  },

  pageText: {
    fontFamily:'SF UI Text',
    fontWeight:'900',
    fontSize:17,
    color:'white'
  }
});

export default JoinClique;