import React, {Component} from 'react';
import {Button} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from '../login/login';
import Home from '../home/home';
import Owner from '../add/owner.js';
import Product from '../add/product.js';
import CamaraView from '../Camera/Camera';

export default AppNavigation = (authenticated) => createStackNavigator({
  login:{
    getScreen:()=>Login,
    navigationOptions:{
      title:'Login'
    }
  },
  home:{
    getScreen:()=>Home,
    navigationOptions:{
      title:'Home',
      headerTintColor:'#fff',
      headerStyle:{
        backgroundColor: '#330e25',
        height: 70

      }
    }
  },
  owner:{
    getScreen:()=>Owner,
    navigationOptions:{
      title:'Ingrese dueño',
      headerTintColor:'#fff',
      headerStyle:{
        backgroundColor: '#330e25',
        height: 70
      }
    }
  },
  product:{
    getScreen:()=>Product,
    navigationOptions:{
      title:'Ingrese residuo',
      headerTintColor:'#fff',
      headerStyle:{
        backgroundColor: '#330e25',
        height: 70
      }
    }
  },
  CameraView:{
    getScreen:()=>CamaraView
  }


},{
  initialRouteName:authenticated?'home':'login'
})
