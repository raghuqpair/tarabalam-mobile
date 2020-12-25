import React, { Component } from "react"
import { Text, View, StyleSheet , Image,TouchableOpacity, TextInput, Alert} from "react-native"
import PropTypes from 'prop-types'
import GlobalAssests from "../Global/GlobalAssests.js";
import ModalPicker from 'react-native-modal-selector';
import Moment from 'moment';
import momentTZ from 'moment-timezone';

var datearray = [
     {key: 0, label: '1'},
     {key: 1, label: '2'},
     {key: 2, label: '3'},
     {key: 3, label: '4'},
     {key: 4, label: '5'},
     {key: 5, label: '6'},
     {key: 6, label: '7'},
     {key: 7, label: '8'},
     {key: 8, label: '9'},
     {key: 9, label: '10'},
     {key: 10, label: '11'},
     {key: 11, label: '12'},
     {key: 12, label: '13'},
     {key: 13, label: '14'},
     {key: 14, label: '15'},
     {key: 15, label: '16'},
     {key: 16, label: '17'},
     {key: 17, label: '18'},
     {key: 18, label: '19'},
     {key: 19, label: '20'},
     {key: 20, label: '21'},
     {key: 21, label: '22'},
     {key: 22, label: '23'},
     {key: 23, label: '24'},
     {key: 24, label: '25'},
     {key: 25, label: '26'},
     {key: 26, label: '27'},
     {key: 27, label: '28'},
     {key: 28, label: '29'},
     {key: 29, label: '30'},
     {key: 30, label: '31'},
]

var montharray = [
     {key: 0, label: 'January'},
     {key: 1, label: 'February'},
     {key: 2, label: 'March'},
     {key: 3, label: 'April'},
     {key: 4, label: 'May'},
     {key: 5, label: 'June'},
     {key: 6, label: 'July'},
     {key: 7, label: 'August'},
     {key: 8, label: 'September'},
     {key: 9, label: 'October'},
     {key: 10, label: 'November'},
     {key: 11, label: 'December'},
]

var yeararray = [
]
var btmhharray = [
]
var btmmmarray = [
]
var btmssarray = [
]

