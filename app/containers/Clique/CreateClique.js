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

class CreateClique extends Component {

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
      <FullScreen style={{alignItems: 'center'}}>
        <CustomNavigator
          leftButton = {<Image source={Images.Cancel_Black_13x13}/>}
          rightButton = {<Image source={Images.Check_Black_17x13}/>}
          onLeftButtonPress={() => this._onRequestClose()}
        >
          <Text style={{fontFamily:'SF UI Text', fontSize: 17, marginLeft:8, fontWeight:'bold'}}>Create Clique</Text>
        </CustomNavigator>

        <FullScreen.Row style={{marginLeft:52, marginRight:15, marginBottom: 30, marginTop:24, alignItems:'flex-start'}}>
          <Image style={{width:180, height:180, marginBottom: 15}} source={avatarImage} />
          

          <TouchableOpacity style={{position:'absolute', bottom: 0, left:136}} onPress={() => this.refs.imageChooser.show()}>
            <View style={{width: 160, height: 35, alignItems: 'center', justifyContent: 'center', borderWidth:1, borderColor:'#cccccc', backgroundColor:'white'}}>
              <Text style={{fontFamily: 'SF UI Text', fontSize: 13, color: '#a3a3a3', fontWeight: '600'}}>{editAvatar} clique photo</Text>
            </View>
          </TouchableOpacity>

        </FullScreen.Row>

        <ClqsixTextInput ref="name"
          prefixIcon={Images.Cliqsix_14x14}
          needValidation={false}
          placeholder='Clique name(ex.rockstars)'
          style={{height:60,marginHorizontal:25}}
          onSubmitEditing={() => this.ref.location.focus()}/>

        <ClqsixTextInput ref="location"
          prefixIcon={Images.Location_Green_10x16}
          needValidation={false}
          placeholder='Location'
          style={{height:60, marginHorizontal:25}}
          onSubmitEditing={() => {}}/>

        <TouchableOpacity style={{marginTop:25}}>
          <Text style={{fontSize:13, fontWeight:'600', color: '#9E4FFF', textDecorationLine:'underline'}}>Invite Clique Members</Text>
        </TouchableOpacity>

        <Options.ImageChooser ref="imageChooser" onImageSelected={(source) => this.changeAvatar(source)} />


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

export default CreateClique;