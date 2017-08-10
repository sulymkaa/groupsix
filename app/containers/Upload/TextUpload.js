'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Navigator,
    Image,
    TabBarIOS,
    TabBarItemIOS,
    Dimensions,
    Alert,
    Keyboard,
    TextInput,
} from 'react-native';

import {
  ClqsixTextInput,
  CustomNavigator,
  FullScreen,
  KeyboardSpacer,
  ScrollViewWrapper,
  Images,
} from '../../components';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    backgroundColor:'#fff'
  },

  input: {
    fontFamily :'SF UI Text',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 41,
    marginRight: 41,
    marginTop: 20,
    flex:1
  },

  len: {
    fontFamily: 'SF UI Text',
    fontSize: 15,
    marginRight: 42,
    color: '#A3A3A3',
  }
});

const TEXT_MAX_LEN = 160;
class TextUpload extends Component {

  text = '';

  constructor(props) {
    super(props);
    this.state = {
      availableLen : TEXT_MAX_LEN
    };
  }

  render() {
    return (
      <FullScreen style={styles.container}>
        
        <View style={{flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start'}}>

          <Image style={{marginLeft: 42, marginTop: 54, width: 61, height: 61,}} source={Images.Cliqsix_59x60} />
        
          <TextInput
            style={styles.input}
            underlineColorAndroid = 'transparent'
            placeholder="Express your self"
            multiline = {true}
            maxLength = {TEXT_MAX_LEN}
            onChangeText={(text) => {
              this.text = text;
              this.setState({
                availableLen : 160 - text.length
              })
            }}
            />
        </View>

        <View style={{width: '100%', height: 45, flexDirection:'row'}}>
          <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
            <Image style={{width: 19, height: 19.97, marginLeft: 42,}} source={Images.Cliqsix_21x22} />
          </View>
          <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
            <Text style={styles.len}>{this.state.availableLen}</Text>
          </View>
        </View>

        <View style={{width: '100%', height:50, flexDirection: 'row', backgroundColor: '#EF4345', paddingHorizontal: 20,}}>
          <View style={{flex: 1, alignItems:'flex-start', justifyContent:'center'}}>
            <TouchableOpacity onPress={() => this.props.navigator.pop()}>
              <Image source={Images.BackChevronLeft_White_9x16} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, alignItems:'flex-end', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this._onPost()}>
              <Text style={{color:'#fff', fontFamily: 'SF UI Text', fontSize: 15, fontWeight:'bold'}}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
        <KeyboardSpacer/>
      </FullScreen>
    );
  }

  _onPost() {
    if (this.props.onPost) {
      this.props.onPost(this.text);
    }
  }
};



export default TextUpload;