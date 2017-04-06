import Drawer from 'react-native-drawer'
import MainTabBar from './MainTabBar'
import React, { Component } from 'react';
import ControlPanel from './ControlPanel'
import Button from 'react-native-button'
import FitImage from 'react-native-fit-image';

import {
  StyleSheet,
  Text,
  View,Navigator,TouchableHighlight,
  Image,AlertIOS,NavigatorIOS,StatusBar,
  TextInput,Alert,AsyncStorage
} from 'react-native';

class MyDrawer extends Component {
  closeControlPanel = () => {
    this._drawer.close()
  };
  openControlPanel = () => {
    this._drawer.open()
  };
  openMyControlPanel(){
    this._drawer.open()
  }
  renderScene(route, navigator) {
  console.log(route);
  if(route.name == 'example') {
    return <Example navigator={navigator} />
  }
  if(route.name == 'MainTabBar') {
    return <MainTabBar navigator={navigator}   openDrawer = {this.openControlPanel.bind(this)} />
  }
  if(route.name == 'login') {
    return <Login navigator={navigator} />
  }
  if(route.name == 'Home') {
   return <Home navigator={navigator} />
  }
  if(route.name == 'MyDrawer') {
    return <MyDrawer navigator={navigator} />
  //  return <Update navigator={navigator} {...route.passProps} />
  }
  if(route.name == 'MyDrawerabc') {
    return <Offers navigator={navigator} />
  //  return <Update navigator={navigator} {...route.passProps} />
  }


}


  render () {
    return (
      <Drawer
        type="displace"
        tapToClose={true}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
        ref={(ref) => this._drawer = ref}
        content={<ControlPanel />}
        >
        

        <Navigator
            initialRoute={{name: 'MainTabBar'}}
            style={{flex: 1}}
            renderScene={this.renderScene.bind(this)}
            navigationBar={
               <Navigator.NavigationBar
                 style={ styles.nav }
                 routeMapper={{
                   LeftButton: (route, navigator, index, navState) =>
            { return (
              <TouchableHighlight onPress={this.openControlPanel} underlayColor="white">
              <FitImage
              resizeMode="contain"
              source={require('./Img/zommo.png')}
              originalWidth={40}
              originalHeight={40}
              style={styles.leftNavButtonText}
              />

                  </TouchableHighlight>
            ); },
                 RightButton(route, navigator, index, navState) {
                   if (route.onPress) return ( <TouchableHighlight
                                               onPress={ () => this.openControlPanel }>
                                               <Text style={ styles.rightNavButtonText }>
                                                   { 'Right Button' }
                                               </Text>
                                             </TouchableHighlight> )
                 },
                 Title(route, navigator, index, navState) {
                   return <Text style={ styles.title }>MY APP TITLE</Text>
                 }
                 }} />}
          />
      </Drawer>
    )
  }

}

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3,backgroundColor:'red'},
  main: {paddingLeft: 3},
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  ForgotPassword: {
    height: 40,
    marginRight: 20,
    marginBottom: 10,
    position: 'absolute',
    bottom:0,
    left:0,
    backgroundColor: "white",
    },
    NewAccount: {
      height: 40,
      marginLeft: 20,
      marginBottom: 10,
      position: 'absolute',
      bottom:0,
      right:0,
        backgroundColor: "white",
      },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  Btncontainer: {
    height: 40,
    width: 120,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
      backgroundColor: "#00415D",
    },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },nav: {
    	height: 60,
      backgroundColor: '#efefef'
    },leftNavButtonText: {
      marginLeft:13,
      marginTop:2,
      width:40,
      height:40,
    },
    fitImage: {
      width: 40,
      height: 40,

    },
    rightNavButtonText: {
      marginRight:13,
      marginTop:2
    },title: {
    	marginTop:4,
      fontSize:16
    },
});
export default MyDrawer
