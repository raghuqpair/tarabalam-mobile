
import React, {Component} from 'react';
import { StyleSheet, Image, TouchableOpacity
    , View, Text, TextInput, Alert, ActivityIndicator } from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import GlobalAssests from "../Global/GlobalAssests.js";

const resetAction = (routeName) => StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({routeName: routeName}),
  ]
});

export default class SideMenuScreen extends Component {  
  static navigationOptions = {
    header: null,
  };
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
  }
  
  componentDidMount() {    
  }

  _onPressButton(value) {
    switch (value) {
      case "graha":
        this.props.closeSelf(value);
        break;
      case "gruha":
        this.props.closeSelf(value);
        break;
      case "mantra":
        this.props.closeSelf(value);
        break;
      case "puja":
        this.props.closeSelf(value);
        break;
      case "yatra":
        this.props.closeSelf(value);
        break;
      case "holidays":
        this.props.closeSelf(value);
        break;
      case "profile":
        this.props.closeSelf(value);
        break;
      case "reminder":
        this.props.closeSelf(value);
        break;
        //
    }
  }

  render() {
    return (
      <View style={styles.containerv}>
          <View style={styles.logoview}>
            <Text style={{color: '#F0C600', fontSize: 50, marginBottom: 10}}>Tarabalam</Text>
            <Image style={styles.logoimage} source={GlobalAssests.AppLogo}></Image>
          </View>
          <View style={styles.spaceview}>               
          </View>
          <View style={styles.contentview}>
               <View style={styles.menuitemview}>
                    <View style={styles.oneitemview}>   
                         <TouchableOpacity style={styles.buttonview} onPress={() => this._onPressButton("graha")}>
                              <Image style={styles.menuicon} source={GlobalAssests.Menu1}></Image>
                              <Text style={styles.textvieww}>Grahabal</Text>
                         </TouchableOpacity>            
                    </View>
                    <View style={styles.oneitemview}> 
                         <TouchableOpacity style={styles.buttonview} onPress={() => this._onPressButton("gruha")}>
                              <Image style={styles.menuicon} source={GlobalAssests.Menu2}></Image>
                              <Text style={styles.textvieww}>Gruhabal</Text>
                         </TouchableOpacity>              
                    </View>
                    <View style={styles.oneitemview}>    
                         <TouchableOpacity style={styles.buttonview} onPress={() => this._onPressButton("mantra")}>
                              <Image style={styles.menuicon} source={GlobalAssests.Menu3}></Image>
                              <Text style={styles.textvieww}>Mantrabal</Text>
                         </TouchableOpacity>           
                    </View>
                    <View style={styles.oneitemview}>   
                         <TouchableOpacity style={styles.buttonview} onPress={() => this._onPressButton("puja")}>
                              <Image style={styles.menuicon} source={GlobalAssests.Menu4}></Image>
                              <Text style={styles.textvieww}>Puja Phal</Text>
                         </TouchableOpacity>             
                    </View>
                    <View style={styles.oneitemview}>   
                         <TouchableOpacity style={styles.buttonview} onPress={() => this._onPressButton("yatra")}>
                              <Image style={styles.menuicon} source={GlobalAssests.Menu5}></Image>
                              <Text style={styles.textvieww}>Yatra Kal</Text>
                         </TouchableOpacity>              
                    </View>
                    <View style={styles.oneitemview}> 
                         <TouchableOpacity style={styles.buttonview} onPress={() => this._onPressButton("holidays")}>
                              <Image style={styles.menuicon} source={GlobalAssests.AppLogo}></Image>
                              <Text style={styles.textvieww}>Holidays</Text>
                         </TouchableOpacity>               
                    </View>
                    <View style={styles.oneitemview}> 
                         <TouchableOpacity style={styles.buttonview} onPress={() => this._onPressButton("profile")}>
                              <Image style={styles.menuicon} source={GlobalAssests.Userprofile}></Image>
                              <Text style={styles.textvieww}>Update profile</Text>
                         </TouchableOpacity>               
                    </View>
                    <View style={styles.oneitemview}> 
                         <TouchableOpacity style={styles.buttonview} onPress={() => this._onPressButton("reminder")}>
                              <Image style={styles.menuicon} source={GlobalAssests.AppLogo}></Image>
                              <Text style={styles.textvieww}>Set Reminder</Text>
                         </TouchableOpacity>               
                    </View>
               </View>
          </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  containerv: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  container: {
    width: '100%',
    height: '100%',
    flex: 100,
    flexDirection : 'column',
    backgroundColor: 'white'
  },
  loading : {
    position : 'absolute',
    width : '100%',
    height : '100%',
    justifyContent: 'center',
    backgroundColor : 'white',
    opacity : 0.8
  },
  finish : {
      width : 0,
      height : 0,
      opacity : 0,
      position : 'absolute'
  },
 ////// Main Contents /////
 logoview: {
   flex: 30,
   alignItems: 'center',
   justifyContent: 'flex-end',
 },
 logoimage: {
   width: 100,
   height: 100,
   marginBottom: 10,
   resizeMode: 'stretch'
 },
 menuicon: {
   width: 30,
   height: 30,
   resizeMode: 'stretch'
 },
 spaceview: {
   width: '100%',
   height: 1,
   backgroundColor: 'black'
 },
 contentview: {
   flex: 70,
   alignItems: 'center',
   justifyContent: 'center',
   flexDirection: 'column',
   marginTop: 10
 }, 
     oneitemview: {      
          flex: 1,    
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
     },
     menuitemview: {
          flex: 8,
          width: '100%',
     },
     logoutview: {
          flex: 2,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
     },
     textvieww: {
          fontSize: 23,
          color: 'black',
          marginLeft: 20
     },
     buttonview: {
          height: 50,
          width: '80%',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'row',
     },
     textview: {
          fontSize: 23,
          color: 'red',
          marginLeft: 20
     }
});