var timezonearray = [
]
var aryIannaTimeZones =
[
     "(GMT+05.30) India",
     "(GMT-06.00) Central Time (US &amp; Canada)",
     "(GMT-05.00) Eastern Time (US &amp; Canada)",
     "(GMT-08.00) Pacific Time (US &amp; Canada)",
     "(GMT-09.00) Alaska",
     "(GMT-07.00) Arizona",
     "(GMT-11.00) Midway Island, Samoa",
     "(GMT-10.00) Hawaii-Aleutian",
     "(GMT-10.00) Hawaii",
     "(GMT-09.30) Marquesas Islands",
     "(GMT-09.00) Gambier Islands",
     "(GMT-08.00) Tijuana, Baja California",
     "(GMT-08.00) Pitcairn Islands",
     "(GMT-07.00) Mountain Time (US &amp; Canada)",
     "(GMT-07.00) Chihuahua, La Paz, Mazatlan",
     "(GMT-06.00) Saskatchewan, Central America",
     "(GMT-06.00) Guadalajara, Mexico City, Monterrey",
     "(GMT-06.00) Easter Island",
     "(GMT-05.00) Cuba",
     "(GMT-05.00) Bogota, Lima, Quito, Rio Branco",
     "(GMT-04.30) Caracas",
     "(GMT-04.00) Santiago",
     "(GMT-04.00) La Paz",
     "(GMT-04.00) Faukland Islands",
     "(GMT-04.00) Brazil",
     "(GMT-04.00) Atlantic Time (Goose Bay)",
     "(GMT-04.00) Atlantic Time (Canada)",
     "(GMT-03.30) Newfoundland",
     "(GMT-03.00) UTC-3",
     "(GMT-03.00) Montevideo",
     "(GMT-03.00) Miquelon, St. Pierre",
     "(GMT-03.00) Greenland",
     "(GMT-03.00) Buenos Aires",
     "(GMT-03.00) Brasilia",
     "(GMT-02.00) Mid-Atlantic",
     "(GMT-01.00) Cape Verde Is.",
     "(GMT-01.00) Azores",
     "(GMT) Greenwich Mean Time . Belfast",
     "(GMT) Greenwich Mean Time . Dublin",
     "(GMT) Greenwich Mean Time . Lisbon",
     "(GMT) Greenwich Mean Time . London",
     "(GMT) Monrovia, Reykjavik",
     "(GMT+01.00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna",
     "(GMT+01.00) Belgrade, Bratislava, Budapest, Ljubljana, Prague",
     "(GMT+01.00) Brussels, Copenhagen, Madrid, Paris",
     "(GMT+01.00) West Central Africa",
     "(GMT+01.00) Windhoek",
     "(GMT+02.00) Beirut",
     "(GMT+02.00) Cairo",
     "(GMT+02.00) Gaza",
     "(GMT+02.00) Harare, Pretoria",
     "(GMT+02.00) Jerusalem",
     "(GMT+02.00) Minsk",
     "(GMT+02.00) Syria",
     "(GMT+03.00) Moscow, St. Petersburg, Volgograd",
     "(GMT+03.00) Nairobi",
     "(GMT+03.30) Tehran",
     "(GMT+04.00) Abu Dhabi, Muscat",
     "(GMT+04.00) Yerevan",
     "(GMT+04.30) Kabul",
     "(GMT+05.00) Ekaterinburg",
     "(GMT+05.00) Tashkent",
     "(GMT+05.45) Kathmandu",
     "(GMT+06.00) Astana, Dhaka",
     "(GMT+06.00) Novosibirsk",
     "(GMT+06.30) Yangon (Rangoon)",
     "(GMT+07.00) Bangkok, Hanoi, Jakarta",
     "(GMT+07.00) Krasnoyarsk",
     "(GMT+08.00) Beijing, Chongqing, Hong Kong, Urumqi",
     "(GMT+08.00) Irkutsk, Ulaan Bataar",
     "(GMT+08.00) Perth",
     "(GMT+08.45) Eucla",
     "(GMT+09.00) Osaka, Sapporo, Tokyo",
     "(GMT+09.00) Seoul",
     "(GMT+09.00) Yakutsk",
     "(GMT+09.30) Adelaide",
     "(GMT+09.30) Darwin",
     "(GMT+10.00) Brisbane",
     "(GMT+10.00) Hobart",
     "(GMT+10.00) Vladivostok",
     "(GMT+10.30) Lord Howe Island",
     "(GMT+11.00) Solomon Is., New Caledonia",
     "(GMT+11.00) Magadan",
     "(GMT+11.30) Norfolk Island",
     "(GMT+12.00) Anadyr, Kamchatka",
     "(GMT+12.00) Auckland, Wellington",
     "(GMT+12.00) Fiji, Kamchatka, Marshall Is.",
     "(GMT+12.45) Chatham Islands",
     "(GMT+13.00) Nuku'alofa",
     "(GMT+14.00) Kiritimati",
];

