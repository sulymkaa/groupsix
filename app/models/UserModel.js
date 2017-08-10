'use strict';

import React, {Component} from 'react';
import {ReactNative, Alert} from 'react-native';
import fb from '../utils/FirebaseAPI'

const UserModel = {
	save (user) {
    return new Promise((resolve, reject) => {
      UserModel.findWithEmail(user.email)
        .then(function(old){
          if (!old || old.uid == user.uid) {
           fb.update('/users/', user.uid, user)
            .then(() =>{
              resolve(user);
            }).catch(error => {
              reject(error);
            });
          } else {
            reject({message: 'Email is duplicated'});
          }
        }
      ).catch(erro => reject(error));
    });
  },

  findWithEmail (email) {
    let user = null;
    return fb.ref("/users/").orderByChild("email").equalTo(email).limitToFirst(1).once('value').then(snapshot => {
      snapshot.forEach(function(row) {
        user = row.val();
      });
      return user;
    });
  },

  removeAllWithEmail (email, fnOnComplete) {
    return new Promise((resolve, reject) => {
      var error = null;
      fb.ref('/users/').orderByChild('email').equalTo(email).once('value').then(snapshot => {
        if (!!snapshot) {
          snapshot.forEach(row => {
            if (!!row) row.ref.remove().catch(_error => error = !!_error ? _error : true);
            return !error;
          });
          if (!!error) reject(error === true ? null : error); else resolve();
        } else resolve();
      });
    });
  },

  findWithEmailAndPassword(email, password) {
    return fb.ref("/users/").orderByChild('email').equalTo(email).once('value')
    .then(snapshot => {
      let user = null;
      snapshot.forEach(function(row) {
        if (row.val().password === password) {
          user = row.val();
        }
      });
      return user;
    });
  },

  setPassword(uid, password) {
    return fb.ref("/users/" + uid).set({password: password, updatedAt: fb.timestamp()});
  }
}

export default UserModel;