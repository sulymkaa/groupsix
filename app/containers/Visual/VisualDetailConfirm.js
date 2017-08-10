'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Modal,
} from 'react-native';

import {
  Images,
  FullScreen,
  Text
} from '../../components';


class VisualDetailConfirm extends Component {

  constructor(props) {
    super(props);
  }

  _onRequestClose() {
    if (!!this.props.onRequestClose) this.props.onRequestClose();
  }

  _onRequestOk() {
    if (!!this.props.onRequestOk) this.props.onRequestOk();
  }

  render() {
    let {transparent, onRequestClose, question, children, ...props} = this.props;
    props.transparent = transparent !== false;
    props.onRequestClose = () => this._onRequestClose();
    return (  
      <Modal {...props}>
        <FullScreen style={{backgroundColor:'#000',opacity:0.2}} />
        <FullScreen style={{flexDirection:'row', paddingHorizontal:35}}>
          <View style={{flexGrow:1,paddingHorizontal:28,paddingTop:26,height:150, paddingBottom:31,marginTop:250,backgroundColor:'#24D770'}}>
            <View style={{flexGrow:1, width:'100%'}}>
              {!!question && <Text style={{color:'white',fontSize:15,fontWeight:'bold'}}>{question}</Text>}
              {children}
            </View>
            <View style={{flexDirection:'row'}}>
              <View style={{flexGrow:1,alignItems:'flex-start'}}>
                <TouchableOpacity onPress={() => this._onRequestClose()}>
                  <Image source={Images.Cancel_White_13x13} />
                </TouchableOpacity>
              </View>
              <View style={{flexGrow:1,alignItems:'flex-end'}}>
                <TouchableOpacity onPress={() => this._onRequestOk()}>
                  <Image source={Images.Check_White_17x13} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </FullScreen>
      </Modal>
    );
  }
};

export default VisualDetailConfirm;