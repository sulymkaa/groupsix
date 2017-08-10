'use strict';

import React, { Component } from 'react';
import {
  Navigator,
} from 'react-native';
import {
  Page,
  Images,
} from '../../../components';

import FirstPage from './FirstPage';
import SecondPage from './SecondPage';

class Signup extends Component {

  model = {
  };

  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <Navigator initialRoute={{id: 1}}
        renderScene={this.renderScene.bind(this)}
        navigator={this.props.navigator}
        navigationBar={<Navigator.NavigationBar routeMapper={Page.NavigationBarRouteMapper}/>}
      />
    );
  }
  
  renderScene(route, navigator) {
    if (route.id === 1) {
      return (
        <FirstPage navigator={navigator} model={this.model}/>
      );
    } else if (route.id === 2) {
      return (
        <SecondPage navigator={navigator} model={this.model} onSignupSuccess = {() => !!this.props.onSignupSuccess && this.props.onSignupSuccess()}/>
      );
    }
  }
}
export default Signup;