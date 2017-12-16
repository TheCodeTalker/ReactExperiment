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

const onButtonPress = () => {
//  Alert.alert('Button has been pressed!');
};
var SCREEN_WIDTH = require('Dimensions').get('window').width;

class Offers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      open: false,
      refreshing: false,
    };
  }
  _onRefresh() {
   this.setState({refreshing: true});
   this._userCloseDealsSeller().then(() => {
     this.setState({refreshing: false});
   });
 }

  componentDidMount() {
      this._userCloseDealsSeller();
    }

  _userCloseDealsSeller() {
//   try {
//   const value = await AsyncStorage.getItem('@UserLogID');
//   if (value !== null){
//     console.log("userID" + value);
//   }
// } catch (error) {
//   // Error retrieving data
// }
  try {
    return fetch("http://www.zommodity.com/test/apis/index.php?action=getBuyerOffers&userid=2017011107960100")
    .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.results != null) {
          this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseJson.results),
          loaded: true,
          });
            return responseJson.results;
        }else{
          return null;
        }


      })
      .catch((error) => {
        console.error(error);
      });

    //   let res = await response.json();
    //   console.log("result responce " + res );
    //   if (response.status >= 200 && response.status < 300) {
    //       //Handle success
    //       console.log("status result " + res.results );
    //       let accessToken = res;
    //
    //   } else {
    //       //Handle error
    //       let error = res;
    //       throw error;
    //   }} catch(error) {
    //     this.setState({error: error});
    //     console.log("error " + error);
    // }

  }  catch(error) {
        this.setState({error: error});
        console.log("error " + error);
    }
}
  render(){
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (

    <View style={styles.container}>
    <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie.bind(this)}
        style={styles.listView}
        enableEmptySections={true}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }
      />

    </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text style={styles.loader}>
          Loading offers...
        </Text>
      </View>
    );
  }

  renderMovie(movie) {
    console.log( movie);
    return (
      <View style={styles.containerListView}>
      <View style={styles.firstRow}>
      <View style={styles.insideRow}>
      <Text style={styles.firstHeading}>BEST OFFER</Text>
      <Text style={styles.BottomOftitle}>NO OFFER / NO QUANTITY</Text>
      </View>
        <View style={styles.rightContainer}>
        <Text style={styles.ctime}>{movie.upTime}</Text>
        <Button
            style={styles.fulllot}
            styleDisabled={{color: 'red'}}
            onPress={()=> onButtonPress}>
            OPEN
          </Button>
        </View>
        </View>
        <View style={styles.secondRow}>
        <View style={styles.secondContainer}>
        <Text style={styles.secondHeading}>FOB/GRADE/TONS</Text>
        <Text style={styles.subSecondHeading}>{movie.default_port} / {movie.grade} / {movie.quantity}</Text>
        <Text style={styles.quantity}>Full Month - {movie.ship_date}</Text>
        </View>
      </View>
      <View style={styles.thirdRow}>
      <View style={styles.thirdHeadingStack}>
        <Text style={styles.thirdHeading}>ORIGIN/BALESIZE</Text>
      <Text style={styles.port}>{movie.origin} {movie.bale_size}</Text>
      </View>
    </View>
    <View style={styles.fourthRow}>
    <View style={styles.insideFourthRow}>
      <Text style={styles.fouthHeading}>MY OFFER</Text>
      <Text style={styles.fouthHeading}>{movie.amount}</Text>
      </View>
      <View style={styles.actionRow}>
      <TouchableHighlight onPress={() => this.setState({open: true})} underlayColor="white">
            <Image
              style={styles.myBtn}
              source={require('./Img/moreInfo.png')}
            />
          </TouchableHighlight>
          <TouchableHighlight onPress={()=> onButtonPress} underlayColor="white">
                <Image
                  style={styles.myBtn}
                  source={require('./Img/message.png')}
                />
              </TouchableHighlight>
              <TouchableHighlight onPress={()=> onButtonPress} underlayColor="white">
                    <Image
                      style={styles.myBtn}
                      source={require('./Img/chat.png')}
                    />
                  </TouchableHighlight>
                  <TouchableHighlight onPress={()=> onButtonPress} underlayColor="white">
                        <Image
                          style={styles.myBtn}
                          source={require('./Img/pdf.png')}
                        />
                      </TouchableHighlight>
      </View>
  </View>
    <View style={styles.fivethRow}>
  </View>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  fivethRow:{
    flex: 1,
    height: 1,
  flexDirection: 'row',
  alignSelf: 'stretch',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'black',
},
  container: {
    flex: 1,
    width: 375,
    padding:0,
    paddingTop:60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },containerListView:{
    flex: 1,
    width: 375,
    padding:10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },firstRow :{
    flex: 1,
  flexDirection: 'row',
  alignSelf: 'stretch',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F5FCFF',
},
secondRow:{
  flex: 1,
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
backgroundColor: '#F5FCFF',
},
thirdRow:{
  flex: 1,
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
backgroundColor: '#F5FCFF',
},fourthRow:{
  flex: 0.5,
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
backgroundColor: '#888888',
borderRadius: 3,
borderWidth:1,
},
loader:{
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

},
fivethRow:{
  flex: 1,
  paddingTop:5,
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
backgroundColor: '#F5FCFF',
},insideRow : {
  flex: 1,
  width: 20,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  backgroundColor: '#F5FCFF',
},
  ctime :{
    paddingLeft: 10,
    fontSize: 15,
    alignItems: 'flex-end',
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 3,
  },quantity:{
      fontSize: 15,
      marginRight: 5,
      color:'green',
      fontWeight: 'bold',

  },actionbar:{
    color:'green',
  },
  fulllot:{
    fontSize: 15,
     color: 'green',
     marginRight: 5,
     borderColor: 'green',
      borderWidth: 1,
      alignItems: 'flex-end',
      marginBottom: 8,
      marginLeft: 3,
  },
  rightContainer: {
    flex: 1,
     alignSelf: 'stretch',
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    justifyContent: 'space-between',
  },secondContainer: {
    flex: 1,
     alignSelf: 'stretch',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    justifyContent: 'space-between',
  },thirdHeadingStack:{
    flex: 1,
     alignSelf: 'stretch',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    justifyContent: 'space-between',
  },insideFourthRow:{
    flex: 1,
     alignSelf: 'stretch',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    justifyContent: 'space-between',
  },
  actionRow:{
    flex: 1,
    marginRight: 5,
    alignItems: 'flex-end',
    flexDirection: 'row',
justifyContent: 'flex-end',
  },
  title: {
    fontSize: 15,
    marginBottom: 8,
    marginLeft: 3,
    width : 150,
    textAlign: 'center',
    fontWeight: 'bold',
  },myBtn:{
    width:25,
    height:25,
    marginRight: 5,
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },port:{
    fontWeight: 'bold',
  },
  listView: {
    paddingTop: 20,
    paddingBottom:20,
    backgroundColor: '#F5FCFF',
  },
});
export default Offers
//AppRegistry.registerComponent('Login', () => LoginPage);
