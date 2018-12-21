import React, { PureComponent } from 'react';
import {StyleSheet, View, Text, Button, ImageBackground, TextInput, AsyncStorage} from 'react-native';
import {createStackNavigato, createAppContainer} from 'react-navigation';
import { connect } from 'react-redux'

class Login extends PureComponent{

  constructor(props){
    super(props);
    this.attemptLogin = this.attemptLogin.bind(this);
  }

  state = {
    username:'',
    password:'',
    token: '',
  }

  attemptLogin(){
    var token = "432rfsd343sfsq423s";
    this.props.authSucess(token);
  }

  render(){
    return(
      <ImageBackground source = {require('../../assets/background.png')} style = {styles.mybackground}>
        <View style = {styles.container}>
          <TextInput placeholder = 'Nombre de usuario' value = {this.state.username} onChangeText = {username => this.setState({username})} style = {styles.inputText}/>
          <TextInput placeholder = 'Contraseña' value = {this.state.password} onChangeText = {password => this.setState({password})} style = {styles.inputText} secureTextEntry = {true}/>
          <Button onPress = {this.attemptLogin} title = "Ingresar" style = {styles.button} />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  mybackground: {
   flex:1,
   position: 'absolute',
   width: '100%',
   height: '100%',
   justifyContent: 'center',
   resizeMode: 'cover'
 },
 container:{
   marginTop: 170,
   justifyContent: 'center',
   alignItems: 'center',
 },
 inputText:{
   backgroundColor: 'rgba(169,184,189,0.7)',
   borderBottomColor: 'transparent',
   borderTopLeftRadius: 30,
   borderTopRightRadius: 30,
   borderRadius: 30,
   textAlign: 'center',
   justifyContent: 'center',
   alignItems: 'center',
   width: '85%',
   height: '18%',
   marginTop:10,
   marginBottom: 20,
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
    authSucess:(token)=>{
      AsyncStorage.multiSet([['token',token],['authenticated','1']]);
      dispatch(actionCreator('LOGIN_SUCCESS'))
    }
  }
}

export const authStateReducer = (state={app_started:false, authenticated:false},{type,payload})=>{
  switch(type){
    case 'LOGIN_SUCCESS':
    return {...state, authenticated:true}
    case 'LOGOUT':
    return {...state, authenticated:false}
    case 'APP_LOADED':
    return {...state, app_started:true}
    default:
    return state
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
