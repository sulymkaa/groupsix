'use strict';

import React, {Component} from 'react';
import {ReactNative, Alert, Platform} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import fb from './FirebaseAPI';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const DEBUG_URL = null;//'http://lorempixel.com/400/200';


const uploadFile = (uri, mime = 'application/octet-stream', fileName = null, storage = 'files') => {
  return new Promise((resolve, reject) => {
    if (fb.fbStorage) {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      const sessionId = new Date().getTime();
      let uploadBlob = null;
      const fileName = !fileName ? `${sessionId}` : fileName;
      const fileRef = fb.firebaseStorage.ref(storage).child(fileName);
      fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then((blob) => {
        uploadBlob = blob
        return fileRef.put(blob, { contentType: mime });
      })
      .then(() => {
        uploadBlob.close();
        return fileRef.getDownloadURL();
      })
      .then((url) => {
        resolve(url);
      })
      .catch((error) => {
        reject(error);
      });
    } else {
      resolve(DEBUG_URL || uri);
    }
  });
}

const FirebaseStorageAPI = {
  uploadFileOnFirebase(fileUrl) {
    return uploadFile(fileUrl);
  },

  uploadImageOnFirebase(fileUrl) {
    return uploadFile(fileUrl, 'image/jpg', '', 'images');
  },

  uploadVideoOnFirebase(fileUrl) {
    return uploadFile(fileUrl, 'video/mp4', '', 'videos');
  }
}

export default FirebaseStorageAPI;