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
  TabBarIOS,
  TabBarItemIOS,
  Dimensions,
  Alert,
  ListView,
} from 'react-native';

import {
  Images,
} from '../../components';

export default class MessasgeRow extends Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this)
  }

  _renderUnreadMark() {
    if (!!this.props.unread) {
      return (
        <Image style={styles.unreadMark} source={Images.UnreadMessage_Blue_7x7} />
      );
    }else{
      return null;
    }
  }

  _onClick() {
    if (!!this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    return(
      <TouchableOpacity onPress={() => this._onClick()} >
        <View style={styles.container}>
          {this._renderUnreadMark()}
          <Image style={styles.avatar} source={this.props.avatar} />
          <View style={styles.textContainer}>
            <Text style={styles.username}>{this.props.title}</Text>
            <View style={{flexDirection: 'row', alignSelf: 'stretch'}}>
              <Text style={styles.message} ellipsizeMode="tail" numberOfLines={1}>{this.props.lastMessage}</Text>
              <Text style={styles.time}>{this.props.time}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 75
  },
  textContainer: {
    flexDirection: 'column',
    alignSelf:'center',
    position: 'absolute',
    left: 81,
  },
  avatar: {
    height: 50,
    width: 50,
    position: 'absolute',
    left: 16,
    alignSelf:'center',
    backgroundColor: 'black'
  },
  unreadMark: {
    width: 7,
    height: 7,
    alignSelf:'center'
  },
  username: {
    fontFamily: 'SF UI TEXT',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000'
  },
  message: {
    fontFamily: 'SF UI TEXT',
    fontSize: 15,
    fontWeight: '300',
    color: '#000',
    flex: 0.5
  },
  time: {
    fontFamily: 'SF UI TEXT',
    fontSize: 15,
    fontWeight: '300',
    color: '#cccccc',
    marginLeft: 5,
    flex: 0.5
  }
});