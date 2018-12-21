import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from '../login/login';
import Home from '../home/home';

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
      title:'Home'
    }
  }

},{
  initialRouteName:authenticated?'home':'login'
})