var aryIannaTimeZonesValues =
[
      "Asia/Kolkata,+05.30",
      "America/Chicago,-06.00",
      "America/New_York,-05.00",
      "America/Los_Angeles,-08.00",
      "America/Anchorage,-09.00",
      "America/Dawson_Creek,-06.00",
      "Pacific/Midway,-11.00",
      "America/Adak,-10.00",
      "Etc/GMT+10,-10.00",
      "Pacific/Marquesas,-09.30",
      "Pacific/Gambier,-09.00",
      "America/Ensenada,-08.00",
      "Etc/GMT+8,-08.00,-08.00",
      "America/Denver,-07.00",
      "America/Chihuahua,-06.00",
      "America/Belize,-06.00",
      "America/Cancun,-06.00",
      "Chile/EasterIsland,-06.00",
      "America/Havana,-05.00",
      "America/Bogota,-05.00",
      "America/Caracas,-04.30",
      "America/Santiago,-04.00",
      "America/La_Paz,-04.00",
      "Atlantic/Stanley,-04.00" ,
      "America/Campo_Grande,-04.00",
      "America/Goose_Bay,-04.00" ,
      "America/Glace_Bay,-04.00" ,
      "America/St_Johns,-03.00",
      "America/Araguaina,-03.00" ,
      "America/Montevideo,-03.00" ,
      "America/Miquelon,-03.00",
      "America/Godthab,-03.00",
      "America/Argentina/Buenos_Aires,-03.00",
      "America/Sao_Paulo,-03.00",
      "America/Noronha,-02.00",
      "Atlantic/Cape_Verde,-01.00" ,
      "Atlantic/Azores,-01.00",
      "Europe/Belfast,0",
      "Europe/Dublin,0",
      "Europe/Lisbon,0",
      "Europe/London,0",
      "Africa/Abidjan,0",
      "Europe/Amsterdam,+01.00",
      "Europe/Belgrade,+01.00",
      "Europe/Brussels,+01.00",
      "Africa/Algiers,+01.00",
      "Africa/Windhoek,+01.00",
      "Asia/Beirut,+02.00",
      "Africa/Cairo,+02.00",
      "Asia/Gaza,+02.00",
      "Africa/Blantyre,+02.00",
      "Asia/Jerusalem,+02.00",
      "Europe/Minsk,+02.00",
      "Asia/Damascus,+02.00",
      "Europe/Moscow,+03.00",
      "Africa/Addis_Ababa,+03.00",
      "Asia/Tehran,+03.30",
      "Asia/Dubai,+04.00",
      "Asia/Yerevan,+04.00",
      "Asia/Kabul,+04.30",
      "Asia/Yekaterinburg,+05.00",
      "Asia/Tashkent,+05.00",
      "Asia/Katmandu,+05.45",
      "Asia/Dhaka,+06.00",
      "Asia/Novosibirsk,+06.00",
      "Asia/Rangoon,+06.30",
      "Asia/Bangkok,+07.00",
      "Asia/Krasnoyarsk,+07.00",
      "Asia/Hong_Kong,+08.00",
      "Asia/Irkutsk,+08.00",
      "Australia/Perth,+08.00",
      "Australia/Eucla,+08.45",
      "Asia/Tokyo,+09.00",
      "Asia/Seoul,+09.00",
      "Asia/Yakutsk,+09.00",
      "Australia/Adelaide,+09.30",
      "Australia/Darwin,+09.30",
      "Australia/Brisbane,+10.00",
      "Australia/Hobart,+10.00",
      "Asia/Vladivostok,+10.00",
      "Australia/Lord_Howe,+10.30",
      "Etc/GMT-11,+11.00",
      "Asia/Magadan,+11.00",
      "Pacific/Norfolk,+11.30",
      "Asia/Anadyr,+12.00",
      "Pacific/Auckland,+12.00",
      "Etc/GMT-12,+12.00",
      "Pacific/Chatham,+12.45",
      "Pacific/Tongatapu,+13.00",
      "Pacific/Kiritimati,+14.00",
];
const baseurl = "https://s3.amazonaws.com/tarabalam/holiday"

class ShowCalculation extends Component {
  constructor() {
     super(); 
     this.state = {
          selecteddateday: '',
          selecteddatedaykey: 0,
          selecteddatemonth: 'January',
          selecteddatemonthkey: 0,
          selecteddateyear: '',
          selecteddateyearkey: 0,
          selectedbtmhh: '',
          selectedbtmhhkey: 0,
          selectedbtmmm: '',
          selectedbtmmmkey: 0,
          selectedbtmss: '',
          selectedbtmsskey: 0,
          selectedtimezone: '',
          selecttimezonekey: 0,
          timezonearraym: [],
          yeararraym: [],
          btmhharraym: [],
          btmmmarraym: [],
          btmssarraym: [],
     }     
  }

  componentDidMount() {       
     yeararray = []
     btmhharray = []
     btmmmarray = []
     btmssarray = []
     timezonearray = []

     this.setState({
          yeararraym: yeararray, 
          btmhharraym: btmhharray, 
          btmmmarraym: btmmmarray, 
          btmssarraym: btmssarray, 
          timezonearraym: timezonearray,
     })
     for(var i=0; i<aryIannaTimeZones.length; i++) {
          var onevalue = {
               key: i, 
               label: aryIannaTimeZones[i]
          }
          timezonearray.push(onevalue)
     }
     for(var j=2020; j>=1905; j--) {
          var onea = {
               key: 2020-j,
               label: j.toString()
          }
          yeararray.push(onea)
     }
     for(var k=0; k<24; k++){
          var stringlabel = ''
          if(k<10) {
               stringlabel = '0' + k.toString()
          } else {
               stringlabel = k.toString()
          }
          var oneb = {
               key: k,
               label: stringlabel
          }
          btmhharray.push(oneb)
     }
     for(var h=0; h<60; h++){
          var stringlabela = ''
          if(h<10) {
               stringlabela = '0' + h.toString()
          } else {
               stringlabela = h.toString()
          }
          var onec = {
               key: h,
               label: stringlabela
          }
          btmmmarray.push(onec)
          btmssarray.push(onec)
     }
     this.setState({
          yeararraym: yeararray, 
          btmhharraym: btmhharray, 
          btmmmarraym: btmmmarray, 
          btmssarraym: btmssarray, 
          timezonearraym: timezonearray,
     })
  }

