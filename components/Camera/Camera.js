import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import {Camera, Permissions, FileSystem, MediaLibrary} from 'expo';
import {Button} from 'react-native-paper';
import CameraResult from '../Camera/CameraResult.js';
import {createStackNavigato, createAppContainer} from 'react-navigation';

export default class CameraView extends Component{
static navigationOptions = {header:null};

  state = {
    hasCameraPermission: null,
    hasCameraRollGranted:null,
    type: Camera.Constants.Type.back,
    autoFocus: 'on',
    flash: 'off',
    newPhotos: false,
    ratio:'16:9',
    photo:null,
    modaVisible: false
  };

  snap = () => {
    console.log("sadasdasd")
    if(this.camera){
      this.camera.takePictureAsync({quality:1.0,skipProcessing:true,onPictureSaved:this.onPictureSaved});
    }
  }

  confirmPicture = () =>{
    console.log("Foto confirmada..guardando dir")
    //variable redux en donde se guarda la Foto
    console.log(this.state.photo.uri)
    this.props.navigation.push('product',{photo:this.state.photo.uri});
  }

  deletePicture = () => {
    console.log("Foto descartada")
    this.setState({photo:null})
  }

  onPictureSaved = async photo => {
    const asset = await MediaLibrary.createAssetAsync(photo.uri);
    MediaLibrary.createAlbumAsync('Ecopuntos',asset)
    .then(() => {console.log("creado")})
    .catch(err => {console.log('err'),err})
    this.setState({newPhotos:true, photo:photo});

  }

  renderBottomBarCamera(){
    return(
    <View style = {styles.bottomBarCamera}>
      <TouchableOpacity style={{alignSelf: 'center'}} onPress={this.snap}>
        <Image source = {require('../../assets/camera.png')} style= {styles.bottomButton}/>
      </TouchableOpacity>
    </View>
  )
  }

  renderBottomCameraResult(){
    return(
      <View style = {styles.bottomBarCameraResult}>
        <TouchableOpacity onPress = {this.confirmPicture} style = {{marginRight:10}}>
          <Image source = {require('../../assets/check.png')} style = {styles.bottomButton} />
        </TouchableOpacity>
        <TouchableOpacity onPress = {this.deletePicture}>
          <Image source = {require('../../assets/delete2.png')} style = {styles.bottomButton} />
        </TouchableOpacity>
      </View>
    )
  }

  renderPhoto2(){
    return(
      <View>
        <Image source = {{uri:this.state.photo.uri}} style = {{height:'100%',width:null,resizeMode:'cover'}}/>
        {this.renderBottomCameraResult()}
      </View>
    );
  }

  renderCamera(){
    return(
        <Camera style={{ flex: 1 }} ref={ref => {this.camera = ref;}} autoFocus = {this.state.autoFocus} flashMode = {this.state.flash}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly'
          }}>
          {this.renderBottomBarCamera()}
        </View>
      </Camera>
    )
  }

   async componentWillMount(){
     const{status} = await Permissions.askAsync(Permissions.CAMERA);
     const {status2} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
     this.setState({hasCameraPermission: status === 'granted'});
   }

   render() {
     const { hasCameraPermission } = this.state;
     if (hasCameraPermission === null) {
       return <View />;
     } else if (hasCameraPermission === false) {
       return <Text>No access to camera</Text>;
     } else {
       return (
          <View style={{ flex: 1 }}>
           {this.state.photo ? this.renderPhoto2() : this.renderCamera()}
         </View>
       );
     }
   }
 }


const styles = StyleSheet.create({
  bottomBarCamera:{
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    flex:0.1,
    flexDirection: 'row'
  },
  bottomBarCameraResult:{
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom:0,
    alignSelf: 'center',
    flex:0.12,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  bottomButton:{
    width: 32,
    height: 32,
    marginBottom: 20
  }
})
