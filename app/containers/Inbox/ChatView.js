'use strict';

import React, { Component } from 'react'
import {
  Text,
  TextInput,
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native'

import {GiftedChat, Bubble} from 'react-native-gifted-chat'
import Lightbox from 'react-native-lightbox'
import moment from 'moment/min/moment-with-locales.min';
import ClqBubble from './Chat/ClqBubble';
import {FullScreen, CustomNavigator, Images,} from '../../components';
import {AuthAPI} from '../../utils'

const screenWidth = Dimensions.get('window').width

export default class ChatView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      postProps: {},
      status: "",
      clientName: "",
      spinnervisible: true,
      isGroupChat: false,
      uid: 1,
    }
  }

  componentWillMount() {
    let currentUser = AuthAPI.currentUser();
    if (!!currentUser && !!currentUser.uid) {
        this.setState({
          uid: currentUser.uid,
        })
    }
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, [{
              _id: 3,
              text: this.props.data.lastMessage,
              createdAt: new Date(),
              user: {
                _id: 3,
                name: this.props.data.title,
                avatar: this.props.data.avatar.uri,
              }
            }])
      }
    })
  }
  
  _onSend = (messages = []) => {    
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages)
      }
    })    
  }

  _onMoreAction() {

  }

  _onPressAction() {

  }

  renderLightboxContent = (props) => {
    return (
            <Image
              source={{ uri:this.state.postProps.image }}
              resizeMode='contain'
              style={{
                marginTop:60,
                width: screenWidth,
                height: this.state.postProps.imageHeight,
              }}
            />
          )
  }

  renderMessageImage = (props) => {
    return (
             <View>
              <Lightbox renderContent={this.renderLightboxContent}>
                <Image
                  source={{ uri:props.currentMessage.image }}
                  style={{
                          width: 250,
                          height: 150,
                          borderRadius: 13,
                          margin: 3,
                          resizeMode: 'cover',
                        }}
                />
              </Lightbox>
            </View>
          )
  }

  renderSend = (props) => {
    let sendTextStyle = (this.state.isGroupChat)?([styles.groupSendButton, props.textStyle]):([styles.groupSendButton, props.textStyle]);
    if (props.text.trim().length > 0) {
      return (
        <TouchableOpacity
          style={[styles.container, props.containerStyle]}
          onPress={() => {
            props.onSend({text: props.text.trim()}, true);
          }}
          accessibilityTraits="button"
        >
        <Text style={sendTextStyle}>Send</Text>
        </TouchableOpacity>
      );
    }
    return <View/>;
  }

  renderActions = (props) => {
      return (
        <TouchableOpacity
          style={[styles.container, props.containerStyle]}
          accessibilityTraits="button"
          onPress={() => {
            this._onPressAction();
          }}
        >
          <Image style={{marginLeft:10}} source={Images.Upload_White_19x19} />
        </TouchableOpacity>
      );
  }

  renderTime = (props) => {
    let username = (props.currentMessage.user._id === this.state.uid)?'':props.currentMessage.user.name + " ";
    return (
    <View>
        <Text style={styles.dateTime}>
          {username + moment(props.currentMessage.createdAt).format('LT')}
        </Text>
      </View>
    )
  }

  renderBubble = (props) => {
    return (<ClqBubble {...props} />);
  }

  render() {
    const Chat = (this.state.status === 'available') && (this.props.appStore.user.uid != this.props.uid) ?
        <GiftedChat
          messages={this.state.messages}
          onSend={this._onSend}
          user={{
            _id: this.props.appStore.user.uid,
            name: this.props.appStore.username,
          }}
          renderMessageImage={this.renderMessageImage}
          renderFooter={this.renderFooter}
          renderAccessory={this.renderAccessory}
        />
      :
        <GiftedChat
          style={{width: screenWidth}}
          messages={this.state.messages}
          onSend={this._onSend}
          user={{
            _id: 1,
            name: 'TestName',
            avatar: 'http://stackdump.pic.co.kp/media/images/accepted_answer.png',
          }}
          renderMessageImage={this.renderMessageImage}
          renderFooter={this.renderFooter}
          renderSend={this.renderSend}
          renderActions={this.renderActions}
          renderTime={this.renderTime}
          renderBubble={this.renderBubble}
          renderAvatarOnTop={true}
        />
    return (
      <FullScreen >
        <CustomNavigator
          leftButton = {<Image source={Images.BackChevron_Black_16x9} />}
          rightButton = {<Image source={Images.More_Black_23x5} />}
          onLeftButtonPress = {() => {this.props.navigator.pop();}}
          onRightButtonPress = {() => {this._onMoreAction()}}
          title={<Text style={styles.title}>{this.props.data.title}</Text>}>
        </CustomNavigator>
        { Chat }
      </FullScreen>
      )
  }
}

const styles = StyleSheet.create({
  action: {

  },
  title: {
    fontFamily: 'SF UI TEXt',
    fontSize: 17,
    fontWeight: 'bold'
  }, 
  container: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center'
  },
  groupSendButton: {
    color: '#0084ff',
    fontFamily: 'SF UI TEXt',
    fontWeight: '600',
    fontSize: 17,
    backgroundColor: 'transparent',
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 10,
  },
  directSendButton: {
    color: '#24d770',
    fontFamily: 'SF UI TEXt',
    fontWeight: '600',
    fontSize: 17,
    backgroundColor: 'transparent',
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 10,
  },
  dateTime: {
    marginTop: 2,
    color: '#ccc'
  },
  chatControl: {
    flex: 1,
  },
  btnContainer: {
    height: 40,
    backgroundColor: '#ddd',
    borderRadius: 5,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  btnText: {
    fontWeight: '800',
    fontSize: 20,
  }
})