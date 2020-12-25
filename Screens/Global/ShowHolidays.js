import React, { Component } from "react"
import { Text, View, StyleSheet , Image,TouchableOpacity, TextInput, Alert, FlatList, Dimensions } from "react-native"
import PropTypes from 'prop-types'
import GlobalAssests from "../Global/GlobalAssests.js";
import ModalPicker from 'react-native-modal-selector';
import Moment from 'moment';
import momentTZ from 'moment-timezone';

const baseURLHoliday = "https://s3.amazonaws.com/tarabalam/holiday"

class ShowHolidays extends Component {
  constructor() {
     super(); 
     this.state = {
          holidaylist: [],
          nowyear: '',
          nowmonth: '',
          nowmonthString: '',
     }     
  }

  componentDidMount() {
     this.setState({nowyear: this.props.selectedyear, nowmonth: this.props.selectedmonth})
     this.changeToMonth(this.props.selectedmonth)
     var jsonurlHoliday = baseURLHoliday + '_'+ this.props.selectedyear +'_' + this.props.selectedmonth + '_IN.json'

     fetch(jsonurlHoliday)
     .then(response => response.json())
     .then(data => { 
          if (data['data']) {
               let returnData = data['data']            
               this.setState({holidaylist: returnData}) 
          } else {
               console.log('No data') 
          }
     })
     .catch(error => console.log(error)); 
  }

  changeToMonth(str) {    
       let ccc = ''
       switch(str) {
          case '1':
               ccc = 'January'
               break;
          case '2':
               ccc = 'February'
               break;
          case '3':
               ccc = 'March'
               break;
          case '4':
               ccc = 'April'
               break;
          case '5':
               ccc = 'May'
               break;
          case '6':
               ccc = 'June'
               break;
          case '7':
               ccc = 'July'
               break;
          case '8':
               ccc = 'August'
               break;
          case '9':
               ccc = 'September'
               break;
          case '10':
               ccc = 'October'
               break;
          case '11':
               ccc = 'November'
               break;
          case '12':
               ccc = 'December'
               break;
       }
       this.setState({nowmonthString: ccc})
  }

  ok = () => {         
       this.props.onClickedConfirmBtn()  
  }
    
    changemonth = (value) => {
     let myear = parseInt(this.state.nowyear)
     let mmonth = parseInt(this.state.nowmonth)
     if (value == 'prev') {
          if(mmonth == 1) {
               myear = myear - 1
               mmonth = 12
          } else {
               mmonth = mmonth - 1
          }
     } else {
          if(mmonth == 12) {
               myear = myear + 1
               mmonth = 1
          } else {
               mmonth = mmonth + 1
          }
     }
     let mmonthstr = mmonth.toString()
     let myearstr = myear.toString()
     this.setState({nowyear: myearstr, nowmonth: mmonthstr, holidaylist: []})
     this.changeToMonth(mmonthstr)
     var jsonurlHoliday = baseURLHoliday + '_'+ myearstr +'_' + mmonthstr + '_IN.json'

     fetch(jsonurlHoliday)
     .then(response => response.json())
     .then(data => { 
          if (data['data']) {
               let returnData = data['data']            
               this.setState({holidaylist: returnData}) 
          } else {
               console.log('No data') 
          }
     })
     .catch(error => console.log(error)); 
    }

    
     _renderSampleRow(item)  {
          return (
               <View style={styles.itemview}>
                    <View style={styles.view1_view1}>
                         <Image style={styles.hicon} source={GlobalAssests.Calendar}></Image>
                         <Text style={styles.textvieww}>{item['carePlanName']}</Text>
                    </View>
                    <View style={styles.view1_view2}></View>
               </View>
          );
     }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <View style={styles.titleview}>
                         <View style={styles.viewt1}>
                              <Text style={{textAlign : 'center', fontSize: 20, color: 'white', marginLeft: 60}}>Holidays</Text>
                         </View>
                         <View style={styles.viewt2}>
                              <TouchableOpacity onPress={()=> this.ok()} style={{width: 68, height: 35, alignItems: 'center', justifyContent: 'center'}}>
                                   <Text style={{textAlign : 'center', color: 'red', fontSize: 15}}>Close</Text>
                              </TouchableOpacity>
                         </View>
                    </View>
                    <View style={styles.contentview}>                                  
                         <FlatList
                         data={this.state.holidaylist}
                         extraData={this.state}
                         renderItem={({item}) => this._renderSampleRow(item)}
                         keyExtractor={(item, index) => index.toString()}
                         scrollEnabled={true}
                         />
                    </View>
                    <View style={styles.bottomview}>
                         <View style={styles.monthshowview}>
                              <Text style={{textAlign : 'center', color: 'red', fontSize: 15}}>{this.state.nowmonthString + ', ' + this.state.nowyear}</Text>
                         </View>
                         <View style={styles.buttonviews}>
                              <View style={styles.bottomcview}>
                                   <TouchableOpacity onPress={()=> this.changemonth('prev')} style={{borderColor : '#F0C600', borderWidth: 2, borderRadius: 25, width : 100 ,
                                        height : 35, alignItems : 'center', justifyContent : 'center', backgroundColor: '#F0C600'}}>
                                        <Text style={{textAlign : 'center', color: 'white', fontSize: 15}}>PREV</Text>
                                   </TouchableOpacity>
                              </View>
                              <View style={styles.bottomcview}>
                                   <TouchableOpacity onPress={()=> this.changemonth('next')} style={{borderColor : '#F0C600', borderWidth: 2, borderRadius: 25, width : 100 ,
                                        height : 35, alignItems : 'center', justifyContent : 'center', backgroundColor: '#F0C600'}}>
                                        <Text style={{textAlign : 'center', color: 'white', fontSize: 15}}>NEXT</Text>
                                   </TouchableOpacity>
                              </View>
                         </View>
                    </View>
                </View>
            </View>
        )
    }
 }

