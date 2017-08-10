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
    Modal,
} from 'react-native';

import {
  Button,
  ClqsixTextInput,
  CustomNavigator,
  FullScreen,
  ScrollViewWrapper,
  Images,
  Text,
} from '../../components';

import {
  CreateClique,
  JoinClique,
  SuggestedCliques,
  SquadCliques,
} from '../Clique';

import { 
  VisualsLinearResponsive,
  VisualDetail,
  VisualPostOptions
} from '../Visual';

import {VisualModel} from '../../models'

import FindFriends from './FindFriends';

const HorizontalPaging = ScrollViewWrapper.HorizontalPaging;

class Home extends Component {

  visuals = [
  ];
  cliques = [
    {
      imageSource: Images.Cliqsix_14x14
    },
    {
      imageSource: Images.Cliqsix_14x14
    },
    {
      imageSource: Images.Cliqsix_14x14
    },
    {
      imageSource: Images.Cliqsix_14x14
    }
  ];
  initialDataLoaded = false;
  navigator = null;


  refVisualPostOptions = null;

  constructor(props) {
    super(props);
    this.state = {
        closeScrollPageView: false,
        showCliques: false,
        visuals: [],
        cliques: this.cliques,
        modal: null,
        showPostOptions: false,

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
      snapshot.forEach((element) => {
        this.visuals.unshift({key: element.key, ...element.val()});
        this.setState({visuals: this.visuals});
      });
      this.initialDataLoaded = true;
    }).catch(error => alert(error.message));


  }
  componentWillUnmount() {
    VisualModel.off_child_added();
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
    this.refNavigator.push({id:'FindFriends'});
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

  renderScene(route, navigator) {
    var routeId = route.id;
    if (routeId === 'Default') {
      return this.renderDefault();
    }
    if (routeId === 'FindFriends') {
      return this.renderFindFriends();
    }
    if (routeId === 'SuggestedCliques') {
      return this.renderSuggestedCliques();
    }
    return this.renderDefault();
  }

  renderDefault() {
    return (
      <FullScreen style={{alignItems: 'center'}}>
        {this.renderNavigationBar()}
        {this.renderComponent()}
        <Modal visible = {!!this.state.modal} onRequestClose={() => {this.setState({modal:null})}} transparent={false}>
          {this.state.modal === 'CreateClique' && <CreateClique onRequestClose={() => {this.setState({modal:null})}}/>}
          {this.state.modal === 'JoinClique' && <JoinClique onRequestClose={() => {this.setState({modal:null})}}/>}
          {this.state.modal === 'VisualDetail' && this.renderVisualDetail(this.state.selectedVisual)}
        </Modal>
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
        leftButton = {<Image source={Images.Add_Black_16x16} />}
        rightButton = {<Image source={Images.Options_Black_24x24} />}
        onLeftButtonPress = {() => this._onNavigationLeftButtonPress()}
        onRightButtonPress = {() => this._onNavigationRightButtonPress()}
      >
        <Image source={Images.Cliqsix_26x26} />
        <Text style={{fontFamily:'Alegre Sans', fontSize: 36, marginLeft:8}}>CLQSIX</Text>
      </CustomNavigator>
    );
  }

  renderComponent() {
    return (
      <ScrollView directionalLockEnabled={true}>
        {!this.state.closeScrollPageView &&
          <HorizontalPaging style={[{height:175, marginLeft: 20, marginRight: 20, marginBottom: 25,}]} onHide={this._onScrollPageViewHide.bind(this)} onPageChanged={page => this.setState({showCliques:page!==1})}>
            <HorizontalPaging.Item>
              <FullScreen style={{alignItems:'center', justifyContent:'center', backgroundColor: '#0095F7'}}>
                <Text style={styles.pageText}>FOLLOW AND SHARE</Text>
                <Text style={styles.pageText}>COLLABORATIVE IDEAS</Text>
              </FullScreen>
            </HorizontalPaging.Item>

            <HorizontalPaging.Item>
              <FullScreen style={{alignItems:'center', justifyContent:'center', backgroundColor: '#24D770'}}>
                <Text style={styles.pageText}>DISCOVER SQUADS</Text>
              </FullScreen>
            </HorizontalPaging.Item>

            <HorizontalPaging.Item>
              <FullScreen style={{alignItems:'center', justifyContent:'center', backgroundColor:'#9E4FFF'}}>
                <Text style={styles.pageText}>POST WHAT YOU’RE </Text>
                <Text style={styles.pageText}>INTERESTED IN</Text>
              </FullScreen>
            </HorizontalPaging.Item>

            <HorizontalPaging.Item>
              <FullScreen style={{alignItems:'center', justifyContent:'center', backgroundColor:'#D9D20E'}}>
                <Text style={styles.pageText}>PGROUP CHAT WITH FRIENDS</Text>
              </FullScreen>
            </HorizontalPaging.Item>

            <HorizontalPaging.Item>
              <FullScreen style={{alignItems:'center', justifyContent:'center', backgroundColor:'#EF4345'}}>
                <Text style={styles.pageText}>CREATE A PAGE</Text>
                <Text style={styles.pageText}>FOR YOUR CREW</Text>
              </FullScreen>
            </HorizontalPaging.Item>

          </HorizontalPaging>
        }

        {!this.state.closeScrollPageView &&
          <FullScreen.Row style={{marginLeft:20, marginRight:20,alignItems:'flex-start', flexDirection:'row'}}>
            <View style={{flex:1, alignItems:'center'}}>
              <Button.Link text="Create Clique" textStyle={{color:'gray',textDecorationStyle: 'solid',textDecorationLine: 'underline',textDecorationColor: 'gray'}} onPress={() => {this.setState({modal: 'CreateClique'})}}/>
            </View>
            <View style={{flex:1, alignItems:'center'}}>
              <Button.Link text="Join Clique" textStyle={{color:'gray',textDecorationStyle: 'solid',textDecorationLine: 'underline',textDecorationColor: 'gray'}} onPress={() => {this.setState({modal: 'JoinClique'})}}/>
            </View>
          </FullScreen.Row>
        }

        { !this.state.closeScrollPageView && this.state.showCliques &&
          <SquadCliques style={{marginHorizontal:15, marginTop:8, paddingTop:30, paddingBottom:20, borderBottomColor:'#cccccc', borderBottomWidth:0.5}} cliques={this.state.cliques}/>
        }
        <VisualsLinearResponsive items={this.state.visuals} style={{marginTop:30, marginHorizontal:25}} onSelectItem={(item,i) => this.showVisualDetail(item,i)}/>
      </ScrollView>
    )
  }

  ////////////////////////////////////////////////////////////////////

  renderVisualDetail(visual) {
    return <VisualDetail navigator={true} navigationBar={true} visual={visual} onNavigationLeftButtonPress={() => this.hideVisualDetail()} />
  }

  renderFindFriends() {
    return <FindFriends navigator={this.refNavigator}/>
  }

  renderSuggestedCliques() {
    return <SuggestedCliques navigator={this.refNavigator}/>
  }

  ////////////////////////////////////////////////////////////////////

  showVisualDetail(item, i) {
    this.setState({
      modal: 'VisualDetail',
      selectedVisual: {
        ...item,
        source: Images.Cliqsix_1932x1952,
        reactions: [
          {
            actorName: 'Abel',
            type : 'like'
          },
          {
            actactorNameor: 'Wayyyyyyyyup',
            type : 'comment',
            comment: 'dammnnnnnnnn'
          },
          {
            actorName: 'thecrew',
            type : 'repost'
          },
          {
            actorName: 'bookkeepers',
            type : 'like',
          },
          {
            actorName: 'dontknow',
            type : 'comment',
            comment: 'kobe still top 5 of all time'
          }
        ]
      }
    });
  }

  hideVisualDetail() {
    this.setState({
      modal: null,
      selectedVisual: null,
    })
  }

  ////////////////////////////////////////////////////////////////////

  _onScrollPageViewHide() {
    this.setState({
      closeScrollPageView: true,
    })
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

export default Home;