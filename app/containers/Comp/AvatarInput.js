'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';

import {
  FullScreen,
  Options,
} from '../../components';


const styles = StyleSheet.create({
  
  container: {
    height:196,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  image: {
    position:'absolute',
    left:0,
    top: 0,
    width: 180,
    height: 180,
    
  },

  imagePlaceholder: {
    backgroundColor: '#9E4FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageTrigger: {
    position:'absolute',
    left: 136,
    top: 161,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTriggerBtn: {
    width: 162, height: 35,
    flexDirection:'row',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor:'#a3a3a3',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fff'
  },
  imageTriggerText: {
    fontFamily: 'SF UI Text',
    fontSize: 13,
    fontWeight: '600',
    color: '#a3a3a3'
  },
});

class AvatarInput extends Component {

  constructor(props) {
    super(props);
    this.state={
      avatar: this.props.source,
    };
  }


  changeAvatar(image) {
    this.setState({
      avatar: image
    });
    if (this.props.onChangeSource) {
      this.props.onChangeSource(image);
    }
  }

  render() {
    return (
      <FullScreen.Row style={[this.props.style, styles.container]} alert={true}>
        { !this.state.avatar &&
          <View style={[styles.image, styles.imagePlaceholder]}>
            <View>
              <Text style={{color:'#fff',fontFamily:'SF UI Text', fontSize: 15, fontWeight:'bold'}}>Comp:</Text>
              <Text style={{color:'#fff',fontFamily:'SF UI Text', fontSize: 15, fontWeight:'300'}}>a collection of</Text>
              <Text style={{color:'#fff',fontFamily:'SF UI Text', fontSize: 15, fontWeight:'300'}}>curated content</Text>
            </View>
          </View>
        }
        {
          this.state.avatar &&
          <Image style={styles.image} source={this.state.avatar}/>
        }
        <TouchableOpacity style={styles.imageTrigger} onPress={() => this.refs.imageChooser.show()}>
          <View style={styles.imageTriggerBtn}>
            { !this.state.avatar &&
              <Text style={styles.imageTriggerText}>Add comp photo</Text>
            }
            { this.state.avatar &&
              <Text style={styles.imageTriggerText}>Edit comp photo</Text>
            }
          </View>
        </TouchableOpacity>
        <Options.ImageChooser ref="imageChooser" onImageSelected={(source) => this.changeAvatar(source)}/>
      </FullScreen.Row>
    );
  }
};

export default AvatarInput;