const styles = StyleSheet.create({
    roundview: {
        width: 11,
        height: 11,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#5656f8',
        position: 'absolute',
        backgroundColor: 'white'
    },
    container : {
        flex : 1, 
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    body : {
        backgroundColor : '#F0C600',
        borderRadius : 10,
        opacity : 1,
        width : '85%',
        height: 480,
        flexDirection : 'column',
        shadowColor: 'black',
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 10,
        shadowRadius: 20,
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },    
        titleview: {
            width: '100%',
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',      
        },
          viewt1: {
               flex: 1,
               height: 50,
               alignItems: 'center',
               justifyContent: 'center',
          },
          viewt2: {
               width: 70,
               height: 50,
               alignItems: 'center',
               justifyContent: 'center',
          },

        contentview: {
            width: '98%',
            height: 350,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',  
            backgroundColor: 'white',  
        },
        bottomview: {
            width: '98%',
            height: 74,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center', 
            backgroundColor: 'white',
            borderBottomRightRadius : 10,   
            borderBottomLeftRadius: 10,
        },
          monthshowview: {
               width: '100%',
               height: 20,
               flexDirection: 'row',
               alignItems: 'center',
               justifyContent: 'center', 
               backgroundColor: 'white',
          },
          buttonviews: {
               width: '100%',
               height: 54,
               flexDirection: 'row',
               alignItems: 'center',
               justifyContent: 'center', 
               backgroundColor: 'white',
               borderBottomRightRadius : 10,   
               borderBottomLeftRadius: 10,
          } ,

          bottomcview: {
               flex: 1,
               height: '100%',
               alignItems: 'center',
               justifyContent: 'center',
               flexDirection: 'row'
          },

     itemview: {
          width: Dimensions.get('window').width*0.83,
          height: 53,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white'
     },
     view1_view1: {
          width: '100%',
          height: 50,
          flexDirection: 'row',
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'flex-start',
     },
     view1_view2: {
          width: '100%',
          height: 1,
          flexDirection: 'column',
          backgroundColor: '#d0d0d0',
     },
     hicon: {
          width: 15,
          height: 15,
          resizeMode: 'stretch',
          marginLeft: 20
     },
     textvieww: {
          fontSize: 15,
          color: 'black',
          marginLeft: 10
     },
});

ShowHolidays.propType = {
    onClickedConfirmBtn : PropTypes.func,
    selectedyear : PropTypes.string,
    selectedmonth : PropTypes.string,
}

export default ShowHolidays