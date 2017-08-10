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

import ImagePicker from 'react-native-image-picker';

import {
  Alert,
  ClqsixTextInput,
  CustomNavigator,
  FullScreen,
  KeyboardSpacer,
  Options,
  ScrollViewWrapper,
  Text,
  Images,
} from '../../components';

import {
  CreateComp,
  EditComp,
  CompDetail,
} from '../Comp';


import VisualDetailConfirm from './VisualDetailConfirm';
import VisualDetailReactionToolbar from './VisualDetailReactionToolbar';
import VisualPostOptions from './VisualPostOptions';
import VisualReactionList from './VisualReactionList';
import AddVisualToComp from './AddVisualToComp';


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
  },

  navigator: {
    marginBottom: 0,
  },

  compImage: {
    width:50,
    height:50,
    marginRight:10,
  },

  visualImage: {
    width:40,
    height:40,
    borderRadius:20,
    marginRight: 15,
  }
});

class VisualDetail extends Component {

  constructor(props) {
    super(props);
    this.state={
      showRepostConfirm : false,
      imageWidth:-1,
      imageHeight:-1,
    };
  }

  componentWillMount() {

  }

  componentWillDismount() {

  }

  componentWillUpdate(newProps, newStates) {

  }

  ////////////////////////////////////////////////////////////////////

  _onNavigationLeftButtonPress() {
    let result = true;
    if (!!this.props.onNavigationLeftButtonPress) result = this.props.onNavigationLeftButtonPress();
    if (result === false) return;
  }

  _onNavigationRightButtonPress() {
    let result = true;
    if (!!this.props.onNavigationRightButtonPress) result = this.props.onNavigationRightButtonPress();
    if (result === false) return;
    this.refVisualPostOptions.showPostOptions();
  }

  render() {
    if (!!this.props.navigator) {
      if (this.props.navigator === true) {
        return <Navigator ref={ref => this.refNavigator = ref} initialRoute={{id: 'Default'}} renderScene={this.renderScene.bind(this)} configureScene={(route, routeStack) => this.configureScene(route, routeStack)}/>
      } else {
        this.refNavigator = this.props.navigator;
        return this.renderDefault();
      }
    } else if (!!this.props.navigationBar) {
      return this.renderDefault();
    }
    return this.renderComponent();
  }

  configureScene(route, routeStack) {
    if (!!this.props.configureScene) {
      return this.props.configureScene(route, routeStack)
    }
    if (route.id === 'AddVisualToComp') {
      return Navigator.SceneConfigs.FadeAndroid
    }
    if (route.id === 'CreateComp') {
      return Navigator.SceneConfigs.FadeAndroid
    }
    return Navigator.SceneConfigs.VerticalUpSwipeJump;
  }

  renderScene(route, navigator) {
    if (!!this.props.renderScene) {
      return this.props.renderScene(route, navigator);
    }
    if (route.id === 'Default') {
      return this.renderDefault();
    }
    if (route.id === 'VisualReactionList') {
      return this.renderReactionList();
    }
    if (route.id === 'AddVisualToComp') {
      return this.renderAddVisualToComp();
    }
    if (route.id === 'CreateComp') {
      return this.renderCreateComp();
    }
  }

  renderDefault() {
    return (
      <FullScreen>
        { this.renderNavigationBar() }
        { this.renderComponent() }
        <VisualPostOptions ref={ref => this.refVisualPostOptions = ref} hideShare={true}/>
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
        rightButton = {<Image source={Images.More_Black_23x5} />}
        onLeftButtonPress = {() => this._onNavigationLeftButtonPress()}
        onRightButtonPress = {() => this._onNavigationRightButtonPress()}
      >
      </CustomNavigator>
    );
  }

