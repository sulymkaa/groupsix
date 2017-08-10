'use strict';

import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  TabBarIOS,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Images = {

  Camera: {
    ChooseLibrary: require('../assets/images/camera/ChooseLibrary-25x25.png'),
    Flash: require('../assets/images/camera/Flash-15x25.png'),
    Mute: require('../assets/images/camera/Mute-24x19.png'),
    RecordVideo: require('../assets/images/camera/RecordVideo-74x74.png'),
    Self: require('../assets/images/camera/Self-30x26.png'),
    Speaker: require('../assets/images/camera/Speaker-21x19.png'),
    TakePhoto: require('../assets/images/camera/TakePhoto-74x74.png'),
  },

  Add_Black_16x16: require('../assets/images/Add-Black-16x16.png'),
  Add_Gray_15x15: require('../assets/images/Add-Gray-15x15.png'),
  Add_Purple_16x16: require('../assets/images/Add-Purple-16x16.png'),
  Add_Purple_22x22: require('../assets/images/Add-Purple-22x22.png'),
  Add_White_15x15: require('../assets/images/Add-White-15x15.png'),
  
  AddCircle_Purple_17x17: require('../assets/images/AddCircle-Purple-17x17.png'),

  BackChevron_Black_16x9: require('../assets/images/BackChevron-Black-16x9.png'),
  BackChevron_Gray_16x9: require('../assets/images/BackChevron-Gray-16x9.png'),

  BackChevronLeft_Black_9x16: require('../assets/images/BackChevronLeft-Black-9x16.png'),
  BackChevronLeft_White_9x16: require('../assets/images/BackChevronLeft-White-9x16.png'),

  BackChevronRight_Blue_9x16: require('../assets/images/BackChevronRight-Blue-6x11.png'),

  Cancel_Black_13x13: require('../assets/images/Cancel-Black-13x13.png'),
  Cancel_Red_15x15: require('../assets/images/Cancel-Red-15x15.png'),
  Cancel_White_13x13: require('../assets/images/Cancel-White-13x13.png'),

  CancelCircle_Gray_30x30: require('../assets/images/CancelCircle-Gray-30x30.png'),

  Check_Black_17x13: require('../assets/images/Check-Black-17x13.png'),
  Check_White_17x13: require('../assets/images/Check-White-17x13.png'),

  Cliqsix_14x14: require('../assets/images/Cliqsix-14x14.png'),
  Cliqsix_21x22: require('../assets/images/Cliqsix-21x22.png'),
  Cliqsix_26x26: require('../assets/images/Cliqsix-26x26.png'),
  Cliqsix_59x60: require('../assets/images/Cliqsix-59x60.png'),
  Cliqsix_1932x1952: require('../assets/images/Cliqsix-1932x1952.png'),

  CliqueAvatar_Gray_180x180: require('../assets/images/CliqueAvatar-Gray-180x180.png'),

  Comment_Blue_17x17: require('../assets/images/Comment-Blue-17x17.png'),

  Discover_Gray_20x20: require('../assets/images/Discover-Gray-20x20.png'),
  Discover_White_20x20: require('../assets/images/Discover-White-20x20.png'),

  Dislike_Brown_17x17: require('../assets/images/Dislike-Brown-17x17.png'),
  Dislike_Gray_17x17: require('../assets/images/Dislike-Gray-17x17.png'),

  Down_Green_17x17: require('../assets/images/Done-Green-17x17.png'),

  Favorite_Black_23x21: require('../assets/images/Favorite-Black-23x21.png'),

  Home_Gray_21x21: require('../assets/images/Home-Gray-21x21.png'),
  Home_White_21x21: require('../assets/images/Home-White-21x21.png'),

  Like_Gray_17x17: require('../assets/images/Like-Gray-17x17.png'),
  Like_Red_17x17: require('../assets/images/Like-Red-17x17.png'),

  Location_Green_10x16: require('../assets/images/Location-Green-10x16.png'),

  Heart_Black_18x17: require('../assets/images/Heart-Black-18x17.png'),

  Inbox_Gray_20x20: require('../assets/images/Inbox-Gray-20x20.png'),
  Inbox_White_20x20: require('../assets/images/Inbox-White-20x20.png'),

  InfoCircle_Yellow_14x14: require('../assets/images/InfoCircle-Yellow-14x14.png'),

  LinkCircle_Blue_51x51: require('../assets/images/LinkCircle-Blue-51x51.png'),

  MessageCircle_Yellow_17x17: require('../assets/images/MessageCircle-Yellow-17x17.png'),

  More_Black_23x5: require('../assets/images/More-Black-23x5.png'),
  More_Gray_20x5: require('../assets/images/More-Gray-20x5.png'),

  NewMessage_Black_20x20: require('../assets/images/NewMessage-Black-20x20.png'),

  Options_Black_24x24: require('../assets/images/Options-Black-24x24.png'),

  PageActive_7x7: require('../assets/images/PageActive-7x7.png'),
  PageInactive_7x7: require('../assets/images/PageInactive-7x7.png'),

  Profile_Gray_21x21: require('../assets/images/Profile-Gray-21x21.png'),
  Profile_Gray_180x180: require('../assets/images/Profile-Gray-180x180.png'),
  Profile_White_21x21: require('../assets/images/Profile-White-21x21.png'),

  Refresh_Black_16x17: require('../assets/images/Refresh-Black-16x17.png'),

  Repost_Green_17x17: require('../assets/images/Repost-Green-17x17.png'),
  Repost_Green_18x14: require('../assets/images/Repost-Green-18x14.png'),

  Share_Yellow_17x17: require('../assets/images/Share-Yellow-17x17.png'),

  Search_Black_17x17: require('../assets/images/Search-Black-17x17.png'),

  Suggested_Black_17x11: require('../assets/images/Suggested-Black-17x11.png'),

  SwitchAccount_16x16: require('../assets/images/SwitchAccount-16x16.png'),

  UnreadMessage_Blue_7x7: require('../assets/images/UnreadMessage-Blue-7x7.png'),

  Upload_Gray_20x20: require('../assets/images/Upload-Gray-20x20.png'),
  Upload_White_19x19: require('../assets/images/Upload-White-19x19.png'),

  UploadComp_133x107: require('../assets/images/UploadComp-133x107.png'),
  
  UploadLink_51x41: require('../assets/images/UploadLink-51x41.png'),

  UploadMoment_247x46: require('../assets/images/UploadMoment-247x46.png'),

  UploadPhoto_70x70: require('../assets/images/UploadPhoto-70x70.png'),

  UploadText_60x45: require('../assets/images/UploadText-60x45.png'),

  UploadVideo_78x78: require('../assets/images/UploadVideo-78x78.png'),

  Vibe_Blue_14x14: require('../assets/images/Vibe-Blue-14x14.png'),

};


export default Images;