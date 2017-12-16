'use strict';
import React, { Component } from 'react';
import FitImage from 'react-native-fit-image';
import Button from 'react-native-button'
import Modal from 'react-native-simple-modal';
import {
  StyleSheet,
  Text,
  View,ListView,
  Image,AlertIOS,TabBarIOS,TouchableHighlight,
  TextInput,Alert,TouchableOpacity,RefreshControl
} from 'react-native';


const datas = [
  {
    name: 'ClosedDeals',
    route: 'closedDeals',
    icon: 'ClosedDeals.png',
    bg: '#C5F442',
  },
  {
    name: 'AllOffer',
    route: 'allOffer',
    icon: 'offer.png',
    bg: '#477EEA',
  },
  {
    name: 'Enquiries',
    route: 'enquiries',
    icon: 'Enquiries.png',
    bg: '#DA4437',
  },
  {
    name: 'Dashboard',
    route: 'dashboard',
    icon: 'pdf.png',
    bg: '#4DCAE0',
  },
  {
    name: 'Company Profile',
    route: 'companyProfile',
    icon: 'ClosedDeals.png',
    bg: '#1EBC7C',
  },
  {
    name: 'User Management',
    route: 'userManagement',
    icon: 'offer.png',
    bg: '#B89EF5',
  },
  {
    name: 'Buyer Management',
    route: 'buyerManagement',
    icon: 'Enquiries.png',
    bg: '#EB6B23',
  },
  {
    name: 'Notified Contact',
    route: 'notifiedContact',
    icon: 'pdf.png',
    bg: '#3591FA',
  },
  {
    name: 'Logout',
    route: 'logout',
    icon: 'moreInfo.png',
    bg: '#EF6092',
  },
];

export default class ControlPanel extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {

        };

    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
      dataSource: ds.cloneWithRows(datas),
    };
  }

  render() {

    return (
      <View style={styles.controlPanel}>
      <View style={styles.imageContainer}>
      <FitImage
      resizeMode="contain"
      source={require('./Img/zommo.png')}
      originalWidth={40}
      originalHeight={40}
      style={styles.headerImg}
      />
      </View>

        <Text style={styles.controlPanelWelcome}>
          Control Panel
        </Text>
        <Button
          onPress={() => {
            this.props.closeDrawer();
          }}
          text="Close Drawer"
        />

        <ListView
        bounces={false}
         dataSource={this.state.dataSource}
         renderRow={this.renderRow.bind(this)}
       />
      </View>
    )
  }
  renderRow(sidebarItem) {
    console.log( sidebarItem);
    var logoComp
     logoComp = require('./Img/ClosedDeals.png')
     //console.log( logoComp);
    return (
      <View style={styles.RowContainer}>
      <View style={styles.RowLayout}>
      <Image
      resizeMode="contain"
      style={styles.rowImg}
      source={logoComp}
         />
     <Text style={styles.text}>{sidebarItem.name}</Text>
     </View>
     <View style={styles.sixthRow}>
     </View>
     </View>

    );
  }
}
var styles = StyleSheet.create({
  controlPanel:{
    flex: 1,
    alignSelf: 'stretch',
    paddingTop:40,
    backgroundColor:'white',
  },ListView:{
    flex: 1,

    width: 375,
    padding:10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },imageContainer:{
      alignItems: 'center',
      justifyContent: 'space-between',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  sixthRow:{
    flex: 1,
    height: 1,
  flexDirection: 'row',
  alignSelf: 'stretch',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'black',
  },RowContainer:{
  flex: 1,
  flexDirection: 'column',
  alignSelf: 'stretch',
  alignItems: 'center',
  backgroundColor: 'white',
  },RowLayout:{
  flexDirection: 'row',
  alignItems: 'flex-start',
  backgroundColor: 'white',
  flex: 1,
  height: 50,
alignSelf: 'stretch',
alignItems: 'center',
},fitImage: {
  width: 40,
  height: 40,
},rowImg:{
  paddingRight: 20,
  paddingLeft: 20,
  width: 40,
  height: 40,
},text:{
  paddingRight: 20,
  paddingLeft: 20,
},headerImg:{
  width: 200,
  height: 50,
  alignItems: 'center',
  justifyContent: 'center',
},controlPanelWelcome:{
  fontSize : 20,
  justifyContent: 'center',
  alignItems: 'center',
},
});