  renderComponent() {
    let {comp, visual, visualAddedSuccessfully, onPressReactions, onNavigationLeftButtonPress, onNavigationRightButtonPress, ...props} = this.props;

    if (!!visual.source && !!visual.source.uri) {
      Image.getSize(visual.source.uri, (width, height)=> {
        let h = height * this.state.imageWidth / width;
        if (this.state.imageHeight != h) {
          this.setState({imageHeight: h});
        }
      }, () => {
        if (this.state.imageHeight != this.state.imageWidth) {
          this.setState({imageHeight:this.state.imageWidth});
        }
      })
    } else {
      this.state.imageHeight = this.state.imageWidth;
    }

    return (
      <ScrollView>
        <VisualDetailConfirm visible={this.state.showRepostConfirm} onRequestClose={()=>this.hideRepostConfirm()} onRequestOk={()=>this.hideRepostConfirm()} question='Repost?'/>
        <Image style={{width:'100%', height: this.state.imageHeight, alignItems:'center', justifyContent:'flex-end', backgroundColor:'#a3a3a3'}} resizeMode='contain' source={visual.source} onLayout={(e) => this._onImageLayout(e)}>
          {visualAddedSuccessfully === true && this.renderAddedToCompSuccessfully(comp)}
        </Image>

        <View style={{flexDirection:'row', paddingHorizontal:15, marginTop:22.5}}>
          { visual.source &&
            <Image style={styles.visualImage} source={visual.source} />
          }
          { !visual.source &&
            <View style={[styles.visualImage, {borderWidth:0.5}]} />
          }
          <View style={{flexGrow:1, justifyContent:'center', alignItems:'flex-start'}}>
            <Text style={{fontSize:17,fontWeight:'bold'}}>{visual.posterName || 'Visual Owner'}</Text>
          </View>
          <View style={{flexShrink:1, justifyContent:'center', alignItems:'flex-end'}}>
            <TouchableOpacity onPress={() => this._onPressReactions()}>
              <Text style={{fontSize:13,fontWeight:'bold'}}>71 <Text style={{color:'#a3a3a3'}}>reactions</Text></Text>
            </TouchableOpacity>
          </View>
        </View>

        { this.renderReactionToolbar() }

        <View style={{flexDirection:'row', paddingHorizontal:15, marginTop:33, justifyContent:'flex-start', alignItems:'flex-start'}}>
          <Text style={{flex:1, fontWeight:'300', textAlign:'left'}}>{visual.comment || 'Comment'}</Text>
        </View>

        <View style={{flexDirection:'row', paddingHorizontal:25, marginTop:52, justifyContent:'flex-start', alignItems:'flex-start'}}>
          <Text style={{flex:1, fontSize:13, fontWeight:'300', color:'#a3a3a3', textAlign:'left'}}>{visual.created || 'Jan 6, 2017 - 5:41 PM'}</Text>
        </View>
      </ScrollView>
    );
  }

  ////////////////////////////////////////////////////////////////////

  renderAddedToCompSuccessfull(comp){
    return (
      <View style={{width:306, height:100, marginBottom:2, backgroundColor: '#4C9E88', paddingHorizontal:20, paddingTop:20, paddingBottom:30,flexDirection:'row'}}>
        {comp.avatar &&
          <Image style={styles.compImage} source={comp.avatar} />
        }
        { !comp.avatar &&
          <View style={[styles.compImage, {borderWidth:0.5}]} />
        }
        <View style={{flex:1, justifyContent:'center', alignItems:'flex-start'}}>
          <Text style={{color:'white',fontWeight:'300'}}>Added to</Text>
          <Text style={{color:'white',fontWeight:'bold'}}>{comp.name || 'Comp Name'}</Text>
        </View>
      </View>
    )
  }

  renderReactionToolbar() {
    return (
      <VisualDetailReactionToolbar style={{flexDirection:'row', paddingHorizontal: 17, marginTop:29.5}}
        onRepost={() => this.showRepostConfirm()}
        onComp={() => this.showAddVisualToComp()}
      />
    )
  }

  renderReactionList() {
    return <VisualReactionList navigator={this.refNavigator} navigationBar={true} visual={this.props.visual} />
  }

  renderAddVisualToComp() {
    return <AddVisualToComp navigator={this.refNavigator} navigationBar={true} visual={this.props.visual} />
  }

  renderCreateComp() {
    return <CreateComp navigator={true} navigationBar={true} onClose={() => { this.refNavigator.pop(); return false; }}/>
  }

  ////////////////////////////////////////////////////////////////////
  
  showReactionList() {
    this.refNavigator.push({
      id: 'VisualReactionList'
    });
  }

  showRepostConfirm() {
    this.setState({
      showRepostConfirm: true
    })
  }

  hideRepostConfirm() {
    this.setState({
      showRepostConfirm: false
    })
  }

  showAddVisualToComp() {
    this.refNavigator.push({
      id: 'AddVisualToComp'
    })
  }

  ////////////////////////////////////////////////////////////////////

  _onPressReactions() {
    let result = true;
    if (!!this.props.onPressReactions) {
      result = this.props.onPressReactions();
    }
    if (result !== false) {
      this.showReactionList();
    }
  }

  _onImageLayout(e) {
    let {x, y, width, height} = e.nativeEvent.layout;
    this.state.imageWidth = width;
    if (height != this.state.imageHeight) {
      this.setState({
        imageHeight: height,
      })
    }
  }

  
};

export default VisualDetail;