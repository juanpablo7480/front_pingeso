import React, {Component} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import {Button} from 'react-native-paper'
import { BarCodeScanner, Permissions } from 'expo'

export default class qrScanner extends Component{

//static navigationOptions = {header:null};
  constructor(props){
    super(props);
  }

  state = {
    hasCameraPermission: null,
    hasResidue: false,
    photo: '../../assets/example.jpg',
    model: '2 puertas',
    brand: 'LG',
    raee:'Refrigerador',
    progress:'En camino a centro de acopio',
    code:'SDADA21321DSFD'
  }

  async componentWillMount(){
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'})
  }

  //funcion que hace get del residuo y obtiene a traves del codigo
  //unico leido los datos del residuo
  _handleBarCodeRead = ({type,data}) =>{
    alert('Bar code with type ${type} and data ${data} has been scanned')
    this.setState({hasResidue:true})
  }

  renderResult(){
    return(
      <View style = {styles.container}>
        <View style = {styles.photoResult}>
          <TouchableOpacity style = {styles.framePhoto} >
            <Image source = {require('../../assets/example.jpg')} style = {{width:'100%',height:'100%', resizeMode:'contain'}} />
          </TouchableOpacity>
        </View>
        <View style = {styles.dataResidue} >
          <Text>RAEE: {this.state.raee}</Text>
          <Text>Marca: {this.state.brand}</Text>
          <Text>Tipo: {this.state.model}</Text>
          <Text>Código: {this.state.code}</Text>
          <Text>Estado: {this.state.progress}</Text>
        </View>
        <View style = {styles.button} >
          <Button icon = 'repeat' mode = 'contained' color = '#3b3a3a' onPress = {() => {this.setState({hasResidue:false})}}>Repetir</Button>
        </View>
      </View>
    )
  }

  renderBarCodeScanner(){
    return(
      <BarCodeScanner
        onBarCodeRead = {this._handleBarCodeRead}
        style = {StyleSheet.absoluteFill}
      />
    )
  }

  render(){
    const{hasCameraPermission} = this.state;
    if(hasCameraPermission === null)
      return <Text>Requesting for camera permission</Text>
    else if(hasCameraPermission === false)
      return <Text> Permission denied </Text>
    else{
      return(
        <View style = {{flex:1}}>
          {this.state.hasResidue ? this.renderResult() : this.renderBarCodeScanner()}
        </View>
      )
    }
  }
}


const styles =  StyleSheet.create({
  container:{
    height: '100%',
    backgroundColor: '#fff'
  },
  photoResult:{
    justifyContent: 'center',
    flex:1,
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'stretch',
  },
  framePhoto:{
    elevation: 2,
    width: '75%',
    height: 300,
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginBottom: 0
  },
  dataResidue: {
    justifyContent:'center',
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 15,
    marginBottom: 10
  },
  button:{
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    width: '100%'
  }

})
