'use strict';

import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image
} from 'react-native';

import {
  StyleAPI
} from '../utils';

import Images from './Images';


const defaultProps = {
  autoCapitalize: 'none',
  autoCorrect: false,
  underlineColorAndroid: 'transparent',
};

class ClqsixTextInput extends Component {
  static propTypes = {
    style: View.propTypes.style,
  };

  _textInputRef = undefined;
  _value = '';

  constructor(props) {
    super(props);
    this.state = {
      isFocus: false,
      isValid: !this.props.needValidation,
      isFirst: true,
      errorMessage: '',
    };

    this._value = this.props.value;
  }

  isValid() {
    return false === this.props.needValidation || this.state.isValid;
  }

  render() {

    let {style, textStyle, underlineColorAndroid, borderColorOnFocus, borderWidthOnFocus, ..._props} = this.props;
    let props = {...defaultProps, ..._props,
      style:[
        styles.inputDefault,
        styles.textStyle,
        styles.nospace,
        styles.input,
      ]
    };

    let containerStyle =[
      styles.containerDefault,
      style,
      styles.container,
    ];

    if (this.state.isFocus) {
      if (borderColorOnFocus) {
        containerStyle.push({borderBottomColor : borderColorOnFocus});
      }
      if (borderWidthOnFocus) {
        containerStyle.push({borderBottomWidth : borderWidthOnFocus});
      }
    }

    let inputWrapperStyle = [
      styles.nospace,
      styles.inputWrapper,
    ];

    let errorMessage = null;
    if (false!==this.props.needValidation  && this.state.errorMessage.length > 0) {
        errorMessage = <Text style={[styles.errorMessage, this.props.errorTextStyle || {}]}>{this.state.errorMessage}</Text>;
        if (!!this.props.styleWithMessage) {
          containerStyle.push(this.props.styleWithMessage);
        }
    }

    return (
      <View style={containerStyle}>
        <View style={inputWrapperStyle}>
          { this.renderPrefixIcon() }
          <TextInput
            ref={(ref) => this._setTextInputRef(ref)}
            {...props}
            onFocus={(event)=>{this._onFocus(event)}}
            onBlur={(event)=>{this._onBlur(event)}}
            onChangeText={(text) => this._onChangeText(text)}/>
          { this.renderSuffixIcon() } 
          <Text/>
        </View>
        { errorMessage }
      </View>
    );
  }

  renderPrefixIcon() {
    if (this.props.prefixIcon) {
      return (<View style={styles.prefixIcon}><Image source={this.props.prefixIcon} /></View>);
    }
    return null;
  }

  renderSuffixIcon() {
    
    if (this.props.suffixIcon === false) {
      return null;
    }

    if (false === this.props.needValidation) {
      return !!this.props.suffixIcon ? this.props.suffixIcon : null;
    }

    if (this.state.isFirst) {
      return !!this.props.suffixIcon ? this.props.suffixIcon : null;
    }

    if (this.state.isValid) {
      return !!this.props.validIcon ? this.validIcon : (!!this.suffixIcon ? this.suffixIcon : <Image source={Images.Down_Green_17x17}/>);
    } else {
      return !!this.props.invalidIcon ? this.invalidIcon : (!!this.suffixIcon ? this.suffixIcon : <Image source={Images.Cancel_Red_15x15}/>);
    }
  }

  focus() {
    this._textInputRef.focus();
  }

  blur() {
    this._textInputRef.blur();
  }

  measure(fnCallback) {
    this._textInputRef.measure(fnCallback);
  }

  _setTextInputRef(ref) {
    this._textInputRef = ref;
  }

  _onFocus(event) {
    this.setState({
      isFocus : true
    });
    
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  _onBlur(event) {
    this.setState({
      isFocus : false
    });
    if (this.props.onFocus) {
        this.props.onFocus(event);
      }
  }

  _onValidation(text) {
    if (!text) {
      text = '';
    }
    var isValid = true;
    var errorMessage = '';
    if (this.props.isRequired && this.props.isRequired === true) {
      if (text.length <= 0) {
        isValid = false;
        errorMessage = (!!this.props.errorMessages && !!this.props.errorMessages.required) ? this.props.errorMessages.required : 'Required';
      }
    }

    if (this.props.minLength && this.props.minLength > 0) {
      if (text.length < this.props.minLength) {
        isValid = false;
        errorMessage = (!!this.props.errorMessages && !!this.props.errorMessages.minLength) ? this.props.errorMessages.minLength : '';
      }
    }

    if (this.props.dataType) {
      if (this.props.dataType === 'email') {
        var emailRegExp = new RegExp(/^\w+@[a-zA-Z\-0-9]+?\.[a-zA-Z]{2,3}$/i);
        if (!emailRegExp.test(text)) {
          isValid = false;
          errorMessage = (!!this.props.errorMessages && !!this.props.errorMessages.email) ? this.props.errorMessages.email : 'Please check email is entered correctly.';
        }
      }
    }

    if (this.props.regExp) {
      var regExp = new RegExp(this.props.regExp);
      if (regExp.test(text)) {
        isValid = false;
      }
    }

    if (this.props.onValidation) {
      if(this.props.onValidation(text) !== true) {
        isValid = false;
      }
    }

    this.setState({isValid:isValid, errorMessage: errorMessage, isFirst: false});
  }

  _onChangeText(text) {
    this._value = text;
    this.setState({isFirst: false});
    if (false !== this.props.needValidation && false != this.props.alwaysValidation) {
      this.runValidation();
    }
    if (this.props.onChangeText) {
      this.props.onChangeText(text);
    }
  }

  runValidation() {
    this._onValidation(this._value);
  }
}
const styles = StyleSheet.create({

  containerDefault: {
    flexShrink: 1,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#e6e6e6',
  },

  container : {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  nospace: {
    borderWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth:0,
    padding: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingRight:0,
    paddingBottom: 0,
    paddingLeft: 0,
    margin: 0,
    marginVertical: 0,
    marginHorizontal: 0,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
  },

  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexGrow: 1
  },

  input : {
    flex: 1,
    alignItems: 'center',
  },

  inputDefault: {
    fontSize: 15,
    fontFamily: 'SF UI Text',
  },

  prefixIcon: {
    width:13,
    justifyContent:'center',
    alignItems:'center',
    marginRight: 13,
  },

  errorMessage: {
    color: '#EF4345',
    fontSize: 11,
    paddingTop: 10,
  }
});

export default ClqsixTextInput;



        