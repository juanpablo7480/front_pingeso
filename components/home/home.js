import React, { PureComponent } from 'react';
import {StyleSheet, View, Text, Button, ImageBackground, TextInput, AsyncStorage} from 'react-native';
import { connect } from 'react-redux'

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
      <ImageBackground source = {require('../../assets/background.png')} style = {styles.mybackground}>
        <View>
          <Text>Bienvenido</Text>
          <Button style = {styles.button} onPress = {this.attemptLogout} title = "Salir" />
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
    authLogout:()=>{
      AsyncStorage.multiRemove(['token','authenticated']);
      dispatch(actionCreator('LOGOUT'))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
