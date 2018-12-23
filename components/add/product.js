import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Picker, Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import {Camera, Permissions, FileSystem, MediaLibrary} from 'expo';
import CameraView from '../Camera/Camera';

export default class product extends Component{



  constructor(props){
    super(props);
    this.getTypeDescRaee = this.getTypeDescRaee.bind(this)
    this.getResiduos = this.getResiduos.bind(this)
    this.getValues = this.getValues.bind(this)
    state = {
      photo:null
    }

  }

  state = {
    raee: '',
    marca: '',
    modelo: '',
    photo: null,
    raees: [
      {id: 0, name: 'Refrigerador', types: [{id_type:0, name: 'frigobar', value: "FRIG"},
      {id_type: 1, name: '1 puerta', value:'1PRT'},
      {id_type: 2, name: '2 puertas', value: '2PRT'},
      {id_type: 3, name: 'side by side', value: 'SBYS'}], value:'REF' },
      {id: 1, name: 'lavadora/secadora', types: [{id_type: 0, name: 'hasta 5 Kg', value: 'H5KG'},
      {id_type: 1, name: 'hasta 12 Kg', value:'H12Kg'},
      {id_type: 2, name: 'Mas de 12 Kg', value:'M12Kg'}], value:'LAV' },
      {id: 2, name: 'Cocina', types: [{id_type: 0, name: 'hasta 2 platos', value:'H2PL'},
      {id_type: 1, name: 'hasta 4 platos', value:'H4PL'},
      {id_type: 2, name: 'Mas de 4 platos', value:'M4PL'}], value: 'COC'},
      {id: 3, name: 'Aire acondicionado', types: [{id_type: 0, name: 'Portátil', value:'PORT'},
      {id_type: 1, name: 'Split muro cielo', value:'SPMC'},
      {id_type: 2, name: 'Ventana', value:'VENT'}], value: 'AIR'},
      {id: 4, name: 'Radiador', types: [{id_type: 0, name: 'Estandar', value:'ESTN'}], value: 'RAD'},
      {id: 5, name: 'Maquina expendedora', types: [{id_type: 0, name: '1 m3', value:'1MCU'},
      {id_type: 1, name: '2 m3', value:'2MCU'},
      {id_type: 2, name: '3 m3', value:'3MCU'},
      {id_type: 3, name: '4 m3', value:'4MCU'}], value: 'MAQ'}
    ],
    types_raee: [{id_type:0,name:'',value:'aux'}]
    }

  getResiduos(i){
    this.setState({types_raee: this.state.raees[i].types});
  }

  getTypeDescRaee(i){
    if(i == 0)
      this.setState({type_desc_raee: this.state.types_raee[0].value});
    else
      this.setState({type_desc_raee: this.state.types_raee[i-1].value});
  }

  renderResult(){
    return(
      <TouchableOpacity style = {styles.framePhoto}>
      {this.state.photo ? <Image source = {{isStatic:true,uri:this.props.navigation.getParam('photo',null)}} style = {{width:'100%',height:180}}/>
        :
        <Text style = {styles.textPhotoResult}>No hay foto que mostrar</Text>
      }
    </TouchableOpacity>
    )
  }

  getValues(){
    console.log(this.props.navigation.getParam('rut',''))
    console.log(this.props.navigation.getParam('ownerName'),'')
    console.log(this.props.navigation.getParam('address',''))
    console.log(this.props.navigation.getParam('rut',''))
    console.log(this.state.raee)
    console.log(this.state.marca)
    console.log(this.state.modelo)
    console.log(this.props.navigation.getParam('photo',null))
  }



  componentWillMount(){
    this.setState({photo:this.props.navigation.state.params})
  }

  render(){
    return(
      <View style = {styles.container}>
        <View style = {styles.containerForm}>
          <TextInput label='Marca' value = {this.state.marca} onChangeText = {marca => this.setState({marca})} underlineColor = "#642a4e" style = {{backgroundColor:'#ffffff',marginBottom: 5}} />
          <Picker
            selectedValue={this.state.raee}
            onValueChange={(itemValue, itemIndex) => {this.setState({raee:itemValue}),this.getResiduos(itemIndex-1)}}>
            <Picker.Item label = "Seleccione residuo" value ='' />
              {this.state.raees.map((i, index) => (
                <Picker.Item key = {index} label = {i.name} value = {i.name}/>
              ))}
            </Picker>
            <Picker
              selectedValue = {this.state.type_raee}
              onValueChange = {(itemValue, itemIndex) => {this.setState({type_raee: itemValue}), this.getTypeDescRaee(itemIndex)}}>
              <Picker.Item label = "Seleccione el tipo de residuo" value = '' />
              {this.state.types_raee.map((i, index) => (
                <Picker.Item key = {index} label = {i.name} value = {i.name} />
              ))}
            </Picker>
          </View>
          <View style = {styles.buttonPic}>
            <Button icon = 'add-a-photo' mode = 'text' color = "#642a4e" onPress = {() => this.props.navigation.navigate('CameraView')}>Toma una foto</Button>
          </View>
          <View style = {styles.photoResult}>
            {this.renderResult()}
          </View>
          <View style = {styles.button}>
            <Button icon="check" mode = "contained" color = "#1e9cd8" onPress = {this.getValues} style = {{width:'75%'}}>Guardar</Button>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    height: '100%',
    backgroundColor: '#fff',

  },
  containerForm:{
    justifyContent:'center',
    paddingTop:20,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 15
  },
  textProduct:{
    color:'#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textPhotoResult:{
    color:'#3b3a3a',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 55
  },
  button:{
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    width: '100%'
  },
  photoResult:{
    justifyContent: 'center',
    flex:1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  framePhoto:{
    elevation: 2,
    width: '75%',
    height: 180,
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop:5
  }
})
