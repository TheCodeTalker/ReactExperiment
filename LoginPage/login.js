'use strict';
import React, { Component,PropTypes } from 'react';
import Button from 'react-native-button'
import Home from './Home';

//import Home form './Home';
import MainTabBar from './MainTabBar'
import Example from './popUp'
import Offers from './Offers'
import MyDrawer from './MyDrawer'

import FloatLabelTextInput from 'react-native-floating-label-text-input';
const nativeImageSource = require('nativeImageSource');
import {
  StyleSheet,
  Text,
  View,Navigator,TouchableHighlight,
  Image,AlertIOS,NavigatorIOS,
  TextInput,Alert,AsyncStorage
} from 'react-native';
const onButtonPress = () => {
//  Alert.alert('Button has been pressed!');
};

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: 'amit.kmr.kr@gmail.com',
      password: '123456',
      error:'',
      isLogin:false,
    };
  }


    redirect(routeName){
    this.props.navigator.push({
      name: routeName,
      component: routeName,
    });
  }
  getPostsFromApi() {
    var userName = this.state.username;
    var password = this.state.password;
    fetch("http://www.zommodity.com/test/apis/index.php?action=login&username="+userName+"&password="+password)
      .then((response) => response.json())
     .catch((error) => console.warn("fetch error:", error))
     .then((responseJson) => {
       console.log(responseJson)
  //    let res =   response.json();
    //  if (responseJson.status >= 200 && responseJson.status < 300) {
          //Handle success
          let accessToken = responseJson;
          console.log(accessToken);

          if (responseJson.error.errCode == 0){
          //  try {
              console.log("sucess login1");
              this.setState({isLogin: true});
              //await AsyncStorage.setItem('@UserLogID',res.results.userid);
              console.log("sucess login");
          //   } catch (error) {
          // Alert.alert('userIDNotAbleStored')
          //   }


        //  this.redirect('MainTabBar');
        // this.props.navigator.push({
        //   name: 'MyDrawer',
        //   component: 'MyDrawer',
        //   leftButtonTitle: 'Custom Left',
        //       onLeftButtonPress: () => this.props.navigator.pop(),
        //       rightButtonIcon: nativeImageSource({
        //         ios: 'NavBarButtonPlus',
        //         width: 17,
        //         height: 17
        //       })
        // });
    //   this.redirect('MyDrawer');
          //this.redirect('example');
        }else{
          this.setState({isLogin: false});
          this.setState({error: error});
          Alert.alert('Login Failed')
        }

      // } else {
      //     //Handle error
      //     let error = responseJson;
      //     this.setState({isLogin: false});
      //     this.setState({error: error});
      //   //  throw error;
      // }
    //   }} catch(error) {
    //     this.setState({isLogin: false});
    //     this.setState({error: error});
    //     console.log("error " + error);
    //   //  this.setState({showProgress: false});
    // }

     })
  }
  async _userLogin() {
  // const { username, password } = this.state;
    var userName = this.state.username;
    var password = this.state.password;

  try {
    let response = await  fetch("http://www.zommodity.com/test/apis/index.php?action=login&username="+userName+"&password="+password, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      let res = await response.json();
      if (response.status >= 200 && response.status < 300) {
          //Handle success
          let accessToken = res;
          console.log(accessToken);

          if (res.error.errCode == 0){
            try {
              console.log("sucess login1");
              //await AsyncStorage.setItem('@UserLogID',res.results.userid);
              console.log("sucess login");
            } catch (error) {
          Alert.alert('userIDNotAbleStored')
            }

            this.setState({isLogin: true});
        //  this.redirect('MainTabBar');
        // this.props.navigator.push({
        //   name: 'MyDrawer',
        //   component: 'MyDrawer',
        //   leftButtonTitle: 'Custom Left',
        //       onLeftButtonPress: () => this.props.navigator.pop(),
        //       rightButtonIcon: nativeImageSource({
        //         ios: 'NavBarButtonPlus',
        //         width: 17,
        //         height: 17
        //       })
        // });
    //   this.redirect('MyDrawer');
          //this.redirect('example');
        }else{
          this.setState({isLogin: false});
          Alert.alert('Login Failed')
        }

      } else {
          //Handle error
          let error = res;
          throw error;
      }} catch(error) {
        this.setState({isLogin: false});
        this.setState({error: error});
        console.log("error " + error);
      //  this.setState({showProgress: false});
    }

  }
  render(){

      console.log(this.state.username, 'isLoggedIn')
      if (!this.state.isLogin) {
        return (
        <View style={styles.container}>
          <Image
          style={styles.logo1}
          //style={{marginTop: 10}}
             source={require('./Img/zommo.png')}
          />

          <TextInput
          placeholder="Enter UserName"
          autoCapitalize="none"
          style={{height: 40, borderColor: 'gray', borderWidth: 1,marginRight: 30,marginLeft: 30}}
          value={this.state.username}
          onChangeText={(text) => this.setState({username:text})}
          //value={this.state.text}
        />
        <TextInput
        placeholder="Enter Password"
        autoCapitalize="none"
        secureTextEntry={true}
        value={this.state.password}
        style={{height: 40, borderColor: 'gray', borderWidth: 1,marginRight: 30,marginLeft: 30,marginTop: 20}}
        onChangeText={(text) => this.setState({password:text})}
      />
      <View style={styles.Btncontainer}>
      <Button
          style={{fontSize: 20, color: 'white',padding: 5}}
          styleDisabled={{color: 'red'}}
          onPress={this.getPostsFromApi.bind(this)}>
          Sign in
        </Button>
        </View>
          <Text>{this.state.username}</Text>
          <Text>{this.state.password}</Text>
        <View style={styles.ForgotPassword}>
        <Button
            style={{fontSize: 20, color: '#00415D',padding: 5}}
            styleDisabled={{color: 'red'}}>
            Forgot Password
          </Button>
          </View>

          <View style={styles.NewAccount}>
          <Button
              style={{fontSize: 20, color: '#00415D',padding: 5}}
              styleDisabled={{color: 'red'}}>
              New Account
            </Button>
            </View>
        </View>
  );
      }else{
        return (
          <MyDrawer/>

        );
      }



  }

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
      width:20,
      height:20,
    },
    rightNavButtonText: {
      marginRight:13,
      marginTop:2
    },title: {
    	marginTop:4,
      fontSize:16
    },
});
export default Login
//AppRegistry.registerComponent('Login', () => LoginPage);
