'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    Alert,
    Modal,
} from 'react-native';

import {
  Images,
  Text,
} from '../../components';


class SquadCliques extends Component {
  
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

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {

  }

  componentWillUnmount() {

  }

  render() {
    let {style, children, cliques, ...props} = this.props;
    if (!cliques) {
      cliques = this.cliques;
    }
    props.style = [style, {flexDirection:'column'}];
    return (
      <View {...props}>
        <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
          {this.renderCliques(cliques)}
        </View>
        <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', marginTop:20}}>
          <TouchableOpacity>
            <Text style={{color:'#9E4FFF',fontSize:12,fontWeight:'bold'}}>FEATURED squads</Text>
          </TouchableOpacity>
          <View style={{flexGrow:1, alignItems:'flex-end',justifyContent:'center'}}>
            <TouchableOpacity style={{flexDirection:'row',justifyContent:'flex-end',alignItems: 'center'}}>
              <Text style={{color:'#0095F7',fontSize:12,fontWeight:'bold'}}>view all</Text>
              <Image source={Images.BackChevronRight_Blue_9x16} style={{marginLeft:4}}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  renderCliques(cliques) {
    return cliques.map((item, i) => this.renderClique(item, i), this);
  }

  renderClique(clique, i) {
    let width = 86;
    return (
      <TouchableOpacity key={i}>
        <View style={{width:width,height:width,borderRadius:width/2,justifyContent:'center',alignItems:'center',backgroundColor:'#000',overflow:'hidden'}} source={clique.imageSource}>
          <Image source ={clique.imageSource} />
        </View>
      </TouchableOpacity>
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

export default SquadCliques;