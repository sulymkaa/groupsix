
'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Navigator,
    Image,
    Dimensions,
    Keyboard,
    Modal,
    ScrollView,
} from 'react-native';

import {
  Alert,
  ClqsixTextInput,
  CustomNavigator,
  FullScreen,
  KeyboardSpacer,
  Options,
  Text,
  Images,
} from '../../components';

const reactionImageWidth = 35;

const styles = StyleSheet.create({
  container: {
    marginTop:26,
    flexGrow:1,
    backgroundColor:'white'
  },

  containerImportant: {
    flexDirection:'column',
    justifyContent:'flex-end',
    alignItems:'center',
  },

  reactionContainer: {
    height:50,
    flexDirection:'row',
    justifyContent: 'flex-start',
    alignItems:'flex-start',
    marginBottom:12,
  },

  reaction: {
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
  },

  reactionImageContainer: {
    width:reactionImageWidth,
    height:reactionImageWidth,
    borderRadius:reactionImageWidth/2,
    overflow:'hidden',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#000',
    marginHorizontal:20,
  },

  reactionImage: {
    width:35,
    height:35,
  },

  reactionImageTag: {
    position:'absolute',
    left: 43,
    top: 23,
  },

  reactionContent: {
    flexGrow:1,
  },

  reactionActor: {
    fontSize:13,
    fontWeight:'bold',
  },

  reactionAction: {
    fontSize:13,
    fontWeight:'300'
  },

  addCommentContainer: {
    marginHorizontal:25,
    borderTopWidth: 0.5,
    borderTopColor: '#acacac',
    flexDirection:'row',
    height:50,
  }


});

class VisualReactionList extends Component {

  constructor(props) {
    super(props);
    this.state={
      showRepostConfirm : false,
    };
  }

  _onPressReactions() {
    let result = true;
    if (!!this.props.onPressReactions) {
      result = this.props.onPressReactions();
    }
    if (result !== false) {
      this.showReactionList();
    }
  }

  _onNavigationLeftButtonPress() {
    let result = true;
    if (!!this.props.onNavigationLeftButtonPress) result = this.props.onNavigationLeftButtonPress();
    if (result !== false && !!this.refNavigator) {
      this.refNavigator.pop();
      this.refNavigator = null;
    }
  }

  _onNavigationRightButtonPress() {
    let result = true;
    if (!!this.props.onNavigationRightButtonPress) result = this.props.onNavigationRightButtonPress();
  }

  render() {
    if (!!this.props.navigator) {
      if (this.props.navigator === true) {
        return <Navigator ref={ref => this.refNavigator = ref} initialRoute={{id: 'Default'}} renderScene={this.renderScene.bind(this)}/>
      } else {
        this.refNavigator = this.props.navigator;
        return this.renderDefault();
      }
    } else if (!!this.props.navigationBar) {
      return this.renderDefault();
    }
    return this.renderComponent();
  }

  renderScene(route) {
    if (route.id === 'Default') {
      return this.renderDefault();
    }
  }

  renderDefault() {
    return (
      <FullScreen style={{backgroundColor:'white'}}>
        { this.renderNavigationBar() }
        { this.renderComponent() }
      </FullScreen>
    )
  }

  renderNavigationBar() {
    if (!!this.props.navigationBar) {
      if (this.props.navigationBar === true) {
        return this.renderDefaultNavigationBar();
      } else {
        return this.props.navigationBar;
      }
    }
  }

  renderDefaultNavigationBar() {
    return (
      <CustomNavigator
          leftButton = {<Image source={Images.BackChevron_Black_16x9} />}
          onLeftButtonPress = {() => this._onNavigationLeftButtonPress()}
          onRightButtonPress = {() => this._onNavigationRightButtonPress()}
      >
        <Text style={{fontSize:17,fontWeight:'bold'}}>71 reactions</Text>
      </CustomNavigator>
    );
  }

  renderComponent() {
    let {visual, onNavigationLeftButtonPress, onNavigationRightButtonPress, children, style, ...props} = this.props;
    let reactions = !!visual && !!visual.reactions ? visual.reactions : [{}];
    props.style=[styles.container, style, styles.containerImportant];
    return (
      <View {...props}>
        <ScrollView>
          {this.renderReactions(reactions)}
        </ScrollView>
        <View style={styles.addCommentContainer}>
          <View style={{flexGrow:1,height:'100%',flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
            <ClqsixTextInput style={{flexGrow:1}} needValidation={false} placeholder='Add Comment'/>
            <TouchableOpacity style={{justifyContent:'center',alignItems:'flex-end'}}>
              <Text style={{fontSize:15,fontWeight:'bold',color:'#0095F7'}}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  renderReactions(reactions) {
    return reactions.map((reaction,i) => {
      return this.renderReaction(reaction, i);
    }, this);
  }

  renderReaction(reaction, i) {
    let action;
    if (reaction.type === 'like') {
      action ='liked this';
    } else if (reaction.type === 'comment') {
      action = reaction.comment || ''
    } else if (reaction.type === 'repost') {
      action = 'reposted this';
    } else if (reaction.type === 'dislike') {
      action = 'disliked this';
    } else if (reaction.type === 'add_to_comp') {
      action = 'added this to a comp';
    }
    return (
      //<ScrollView key={i} horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} directionalLockEnabled={true} containerStyle={{width:'100%'}} style={{height:50,width:'100%'}}>
      <View key={i} style={[styles.reactionContainer]}>
        <View style={styles.reaction}>
          { this.renderReactionImage(reaction) }
          <View style={styles.reactionContent}>
            <Text style={styles.reactionAction}><Text style={styles.reactionActor}>{reaction.actorName || 'Actor'}</Text> {action}</Text>
          </View>
          { reaction.type==='comment' && <Image style={styles.reactionImageTag} source={Images.Comment_Blue_17x17} /> }
        </View>
      </View>
      //</ScrollView>
    )
  }


  renderReactionImage(reaction) {
    return (
      <View style={styles.reactionImageContainer}>
        <Image style={styles.reactionImage} source={reaction.actorImage || Images.Cliqsix_14x14}/>
      </View>
    )
  }
};

export default VisualReactionList;