import React, { PureComponent } from 'react';
import {StyleSheet, View, Text, Image, TextInput, AsyncStorage, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import { connect } from 'react-redux';

class Home extends PureComponent{

  constructor(props){
    super(props);
    this.attemptLogout = this.attemptLogout.bind(this);
    this.renderActions = this.renderActions.bind(this);
    this.state = {
      typeuser:4
    };
  }

  attemptLogout(){
    this.props.authLogout();
  }

  renderActionsForTransportis(){
    return(
      <View style = {styles.containerActions}>
        <Button mode = 'contained' icon = 'add' style = {styles.cardButton} onPress = {() => this.props.navigation.navigate('owner')}>
          <Text>Ingresar producto</Text>
        </Button>
        <Button mode = 'contained' icon = {require('../../assets/codqr.png')} style = {styles.cardButton} onPress = {() => this.props.navigation.navigate('qrScanner')}>
          <Text>Escanear código</Text>
        </Button>
        <Button mode = 'contained' icon = 'exit-to-app' style = {styles.cardButton2} onPress = {this.attemptLogout}>
          <Text>Cerrar sesión</Text>
        </Button>
      </View>
    )
  }

  renderActionsForOperatorCA(){
    return(
      <View style = {styles.containerActions}>
        <Button mode = 'contained' icon = 'add' style = {styles.cardButton} onPress = {() => this.props.navigation.navigate('owner')}>
          <Text>Ingresar producto</Text>
        </Button>
        <Button mode = 'contained' icon = 'input' style = {styles.cardButton} onPress = {() => this.props.navigation.navigate('qrScanner',{
            receivingResidue:true
          })}>
          <Text>Recibir producto</Text>
        </Button>
        <Button mode = 'contained' icon = {require('../../assets/codqr.png')} style = {styles.cardButton} onPress = {() => this.props.navigation.navigate('qrScanner')}>
          <Text>Escanear código</Text>
        </Button>
        <Button mode = 'contained' icon = 'exit-to-app' style = {styles.cardButton2} onPress = {this.attemptLogout}>
          <Text>Cerrar sesión</Text>
        </Button>
      </View>
    )
  }

  renderActionsForTransportisRP(){
    return(
      <View style = {styles.containerActions}>
        <Button mode = 'contained' icon = 'input' style = {styles.cardButton} onPress = {() => this.props.navigation.navigate('qrScanner',{
            receivingResidue:true
          })}>
          <Text>Recibir producto</Text>
        </Button>
        <Button mode = 'contained' icon = {require('../../assets/codqr.png')} style = {styles.cardButton} onPress = {() => this.props.navigation.navigate('qrScanner')}>
          <Text>Escanear código</Text>
        </Button>
        <Button mode = 'contained' icon = 'exit-to-app' style = {styles.cardButton2} onPress = {this.attemptLogout}>
          <Text>Cerrar sesión</Text>
        </Button>
      </View>
    )
  }

  renderActionsForOPR(){
    return(
      <View style = {styles.containerActions}>
        <Button mode = 'contained' icon = 'input' style = {styles.cardButton} onPress = {() => this.props.navigation.navigate('qrScanner',{
            receivingResidue:true
          })}>
          <Text>Recibir producto</Text>
        </Button>
        <Button mode = 'contained' icon = {require('../../assets/codqr.png')} style = {styles.cardButton} onPress = {() => this.props.navigation.navigate('qrScanner')}>
          <Text>Escanear código</Text>
        </Button>
        <Button mode = 'contained' icon = 'extension' style = {styles.cardButton} onPress = {() => this.props.navigation.navigate('qrScanner')}>
          <Text>Agregar material</Text>
        </Button>
        <Button mode = 'contained' icon = 'exit-to-app' style = {styles.cardButton2} onPress = {this.attemptLogout}>
          <Text>Cerrar sesión</Text>
        </Button>
      </View>
    )
  }

  renderActions = () => {
    console.log(this.state.typeuser)
    switch(this.state.typeuser){
      case 1:
        this.renderActionsForTransportis()
        break
      case 2:
        this.renderActionsForOperatorCA()
        break
      case 3:
        this.renderActionsForTransportisRP()
        break
      case 4:
        this.renderActionsForOPR()
        break
    }
  }

  render(){
    return(
      <View style = {styles.container}>
        <View style = {styles.welcome}>
          <Text style = {styles.welcomeText}>¿Qué desea hacer?</Text>
            {
              this.state.typeuser === 1 ? this.renderActionsForTransportis() : this.state.typeuser === 2 ? this.renderActionsForOperatorCA() : this.state.typeuser == 3 ? this.renderActionsForTransportisRP() : this.renderActionsForOPR()
            }
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#eeeeee',
    height: '100%',
    flex:1
  },
  welcome:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  welcomeText:{
    fontSize: 22,
    color:'#757575'
  },
  containerActions:{
    marginTop: 30,

  },
 cardButton:{
   borderTopLeftRadius: 10,
   borderTopRightRadius: 10,
   borderRadius: 10,
   elevation: 4,
   marginTop: 5,
   marginBottom: 10,
   backgroundColor: '#642A4E',
   width: 220,
   height:50,
   justifyContent: 'center',
   alignItems: 'center'
 },
 cardButton2:{
   borderTopLeftRadius: 10,
   borderTopRightRadius: 10,
   borderRadius: 10,
   elevation: 4,
   marginTop: 5,
   marginBottom: 10,
   backgroundColor: '#3b3a3a',
   width: 220,
   height:50,
   justifyContent: 'center',
   alignItems: 'center'
 },
 textAdd:{
   color: '#fff',
   fontSize: 16,
 },
 button:{
   justifyContent: 'center',
   alignItems: 'center',
   borderStyle:'solid',
   borderTopLeftRadius: 30,
   borderTopRightRadius: 30,
   borderRadius: 30,
   width: '85%',
   height: '18%',
   backgroundColor: '#009688'
 }
 });

const mapStateToProps = (state, ownProps) => {
  return {}
}

export const actionCreator = (type, payload = null)=>({type,payload})

const mapDispatchToProps = (dispatch, ownProps) => {
  return{
    authLogout:()=>{
      AsyncStorage.multiRemove(['token','authenticated']);
      dispatch(actionCreator('LOGOUT'))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
