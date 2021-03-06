import React, { Component } from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { Button, TextInput, Dialog, Paragraph, Portal } from 'react-native-paper';
import {Camera,Constants, Location, Permissions} from 'expo';
import Spinner from 'react-native-loading-spinner-overlay';

export default class owner extends Component{
  constructor(props){
    super(props);
    this.getResiduos = this.getResiduos.bind(this);

    this.getTypeDescRaee = this.getTypeDescRaee.bind(this);
    this.helperRut = this.helperRut.bind(this);
    this.validRut = this.validRut.bind(this);
    this.addOwnerData = this.addOwnerData.bind(this);
  }
    state = {
      location:null,
      is_valid_rut: false,
      rut:'',
      address: '',
      region: '',
      type_desc_raee: '',
      ownerName: "",
      marca: "",
    //raees:[{id:'',name:''}] para array de json para cargar desde bd para que no sea estatico
    //types:[{id:'',name:''}] para array de json para cargar desde bd para que no sea estatico
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

    componentWillMount(){
      this._getLocationAsync();
    }

    _showDialog = () => this.setState({visible: true});
    _hideDialog = () => this.setState({visible: false});

    _getLocationAsync = async() => {
      let {status} = await Permissions.askAsync(Permissions.LOCATION);
      if(status !== 'granted'){
        this.setState({errorMessage: 'Permiso denegado'});
      }
      let location = await Location.getCurrentPositionAsync({});
      this.setState({location});
    };

    getResiduos(i){
      this.setState({types_raee: this.state.raees[i].types});
    }

    getTypeDescRaee(i){
      if(i == 0)
        this.setState({type_desc_raee: this.state.types_raee[0].value});
      else
        this.setState({type_desc_raee: this.state.types_raee[i-1].value});
    }

    helperRut(){
      var cont = 0
      for(var i = 0; i < this.state.rut.length; i++){
        if( cont == 2 ){
          this.setState({rut: this.state.rut + '.'});
          cont = 0;
        }
        cont+=1;
      }
    }
    validRut(){
      var aux_rut = this.state.rut;
      var amount = 0;
      var helper = 2;
      for(var i = aux_rut.length-3; i > -1; i--){
        amount+= parseInt(aux_rut[i],10)*helper;
        helper++;
        if(helper == 8) helper = 2
      }
      var res_module = 11- (amount % 11);
      if(res_module == 11 && aux_rut[aux_rut.length-1] == '0' || res_module == parseInt(aux_rut[aux_rut.length-1],10) || res_module == 10 && aux_rut[aux_rut.length-1] == 'k')
        return true;
      else
        return false;
    }

  addOwnerData(){
    if(this.state.rut !== '' || this.state.address !== '' || this.region !== '0' || this.state.ownerName !== ''){
      if(!this.validRut()){
        this.setState({is_valid_rut:true})
      }
      else{
        this.props.navigation.navigate('product',{
          rut:this.state.rut,
          ownerName: this.state.ownerName,
          address:this.state.address,
          region:this.state.region,
          photo:null
        })
      }
    }
    else
      alert("Debe llenar todos los campos");
  }

  render(){
      return(
        <View style={styles.container}>
          <View style = {styles.containerForm}>
            <TextInput label='RUT propietario' value = {this.state.rut} onChangeText = {rut => this.setState({rut})} underlineColor = "#642a4e" style = {{backgroundColor:'#ffffff',marginBottom: 5}} error = {this.state.is_valid_rut}/>
            <TextInput label='Nombre propietario' value = {this.state.ownerName} onChangeText = {ownerName => this.setState({ownerName})} underlineColor = "#642a4e" style = {{backgroundColor:'#ffffff',marginBottom: 5}}/>
            <TextInput label='Dirección' value = {this.state.address} onChangeText = {address => this.setState({address})} underlineColor = "#642a4e" style = {{backgroundColor:'#ffffff',marginBottom: 5}}/>
            <Picker
              selectedValue={this.state.region}
              onValueChange={(itemValue, itemIndex) => this.setState({region: itemValue})} style = {{marginTop: 10}}>
              <Picker.Item label="Seleccione región" value ="0" />
              <Picker.Item label="Región Metropolitana" value="Santiago" />
              <Picker.Item label="Valparaíso" value="Valparaíso" />
            </Picker>
          </View>
          <View style = {styles.button}>
            <Button icon='arrow-forward' mode = "contained" color = "#1e9cd8" style = {{width:'75%'}}
              onPress = {this.addOwnerData}>Siguiente</Button>
          </View>
        </View>
      );
    }
  }


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: '100%'
  },
  containerForm:{
    justifyContent:'center',
    paddingTop:20,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 5
  },
  button:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  spinnerTextStyle: {
    color: '#009688'
  }
});
