import React, {PureComponent} from 'react';
import { AsyncStorage, Text, View, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux'
import AppNavigation from './components/shared/navigation.js'
import {actionCreator}from './components/login/login';

class AppRoot extends PureComponent{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.checkLogin();
  }

  render(){
    const {app_started,authenticated} = this.props.authState
    return app_started ? this._renderAppRoot(authenticated) : this._renderSplash(app_started);

  }

  _renderAppRoot(authenticated){
    const CreateRoot = AppNavigation(authenticated)
    return <CreateRoot/>
  }

  _renderSplash(){
    return (
      <View style = {{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size = "large" />
        <Text children = "cargando..." />
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    async checkLogin(){
      const isLoggin = await AsyncStorage.getItem('authenticated').catch(e=>console.log(e))
      if(isLoggin)
        dispatch(actionCreator('LOGIN_SUCCESS'))
      dispatch(actionCreator('APP_LOADED'))
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    authState: state.authState
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot)
