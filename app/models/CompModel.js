'use strict';

import React, {Component} from 'react';
import {ReactNative, Alert} from 'react-native';
import fb from '../utils/FirebaseAPI'

const CompModel = {
  push(data, fnCallback) {
    if (!data.createdAt) {
      data.createdAt = fb.timestamp();
    }

    let currentUser = fb.currentUser();

    data.uid = currentUser.uid;
    data.posterName = currentUser.displayName;

    if (currentUser.photoURL) {
      data.posterImage = {uri: currentUser.photoURL};
    }
    return fb.push('/comp/', data, fnCallback);  
  },
}

export default CompModel;