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

import EditComp from './EditComp';

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

class CompDetail extends Component {

  constructor(props) {
    super(props);
    this.state={
      showRepostConfirm : false,
      imageWidth:-1,
      imageHeight:-1,
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
    if (!!this.refNavigator) {
      this.refNavigator.pop()
    }
  }

  _onNavigationRightButtonPress() {
    let result = true;
    if (!!this.props.onNavigationRightButtonPress) result = this.props.onNavigationRightButtonPress();
  }

  onImageLayout(e) {
    let {x, y, width, height} = e.nativeEvent.layout;
    this.state.imageWidth = width;
    if (height != this.state.imageHeight) {
      this.setState({
        imageHeight: height,
      })
    }
  }

  showReactionList() {
    this.refNavigator.push({
      id: 'ReactionList'
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
    if (route.id === 'EditComp') {
      return this.renderEditComp(route.comp);
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
    } else {
      return null;
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
    let {comp, onNavigationLeftButtonPress, onNavigationRightButtonPress, ...props} = this.props;

    if (!!comp.avatarSource && !!comp.avatarSource.uri) {
      Image.getSize(omp.avatarSource .uri, (width, height)=> {
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

        {this.renderCompImage(comp)}
        
        {this.renderCompToolbar(comp)}

      </ScrollView>
    );
  }

  renderCompImage(comp) {
    return (
      <Image style={{width:'100%', height: this.state.imageHeight,alignItems:'flex-start', justifyContent:'flex-end', backgroundColor:'#a3a3a3',marginBottom:13}}
        resizeMode='contain'
        source={comp.avatarSource}
        onLayout={(e) => this.onImageLayout(e)}
      >
        <View style={{height:35,alignItems:'flex-start',justifyContent:'center',backgroundColor:'#000',opacity:0.6,marginLeft:20,paddingHorizontal:5,marginBottom:5,}}>
          <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Mutiny</Text>
        </View>
        <View style={{height:26,alignItems:'flex-start',justifyContent:'center',backgroundColor:'#000',opacity:0.6,marginLeft:20,paddingHorizontal:5,marginBottom:29}}>
          <Text style={{color:'white',fontSize:13,fontWeight:'bold'}}>Lifestyle</Text>
        </View>
      </Image>
    )
  }

  renderCompToolbar(comp) {
    if (!!this.props.editable) {
      return this.renderCompEditToolbar(comp);
    }
    return (
      <View style={{flexDirection:'row', justifyContent:'flex-end', alignItems:'center',paddingHorizontal:15, marginBottom:16,}}>
        <View style={{flexGrow:1,flexDirection:'row',justifyContent:'flex-start', alignItems:'center'}}>
          <Text style={{fontSize:13,fontWeight:'bold'}}>98 <Text style={{color:'#a3a3a3'}}>subscribes</Text></Text>
        </View>
        <TouchableOpacity>
          <View style={{width:50,height:35,borderWidth:0.5,borderColor:'#a3a3a3',justifyContent:'center',alignItems:'center'}}>
            <Image source={Images.Repost_Green_18x14} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{marginLeft:3}}>
          <View style={{width:110,height:35,borderWidth:0.5,borderColor:'#a3a3a3',justifyContent:'center',alignItems:'center',backgroundColor:'#9E4FFF'}}>
            <Text style={{fontSize:13,fontWeight:'600',color:'white'}}>Subscribe</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  renderCompEditToolbar(comp) {
    return (
      <View style={{flexDirection:'row', justifyContent:'flex-end', alignItems:'center',paddingHorizontal:15, marginBottom:16,}}>
        <View style={{flexGrow:1,flexDirection:'row',justifyContent:'flex-start', alignItems:'center'}}>
          <Text style={{fontSize:13,fontWeight:'bold'}}>98 <Text style={{color:'#a3a3a3'}}>subscribes</Text></Text>
        </View>
        <TouchableOpacity>
          <View style={{width:50,height:35,borderWidth:0.5,borderColor:'#a3a3a3',justifyContent:'center',alignItems:'center'}}>
            <Image source={Images.Add_Purple_16x16} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{marginLeft:3}}>
          <View style={{width:110,height:35,borderWidth:0.5,borderColor:'#a3a3a3',justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
            <Text style={{fontSize:13,fontWeight:'600',color:'white'}}>Edit Comp</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  renderEditComp(comp) {
    return <EditComp navigator={this.refNavigator} navigationBar={true} comp={comp}/>;
  }

  /////////////////////////////////////////////////////////////////////////

  showEditComp(comp) {
    if (!!this.refNavigator) {
      this.refNavigator.replace({
        id: 'EditComp',
        comp: comp
      });
    }
  }
};

export default CompDetail;