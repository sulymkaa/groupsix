'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';

import {
  Alert,
  FullScreen,
} from './components';

import {
  ForgotPassword,
  Login,
  Signup,
  Start,
  Welcome,
  VerifyCode,
  ResetPassword,
} from './containers/Welcome';

import Main from './containers/Main';

class App extends Component {
  navigator = null;

  constructor(props) {
    super(props);
    this.state = {
      routeId : null,
      pageId : null,
      overlay: false,
      overlayViews: [],
    };
  }

  render() {
    return (
      <FullScreen>
        {this.renderApp()}
        {this.state.overlay && this.state.overlayViews.length > 0 && this.state.overlayViews[0]}
        {this.state.overlay && this.state.overlayViews.length > 1 && this.state.overlayViews[1]}
        {this.state.overlay && this.state.overlayViews.length > 2 && this.state.overlayViews[2]}
      </FullScreen>
    );
  }

  modal(view, needFullScreen) {
    if (view) {
      if (needFullScreen !== false) {
        this.state.overlayViews.push(<FullScreen>{view}</FullScreen>);
      } else {
        this.state.overlayViews.push(view);
      }
      this.setState({
        overlay: true,
      });
    }
  }

  dismodal() {
    if (this.state.overlayViews.length > 0) {
      this.state.overlayViews.pop();
    }
    this.setState({
      overlay: this.state.overlayViews.length > 0,
    });
  }

  alert(text) {
    this.modal(<Alert text={text} onHide={() => this.dismodal()}/>, false);
  }

  renderApp() {

    if (this.state.pageId == null) {
      return (
        <Navigator ref={ref => this.navigator = ref} initialRoute={{id: 'Welcome'}} renderScene={this.renderScene.bind(this)}/>
      );
    }

    if (this.state.pageId == 'Start') {
      return (
        <Start onStart={() => this.gotoHome()}/>
      );
    } else if (this.state.pageId == 'Home') {
      return (
        <Main/>
      )
    }
  }
    
  renderScene(route, navigator) {
    var routeId = route.id;
    if (routeId === 'Welcome') {
      return (
        <Welcome navigator={navigator}/>
      );
    } else if (routeId === 'Login') {
      return (
        <Login navigator={navigator} onLoginSuccess={() => this.gotoHome()}/>
      );
    } else if (routeId === 'Signup') {
      return (
        <Signup navigator={navigator} onSignupSuccess={() => this.gotoStart()}/>
      );
    } else if (routeId === 'ForgotPassword') {
      return (
        <ForgotPassword navigator={navigator}/>
      );
    } else if (routeId === 'VerifyCode') {
      return (
        <VerifyCode navigator={navigator}/>
      );
    } else if (routeId === 'ResetPassword') {
      return (
        <ResetPassword navigator={navigator}/>
      );
    }
  }

  gotoStart() {
    this.setState({
      pageId: 'Start',
    });
  }

  gotoHome() {
    this.setState({
      pageId: 'Home',
    });
  }

  gotoDiscover() {

  }

  gotoInbox() {

  }

  gotoProfile() {

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;