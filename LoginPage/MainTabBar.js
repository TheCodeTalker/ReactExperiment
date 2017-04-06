'use strict';

import React, { Component } from 'react';
import Home from './Home';
import Offers from './Offers'
import MyDrawer from './MyDrawer'
//var React = require('react');
var ReactNative = require('react-native');
import Drawer from 'react-native-drawer'
var {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  AppRegistry,
  Image,Navigator,
  ListView,NavigatorIOS
} = ReactNative;



var Welcome = require('./Home');
//import FirstScreen from './HomeScreen';
//var FirstScreen = require('./HomeScreen');

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

class MainTabBar extends Component {
  static title = 'Zommodity';
  static description = 'Tab-based navigation.'  ;
  static displayName = 'Zommodity';

  state = {
    selectedTab: 'blueTab',
    notifCount: 0,
    presses: 0,
  };
  closeControlPanel = () => {
    this._drawer.close()
  };
  openControlPanel = () => {
    this._drawer.open()
  };

  renderSceneTabBar(route, navigator) {
  console.log(route);
  if(route.name == 'root') {
    //return <Root navigator={navigator} />
  }
  if(route.name == 'MainTabBar') {
    return <MainTabBar navigator={navigator} />
  }
  if(route.name == 'login') {
    return <Login navigator={navigator} />
  }
  if(route.name == 'Home') {
   return <Home navigator={navigator} />
  }
  if(route.name == 'offers') {
    return <Offers navigator={navigator} />
  //  return <Update navigator={navigator} {...route.passProps} />
  }
  if(route.name == 'MyDrawer') {
    return <MyDrawer navigator={navigator} />
  //  return <Update navigator={navigator} {...route.passProps} />
  }


  }

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'blueTab'
    };
  }

  _renderContent = (color: string, pageText: string, num?: number) => {
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <Text style={styles.tabText}>{pageText}</Text>
        <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
      </View>
    );
  };

  render() {
    return (
      <TabBarIOS
        unselectedTintColor="yellow"
        tintColor="white"
        unselectedItemTintColor="red"
        barTintColor="darkslateblue">
        <TabBarIOS.Item
          title=""
          icon={require('./Img/Start.png')}
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            }); }}>


     <Navigator
         initialRoute={{name: 'Home'}}
         style={{flex: 1}}
         renderScene={this.renderSceneTabBar.bind(this)}
       />

        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'whiteTab'}
          icon={require('./Img/offer.png')}
          onPress={() => {
              this.setState({
                  selectedTab: 'whiteTab',
              });
          }}>
          <Navigator
              initialRoute={{name: 'offers'}}
              style={{flex: 1}}
              renderScene={this.renderSceneTabBar.bind(this)}
            />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('./Img/Enquiries.png')}
          selectedIcon={require('./Img/Enquiries.png')}
          tintColor="white"
          unselectedItemTintColor="red"
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'greenTab',
              presses: this.state.presses + 1
            });
          }}>
          {this._renderContent('#21551C', 'Green Tab')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('./Img/ClosedDeals.png')}
          selectedIcon={require('./Img/ClosedDeals.png')}
          tintColor="white"
          unselectedItemTintColor="red"
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'redTab',
              presses: this.state.presses + 1
            });
          }}>
          {this._renderContent('#333333', 'redTab Tab')}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

//AppRegistry.registerComponent('MainTabBar', () => MainTabBar);

export default MainTabBar
//module.exports = MainTabBar;
