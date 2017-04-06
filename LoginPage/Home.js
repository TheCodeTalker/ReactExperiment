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

class Home extends Component {

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

  try {
    return fetch("http://www.zommodity.com/test/apis/index.php?action=closeDealsSeller&userid=2017011107960100")
    .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
      dataSource: this.state.dataSource.cloneWithRows(responseJson.results),
      loaded: true,
      });
        return responseJson.movies;
      })
      .catch((error) => {
        console.error(error);
      });



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
          Loading closeDealsSellers...
        </Text>
      </View>
    );
  }

  renderMovie(movie) {
    console.log( movie);
    var logoComp
    if ((movie.comp_logo != null) ||  (movie.comp_logo != "")){
     logoComp = "http://www.zommodity.com/test/uploads/" + movie.comp_logo
   }else{
     logoComp = "./Img/zommo.png"
   }
    return (

      <View style={styles.containerListView}>
      <View style={styles.firstRow}>
      <FitImage
      resizeMode="cover"
      source={{uri: logoComp }}
      originalWidth={40}
      originalHeight={40}
      style={styles.fitImage}
      />
      <Text style={styles.title}>{movie.buyer_name}</Text>
        <View style={styles.rightContainer}>
        <Text style={styles.ctime}>{movie.ctime}</Text>
        <Button
            style={styles.fulllot}
            styleDisabled={{color: 'red'}}
            onPress={()=> onButtonPress}>
            FULL LOT
          </Button>
        </View>
        </View>
        <View style={styles.secondRow}>
        <Text style={styles.quantity}>${movie.amount} -  {movie.quantity} Tons</Text>

      </View>
      <View style={styles.thirdRow}>
      <Text style={styles.port}>{movie.port_type}{movie.default_port} Tons</Text>

    </View>
    <View style={styles.fourthRow}>
    <Text style={styles.date}>Third half - {movie.ship_date}</Text>
  </View>
  <View style={styles.fivethRow}>
  <View style={styles.insideRow}>
  <Text style={styles.actionbar}>{movie.grade}</Text>
  <Text style={styles.tons}>{movie.enq_qty} Tons</Text>
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
  <View style={styles.sixthRow}>
  </View>
  <Modal
    offset={this.state.offset}
    open={this.state.open}
    modalDidOpen={() => console.log('modal did open')}
    modalDidClose={() => this.setState({open: false})}
    style={{alignItems: 'center'}}>
    <View>
      <Text style={{fontSize: 20, marginBottom: 10}}>Hello world!</Text>
      <TouchableOpacity
      style={{margin: 5}}
      onPress={() => this.setState({offset: -100})}>
        <Text>Move modal up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{margin: 5}}
        onPress={() => this.setState({offset: 0})}>
        <Text>Reset modal position</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{margin: 5}}
        onPress={() => this.setState({open: false})}>
        <Text>Close modal</Text>
      </TouchableOpacity>
    </View>
  </Modal>

      </View>

    );
  }
}
var styles = StyleSheet.create({
  sixthRow:{
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
    paddingTop: 60,
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
  },actionRow:{
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
  },
  fitImage: {
    borderRadius: 20,
    width: 40,
    height: 40,

  },port:{
    fontWeight: 'bold',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});
export default Home
//AppRegistry.registerComponent('Login', () => LoginPage);
