'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    View,
} from 'react-native';

import {
  Images,
  Text,
} from '../../components';

const styles = StyleSheet.create({

  containerDefault: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  container: {
    flexDirection: 'row',
  },

  icon: {
    width: 17,
    height: 17,
  }
});

class VisualDetailReactionToolbar extends Component {
  
  constructor(props) {
    super(props);
  }

  _onLike() {
    if (!!this.props.onLike) {
      this.props.onLike();
    }
  }

  _onDislike() {
    if (!!this.props.onDislike) {
      this.props.onDislike();
    }
  }

  _onComment() {
    if (!!this.props.onComment) {
      this.props.onComment();
    }
  }

  _onRepost() {
    if (!!this.props.onRepost) {
      this.props.onRepost();
    }
  }


  _onMessage() {
    if (!!this.props.onMessage) {
      this.props.onMessage();
    }
  }

  _onComp() {
    if (!!this.props.onComp) {
      this.props.onComp();
    }
  }

  _onShare() {
    if (!!this.props.onShare) {
      this.props.onShare();
    }
  }



  getItemMargin(i) {
    return i===0 ? 0 : (!!this.props.itemMargin ? this.props.itemMargin : 35);
  }

  renderChild(icon, callback, i) {
    let style = {justifyContent:'center', alignItems:'flex-start', marginLeft:this.getItemMargin(i)};
    return (
      <TouchableOpacity key={i} onPress={() => callback()}>
        <Image style={style} source={icon} />
      </TouchableOpacity>
    )
  }

  renderChildren(items) {
    let j = 0;
    return items.map((item, i) => {
      if (item.hide !== true) {
        return this.renderChild(item.icon, item.callback, j++);
      }
    })
  }

  render() {
    let {onComment, onRepost, onAddToComp, onMessage, style, children, ...props} = this.props;
    props.style=[
      style,
      {flexShrink:1,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}
    ]
    let items = [
      {
        icon : Images.Like_Gray_17x17,
        callback: () => this._onLike()
      },
      {
        icon: Images.Dislike_Gray_17x17,
        callback: () => this._onDislike(),
      },
      {
        icon: Images.Comment_Blue_17x17,
        callback: () => this._onComment(),
      },
      {
        icon: Images.Repost_Green_17x17,
        callback: () => this._onRepost(),
      },
      {
        icon: Images.Share_Yellow_17x17,
        callback: () => this._onShare(),
      }
    ];
    return (
      <View {...props}>
        {this.renderChildren(items)}
        <View style={{flexGrow:1,justifyContent:'center',alignItems:'flex-end'}}>
          <TouchableOpacity onPress={()=>this._onComp()}>
            <View style={{justifyContent:'center',alignItems:'center',width:46,height:22,backgroundColor:'#9E4FFF'}}>
              <Text style={{fontFamily:'Alegre Sans', fontSize:15, color:'white'}}>Comp</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
};

export default VisualDetailReactionToolbar;