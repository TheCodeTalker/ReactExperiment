/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import Button from 'react-native-button'
import Login from './login';
//import Home form './Home';
import Home from './Home';
import MainTabBar from './MainTabBar'
import Example from './popUp'
import Offers from './Offers'
import MyDrawer from './MyDrawer'
import {
  AppRegistry,
  StyleSheet,
  Text, NavigatorIOS,
  View,Navigator,
  Image,AlertIOS,TouchableHighlight,
  TextInput,Alert
} from 'react-native';

class LoginPage extends Component {
  constructor(props) {
    super(props)
  }
//   renderScene(route, navigator) {
//   console.log(route);
//   if(route.name == 'example') {
//     return <Example navigator={navigator} />
//   }
//   if(route.name == 'MainTabBar') {
//     return <MainTabBar navigator={navigator} />
//   }
//   if(route.name == 'login') {
//     return <Login navigator={navigator} />
//   }
//   if(route.name == 'Home') {
//    return <Home navigator={navigator} />
//   }
//   if(route.name == 'MyDrawer') {
//     return <MyDrawer navigator={navigator} />
//   //  return <Update navigator={navigator} {...route.passProps} />
//   }
//   if(route.name == 'MyDrawerabc') {
//     return <Offers navigator={navigator} />
//   //  return <Update navigator={navigator} {...route.passProps} />
//   }
//
//
// }

  render() {
    return (

      <Login/>
      // <Navigator
      //     initialRoute={{name: 'login'}}
      //     style={{flex: 1}}
      //     renderScene={this.renderScene.bind(this)}
      //     navigationBar={
      //        <Navigator.NavigationBar
      //          style={ styles.nav }
      //          routeMapper={NavigationBarRouteMapper} />}
      //   />


    );
  }

}

var styles = StyleSheet.create({
nav: {
  	height: 60,
    backgroundColor: '#efefef'
  },leftNavButtonText: {
    marginLeft:13,
    marginTop:2,
    width:20,
    height:20,
  },
  rightNavButtonText: {
    marginRight:13,
    marginTop:2
  },title: {
  	marginTop:4,
    fontSize:16
  }
});
// var stylesLunch = StyleSheet.create({
//     // container: {
//     //     flex: 1,
//     //     flexDirection: 'row',
//     //     justifyContent: 'center',
//     //     alignItems: 'center',
//     // }
// });
AppRegistry.registerComponent('LoginPage', () => LoginPage);
