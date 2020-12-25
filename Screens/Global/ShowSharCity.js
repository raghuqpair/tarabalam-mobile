import React, { Component } from "react"
import { Text, View, StyleSheet , Image,TouchableOpacity, TextInput, Alert, AsyncStorage} from "react-native"
import PropTypes from 'prop-types'
import GlobalAssests from "../Global/GlobalAssests.js";
import ModalPicker from 'react-native-modal-selector';
import Moment from 'moment';
import momentTZ from 'moment-timezone';

const birtharray1 = [
     {key: 0, label: 'Aswini'},
     {key: 1, label: 'Bharani'},
     {key: 2, label: 'Krithika/Karthigai'},
     {key: 3, label: 'Rohini'},
     {key: 4, label: 'Mrigasira/Mrigasheersham'},
     {key: 5, label: 'Aardhra/Thiruvaathirai'},
     {key: 6, label: 'Punarvasu/Punarpoosam'},
     {key: 7, label: 'Pushyami/Poosam'},
     {key: 8, label: 'Ashlesha/Aayilyam'},
     {key: 9, label: 'Magha/Makam'},
     {key: 10, label: 'Poorva Phalguni/Pooram'},
     {key: 11, label: 'Uttara Phalguni/Uthiram'},
     {key: 12, label: 'Hastha/Hastham'},
     {key: 13, label: 'Chitra/Chithirai'},
     {key: 14, label: 'Swaathi'},
     {key: 15, label: 'Vishaaka/Visaakam'},
     {key: 16, label: 'Anuraadha/Anusham'},
     {key: 17, label: 'Jyeshta/Kettai'},
     {key: 18, label: 'Moola/Moolam'},
     {key: 19, label: 'Poorvashada/Pooraadam'},
     {key: 20, label: 'Utharashada/Uthiraadam'},
     {key: 21, label: 'Shraavan/Thiruvonam'},
     {key: 22, label: 'Dhanishta/Avittam'},
     {key: 23, label: 'Shathabisha/Chathayam'},
     {key: 24, label: 'Poorvabhadhra/Poorattathi'},
     {key: 25, label: 'Uttarabhadhra/Uthirattathi'},
     {key: 26, label: 'Revathi'},
]
const arealist1 = [
     {key: 0, label: 'NewYork'},
     {key: 1, label: 'Chicago'},
     {key: 3, label: 'India'},
     {key: 4, label: 'Los Angeles'},
]

class ShowStarCity extends Component {
  constructor() {
     super(); 
     this.state = {
          selectedbirth: 'Aswini',
          selectbirthkey: 0,
          selectedarea: 'NewYork',
          selectedareakey: 0,
     }     
  }

  componentDidMount() {
     this._retrieveData()
  }

  _storeDataStar = async () => {
     try {
       await AsyncStorage.setItem('profilestar', this.state.selectedbirth);
       let birthkey = this.state.selectbirthkey.toString()
       await AsyncStorage.setItem('profilestarkey', birthkey);
     } catch (error) {
       // Error saving data
       console.log('Error saving data') 
     }
   };
   _storeDataArea = async () => {
     try {
       await AsyncStorage.setItem('profilearea', this.state.selectedarea);
       let areakey = this.state.selectedareakey.toString()
       await AsyncStorage.setItem('profileareakey', areakey);
     } catch (error) {
       // Error saving data
       console.log('Error saving data') 
     }
   };

   _retrieveData = async () => {
     try {
       const starvalue = await AsyncStorage.getItem('profilestar');
       const starkey = await AsyncStorage.getItem('profilestarkey');
       let starkeyvalue = parseInt(starkey, 10)
       const areavalue = await AsyncStorage.getItem('profilearea');
       const areakey = await AsyncStorage.getItem('profileareakey');
       const firsttimeflag = await AsyncStorage.getItem('usedtimes');
       let areakeyvalue = parseInt(areakey, 10)
       if (firsttimeflag !== null) {
            this.setState({
               selectedbirth: starvalue,
               selectbirthkey: starkeyvalue,
               selectedarea: areavalue,
               selectedareakey: areakeyvalue,
               showStarCity: false,
            })
       } else {
          this.setState({
             selectedbirth: 'Aswini',
             selectbirthkey: 0,
             selectedarea: 'NewYork',
             selectedareakey: 0,
             showStarCity: true,
          })
       }
     } catch (error) {
       this.setState({
          selectedbirth: 'Aswini',
          selectbirthkey: 0,
          selectedarea: 'NewYork',
          selectedareakey: 0,
          showStarCity: true,
       })
     }
   };
  _onchangeBirthValue(itemvalue, itemIndex) {    
     this.setState({selectedbirth: itemvalue, selectbirthkey: itemIndex});     
   }

  _onchangeAreaValue(itemvalue, itemIndex) {    
     this.setState({selectedarea: itemvalue, selectedareakey: itemIndex});
   }

    confirm = () => {
       let star = this.state.selectedbirth
       let starkey = this.state.selectbirthkey
       let city = this.state.selectedarea
       let citykey = this.state.selectedareakey

       this.props.onClickedConfirm(star, starkey, city, citykey)
   }

