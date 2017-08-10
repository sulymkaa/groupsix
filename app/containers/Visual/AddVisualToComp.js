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
    ScrollView
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

import {
  Alert,
  ClqsixTextInput,
  CustomNavigator,
  FullScreen,
  IconListView,
  KeyboardSpacer,
  Options,
  ScrollViewWrapper,
  SharedItemsCountView,
  Text,
  Images,
} from '../../components';

import {
  CreateComp,
  EditComp,
  CompDetail
} from '../Comp';

const styles = StyleSheet.create({
  container: {  
    backgroundColor: 'white',
  },

  navigator: {
    marginBottom: 30,
  },

  visualImage: {
    width:74,
    height:74,
    marginRight:13,
  },

  compImage: {
    width:37,
    height:37,
    marginRight: 15,
    backgroundColor: '#000'
  }
});

class AddVisualToComp extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      alreadyAddedToComp: false,
      selectedComp: null,
    };
    this.visual = this.props.visual;
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
    this._onClose();
  }

  _onNavigationRightButtonPress() {
    let result = true;
    if (!!this.props.onNavigationRightButtonPress) result = this.props.onNavigationRightButtonPress();
    if (result === false) return;
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
    if (route.id === 'CreateComp') {
      return this.renderCreateComp();
    }
    return this.renderDefault();
  }

  renderDefault() {
    return (
      <FullScreen style={styles.container}>
        { this.renderNavigationBar() }
        { this.state.alreadyAddedToComp !== true && this.renderAlreadyAddedToComp() }
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
        style={styles.navigator}
        leftButton = {<Image source={Images.Cancel_Black_13x13} />}
        rightButton = {<Image source={Images.More_Black_23x5} />}
        onLeftButtonPress = {() => this._onNavigationLeftButtonPress()}
        onRightButtonPress = {() => this._onNavigationRightButtonPress()}
      >
        <Text style={{fontSize: 17, fontWeight: 'bold'}}>Add to Comp</Text>
      </CustomNavigator>
    );
  }

  renderComponent() {
    
    return (
      <ScrollView>

        { this.renderVisual() }
        
        { this.renderComps() }

        { this.renderCreateCompButton() }

        { this.renderSuggestedCompsTitle() }

        { this.renderSuggestedComps() }

      </ScrollView>
    );
  }

  renderAlreadyAddedToComp() {
    return !!this.state.selectedComp && (
      <View style={{flexDirection:'row', height:40, marginLeft:17,marginRight:33, marginBottom: 10, backgroundColor:'#0000EE', paddingHorizontal:15}}>
        <View style={{flex:1, justifyContent:'center', alignItems:'flex-start'}}>
          <Text style={{color:'white'}}>You alerady added this visual to {this.state.selectedComp.name || 'Comp Name'}</Text>
        </View>
      </View>
    )
  }

  renderVisual() {
    return (
      <TouchableOpacity onPress={() => this._onAddVisual()} style={{alignItems: 'flex-start', justifyContent:'flex-start'}}>
        <View style={{flexDirection:'row', paddingHorizontal:17}}>
          { this.props.visual.source &&
            <Image style={styles.visualImage} source={this.props.visual.source} />
          }
          { !this.props.visual.source &&
            <View style={[styles.visualImage, {borderWidth:0.5}]} />
          }
          <View style={{flex:1, justifyContent:'flex-end', alignItems:'flex-start', paddingBottom: 5}}>
            <Text style={{fontSize:15,fontWeight:'300'}}>{this.props.visual.comment || 'Comment'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderComps() {
    let comps = !!this.props.comp ? [this.props.comp] : [];
    if (!!this.state.comps) {
      comps = [...comps, ...this.state.comps];
    }
    return comps.map((comp, i) => this.renderComponent(comp, i));
    
  }
  
  renderComp(comp, i) {
    return (
      <View key={i} style={{flexDirection:'row', paddingHorizontal: 17, marginTop:65}}>
        { comp.avatar &&
          <Image style={styles.compImage} source={comp.avatar} />
        }
        { !comp.avatar &&
          <View style={[styles.compImage, {borderWidth:0.5}]} />
        }
        <View style={{flex:1, justifyContent:'center', alignItems:'flex-start'}}>
          <Text style={{fontSize:15,fontWeight:'bold'}}>{comp.name || 'Comp Name'}</Text>
        </View>
      </View>
    )
  }

  renderCreateCompButton() {
    return (
      <View style={{flexDirection:'row', paddingHorizontal: 17, marginTop:34}}>
        <TouchableOpacity onPress={() => this._onCreateComp()}>
          <View style={[styles.compImage, {backgroundColor:'#9E4FFF', alignItems:'center', justifyContent:'center'}]}>
            <Image source={Images.Add_White_15x15} />
          </View>
        </TouchableOpacity>
        <View style={{flex:1, justifyContent:'center', alignItems:'flex-start'}}>
          <Text style={{fontSize:15,fontWeight:'bold'}}>Create new comp</Text>
        </View>
      </View>
    );
  }

  renderSuggestedCompsTitle() {
    return (
      <View style={{flexDirection:'row', paddingHorizontal:15, marginTop: 56}}>
        <View style={{flex:1}}>
          <Text style={{fontSize:13}}>Suggested comp names</Text>
        </View>
      </View>
    )
  }

  renderSuggestedComps() {
    let comps = [
      {
        name: 'Style guide',
      },
      {
        name: 'Food porn'
      },
      {
        name: 'Vibes'
      },
      {
        name: 'Funny'
      }
    ];
    return comps.map((comp, i) => this.renderSuggestedComp(comp, i), this);
  }

  renderSuggestedComp(comp, i) {
    return (
      <View key={i} style={{flexDirection:'row', paddingHorizontal:17, marginTop:32}}>
        <Image style={{marginRight:19}} source={Images.Add_Gray_15x15} />
        <View style={{flex:1}}>
          <Text style={{fontSize:15, color:'#A3a3a3'}}>{comp.name || ''}</Text>
        </View>
      </View>
    )
  }

  renderCreateComp() {
    return (
      <CreateComp navigator={this.refNavigator} navigationBar={true} />
    )
  }

  ////////////////////////////////////////////////

  showCreateComp() {
    if (!!this.refNavigator) {
      this.refNavigator.push({
        id: 'CreateComp'
      });
    }
  }

  ////////////////////////////////////////////////

  _onClose() {
    let result = true;
    if (!!this.props.onClose) {
      result = this.props.onClose();
    }
    if (result !== false && !!this.refNavigator) {
      this.refNavigator.pop();
    }
  }

  _onAddVisual() {
    if (this.props.onAddVisual) {
      this.props.onAddVisual();
    }
  }

  _onCreateComp() {
    let result = true;
    if (!!this.props.onCreateComp) {
      result = this.props.onCreateComp();
    }
    if (result !== false) {
      this.showCreateComp();
    }
  }
};

export default AddVisualToComp;