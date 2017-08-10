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
} from 'react-native';

import {
  Text,
  Button,
  ClqsixTextInput,
  CustomNavigator,
  FullScreen,
  ScrollViewWrapper,
  Options,
  TabView,
  Images
} from '../../components';

import {
  VisualsAutoResponsive
} from '../Visual';

import {
  VisualModel
} from '../../models';

import {
  AuthAPI
} from '../../utils'

const HorizontalPaging = ScrollViewWrapper.HorizontalPaging;
const ImageScrollView = ScrollViewWrapper.ImageScrollView;

class Profile extends Component {

  visuals = [];

  initialDataLoaded = false;

  constructor(props) {
    super(props);
    this.state = {
        closeScrollPageView: false,
        tab: 'visuals',
        visuals: [],
        avatarImage : null,
        tabMinHeight: 0,
        scrollViewY:0,
        scrollViewH:0,
    }
  }

  componentWillMount() {
    VisualModel.on_child_added(snapshot => {
      if (this.initialDataLoaded && !!snapshot) {
        this.visuals.unshift({key: snapshot.key, ...snapshot.val()});
        this.setState({visuals: this.visuals});
      }
    });
    VisualModel.once(snapshot => {
      snapshot.forEach(element => {
        this.visuals.unshift({key: element.key, ...element.val()});
        this.setState({visuals: this.visuals});
      });
      this.initialDataLoaded = true;
    }).catch(error => alert(error.message));
  }

  componentWillDismount() {
    VisualModel.off();
  }

  componentDidMount() {
    
  }

  changeAvatar(source) {
    this.setState({
      avatarImage: source
    });
  }

  onScrollPageViewHide() {
    this.setState({
      closeScrollPageView: true,
    })
  }

  onScrollViewLayout(e) {
    let {x, y, height, width} = e.nativeEvent.layout;
    this.state.scrollViewY = y;
    this.state.scrollViewH = height;
  }

  changeTab(ref, tab) {
    ref.measure((refFrameX, refFrameY, refWidth, refHeight, refPageX, refPageY) => {
      let minHeight = this.state.scrollViewY + this.state.scrollViewH-refPageY+40;
      if (minHeight < 0) minHeight = 0;
      this.setState({
        tab:tab,
        tabMinHeight: minHeight
      });
    });
  }

