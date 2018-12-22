import React, { PureComponent } from 'react';
import {StyleSheet, View, Text, Image, TextInput, AsyncStorage, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import { connect } from 'react-redux';

class Home extends PureComponent{

  constructor(props){
    super(props);
    this.attemptLogout = this.attemptLogout.bind(this);
    this.state = {


    };
  }

  attemptLogout(){
    this.props.authLogout();
  }

  render(){
    return(
      <View style = {styles.container}>
        <View style = {styles.welcome}>
          <Text style = {styles.welcomeText}>¿Qué desea hacer?</Text>
          <View style = {styles.containerActions}>
            <Button mode = 'contained' icon = 'add' style = {styles.cardButton} onPress = {() => this.props.navigation.navigate('owner')}>
              <Text>Ingresar producto</Text>
            </Button>
            <Button mode = 'contained' icon = {require('../../assets/codqr.png')} style = {styles.cardButton}>
              <Text>Escanear código</Text>
            </Button>
            <Button mode = 'contained' icon = {require('../../assets/codqr.png')} style = {styles.cardButton2} onPress = {this.attemptLogout}>
              <Text>Cerrar sesión</Text>
            </Button>
          </View>
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
