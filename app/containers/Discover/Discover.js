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
  ScrollView,
  Alert,
  Modal,
} from 'react-native';

import {
  Button,
  ClqsixTextInput,
  CustomNavigator,
  FullScreen,
  ScrollViewWrapper,
  TabView,
  Images,
} from '../../components';

import {
  VisualsAutoResponsive,
  VisualsLinearResponsive,
  VisualDetail,
} from '../Visual';

import {
  CompDetail
} from '../Comp';

import {
  SquadCliques
} from '../Clique';

import {
  VisualModel
} from '../../models'


const HorizontalPaging = ScrollViewWrapper.HorizontalPaging;

class Discover extends Component {

  initialDataLoaded = false;
  visuals = [];
  comps = [
    {
      posterName: 'Tester',
      name: 'Colours',
      avatarSource: Images.Cliqsix_1932x1952,
      type: 'comp'
    },
    {
      posterName: 'Tester',
      name: 'Colours',
      avatarSource: Images.Cliqsix_1932x1952,
      type: 'comp'
    },
    {
      posterName: 'Tester',
      name: 'Colours',
      avatarSource: Images.Cliqsix_1932x1952,
      type: 'comp'
    }
  ];

  constructor(props) {
    super(props);
    this.state = {
        tab: 'visuals',
        visuals: [],
        comps: this.comps,
        tabMinHeight: 0,
        scrollViewY:0,
        scrollViewH:0
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
    if (route.id === 'CompDetail') {
      return this.renderCompDetail(route.comp);
    }
  }

  renderDefault() {
    return (
      <FullScreen style={{alignItems: 'center'}}>
        {this.renderNavigationBar()}
        {this.renderComponent()}
        <Modal visible={!!this.state.modal} onRequestClose={() => {this.setState({modal:null})}} transparent={false}>
          {this.state.modal==='VisualDetail' && this.renderVisualDetail(this.state.selectedVisual)}
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
        leftButton = {<Image source={Images.Search_Black_17x17} />}
        rightButton = {<Image source={Images.Refresh_Black_16x17} />}
        onLeftButtonPress = {() => this._onNavigationLeftButtonPress()}
        onRightButtonPress = {() => this._onNavigationRightButtonPress()}
      >
      </CustomNavigator>
    )
  }

  renderComponent() {
    return (
      <ScrollView ref="scrollView" style={{width:'100%'}} onLayout={e => this._onScrollViewLayout(e)}>
        {this.renderPager()}
        <SquadCliques style={{marginHorizontal:15,paddingTop:10,height:152,borderBottomWidth:0.5,borderBottomColor:'#acacac'}} />
        {this.renderTabView()}
      </ScrollView>
    )
  }

  ////////////////////////////////////////////////////////////////////

  renderPager() {
    return (
      <HorizontalPaging style={[{height:175, marginLeft: 20, marginRight: 20, marginBottom: 30}]}>
        <HorizontalPaging.Item>
          <FullScreen style={{alignItems:'center', justifyContent:'center'}}>
            <Text style={{fontFamily:'SF UI Text', fontWeight:'900', fontSize:17, color:'white'}}>CLIQUES = groups of firends</Text>
          </FullScreen>
        </HorizontalPaging.Item>

        <HorizontalPaging.Item>
          <FullScreen style={{alignItems:'center', justifyContent:'center', backgroundColor:'#9E4FFF'}}>
            <Text style={{fontFamily:'SF UI Text', fontWeight:'900', fontSize:17, color:'white'}}>VISUALS = a photo,</Text>
            <Text style={{fontFamily:'SF UI Text', fontWeight:'900', fontSize:17, color:'white'}}>Vvideo, GIF, text, or link</Text>
          </FullScreen>
        </HorizontalPaging.Item>

        <HorizontalPaging.Item>
          <FullScreen style={{alignItems:'center', justifyContent:'center', backgroundColor:'#EF4345'}}>
            <Text style={{fontFamily:'SF UI Text', fontWeight:'900', fontSize:17, color:'white'}}>COMPS =</Text>
            <Text style={{fontFamily:'SF UI Text', fontWeight:'900', fontSize:17, color:'white'}}>a collection of visuals</Text>
          </FullScreen>
        </HorizontalPaging.Item>
      </HorizontalPaging>
    )
  }

  renderTabView() {
    return (
      <TabView
        minContentHeight={this.state.tabMinHeight}
        style={{marginTop:25, }}
        barStyle={{alignItems: 'flex-start',marginBottom:25}}
        textStyle={{color: 'gray', fontSize: 15, fontWeight: 'bold'}}
        selectedTextStyle={{color: 'black', fontSize: 15, fontWeight: 'bold'}}
        >
        <TabView.Item ref={ref => this.refVisualsTab = ref} text='Visuals' selected={this.state.tab === 'visuals'}
          onPress={() => this.changeTab(this.refVisualsTab, 'visuals')}>
          <VisualsAutoResponsive items={this.state.visuals} style={{marginHorizontal:13}} itemMargin={24} onSelectItem={(item, i)=>this.showVisualDetail(item)}/>
        </TabView.Item>

        <TabView.Item ref={ref => this.refCompsTab = ref} text='Comps' selected={this.state.tab === 'comps'}
          onPress={() => this.changeTab(this.refCompsTab, 'comps')}>
          <VisualsLinearResponsive items={this.state.comps} style={{marginHorizontal:13}} itemMargin={24} onSelectItem={(item, i)=>this.showCompDetail(item)}/>
        </TabView.Item>
      </TabView>
    )
  }

  renderVisualDetail(visual) {
    return <VisualDetail navigator={true} navigationBar={true} visual={visual} onNavigationLeftButtonPress={() => this.hideVisualDetail()} />
  }

  renderCompDetail(comp) {
    return <CompDetail navigator={this.refNavigator} navigationBar={true} comp={comp} onNavigationLeftButtonPress={() => {
        if (!!this.refNavigator) this.refNavigator.pop();
      }} />
  }

  ////////////////////////////////////////////////////////////////////

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

  showCompDetail(comp) {
    if (!!this.refNavigator) {
      this.refNavigator.push({id:'CompDetail', comp:comp})
    }
  }

  ////////////////////////////////////////////////////////////////////

  _onScrollViewLayout(e) {
    let {x, y, height, width} = e.nativeEvent.layout;
    this.state.scrollViewY = y;
    this.state.scrollViewH = height;
  }
};

const styles = StyleSheet.create({

});

export default Discover;