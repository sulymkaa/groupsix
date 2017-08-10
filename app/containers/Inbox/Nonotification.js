'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Navigator,
    Image,
    ScrollView,
    Dimensions,
    Alert,
    ListView,
} from 'react-native';

import {
  Button,
  CustomNavigator,
  ClqsixtextInput,
  FullScreen,
  ScrollViewWrapper,
  TabView,
  Text,
  Images
} from '../../components';

class Nonotification extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <View style={{flexGrow:1, justifyContent:'center', alignItems:'center'}}>
        <View style={{flexDirection:'row',marginTop:-61}}>
          <Image source={Images.Like_Red_17x17} style={{marginRight:20}} />
          <Image source={Images.Dislike_Brown_17x17} style={{marginRight:20}} />
          <Image source={Images.Comment_Blue_17x17} style={{marginRight:20}} />
          <Image source={Images.Repost_Green_17x17} style={{marginRight:20}} />
          <Image source={Images.AddCircle_Purple_17x17} style={{marginRight:20}} />
          <Image source={Images.MessageCircle_Yellow_17x17}/>
        </View>
        <Text style={{fontSize:17,fontWeight:'bold',marginTop:35}}>No Notifications Yet</Text>
        <View style={{width:227,marginTop:6,justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontSize:15}}>Likes, comments, reposts, and comp additions will appear here.</Text>
        </View>
      </View>
    );
  }
};

export default Nonotification;