'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Navigator,
    Image,
    ScrollView,
    Dimensions,
    Alert,
    Modal,
} from 'react-native';

import {
  ClqsixTextInput,
  CustomNavigator,
  Text,
  Images,
} from '../../components';

class SuggestedCliques extends Component {

  cliques = [];
  initialDataLoaded = false;

  constructor(props) {
    super(props);
    this.state = {
      cliques: [],
    }
  }

  componentWillMount() {

  }

  componentWillUnmount() {

  }

  renderDefaultNavigationBar() {
    return (
      <CustomNavigator
        leftButton = {<Image source={Images.BackChevron_Black_16x9} />}
        onLeftButtonPress = {() => 
          !!this.props.navigator && this.props.navigator.pop()
        }
      >
        <Text style={{fontSize:17, fontWeight:'bold'}}>Suggested</Text>
      </CustomNavigator>
    );
  }

  renderNavigationBar() {
    if (!!this.props.navigationBar) {
      if (this.props.navigationBar === true) {
        return this.renderDefaultNavigator();
      } else {
        return this.props.navigationBar;
      }
    } else if (this.props.navigationBar === false) {
      return null;
    }
    return this.renderDefaultNavigationBar();
  }

  render() {
    return (
      <View style={{flexGrow:1, backgroundColor:'white'}}>
        {this.renderNavigationBar()}
      </View>
    )
  }
};

const styles = StyleSheet.create({
});

export default SuggestedCliques;