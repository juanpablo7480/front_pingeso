import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import {Camera, Permissions, FileSystem, MediaLibrary} from 'expo';
import {Button} from 'react-native-paper';


export default class CameraResult extends Component{
  static navigationOptions = {header:null};
  state = {
    uri: this.props.uri
  }

  render() {

      return (

            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image source = {{uri:this.state.uri}} style = {{flex:1,height:'100%',width:null,resizeMode:'stretch'}}/>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                }}
                onPress={this.snap}>
                <Image source = {require('../../assets/check.png')} style= {{width: 48,height: 48, marginBottom: 20}}/>
              </TouchableOpacity>
            </View>
      );
    }

}
