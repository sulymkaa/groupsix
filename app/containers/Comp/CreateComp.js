'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Navigator,
    Image,
    TabBarIOS,
    TabBarItemIOS,
    Dimensions,
    Keyboard,
} from 'react-native';

import firebase from 'firebase';

import {
  Alert,
  ClqsixTextInput,
  CustomNavigator,
  FullScreen,
  KeyboardSpacer,
  Options,
  ScrollView,
  Images,
} from '../../components';

import {
  FirebaseStorageAPI
} from '../../utils';

import {
  CompModel
} from '../../models';

import AvatarInput from './AvatarInput';
import EditComp from './EditComp';
import CompDetail from './CompDetail';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
  },

  navigator: {
    marginBottom: 0,
  },

  title: {
    fontFamily:'SF UI Text',
    fontSize: 17,
    fontWeight: 'bold',
  },

  contentContainer: {
    flex:1,
    width: '100%',
  },


  avatar: {
    marginTop:32,
    marginRight: 25,
    marginLeft:52,
    marginBottom: 18
  },

  input: {
    paddingVertical: 21.5,
    marginHorizontal: 25,
  }
});

class CreateComp extends Component {

  navigator = null;

  refName = null;
  refDescription = null;
  refScrollView = null;
  comp = {
    name: "",
    description: ""
  };

  constructor(props) {
    super(props);
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
    this._onPost();
  }

  ////////////////////////////////////////////////////////////////////

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

  renderScene(route, navigator) {
    if (route.id === 'EditComp') {
      return this.renderEditComp(route.comp);
    }
    if (route.id === 'CompDetail') {
      return this.renderCompDetail(route.comp);
    }
    return this.renderDefault();
  }

  renderDefault() {
    return (
      <FullScreen style={styles.container}>
        { this.renderNavigationBar() }
        { this.renderComponent() }
        <KeyboardSpacer />
        <Options.ImageChooser ref={ref => this.refImageChooser = ref} onImageSelected={(source) => this.changeAvatar(source)}/>
      </FullScreen>
    );
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
        title={'Create Comp'}
        leftButton = {<Image source={Images.Cancel_Black_13x13} />}
        rightButton = {<Image source={Images.Check_Black_17x13} />}
        onLeftButtonPress = {() => this._onNavigationLeftButtonPress()}
        onRightButtonPress = {() => this._onNavigationRightButtonPress()}
      >
        <Text style={styles.title}>Create Comp</Text>
      </CustomNavigator>
    );
  }

  renderComponent() {
    return (
      <ScrollView
        ref={ref => this.refScrollView = ref}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        scrollEnabledOnKeyboard={true}
        style={styles.contentContainer}>

        <AvatarInput style={{marginTop:32, marginRight: 25, marginLeft:52, marginBottom: 18}} onChangeSource={(source) => this._onChangeAvatar(source)}/>

        <ClqsixTextInput ref={ref => this.refName = ref}
          style={styles.input}
          needValidation={false}
          placeholder="Comp name"
          prefixIcon={Images.Add_Purple_16x16}
          onChangeText={text => this._onChangeName(text)}
          onFocus={() => this.refScrollView.scrollToRef(this.refName, 100)}
        />

        <ClqsixTextInput ref={ref => this.refDescription = ref}
          style={styles.input}
          needValidation={false}
          placeholder="Description"
          prefixIcon={Images.Vibe_Blue_14x14}
          onChangeText={text => this._onChangeDesc(text)}
          onFocus={() => this.refScrollView.scrollToRef(this.refDescription)}
          />

      </ScrollView>
    )
  }

  ////////////////////////////////////////////////////////////////////

  renderEditComp(comp) {
    return <EditComp navigator={this.refNavigator} navigationBar={true} comp={comp} onClose={() => this._onClose()}/>;
  }

  renderCompDetail(comp) {
    return <CompDetail navigator={this.refNavigator} navigationBar={true} comp={comp} editable={true}/>;
  }

  ////////////////////////////////////////////////////////////////////

  showCompDetail(comp) {
    if (!!this.refNavigator) {
      this.refNavigator.replace({id: 'CompDetail', comp: comp});
    }
  }

  ////////////////////////////////////////////////////////////////////

  postComp() {
    let fnPush = () => {
      CompModel.push(
        {
          ...this.comp,
          type: 'comp'
        }
      ).then(ref => {
        ref.once('value', snapshot => {
          this.comp = {...snapshot.val(), key: snapshot.key};
          this._onCreated(this.comp);
        })
      });
    };

    if (!!this.comp.avatar) {
      FirebaseStorageAPI.uploadImageOnFirebase(this.comp.avatar.uri)
      .then(downloadUrl => {
        this.comp.avatar = {uri : downloadUrl};
        fnPush();
      })
      .catch(error => {
        alert(error.message);
      });
    } else {
      fnPush();
    }
  }

  ////////////////////////////////////////////////////////////////////


  _onClose() {
    let result = true;
    if (!!this.props.onClose) {
      result = this.props.onClose();
    }
    if (result !== false && !!this.refNavigator) {
      this.refNavigator.pop();
    }
    return false;
  }

  _onPost() {
    if (!!this.comp.name && this.comp.name.length > 0) {
      this.postComp();      
    }
  }

  _onCreated(comp) {
    let result = true;
    if (!!this.props.onCreated) {
      result = this.props.onCreated(comp);
    }
    if (result !== false) {
      this.showCompDetail(comp);
    }
  }

  _onChangeAvatar(image) {
    this.comp.avatar = image;
  }

  _onChangeName(text) {
    this.comp.name = text;
  }

  _onChangeDesc(text) {
    this.comp.description = text;
  }
  
};

export default CreateComp;