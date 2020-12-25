import React, { Component } from "react"
import { Text, View, StyleSheet , Image,TouchableOpacity, TextInput, Alert} from "react-native"
import PropTypes from 'prop-types'
import GlobalAssests from "../Global/GlobalAssests.js";
import ModalPicker from 'react-native-modal-selector';
import Moment from 'moment';
import momentTZ from 'moment-timezone';

var btmhharray = []
var btmmmarray = []

class ShowReminder extends Component {
  constructor() {
     super(); 
     this.state = {
          selectedbtmhh: '',
          selectedbtmhhkey: 0,
          selectedbtmmm: '',
          selectedbtmmmkey: 0,
          btmhharraym: [],
          btmmmarraym: [],
     }     
  }

  componentDidMount() {       
     let nowtimehh = this.props.stimehh
     let nowtimemm = this.props.stimemm
     let nowtimehhv = parseInt(nowtimehh)
     let nowtimemmv = parseInt(nowtimemm)
     this.setState({
          selectedbtmhh: nowtimehh,
          selectedbtmhhkey: nowtimehhv,
          selectedbtmmm: nowtimemm,
          selectedbtmmmkey: nowtimemmv,
     })
     btmhharray = []
     btmmmarray = []
     this.setState({
          btmhharraym: btmhharray, 
          btmmmarraym: btmmmarray, 
     })
     for(var k=0; k<24; k++){
          var stringlabel = k.toString()
          var oneb = {
               key: k,
               label: stringlabel
          }
          btmhharray.push(oneb)
     }
     for(var h=0; h<60; h++){
          var stringlabela = h.toString()
          var onec = {
               key: h,
               label: stringlabela
          }
          btmmmarray.push(onec)
     }
     this.setState({
          btmhharraym: btmhharray, 
          btmmmarraym: btmmmarray, 
     })
  }

  _onchangeBHHValue = (itemvalue, itemIndex) => {    
     this.setState({selectedbtmhh: itemvalue, selectedbtmhhkey: itemIndex});
  }
  _onchangeBMMValue = (itemvalue, itemIndex) => {    
     this.setState({selectedbtmmm: itemvalue, selectedbtmmmkey: itemIndex});
  }

    set = () => {
       let hhtime = this.state.selectedbtmhh
       let mmtime = this.state.selectedbtmmm
       this.props.onClickedConfirmBtn(hhtime, mmtime)
    }

    cancel = () => {
       this.props.onClickedConfirmCancel()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <View style={styles.titleview}>
                        <Text style={{textAlign : 'center', fontSize: 18, color: 'white'}}>Set Your Reminder</Text>
                    </View>
                    <View style={styles.contentview}>
                         <View style={{flexDirection: 'column', width: '100%', height: 180, alignItems: 'center', justifyContent: 'center'}}>
                              <View style={{width: '100%', height: 60, alignItems: 'flex-start', justifyContent: 'flex-end'}}>
                                   <Text style={{fontSize: 15, marginLeft: 10, marginBottom: 3}}>Select your Time(hh24-min)</Text>
                              </View>
                              <View style={{width: '98%', height: 40}}>
                                   <ModalPicker
                                   data={this.state.btmhharraym}
                                   accessible={true}
                                   scrollViewAccessibilityLabel={'Scrollable options'}
                                   cancelButtonAccessibilityLabel={'Cancel Button'}
                                   onChange={(option)=>this._onchangeBHHValue(option.label, option.key)}
                                   >
                                        <View style={{borderRadius: 5, borderWidth:1, borderColor:'#bebebe', width: '100%', height: '100%',  flexDirection: 'row',}}>
                                             <View style={{borderRadius: 5, borderWidth:1, borderColor:'white', flex: 1, height: '100%', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row'}}>
                                                  <TextInput
                                                       style={{width: '100%', height: '100%', textAlignVertical: 'center', fontSize: 13, marginLeft: 20,}}
                                                       editable={false}
                                                       value={this.state.selectedbtmhh}></TextInput>
                                             </View>
                                             <View style={{borderRadius: 5, borderWidth:1, borderColor:'white', width: 40, height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>                                                            
                                                  <TouchableOpacity style={{width: 30, height: '100%', alignItems: 'center', justifyContent: 'center',}}>
                                                       <Image style={{width: 12, height: 8, resizeMode: 'stretch'}} source={GlobalAssests.Down}></Image>
                                                  </TouchableOpacity>
                                             </View>
                                        </View>
                                   </ModalPicker>
                              </View>
                              <View style={{width: '100%', height: 7}}></View>
                              <View style={{width: '98%', height: 40}}>
                                   <ModalPicker
                                   data={this.state.btmmmarraym}
                                   accessible={true}
                                   scrollViewAccessibilityLabel={'Scrollable options'}
                                   cancelButtonAccessibilityLabel={'Cancel Button'}
                                   onChange={(option)=>this._onchangeBMMValue(option.label, option.key)}
                                   >
                                        <View style={{borderRadius: 5, borderWidth:1, borderColor:'#bebebe', width: '100%', height: '100%',  flexDirection: 'row',}}>
                                             <View style={{borderRadius: 5, borderWidth:1, borderColor:'white', flex: 1, height: '100%', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row'}}>
                                                  <TextInput
                                                       style={{width: '100%', height: '100%', textAlignVertical: 'center', fontSize: 13, marginLeft: 20,}}
                                                       editable={false}
                                                       value={this.state.selectedbtmmm}></TextInput>
                                             </View>
                                             <View style={{borderRadius: 5, borderWidth:1, borderColor:'white', width: 40, height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>                                                            
                                                  <TouchableOpacity style={{width: 30, height: '100%', alignItems: 'center', justifyContent: 'center',}}>
                                                       <Image style={{width: 12, height: 8, resizeMode: 'stretch'}} source={GlobalAssests.Down}></Image>
                                                  </TouchableOpacity>
                                             </View>
                                        </View>
                                   </ModalPicker>
                              </View>
                         </View>
                    </View>
                    <View style={styles.bottomview}>
                         <View style={styles.bottomcview}>
                              <TouchableOpacity onPress={()=> this.set()} style={{borderColor : '#F0C600', borderWidth: 2, borderRadius: 25, width : 100 ,
                              height : 35, alignItems : 'center', justifyContent : 'center', backgroundColor: '#F0C600'}}>
                                   <Text style={{textAlign : 'center', color: 'white', fontSize: 15}}>Set</Text>
                              </TouchableOpacity>
                         </View>
                         <View style={styles.bottomcview}>
                              <TouchableOpacity onPress={()=> this.cancel()} style={{borderColor : '#F0C600', borderWidth: 2, borderRadius: 25, width : 100 ,
                              height : 35, alignItems : 'center', justifyContent : 'center', backgroundColor: '#F0C600'}}>
                                   <Text style={{textAlign : 'center', color: 'white', fontSize: 15}}>Cancel</Text>
                              </TouchableOpacity>
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
        height: 280,
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
            justifyContent: 'center'        
        },
        contentview: {
            width: '98%',
            height: 150,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',  
            backgroundColor: 'white',  
        },
        bottomview: {
            width: '98%',
            height: 74,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center', 
            backgroundColor: 'white',
            borderBottomRightRadius : 10,   
            borderBottomLeftRadius: 10,
        },
          bottomcview: {
               flex: 1,
               height: '100%',
               alignItems: 'center',
               justifyContent: 'center',
          },
});

ShowReminder.propType = {
    onClickedConfirmBtn : PropTypes.func,
    onClickedConfirmCancel : PropTypes.func,
    stimehh : PropTypes.string,
    stimemm : PropTypes.string,
}

export default ShowReminder