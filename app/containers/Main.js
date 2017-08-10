'use strict';

import React, { Component } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  Navigator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
 } from 'react-native';

import {
  Content,
  Footer,
  FullScreen,
  Header,
  Page,
  TabBar,
  Images,
} from '../components';

import {
  AuthAPI,
} from '../utils'

import {
  Discover
} from './Discover';

import {
  Home
} from './Home';

import {
  Inbox,
  ChatView
} from './Inbox';

import {
  Profile
} from './Profile';

import {
  Upload,
  CompUpload,
} from './Upload';

import {
  CreateComp
} from './Comp';


class Main extends Component {

  lastTab = null;

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
      profileTab: 'profile',
      openUpload: false
    }
    this.lastTab = this.state.selectedTab;
  }

  changeTab(tab) {
    if (tab === 'comp') {
      this.setState({
        openUpload:false,
        selectedTab: tab,
        profileTab: tab,
      });
      return;
    }
    if (tab === 'upload') {
      this.setState({
        openUpload: true,
        profileTab: 'profile'
      });
      return;
    }
    this.lastTab = tab;
    this.setState({
      openUpload: false,
      selectedTab: tab,
      profileTab: 'profile',
    });
  }

  render() {
    return (
      <FullScreen>
        <TabBar barTintColor='#000000' tintColor='white' style={{height:60}}>
          <TabBar.Item
            icon={Images.Home_Gray_21x21}
            selectedIcon={Images.Home_White_21x21}
            selected={this.state.selectedTab === 'home'} onPress={() => this.changeTab('home')}>
            {this.renderHome()}
          </TabBar.Item> 
          <TabBar.Item
            icon={Images.Discover_Gray_20x20}
            selectedIcon={Images.Discover_White_20x20}
            selected={this.state.selectedTab === 'search'} onPress={() => this.changeTab('search')}>
            {this.renderSearch()}
          </TabBar.Item>
          <TabBar.Item 
            icon={Images.Upload_Gray_20x20}
            selected={false} onPress={() => {
              this.changeTab('upload');
            }}
          >
          </TabBar.Item>
          <TabBar.Item 
            icon={Images.Inbox_Gray_20x20}
            selectedIcon={Images.Inbox_White_20x20}
            selected={this.state.selectedTab === 'inbox'} onPress={() => this.changeTab('inbox')}>
            {this.renderInbox()}
          </TabBar.Item>
          { this.state.profileTab === 'profile' &&
            <TabBar.Item 
              icon={Images.Profile_Gray_21x21}
              selectedIcon={Images.Profile_White_21x21}
              selected={this.state.selectedTab === 'profile'} onPress={() => this.changeTab('profile')}>
              {this.renderProfile()}
            </TabBar.Item>
          }
          {
            this.state.profileTab === 'comp' &&
            <TabBar.Item 
              icon={Images.Cliqsix_21x22}
              selected={this.state.selectedTab === 'comp'} onPress={() => this.changeTab('comp')}>
              {this.renderComp()}
            </TabBar.Item>
          }
        </TabBar> 
        <Modal visible = {this.state.openUpload === true} onRequestClose={() => {}} transparent={false}>
          { this.renderUpload() }
        </Modal>
      </FullScreen>
    );
  }

  renderSearch() {
    return (
      <Discover navigator={true} navigationBar={true} />
    );
  }

  renderHome() {
    return (
      <Home navigator={true} navigationBar={true} />
    )
  }

  renderUpload() {
    return <Upload onUploadComp={()=>this.changeTab('comp')} onClose={()=>{
        this.changeTab(this.lastTab);
      }}>Upload</Upload>
  }

  renderInbox() {
    return (
      <Inbox />
    )
  }
  
  renderProfile() {
    return (
      <Profile />
    );
  }

  renderComp() {
    return (
      <CreateComp onClose={() => this.changeTab('upload')}/>
    );
  }

  _onStart() {
    if (this.props.onStart) {
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

export default Main;