   skip = () => {
     let star = this.state.selectedbirth
     let starkey = this.state.selectbirthkey
     let city = this.state.selectedarea
     let citykey = this.state.selectedareakey

     this.props.onClickedConfirm(star, starkey, city, citykey)
 }

    render() {
        return (
          <View style={styles.container}>
               <View style={styles.body}>
                    <View style={styles.titleview}>
                         <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>Set your  preferences </Text>
                    </View>
                    <View style={styles.selectview}>
                         <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
                              <Text style={{color: 'black', fontSize: 16, marginLeft: 15, marginBottom: 5}}>Select your Star : </Text>
                              <View style={{borderRadius: 5, width: '95%', height: 40, justifyContent: 'center', alignSelf: 'center', backgroundColor: 'white'}}>
                                   <ModalPicker
                                        data={birtharray1}
                                        accessible={true}
                                        scrollViewAccessibilityLabel={'Scrollable options'}
                                        cancelButtonAccessibilityLabel={'Cancel Button'}
                                        onChange={(option)=>this._onchangeBirthValue(option.label, option.key)}>
                                        <View style={{borderRadius: 5, borderWidth:1, borderColor:'#F0C600', width: '100%', height: '100%', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row', backgroundColor: 'white'}}>
                                             <View style={{flex: 1, height: '100%', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row'}}>
                                                  <TextInput
                                                       style={{width: '100%', height: '100%', textAlignVertical: 'center', fontSize: 17, marginLeft: 20,}}
                                                       editable={false}
                                                       value={this.state.selectedbirth}></TextInput>
                                             </View>
                                             <View style={{width: 40, height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>                                                            
                                                  <TouchableOpacity style={{width: 30, height: '100%', alignItems: 'center', justifyContent: 'center',}}>
                                                       <Image style={{width: 12, height: 8, resizeMode: 'stretch'}} source={GlobalAssests.Down}></Image>
                                                  </TouchableOpacity>
                                             </View>
                                        </View>
                                   </ModalPicker>
                              </View>
                         </View>
                         <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
                              <Text style={{color: 'black', fontSize: 16, marginLeft: 15, marginBottom: 5}}>Select your City :</Text>
                              <View style={{borderRadius: 5, width: '95%', height: 40, justifyContent: 'center', alignSelf: 'center', backgroundColor: 'white'}}>                                        
                                   <ModalPicker
                                        data={arealist1}
                                        accessible={true}
                                        scrollViewAccessibilityLabel={'Scrollable options'}
                                        cancelButtonAccessibilityLabel={'Cancel Button'}
                                        onChange={(option)=>this._onchangeAreaValue(option.label, option.key)}>
                                             <View style={{borderRadius: 5, borderWidth:1, borderColor:'#F0C600', width: '100%', height: '100%', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row', backgroundColor: 'white'}}>
                                                  <View style={{flex: 1, height: '100%', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row'}}>
                                                       <TextInput
                                                            style={{width: '100%', height: '100%', textAlignVertical: 'center', fontSize: 17, marginLeft: 20,}}
                                                            editable={false}
                                                            value={this.state.selectedarea}></TextInput>
                                                  </View>
                                                  <View style={{width: 40, height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>                                                            
                                                       <TouchableOpacity style={{width: 30, height: '100%', alignItems: 'center', justifyContent: 'center',}}>
                                                            <Image style={{width: 12, height: 8, resizeMode: 'stretch'}} source={GlobalAssests.Down}></Image>
                                                       </TouchableOpacity>
                                                  </View>
                                             </View>
                                   </ModalPicker>
                              </View>
                         </View>
                    </View>
                    <View style={styles.buttonview}>
                         <View style={{flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                              <TouchableOpacity onPress={()=> this.confirm()} style={{borderColor : '#F0C600', borderWidth: 2, borderRadius: 25, width : 120 ,
                              height : 40, alignItems : 'center', justifyContent : 'center', backgroundColor: '#F0C600'}}>
                                   <Text style={{textAlign : 'center', color: 'white', fontSize: 18}}>Update</Text>
                              </TouchableOpacity>
                         </View>
                         <View style={{flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                              <TouchableOpacity onPress={()=> this.skip()} style={{width : 100, height : 40, alignItems : 'center', justifyContent : 'center'}}>
                                   <Text style={{textAlign : 'center', color: 'black', fontSize: 18}}>Skip</Text>
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
        backgroundColor : 'white',
        borderRadius : 10,
        opacity : 1,
        width : '85%',
        height: 350,
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
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'center',
    }, 
    selectview: {
         width: '100%',
         height: 200,
         borderRadius: 5,
         borderColor: 'white',
         backgroundColor: 'white',
         marginTop: 5
    },    
    buttonview: {
         width: '100%',
         height: 80,
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'center',
    },
});

ShowStarCity.propType = {
     onClickedConfirm : PropTypes.func,
}

export default ShowStarCity