  render() {
    let currentUser = AuthAPI.currentUser();
    let avatarImage = !!this.state.avatarImage ? this.state.avatarImage : ((!!currentUser && currentUser.photoURL) ? {uri: currentUser.photoURL} : Images.Profile_Gray_180x180);

    return (
      <FullScreen style={{alignItems: 'center'}}>
        <CustomNavigator
          leftButton = {<Image source={Images.Heart_Black_18x17} />}
          rightButton = {<Image source={Images.More_Black_23x5} />} >
          <Text style={{fontSize: 17, fontWeight:'bold'}}>{currentUser.displayName}</Text>
        </CustomNavigator>
        <ScrollView style={{flex:1, width:'100%'}} onLayout={e => this.onScrollViewLayout(e)}>
          <HorizontalPaging style={styles.pageContainer} onHide={this.onScrollPageViewHide.bind(this)}>
            <HorizontalPaging.Item>
              <FullScreen style={[styles.page, {backgroundColor: '#EF4345'}]}>
                <Text style={styles.pageText}>This is your page,</Text>
                <Text style={styles.pageText}>build it the way you want.</Text>
              </FullScreen>
            </HorizontalPaging.Item>

            <HorizontalPaging.Item>
              <FullScreen style={[styles.page, {backgroundColor:'#0095F7'}]}>
                <Text style={styles.pageText}>Step 1: Add a profile pic,</Text>
                <Text style={styles.pageText}>location, and quick bio.</Text>
              </FullScreen>
            </HorizontalPaging.Item>

            <HorizontalPaging.Item>
              <FullScreen style={[styles.page, {backgroundColor:'#9E4FFF'}]}>
                <Text style={styles.pageText}>Step 2: Post (or repost)</Text>
                <Text style={styles.pageText}>VISUALS and COMPS</Text>
              </FullScreen>
            </HorizontalPaging.Item>

          </HorizontalPaging>

          { !this.state.closeScrollPageView &&
            <FullScreen.Row style={{marginLeft:20, marginRight:20, marginBottom:43, flexDirection:'row', borderBottomWidth: 0.5, borderColor: '#cccccc'}}>
              <Button.Link text="Switch to Clique Mode"
                style={{marginBottom:25}}
                textStyle={{color:'gray',textDecorationStyle: 'solid',textDecorationLine: 'underline',textDecorationColor: 'gray'}}
                onPress={() => {}} />
            </FullScreen.Row>
          }

          <FullScreen.Row style={{marginLeft:52, marginRight:15, marginBottom: 20, alignItems:'flex-start'}}>
            <Image style={{width:180, height:180, marginBottom: 15}} source={avatarImage} />
            
            <TouchableOpacity style={{position:'absolute', bottom: 0, left:142,}} onPress={() => this.refs.pageChooser.show()}>
              <View style={{width: 50, height: 35, alignItems: 'center', justifyContent: 'center', borderWidth:1, borderColor:'#cccccc', backgroundColor:'white'}}>
                <Image source={Images.SwitchAccount_16x16} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{position:'absolute', bottom: 0, left:198,}} onPress={() => this.refs.imageChooser.show()}>
              <View style={{width: 110, height: 35, alignItems: 'center', justifyContent: 'center', borderWidth:1, borderColor:'#cccccc', backgroundColor:'white'}}>
                <Text style={{fontFamily: 'SF UI Text', fontSize: 13, color: '#a3a3a3', fontWeight: '600'}}>Edit Profile</Text>
              </View>
            </TouchableOpacity>

          </FullScreen.Row>

          <FullScreen.Row style={{marginLeft:25,flexDirection:'row', justifyContent:'flex-start'}}>
            <View style={{width:124,marginRight:11}}>
              <Text style={{fontSize:15,color:'#a3a3a3'}}>Studio City, CA</Text>
            </View>
            <Text style={{fontSize:15,color:'#a3a3a3',textDecorationLine:'underline'}}>Frequency at 116</Text>
          </FullScreen.Row>

          <TabView
          minContentHeight={this.state.tabMinHeight}
          style={{marginTop:30}}
          barStyle={{alignItems: 'flex-start', marginBottom:15}}
          textStyle={{color: 'gray', fontSize: 15, fontWeight: 'bold'}}
          selectedTextStyle={{color: 'black', fontSize: 15, fontWeight: 'bold'}}
          >
            <TabView.Item ref="visuals" text='Visuals' selected={this.state.tab === 'visuals'}
              onPress={() => this.changeTab(this.refs.comps, 'visuals')}>
              {this.renderVisuals()}
            </TabView.Item>

            <TabView.Item ref="comps" text='Comps' selected={this.state.tab === 'comps'}
              onPress={() => this.changeTab(this.refs.visuals, 'comps')}>
           </TabView.Item>
          </TabView>

        </ScrollView>

        <Options.ImageChooser ref="imageChooser" onImageSelected={(source) => this.changeAvatar(source)} />
        <Options ref="pageChooser"
          title='Switch Pages'
          checkIcon={true}
          value={{
            value:0
          }}
          items={[
          {
            value:0,
            imagePrefix: Images.Cliqsix_59x60,
            text:'twinvibes',
          }
        ]}>
          <View style={{height: 48,justifyContent:'center', alignItems:'center'}}>
            <Text style={{color:'#a3a3a3'}}>Options</Text>
          </View>
        </Options>
      </FullScreen>
    );
  }
  
  renderVisuals() {
    if (this.state.visuals.length > 0) {
      return <VisualsAutoResponsive items={this.state.visuals} style={{marginHorizontal:15}} itemMargin={23}/>
    }
    return (
      <View style={{marginTop:133,marginBottom:52, justifyContent:'center', alignItems:'center'}}>
        <Text style={{fontWeight:'bold',fontSize:17}}>No Posts Yet</Text>
        <View style={{width:185, marginTop:6, alignItems:'center',}}>
          <Text style={{textAlign:'center',fontWeight:'300'}}>Post or repost visuals and comps onto your page.</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  pageContainer: {
    height:175,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 25,
  },

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

export default Profile;