  _onchangeDDValue = (itemvalue, itemIndex) => {    
     this.setState({selecteddateday: itemvalue, selecteddatedaykey: itemIndex});
  }
  _onchangeDMValue = (itemvalue, itemIndex) => {    
     this.setState({selecteddatemonth: itemvalue, selecteddatemonthkey: itemIndex});
  }
  _onchangeDYValue = (itemvalue, itemIndex) => {    
     this.setState({selecteddateyear: itemvalue, selecteddateyearkey: itemIndex});
  }
  _onchangeBHHValue = (itemvalue, itemIndex) => {    
     this.setState({selectedbtmhh: itemvalue, selectedbtmhhkey: itemIndex});
  }
  _onchangeBMMValue = (itemvalue, itemIndex) => {    
     this.setState({selectedbtmmm: itemvalue, selectedbtmmmkey: itemIndex});
  }
  _onchangeBSSValue = (itemvalue, itemIndex) => {    
     this.setState({selectedbtmss: itemvalue, selectedbtmsskey: itemIndex});
  }
  _onchangeTimeZoneValue = (itemvalue, itemIndex) => {    
     this.setState({selectedtimezone: itemvalue, selecttimezonekey: itemIndex});
  }

    calculate = () => {
         if(this.state.selecteddateday == '') {
              Alert.alert("Error", 'Select your day')
         }
         if(this.state.selecteddatemonth == '') {
              Alert.alert("Error", 'Select your month')
         }
         if(this.state.selecteddateyear == '') {
              Alert.alert("Error", 'Select your year')
         }
         if(this.state.selectedbtmhh == '') {
              Alert.alert("Error", 'Select your time')
         }
         if(this.state.selectedbtmmm == '') {
              Alert.alert("Error", 'Select your min')
         }
         if(this.state.selectedbtmss == '') {
              Alert.alert("Error", 'Select your sec')
         }
         if(this.state.selectedtimezone == '') {
              Alert.alert("Error", 'Select your Place')
         } 
         var placestr = 'IN'
         var monthstr = this.state.selecteddatemonthkey + 1
         var jsonurl = baseurl + '_' + this.state.selecteddateyear+ '_' + monthstr + '_' + placestr + '.json'
         console.log(jsonurl)

         fetch(jsonurl)
          .then(response => response.json())
          .then(data => { 
               if (data['data']) {
                    let returnData = data['data']
                    let brithstar0 = returnData[0]['carePlanName'] 
                    Alert.alert("", "Your birth star: " + brithstar0)
                    this.props.onClickedConfirmBtn(returnData, brithstar0)                    
               } else {
                    console.log('No data') 
               }
          })
          .catch(error => console.log(error)); 

    }
    
