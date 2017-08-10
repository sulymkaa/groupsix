'use strict';

import React, {Component} from 'react';
import {ReactNative, Alert} from 'react-native';
import fb from '../utils/FirebaseAPI'

const VisualModel = {

	push(visual, fnCallback) {
    let data = {...visual};
    if (!data.createdAt) {
      data.createdAt = fb.timestamp();
    }
    data.updatedAt = data.createdAt;

    let currentUser = fb.currentUser();

    data['uid'] = currentUser.uid;
    data['posterName'] = currentUser.displayName;

    if (currentUser.photoURL) {
      data['posterImage'] = {uri: currentUser.photoURL};
    }
    return fb.push('/visuals/', data, fnCallback);  
  },

  once(event, fnCallback) {
    if (!fnCallback) {
      fnCallback = event;
      event = 'value';
    } 
    return fb.ref('/visuals/').orderByChild("createdAt").once(event, fnCallback);
  },

  on(event, fnCallback) {
    if (!fnCallback) {
      fnCallback = event;
      event = 'value';
    } 
    fb.ref('/visuals/').on(event, fnCallback);
  },

  on_child_added(fnCallback) {
    VisualModel.on('child_added', fnCallback);
  },

  off(event) {
    fb.ref('/visuals/').off(event);
  },

  off_child_added() {
    VisualModel.off('child_added')
  }
  
}

export default VisualModel;