'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Navigator,
    Image,
    ScrollView,
    TabBarIOS,
    TabBarItemIOS,
    Dimensions,
    Alert,
    TextInput,
} from 'react-native';

import {
  Button,
  ClqsixTextInput,
  CustomNavigator,
  FullScreen,
  ScrollViewWrapper,
  Text,
  Images,
} from '../../components';

import {
  VisualModel
} from '../../models';

import VisualsScrollAutoResponsive from './VisualsScrollAutoResponsive';

const HorizontalPaging = ScrollViewWrapper.HorizontalPaging;
const ImageScrollView = ScrollViewWrapper.ImageScrollView;

const guid=require('guid');

class FindVisuals extends Component {

  searchHandler = null;

  constructor(props) {
    super(props);
    this.state = {
        closeScrollPageView: false,
        visuals: [],
        filteredVisuals: null,
    }
    this.visuals = [];
  }


  componentWillMount() {
    VisualModel.once(snapshot => {
      snapshot.forEach(element => {
        this.visuals.unshift({...element.val(), key: element.key});
        this.setState({visuals: this.visuals});
      })
    });
  }

  componentWillDismount() {
  }

  onScrollPageViewHide() {
    this.setState({
      closeScrollPageView: true,
    })
  }

  _onSelectItem(item) {
    if (this.props.onSelectItem) {
      this.props.onSelectItem(item);
    }
  }

  async _onFilter(filter) {
    if (filter === null || filter === '') {
      this.setState({
        filteredVisuals: null,
      });
      return;
    }

    let visuals = [];
    this.state.visuals.forEach(visual => {
      if (visual.type==='text') {
        if (!!visual.text && visual.text.indexOf(filter) >= 0) {
          visuals.push(visual);
        }
      } else if (!!visual.caption && visual.caption.indexOf(filter) >= 0) {
        visuals.push(visual);
      }
    });

    this.setState({
      filteredVisuals: visuals
    });


    
  }

  render() {
    return (
      <FullScreen style={{alignItems: 'center', backgroundColor:'white', justifyContent:'flex-start'}}>
        <CustomNavigator
          style={{marginBottom:0}}
          leftButton = {<Image source={Images.BackChevron_Black_16x9} />}
          onLeftButtonPress = {() => this.props.navigator.pop()}
        >
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>Visuals</Text>
        </CustomNavigator>
        
        <ClqsixTextInput
          placeholder='Search'
          needValidation={false}
          onChangeText={(text) => this._onFilter(text)}
          style={{marginTop:6, height:60, marginHorizontal: 25}} />

        <VisualsScrollAutoResponsive style={{marginTop:40}} contentStyle={{marginHorizontal:15}} itemMargin={21} onSelectItem={(item) => this._onSelectItem(item)} items={this.state.filteredVisuals || this.state.visuals}/>

      </FullScreen>
    );
  }
};

const styles = StyleSheet.create({
  page: {
    alignItems:'center',
    justifyContent:'center'
  },

  pageText: {
    fontFamily:'SF UI Text',
    fontWeight:'900',
    fontSize:17,
    color:'white'
  }
});

export default FindVisuals;