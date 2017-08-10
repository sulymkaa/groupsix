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
  Images,
} from '../../components';

import ChatView from './ChatView';
import MessageRow from './MessageRow';
import Nonotification from './Nonotification';

const HorizontalPaging = ScrollViewWrapper.HorizontalPaging;
const msgDs = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
});
const notificationDs = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
});


class Inbox extends Component {

  navigator = null;

  _chat = null;

  constructor(props) {
    super(props);
    
    this.state = {
        closeScrollPageView: false,
        tab: 'messages',
        messageDataSource: msgDs.cloneWithRowsAndSections({
          groupChat: [{
            avatar: {
              uri: 'http://www.thetraders.net/img/1.png'
            },
            title: 'tendertrio',
            lastMessage: 'You won\'t believe what happended!',
            time: '5m',
            unread: true
          }],
          directMessage: [{
            avatar: {
              uri: 'http://www.thetraders.net/img/1.png'
            },
            title: 'thecrew',
            lastMessage: 'Awesome lifestyle!!',
            time: '2h',
            unread: false
          },{
            avatar: {
              uri: 'http://www.thetraders.net/img/1.png'
            },
            title: 'twinbes',
            lastMessage: 'Can\'t wait to kick it in NY',
            time: '4d',
            unread: true
          }]}),
        notificationDataSource: notificationDs.cloneWithRows([])
    }
  }

  onScrollPageViewHide() {
    this.setState({
      closeScrollPageView: true,
    })
  }

  gotoChat(chat) {
    this._chat = chat;
    this.navigator.push({id: 'Chat', passProps: {chat}});
  }

  render() {
    return (
      <Navigator ref={ref => this.navigator = ref} initialRoute={{id: 'Default'}} renderScene={this.renderScene.bind(this)}/>
    );
  }

  renderScene(route, navigator) {
    var routeId = route.id;
    if (routeId === 'Default') {
      return this.renderDefault();
    }
    if (routeId === 'Chat') {
      return <ChatView navigator = {this.navigator} data = {this._chat} />
    }
  }

  renderDefault() {
    return (
      <FullScreen style={{alignItems: 'center'}}>
        <CustomNavigator
          leftButton = {<Image source={Images.Favorite_Black_23x21} />}
          rightButton = {<Image source={Images.NewMessage_Black_20x20} />} />
        
        <HorizontalPaging style={[{height:175, marginLeft: 20, marginRight: 20}]} onHide={this.onScrollPageViewHide.bind(this)}>
          <HorizontalPaging.Item>
              <FullScreen style={{alignItems:'center', justifyContent:'center', backgroundColor: '#D9D20E'}}>
                <Text style={{fontWeight:'900', fontSize:17, color:'white'}}>Chat with your crew</Text>
                <Text style={{fontWeight:'900', fontSize:17, color:'white'}}>or DM other people</Text>
              </FullScreen>
          </HorizontalPaging.Item>
          <HorizontalPaging.Item>
            <FullScreen style={{alignItems:'center', justifyContent:'center', backgroundColor:'#24D770'}}>
              <Text style={{fontWeight:'900', fontSize:17, color:'white'}}>View your latest and</Text>
              <Text style={{fontWeight:'900', fontSize:17, color:'white'}}>greatest notifications</Text>
            </FullScreen>
          </HorizontalPaging.Item>
        </HorizontalPaging>
        
        {
          
          this.state.closeScrollPageView !== true &&
          <FullScreen.Row ref="buttons" style={{marginBottom:35, marginLeft:20, marginRight:20, borderBottomWidth:0.5, borderColor: '#cccccc'}}>
            <Button.Link text='Group chat' style={{marginTop:25, marginBottom:25}} textStyle={{color:'gray',textDecorationStyle: 'solid',textDecorationLine: 'underline',textDecorationColor: 'gray'}} onPress={() => {}}/>
          </FullScreen.Row >
        }
        
        <TabView
        style={{marginLeft:9, marginRight:9, flexGrow: 1}}
        barStyle={{height: 40, alignItems: 'flex-start'}}
        textStyle={{color: 'gray', fontSize: 15, fontWeight: 'bold'}} selectedTextStyle={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
          <TabView.Item text='Messages' selected={this.state.tab === 'messages'} onPress={() => this.setState({tab:'messages'})}>
            <ListView 
              dataSource={this.state.messageDataSource}
              renderRow={(data) => {
                return (
                  <MessageRow {...data} onClick={() => this.gotoChat(data)} navigator={this.navigator} />
                )}}
              renderSectionHeader={(sectionData, sectionId) => {
                var style = (sectionId==='groupChat'?styles.headerGroupChat:styles.headerDirectMessage)
                return (
                  <View style={styles.hederContain} >
                    <Text style={style}>{sectionId==='groupChat'?'GROUP CHAT':'DIRECT MESSAGES'}</Text>
                  </View>)
                }
              }
            />
          </TabView.Item>
          <TabView.Item text='Notifications' selected={this.state.tab === 'notifications'} onPress={() => this.setState({tab:'notifications'})}>
            <Nonotification />
          </TabView.Item>
        </TabView>
      </FullScreen>
    );
  }
};

const styles = StyleSheet.create({
  hederContain: {
    height: 40,
    marginLeft: 6,
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
  headerGroupChat: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0095f7',
    marginBottom: 6
  },
  headerDirectMessage: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#24d770'
  },
  message: {
    height: 75,
  }
});

export default Inbox;