    cancel = () => {
       this.props.onClickedConfirmCancel()
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <View style={styles.titleview}>
                        <Text style={{textAlign : 'center', fontSize: 18, color: 'white'}}>Know Your Birth Star</Text>
                    </View>
                    <View style={styles.contentview}>
                         <View style={{flexDirection: 'column', width: '100%', height: 180, alignItems: 'center', justifyContent: 'center'}}>
                              <View style={{width: '100%', height: 60, alignItems: 'flex-start', justifyContent: 'flex-end'}}>
                                   <Text style={{fontSize: 15, marginLeft: 10, marginBottom: 3}}>Enter your Date of Birth</Text>
                              </View>
                              <View style={{width: '98%', height: 40}}>
                                   <ModalPicker
                                   data={datearray}
                                   accessible={true}
                                   scrollViewAccessibilityLabel={'Scrollable options'}
                                   cancelButtonAccessibilityLabel={'Cancel Button'}
                                   onChange={(option)=>this._onchangeDDValue(option.label, option.key)}
                                   >
                                        <View style={{borderRadius: 5, borderWidth:1, borderColor:'#bebebe', width: '100%', height: '100%',  flexDirection: 'row',}}>
                                             <View style={{borderRadius: 5, borderWidth:1, borderColor:'white', flex: 1, height: '100%', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row'}}>
                                                  <TextInput
                                                       style={{width: '100%', height: '100%', textAlignVertical: 'center', fontSize: 13, marginLeft: 20,}}
                                                       editable={false}
                                                       value={this.state.selecteddateday}></TextInput>
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
                                   data={montharray}
                                   accessible={true}
                                   scrollViewAccessibilityLabel={'Scrollable options'}
                                   cancelButtonAccessibilityLabel={'Cancel Button'}
                                   onChange={(option)=>this._onchangeDMValue(option.label, option.key)}
                                   >
                                        <View style={{borderRadius: 5, borderWidth:1, borderColor:'#bebebe', width: '100%', height: '100%',  flexDirection: 'row',}}>
                                             <View style={{borderRadius: 5, borderWidth:1, borderColor:'white', flex: 1, height: '100%', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row'}}>
                                                  <TextInput
                                                       style={{width: '100%', height: '100%', textAlignVertical: 'center', fontSize: 13, marginLeft: 20,}}
                                                       editable={false}
                                                       value={this.state.selecteddatemonth}></TextInput>
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
                                   data={this.state.yeararraym}
                                   accessible={true}
                                   scrollViewAccessibilityLabel={'Scrollable options'}
                                   cancelButtonAccessibilityLabel={'Cancel Button'}
                                   onChange={(option)=>this._onchangeDYValue(option.label, option.key)}
                                   >
                                        <View style={{borderRadius: 5, borderWidth:1, borderColor:'#bebebe', width: '100%', height: '100%',  flexDirection: 'row',}}>
                                             <View style={{borderRadius: 5, borderWidth:1, borderColor:'white', flex: 1, height: '100%', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row'}}>
                                                  <TextInput
                                                       style={{width: '100%', height: '100%', textAlignVertical: 'center', fontSize: 13, marginLeft: 20,}}
                                                       editable={false}
                                                       value={this.state.selecteddateyear}></TextInput>
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
                         <View style={{flexDirection: 'column', width: '100%', height: 180, alignItems: 'center', justifyContent: 'center'}}>
                              <View style={{width: '100%', height: 60, alignItems: 'flex-start', justifyContent: 'flex-end'}}>
                                   <Text style={{fontSize: 15, marginLeft: 10, marginBottom: 3}}>Enter your Birth Time(hh24-min-ss)</Text>
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
                              <View style={{width: '100%', height: 7}}></View>
                              <View style={{width: '98%', height: 40}}>
                                   <ModalPicker
                                   data={this.state.btmssarraym}
                                   accessible={true}
                                   scrollViewAccessibilityLabel={'Scrollable options'}
                                   cancelButtonAccessibilityLabel={'Cancel Button'}
                                   onChange={(option)=>this._onchangeBSSValue(option.label, option.key)}
                                   >
                                        <View style={{borderRadius: 5, borderWidth:1, borderColor:'#bebebe', width: '100%', height: '100%',  flexDirection: 'row',}}>
                                             <View style={{borderRadius: 5, borderWidth:1, borderColor:'white', flex: 1, height: '100%', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row'}}>
                                                  <TextInput
                                                       style={{width: '100%', height: '100%', textAlignVertical: 'center', fontSize: 13, marginLeft: 20,}}
                                                       editable={false}
                                                       value={this.state.selectedbtmss}></TextInput>
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
                         <View style={{flexDirection: 'column', width: '100%', height: 90, alignItems: 'center', justifyContent: 'center',}}>
                              <View style={{width: '100%', height: 50, alignItems: 'flex-start', justifyContent: 'flex-end'}}>
                                   <Text style={{fontSize: 15, marginLeft: 10, marginBottom: 3}}>Place of Birth: </Text>
                              </View>
                              <View style={{width: '98%', height: 40}}>
                                   <ModalPicker
                                   data={this.state.timezonearraym}
                                   accessible={true}
                                   scrollViewAccessibilityLabel={'Scrollable options'}
                                   cancelButtonAccessibilityLabel={'Cancel Button'}
                                   onChange={(option)=>this._onchangeTimeZoneValue(option.label, option.key)}
                                   >
                                        <View style={{borderRadius: 5, borderWidth:1, borderColor:'#bebebe', width: '100%', height: '100%',  flexDirection: 'row',}}>
                                             <View style={{borderRadius: 5, borderWidth:1, borderColor:'white', flex: 1, height: '100%', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row'}}>
                                                  <TextInput
                                                       style={{width: '100%', height: '100%', textAlignVertical: 'center', fontSize: 13, marginLeft: 20,}}
                                                       editable={false}
                                                       value={this.state.selectedtimezone}></TextInput>
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
                              <TouchableOpacity onPress={()=> this.calculate()} style={{borderColor : '#F0C600', borderWidth: 2, borderRadius: 25, width : 100 ,
                              height : 35, alignItems : 'center', justifyContent : 'center', backgroundColor: '#F0C600'}}>
                                   <Text style={{textAlign : 'center', color: 'white', fontSize: 15}}>Calculate</Text>
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
        height: 580,
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
            height: 450,
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

ShowCalculation.propType = {
    onClickedConfirmBtn : PropTypes.func,
    onClickedConfirmCancel : PropTypes.func,
}

export default ShowCalculation