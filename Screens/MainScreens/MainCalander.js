
import React, {Component} from 'react';
import { StyleSheet, Image, TouchableOpacity
    , View, Text, TextInput, Alert, ActivityIndicator, ScrollView, Picker, Platform, AsyncStorage } from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import ModalPicker from 'react-native-modal-selector';
import SideMenuScreen from '../MainScreens/SideMenuScreen';
import Drawer from 'react-native-drawer'
import GlobalAssests from "../Global/GlobalAssests.js";
import ShowHolidayInfo from '../Global/ShowHolidayInfo';
import ShowCalculation from '../Global/ShowCalculation';
import ShowHolidays from '../Global/ShowHolidays';
import ShowReminder from '../Global/ShowReminder';
import Moment from 'moment';
import PushNotification from 'react-native-push-notification';
import momentTZ from 'moment-timezone';
import ShowStarCity from '../Global/ShowSharCity';

const resetAction = (routeName) => StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({routeName: routeName}),
  ]
});

const birtharray = [
     {name: 'Aswini'},
     {name: 'Bharani'},
     {name: 'Krithika/Karthigai'},
     {name: 'Rohini'},
     {name: 'Mrigasira/Mrigasheersham'},
     {name: 'Aardhra/Thiruvaathirai'},
     {name: 'Punarvasu/Punarpoosam'},
     {name: 'Pushyami/Poosam'},
     {name: 'Ashlesha/Aayilyam'},
     {name: 'Magha/Makam'},
     {name: 'Poorva Phalguni/Pooram'},
     {name: 'Uttara Phalguni/Uthiram'},
     {name: 'Hastha/Hastham'},
     {name: 'Chitra/Chithirai'},
     {name: 'Swaathi'},
     {name: 'Vishaaka/Visaakam'},
     {name: 'Anuraadha/Anusham'},
     {name: 'Jyeshta/Kettai'},
     {name: 'Moola/Moolam'},
     {name: 'Poorvashada/Pooraadam'},
     {name: 'Utharashada/Uthiraadam'},
     {name: 'Shraavan/Thiruvonam'},
     {name: 'Dhanishta/Avittam'},
     {name: 'Shathabisha/Chathayam'},
     {name: 'Poorvabhadhra/Poorattathi'},
     {name: 'Uttarabhadhra/Uthirattathi'},
     {name: 'Revathi'},
]

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
const arealist = [
     {name: 'NewYork'},
     {name: 'Chicago'},
     {name: 'India'},
     {name: 'Los Angeles'},
]
const arealist1 = [
     {key: 0, label: 'NewYork'},
     {key: 1, label: 'Chicago'},
     {key: 3, label: 'India'},
     {key: 4, label: 'Los Angeles'},
]
var returnEvents = []
var eventsArray = []

const baseURL = 'https://s3.amazonaws.com/tarabalam/events'
const baseURLHoliday = "https://s3.amazonaws.com/tarabalam/holiday"

export default class MainCalander extends Component {     
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      selectedbirth: '0',
      selectbirthkey: 0,
      selectedarea: '0',
      selectedareakey: 0,
      jsondata: [],
      calendarflag: false,
      eventsArrayList: [],
      todaydate: '',
      currentJsonUrl: '',
      selectedYear: '2020',
      selectedMonth: '1',

      showModal: false,
      mselecteddate: '',
      mtithi: '',
      mmasam: '',
      mnaksha1: '',
      mnaksha1_t: '',
      mnaksha2: '',
      mnaksha2_t: '',
      mvarj: '',
      mdurmu: '',
      mdaystartdes: '',
      mdayenddes: '',

      showCalc: false,
      showStarCity: false,
      holidaylist: [],
      showHolidays: false,
      showReminder: false,
      notitimehh: 8,
      notitimemm: 0,
    };
  }
  
  openDrawer = () => {
     this._drawer.open()
   }
   
   closeDrawer = () => {
     this._drawer.close()
   }

  componentDidMount() { 

     PushNotification.configure({
          onRegister: function(token) {
               console.log("TOKEN:", token);
          },
          onNotification: function (notification) {
            //console.log('NOTIFICATION:', notification)
            const clicked = notification.userInteraction;
            if (clicked) {
               //console.log('NOTIFICATION is clicked')
            } 
          },  
          popInitialNotification: true,
          // IOS ONLY (optional): default: all - Permissions to register.
          permissions: {
               alert: true,
               badge: true,
               sound: true
          },
          requestPermissions: true,
          visibility: 'public',
     });

     this.setState({todaydate: Date()})
     var todayyear = Moment().format("YYYY"); 
     var todaymonth = Moment().format("M"); 
     this.setState({selectedYear: todayyear, selectedMonth: todaymonth})         
     var jsonURL = baseURL + '_'+ todayyear +'_' + todaymonth + '_IN.json'
     this.setState({currentJsonUrl: jsonURL})
     returnEvents = []
     var birthkey = this.state.selectbirthkey
     this.setState({jsondata: [], calendarflag: false})

     fetch(jsonURL)
      .then(response => response.json())
      .then(data => {
           if (data['data']) {
                let returnData = data['data'] 
                returnEvents = this.eventsConverter(returnData, birthkey)
                this.setState({jsondata: returnEvents}) 
                this.getDayListFromJson()
                PushNotification.cancelAllLocalNotifications()
                this._onPresentToday(this.state.eventsArrayList)
           } else {
                console.log('No data') 
           }
      })
      .catch(error => console.log(error));

      var jsonurlHoliday = baseURLHoliday + '_'+ todayyear +'_' + todaymonth + '_IN.json'

      fetch(jsonurlHoliday)
       .then(response => response.json())
       .then(data => { 
            if (data['data']) {
                 let returnData = data['data']
                 let brithstar0 = returnData[0]['carePlanName'] 
                 this.setState({holidaylist: returnData}) 
                 this.showPushNotificationForHoliday()                                   
            } else {
                 console.log('No data') 
            }
       })
       .catch(error => console.log(error)); 

    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      () => { 
        this.closeDrawer()
        this._retrieveData()
      },
    );
  }

  getNumberStrfrom(str) {
     var fstr = ''
     var upstr = str.substring(0, 1)
     if(upstr == '0') {
          fstr = str.substring(1, 2)
     } else {
          fstr = str
     }
     return fstr
  }

  showPushNotificationForHoliday() {
       let holidayarray = this.state.holidaylist
       if(holidayarray.length > 0) {
            for(var index=0; index<holidayarray.length; index++) {
                 let indexedstr = holidayarray[index]["carePlanName"]
                 let datestr = indexedstr.substring(0, 2);
                 let fdatestr = this.getNumberStrfrom(datestr)
                 let holidaystr = indexedstr.substring(5, indexedstr.length);
                 var todayY = Moment().format("YYYY"); 
                 var todayM = Moment().format("MM");
                 let fetcheddate = todayY + '_' + todayM + '_' + fdatestr
                 var todayDDS = Moment().format("D"); 
                 var todayDDN = parseInt(todayDDS, 10) + 1; 
                 var todayDC = todayDDN.toString(); 
                 let calulatedate = todayY + '_' + todayM + '_' + todayDC
                 if(calulatedate == fetcheddate) {
                    this.showNotificationH("Holiday", "Tomorrow is Holiday" + " : " + holidaystr)
                 }
            }
       }
  }

  showNotificationH(mtitle, mmessage) {
     PushNotification.localNotification({
          id: '0',
          title: mtitle, 
          message: mmessage, 
     });
   }

   showNotification(mtitle, mmessage) {
     let notifDate = new Date();
     notifDate.setHours(this.state.notitimehh, this.state.notitimemm, 0);
     PushNotification.localNotificationSchedule({
          id: '0',
          title: mtitle, 
          message: mmessage, 
          repeatType: 'day',
          date: notifDate,
     });
   }

   showNotification_Reminder(timehh, timemm, mtitle, mmessage) {
     let notifDate = new Date();
     notifDate.setHours(timehh, timemm, 0);
     PushNotification.localNotificationSchedule({
          id: '0',
          title: mtitle, 
          message: mmessage, 
          repeatType: 'day',
          date: notifDate,
     });
   }

  _onPressButton(value) {       
     switch (value) {
       case "menu":
         this.openDrawer()
         break;
       case 'birthstate':
          this.setState({showCalc: true})
         break;
     }
   }

   loadBirthArray() {
     return birtharray.map((birth, idx) => (
        <Picker.Item color={'#496582'} label={birth.name} value={birth.name} key={idx}/>
     ))
   } 

   loadAreaArray() {
     return arealist.map((area, idx) => (
        <Picker.Item color={'#496582'} label={area.name} value={area.name} key={idx}/>
     ))
   } 

   _onchangeBirthValue(itemvalue, itemIndex) {    
     this.setState({selectedbirth: itemvalue, selectbirthkey: itemIndex});
     
     var jsonURL = this.state.currentJsonUrl     
     var birthkey = itemIndex
     returnEvents = []
     this.setState({jsondata: [], calendarflag: false})

     fetch(jsonURL)
      .then(response => response.json())
      .then(data => { 
           if (data['data']) {
                let returnData = data['data'] 
                returnEvents = this.eventsConverter(returnData, birthkey)
                this.setState({jsondata: returnEvents})
                this.getDayListFromJson()
                PushNotification.cancelAllLocalNotifications()
                this._onPresentToday_Reminder(this.state.notitimehh, this.state.notitimemm, this.state.eventsArrayList)
           } else {
                console.log('No data') 
           }
      })
      .catch(error => console.log(error)); 

      this._storeDataStar()
   }

   _storeMultiValues = async (mstar, mstarkey, mcity, mcitykey) => {
     try {
          await AsyncStorage.setItem('profilestar', mstar);
          let birthkey = mstarkey.toString()
          await AsyncStorage.setItem('profilestarkey', birthkey);
          await AsyncStorage.setItem('profilearea', mcity);
          let areakey = mcitykey.toString()
          await AsyncStorage.setItem('profileareakey', areakey);
        } catch (error) {
          // Error saving data
          console.log('Error saving data') 
        }
   }

   _storeAppFirst = async () => {
     try {
       await AsyncStorage.setItem('usedtimes', "1");
     } catch (error) {
       // Error saving data
       console.log('Error saving data') 
     }
   };

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

   _onchangeAreaValue(itemvalue, itemIndex) {    
     this.setState({selectedarea: itemvalue, selectedareakey: itemIndex});
     this._storeDataArea()
   }

   ordinal_suffix_of(i) {
     var j = i % 10,
         k = i % 100;
     if (j == 1 && k != 11) {
         return i + "st";
     }
     if (j == 2 && k != 12) {
         return i + "nd";
     }
     if (j == 3 && k != 13) {
         return i + "rd";
     }
     return i + "th";
 }

   _onPressDay(date, state, eventarray) {        
     let mstring = Moment(date.dateString).format('MMM')
     let dstring = this.ordinal_suffix_of(date.day)
     let dateStr = mstring + ' ' + dstring

     let index = date.day - 1
     if(state === 'disabled') {
     } else {
          let selecteddate = dateStr
          let tithi = eventarray[index]['tithi']
          let masam = eventarray[index]['schedulePatternDetail']
          let naksha1 = eventarray[index]['star1name']
          let naksha1_t = eventarray[index]['starttill1']
          let naksha2 = eventarray[index]['star2name']
          let naksha2_t = eventarray[index]['starttill2']
          let varj = eventarray[index]['vardhyam']
          let durmu = eventarray[index]['durmuhurtha']
          let daystartdes = eventarray[index]['star1comment']
          let dayenddes = eventarray[index]['star2comment']
          this.setState({
               showModal: true,
               mselecteddate: selecteddate,
               mtithi: tithi,
               mmasam: masam,
               mnaksha1: naksha1,
               mnaksha1_t: naksha1_t,
               mnaksha2: naksha2,
               mnaksha2_t: naksha2_t,
               mvarj: varj,
               mdurmu: durmu,
               mdaystartdes: daystartdes,
               mdayenddes: dayenddes,
          }) 
     }
   }

   _onPresentToday(eventarray) {        
     let todaydate = Date()
     let mstring = Moment(todaydate).format('MMM')
     let nowday = Moment(todaydate).format('D')
     let dstring = this.ordinal_suffix_of(nowday)
     let dateStr = mstring + ' ' + dstring

     let index = nowday - 1
     let selecteddate = dateStr
     let tithi = eventarray[index]['tithi']
     let masam = eventarray[index]['schedulePatternDetail']
     let naksha1 = eventarray[index]['star1name']
     let naksha1_t = eventarray[index]['starttill1']
     let naksha2 = eventarray[index]['star2name']
     let naksha2_t = eventarray[index]['starttill2']
     let varj = eventarray[index]['vardhyam']
     let durmu = eventarray[index]['durmuhurtha']
     let daystartdes = eventarray[index]['star1comment']
     let dayenddes = eventarray[index]['star2comment']
          
     let bodytext = "From 12 am to " + naksha1_t + " " + naksha1 + ' ' + daystartdes + ' ,' 
     + "From " + naksha1_t + ' to ' + naksha2_t + ' ' + naksha2 + ' ' + dayenddes

     this.showNotification("Today’s Panchangam", bodytext)         
   }

   _onPresentToday_Reminder(timehh, timemm, eventarray) {        
     let todaydate = Date()
     let mstring = Moment(todaydate).format('MMM')
     let nowday = Moment(todaydate).format('D')
     let dstring = this.ordinal_suffix_of(nowday)
     let dateStr = mstring + ' ' + dstring
     let index = nowday - 1
     let selecteddate = dateStr
     let tithi = eventarray[index]['tithi']
     let masam = eventarray[index]['schedulePatternDetail']
     let naksha1 = eventarray[index]['star1name']
     let naksha1_t = eventarray[index]['starttill1']
     let naksha2 = eventarray[index]['star2name']
     let naksha2_t = eventarray[index]['starttill2']
     let varj = eventarray[index]['vardhyam']
     let durmu = eventarray[index]['durmuhurtha']
     let daystartdes = eventarray[index]['star1comment']
     let dayenddes = eventarray[index]['star2comment']
          
     let bodytext = "From 12 am to " + naksha1_t + " " + naksha1 + ' ' + daystartdes + ' ,' 
     + "From " + naksha1_t + ' to ' + naksha2_t + ' ' + naksha2 + ' ' + dayenddes

     this.showNotification_Reminder(timehh, timemm, "Today’s Panchangam", bodytext)  
     this.setState({notitimehh: timehh, notitimemm: timemm})       
   }

   _onPressMonth(month) {
     var today = month.dateString
     this.setState({todaydate: today})
     var jsonURL = baseURL + '_'+ month.year +'_' + month.month + '_IN.json'
     this.setState({currentJsonUrl: jsonURL})
     this.setState({selectedYear: month.year, selectedMonth: month.month})
     
     var birthkey = this.state.selectbirthkey
     returnEvents = []
     this.setState({jsondata: [], calendarflag: false})

     fetch(jsonURL)
      .then(response => response.json())
      .then(data => { 
           if (data['data']) {
                let returnData = data['data'] 
                returnEvents = this.eventsConverter(returnData, birthkey)
                this.setState({jsondata: returnEvents})
                this.getDayListFromJson()
                PushNotification.cancelAllLocalNotifications()
                this._onPresentToday_Reminder(this.state.notitimehh, this.state.notitimemm, this.state.eventsArrayList)
           } else {
                console.log('No data') 
           }
      })
      .catch(error => console.log(error));     
   }

   eventsConverter(events, star) {
     events.forEach((evt) => {
       evt.start = Moment(evt.scheduleBeginDate, 'YYYY-MM-DD');
       evt.startformat = evt.scheduleBeginDate;
       evt.end = Moment(evt.scheduleEndDate, 'YYYY-MM-DD');
       evt.title = evt.carePlanID + '- ' + evt.Tithitill;
       evt = this.setEventStar(evt, star);
     });
     return events;
   }

   setEventStar(evt, star) {
     var x=0;
     var  e;
     var  m;
     var  a;
     var  n;
     var star1percentage = 0;
     var star2percentage = 0;
     var totalminutestar1 = 0;
     var totalminutestar2 = 0;
     var star11 = 0;
     var star12 = 0;
     var stara1 = 0;
     var stara2 = 0;
     var starsource = 0;
     totalminutestar1 = parseInt(evt.starttill1.split(':')[0]) * 60 + parseInt(evt.starttill1.split(':')[1]);
     star1percentage = (parseInt(totalminutestar1) / 1440) * 100;
     var stararr = ["Aswini","Bharani" ,"Krithika/Karthigai", "Rohini","Mrigasira/Mrigasheersham","Aardhra/Thiruvaathirai","Punarvasu/Punarpoosam","Pushyami/Poosam" ,"Ashlesha/Aayilyam","Magha/Makam","Poorva Phalguni/Pooram","Uttara Phalguni/Uthiram","Hastha/Hastham","Chitra/Chithirai","Swaathi","Vishaaka/Visaakam","Anuraadha/Anusham","Jyeshta/Kettai","Moola/Moolam","Poorvashada/Pooraadam","Utharashada/Uthiraadam","Shraavan/Thiruvonam","Dhanishta/Avittam","Shathabisha/Chathayam","Poorvabhadhra/Poorattathi","Uttarabhadhra/Uthirattathi","Revathi"];
     starsource = star;
     if (star > 9) {
       starsource = star%9;
     }
     stara1=evt.star1;
     if (evt.star1 > 9) {
       stara1 = evt.star1%9;
     }
     if ( (parseInt(starsource) ==  parseInt(stara1) )) {
       star11 =  1;
     }
     var z = Math.abs(parseInt(starsource) - parseInt(stara1));
     if ( (parseInt(starsource) <  parseInt(stara1)) ) {
       star11 = z + 1;
     }
     if ( (parseInt(starsource) >  parseInt(stara1)) ) {
       star11 = 9 - Math.abs(parseInt(starsource) - parseInt(stara1)) +1;
     }
     if (evt.starcount > 1) {
       totalminutestar2 = parseInt(evt.starttill2.split(':')[0]) *60 + parseInt(evt.starttill2.split(':')[1]);
       star2percentage = (parseInt(totalminutestar2) / 1440) * 100- (parseInt(totalminutestar1)/1440) * 100;
       stara2=evt.star2;
       if (stara2 > 9) {
         stara2=evt.star2%9
       }
       if ( (parseInt(starsource) ==  parseInt(stara2)) ) {
         star12 =  1;
       }
       var z1 = Math.abs(parseInt(starsource) - parseInt(stara2));
       if ( (parseInt(starsource) <  parseInt(stara2)) ) {
         star12 = z1 + 1;
       }
       if ( (parseInt(starsource) >  parseInt(stara2)) ) {
         star12 = 9-Math.abs(parseInt(starsource) - parseInt(stara2)) +1 ;
       }
     }
     if( star11 == 2 || star11 == 4 || star11 == 6 || star11 == 8 ||star11 == 9 ) {
     //  evt.title =stararr[evt.careFor-1]+"-"+evt.title.substring(evt.title.lastIndexOf("-") + 1);
       star1percentage =   star1percentage * 1
     } else {
     //  evt.title =stararr[evt.careFor-1]+"-"+evt.title.substring(evt.title.lastIndexOf("-") + 1);
       star1percentage  =  star1percentage * -1
     }
     var significance = ['Good Day','Janma Tara -Not a Good Day to Start New Work',
        'Sampatha Tara -Good to Start Work or Travel',
        'Vipatha Tara -Not Good for Work, Dangers & Crisis',
        'Kshema Tara -Good for Work',
         'Pratyaka Tara -Obstacles',
         'Sadhana Tara -Achievements',
         'Naidhana Tara -Misfortunes',
         'Mitra Tara -Wealth & Pleasures',
         'Parama Mitra Tara -Very Good Day for Work',
       ];
     evt.star1comment=significance[star11];
     if (evt.starcount > 1) {
       evt.star2comment=significance[star12];
     }
     if( star12 == 2 || star12 == 4 || star12 == 6 || star12 == 8 ||star12 == 9 ) {
       //  evt.title =stararr[evt.careFor-1]+"-"+evt.title.substring(evt.title.lastIndexOf("-") + 1);
       star2percentage=  star2percentage * 1
     } else {
       //  evt.title =stararr[evt.careFor-1]+"-"+evt.title.substring(evt.title.lastIndexOf("-") + 1);
       star2percentage  =  star2percentage * -1
     }
     var y =0;
     var y= parseInt(star1percentage) + parseInt(star2percentage);
     if (( y  > 0) && (y < 99)) {
       x=2;
     }
     else if (y == 0) {
       x=1;
     }
     else if  (y == 99) {
       x=3;
     }
     else if (( y < 0) && (y > -99)) {
       x =1;
     }
     else if  (y == - 99) {
       x=5;
     }
     evt.className = 'myClass' + this.eventClassConverter(evt) + x;
     evt.schedulePatternDetail =evt.schedulePatternDetail;
     evt.tithi=evt.scheduleComment.split('~')[0];
     evt.durmuhurtha=evt.scheduleComment.split('~')[1];
     evt.vardhyam=evt.scheduleComment.split('~')[2];
     evt.carePlanName = stararr[evt.careFor-1];
     evt.star1name = stararr[evt.star1-1];
     if ( evt.starcount > 1) {
       evt.star2name = stararr[evt.star2 - 1];
     }
     evt.evtType = 'FD';
     return evt;
   }

   eventClassConverter(evt) {
     var carePlanID = evt.carePlanID;
     var firstArr = ['Dwadasi', 'Ashtami', 'Navami', 'Chavati', 'Amavasya'];
     var sencondArr = ['Amavasya', 'Chaturdasi', 'Padyami', 'Sashti'];
     var thirdArr = ['Tadiya', 'Vidiya', 'Pournami', 'Panchami', 'Trayodasi', 'Sapthami', 'Dasami', 'Ekadasi'];
     if (firstArr.includes(carePlanID)) {
       return 1;
     }
     if (sencondArr.includes(carePlanID)) {
       return 2;
     }
     if (thirdArr.includes(carePlanID)) {
       return 3;
     }
     else {
       // console.log(carePlanID);
       return 3;
     }
   }

   getIdFromUrl(url) {
     const partials = url.split('/');
     return partials[partials.length-1];
   }

   youtubeParse(url) {
     const id = url.split('/').pop();
     return [ 'https://youtube.com/embed', id ].join('/');
   }

   getDayListFromJson() {         
     eventsArray = []
     this.setState({eventsArrayList: [], calendarflag: false})
     for(var i=0 ; i<returnEvents.length; i++) {
          var onejson = {}
          var onevalue = {}          
          var StarShape = GlobalAssests.Star3
          var StarTextColor = 'green'
          var StarText = ''
          var classname = 'myClass12'
          onejson = returnEvents[i]

          classname = onejson["className"]
          StarText = onejson["title"] 

          var Tithi = ''
          var SchedulePatternDetail = ''
          var Star1name = ''
          var Starttill1 = ''
          var Star1comment = ''
          var Star2name = 'Null'
          var Starttill2 = ''
          var Star2comment = ''
          var Vardhyam = ''
          var Durmuhurtha = ''

          Tithi = onejson["tithi"]
          SchedulePatternDetail = onejson["schedulePatternDetail"]
          Star1name = onejson["star1name"]
          Starttill1 = onejson["starttill1"]
          Star1comment = onejson["star1comment"]
          Star2name = onejson["star2name"]
          Starttill2 = onejson["starttill2"]
          Star2comment = onejson["star2comment"]
          Vardhyam = onejson["vardhyam"]
          Durmuhurtha = onejson["durmuhurtha"]

          switch(classname) {
               case "myClass11":
                    StarShape = GlobalAssests.Star1
               break;
               case "myClass21":
                    StarShape = GlobalAssests.Star1
               break;
               case "myClass31":
                    StarShape = GlobalAssests.Star1
               break;
               case "myClass12":
                    StarShape = GlobalAssests.Star3
               break;
               case "myClass22":
                    StarShape = GlobalAssests.Star3
               break;
               case "myClass32":
                    StarShape = GlobalAssests.Star3
               break;
               case "myClass13":
                    StarShape = GlobalAssests.Star4
               break;
               case "myClass23":
                    StarShape = GlobalAssests.Star4
               break;
               case "myClass33":
                    StarShape = GlobalAssests.Star4
               break;
               case "myClass15":
                    StarShape = GlobalAssests.Star2
               break;
               case "myClass25":
                    StarShape = GlobalAssests.Star2
               break;
               case "myClass35":
                    StarShape = GlobalAssests.Star2
               break;
          }
          onevalue = {
               starShape : StarShape,
               starText : StarText,
               tithi : Tithi,
               schedulePatternDetail : SchedulePatternDetail,
               star1name : Star1name,
               starttill1 : Starttill1,
               star1comment : Star1comment,
               star2name : Star2name,
               starttill2 : Starttill2,
               star2comment : Star2comment,
               vardhyam : Vardhyam,
               durmuhurtha : Durmuhurtha,
          }
          eventsArray.push(onevalue)
     }
     this.setState({eventsArrayList: eventsArray, calendarflag: true})
   }

   renderDayComponent ( {date, state} ) {
     let todayday = Moment().format('D')  
     let todaymonth = Moment().format('M') 
     let todayyear = Moment().format('YYYY') 
     
     let todayflag = false
     if((todayday == date.day) && (todaymonth == date.month) && (todayyear == date.year)) {
          todayflag = true
     }
     let dataflag = false
     if(this.state.eventsArrayList[date.day - 1]) {
          dataflag = true
     }

     return (
          <TouchableOpacity style={{width: '100%', height: 120, backgroundColor: 'white', flexDirection: 'column',
               alignItems: 'center', justifyContent: 'center', borderWidth: 0.3, borderColor: '#c82713'}}                                                    
               disabled={state === 'disabled' ? true : false }
               onPress={() => this._onPressDay(date, state, this.state.eventsArrayList)}>
               {
                    todayflag ? 
                    <View style={{borderTopWidth: 0.3, borderTopColor: '#c82713', width: '100%', height: 40, alignItems: 'flex-end', justifyContent: 'center', backgroundColor: '#b0ebfa'}}>
                         <Text style={{textAlign: 'center', color: '#2d4150', fontSize: 22, marginRight: 5}}>{todayday} 
                         </Text>
                    </View> 
                    :
                    <View style={{width: '100%', height: 40, alignItems: 'flex-end', justifyContent: 'center'}}>
                         <Text style={{textAlign: 'center', color: state === 'disabled' ? '#d9e1e8' : '#2d4150',
                                   fontSize: 22, marginRight: 5}}>{date.day} 
                         </Text>
                    </View> 
               }
               <View style={{width: '100%', height: 40, alignItems: 'center', justifyContent: 'center'}}>
                    {
                         state === 'disabled' ?
                         null
                         :
                         <Image style={styles.calendardayimage} source={dataflag ? this.state.eventsArrayList[date.day - 1]['starShape'] : GlobalAssests.Star3}></Image>
                    }                                                       
               </View>
               <View style={{width: '100%', height: 40, alignItems: 'center', justifyContent: 'center'}}>
                    {
                         state === 'disabled' ?
                         null
                         :
                         <Text style={{textAlign: 'center', color: 'green', fontSize: 11,}}>{dataflag ? this.state.eventsArrayList[date.day - 1]['starText'] : ''}
                         </Text>
                    }
               </View>  
          </TouchableOpacity>
     );
   }


   doSomething(textvalue){
     this._drawer.close()
     if(textvalue == "profile")
     {
          this.setState({showStarCity: true})
     }
     if(textvalue == "holidays")
     {
          this.setState({showHolidays: true})
     }
     if(textvalue == "reminder")
     {
          this.setState({showReminder: true})
     }
  }

  render() {
    return (
     <Drawer
           ref={(ref) => this._drawer = ref}
           type="overlay"
           content={<SideMenuScreen navigation={this.props.navigation} closeSelf={(textvalue)=> this.doSomething(textvalue)}/>}
           tapToClose={true}
           openDrawerOffset={0.25} // 20% gap on the right side of drawer
           panCloseMask={0.2}
           closedDrawerOffset={-2}
           styles={drawerStyles}
           tweenHandler={(ratio) => ({
           main: { opacity:(2-ratio)/2 },
           })}
     >
          <ScrollView style={this.state.showModal ? [styles.scrollviewcontent, {opacity: 0.8}] : styles.scrollviewcontent }>
               <View style={styles.containerv}>
                    <View style={styles.viewtitile}>
                         <View style={styles.menuview}>
                              <TouchableOpacity onPress={() => this._onPressButton("menu")}>
                                   <Image style={styles.menuicon} source={GlobalAssests.Menubutton}></Image>
                              </TouchableOpacity>
                         </View>
                         <View style={styles.logoview}>
                              <Image style={styles.logoicon} source={GlobalAssests.AppLogo}></Image>
                              <Text style={{color: '#F0C600', fontSize: 30, marginLeft: 5}}>Tarabalam</Text>
                         </View>
                    </View>
                    <View style={styles.contentview}>
                         <View style={styles.selectview}>
                              <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
                                   <Text style={{color: 'white', fontSize: 16, marginLeft: 15, marginBottom: 5}}>Select your Birth Star : </Text>
                                   <View style={{borderRadius: 5, width: '95%', height: 40, justifyContent: 'center', alignSelf: 'center', backgroundColor: 'white'}}>
                                        {
                                             Platform.OS == "android" ?
                                             <Picker
                                             extraData={this.state}
                                             selectedValue={this.state.selectedbirth}
                                             onValueChange={(itemvalue, itemIndex) => 
                                                  this._onchangeBirthValue(itemvalue, itemIndex)
                                             }>
                                             {this.loadBirthArray()}
                                             </Picker>  
                                             :
                                             // Wrapper
                                             <ModalPicker
                                             data={birtharray1}
                                             accessible={true}
                                             scrollViewAccessibilityLabel={'Scrollable options'}
                                             cancelButtonAccessibilityLabel={'Cancel Button'}
                                             onChange={(option)=>this._onchangeBirthValue(option.label, option.key)}>
                                                  <View style={{borderRadius: 5, borderWidth:1, borderColor:'white', width: '100%', height: '100%', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row'}}>
                                                       <View style={{borderRadius: 5, borderWidth:1, borderColor:'white', flex: 1, height: '100%', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row'}}>
                                                            <TextInput
                                                                 style={{width: '100%', height: '100%', textAlignVertical: 'center', fontSize: 17, marginLeft: 20,}}
                                                                 editable={false}
                                                                 value={this.state.selectedbirth}></TextInput>
                                                       </View>
                                                       <View style={{borderRadius: 5, borderWidth:1, borderColor:'white', width: 40, height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>                                                            
                                                            <TouchableOpacity style={{width: 30, height: '100%', alignItems: 'center', justifyContent: 'center',}}>
                                                                 <Image style={{width: 12, height: 8, resizeMode: 'stretch'}} source={GlobalAssests.Down}></Image>
                                                            </TouchableOpacity>
                                                       </View>
                                                  </View>
                                             </ModalPicker>
                                        }
                                   </View>
                                   <TouchableOpacity onPress={() => this._onPressButton("birthstate")}>
                                        <Text style={{color: 'white', fontSize: 13, marginLeft: 15, marginTop: 5}}>Don't Know your Birth Star?</Text>
                                   </TouchableOpacity>
                              </View>
                              <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
                                   <Text style={{color: 'white', fontSize: 16, marginLeft: 15, marginBottom: 5}}>Select your Calendar </Text>
                                   <View style={{borderRadius: 5, width: '95%', height: 40, justifyContent: 'center', alignSelf: 'center', backgroundColor: 'white'}}>
                                        {
                                             Platform.OS == "android" ?
                                             <Picker
                                             extraData={this.state}
                                             selectedValue={this.state.selectedarea}
                                             onValueChange={(itemvalue, itemIndex) => 
                                                  this._onchangeAreaValue(itemvalue, itemIndex)
                                             }>
                                             {this.loadAreaArray()}
                                             </Picker>  
                                             :
                                             // Wrapper
                                             <ModalPicker
                                             data={arealist1}
                                             accessible={true}
                                             scrollViewAccessibilityLabel={'Scrollable options'}
                                             cancelButtonAccessibilityLabel={'Cancel Button'}
                                             onChange={(option)=>this._onchangeAreaValue(option.label, option.key)}>
                                                  <View style={{borderRadius: 5, borderWidth:1, borderColor:'white', width: '100%', height: '100%', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row'}}>
                                                       <View style={{borderRadius: 5, borderWidth:1, borderColor:'white', flex: 1, height: '100%', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row'}}>
                                                            <TextInput
                                                                 style={{width: '100%', height: '100%', textAlignVertical: 'center', fontSize: 17, marginLeft: 20,}}
                                                                 editable={false}
                                                                 value={this.state.selectedarea}></TextInput>
                                                       </View>
                                                       <View style={{borderRadius: 5, borderWidth:1, borderColor:'white', width: 40, height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>                                                            
                                                            <TouchableOpacity style={{width: 30, height: '100%', alignItems: 'center', justifyContent: 'center',}}>
                                                                 <Image style={{width: 12, height: 8, resizeMode: 'stretch'}} source={GlobalAssests.Down}></Image>
                                                            </TouchableOpacity>
                                                       </View>
                                                  </View>
                                             </ModalPicker>
                                        }
                                   </View>
                              </View>
                         </View>
                         <View style={this.state.calendarflag ? [styles.calanderview, {height: 850}] : [styles.calanderview, {height: 450}]}>
                         {/* <View style={[styles.calanderview, {height: 910}]}> */}
                              {
                                   this.state.calendarflag ? 
                                   <Calendar   
                                        current={this.state.todaydate}                                                                       
                                        style={{
                                             backgroundColor: 'white',
                                             width: '100%',
                                             height: '100%',
                                        }}    
                                        onMonthChange={(month) => {this._onPressMonth(month)}}                         
                                        dayComponent={({date, state}) =>                                              
                                             this.renderDayComponent( {date, state} )
                                        }
                                        theme={{
                                             arrowColor: 'orange',
                                             monthTextColor: '#c82713',
                                             textMonthFontSize: 23,
                                             textSectionTitleColor: 'black',
                                             textDayHeaderFontSize: 15,
                                        }}
                                   />
                                   : 
                                   null
                              }
                         </View>
                         <View style={styles.lastview}></View>
                         <View style={styles.explainview}>
                              <View style={styles.oneview}>
                                   <View style={{width: '100%', height: 50, alignItems: 'flex-start', justifyContent: 'center'}}>
                                        <Text style={{color: 'white', fontSize: 20, marginLeft: 15, marginTop: 5}}>Get Your Personalized Muhurtha</Text>
                                   </View>
                                   <View style={{width: '95%', height: 300, alignItems: 'flex-start', justifyContent: 'center', backgroundColor: 'white'}}>
                                        <Text style={{color: '#c82713', fontSize: 17, marginLeft: 15, marginRight: 15}}>
                                             By undertaking ventures at auspicious times one can ward off the evils and ensure success.{'\n\n'}
                                             Suitable Months, Days, Thithi, Star, Lagnam, and other aspects are to be considered for fixing muhurthams.{'\n\n'}
                                             Email us at info@tarabal.com for fixing your Muhurtha
                                        </Text>
                                   </View>
                              </View>
                              <View style={styles.oneview}>
                                   <View style={{width: '100%', height: 50, alignItems: 'flex-start', justifyContent: 'center'}}>
                                        <Text style={{color: 'white', fontSize: 20, marginLeft: 15, marginTop: 5}}>Today's Panchang Indicator</Text>
                                   </View>
                                   <View style={{width: '95%', height: 285, alignItems: 'flex-start', justifyContent: 'center', backgroundColor: 'white', flexDirection: 'column'}}>
                                        <View style={{width: '100%', height: 15}}></View>
                                        <View style={{width: '100%', height: 65, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginLeft: 20}}>
                                             <Image style={styles.calendardayimage} source={GlobalAssests.Star1}></Image>
                                             <Text style={{color: '#c82713', fontSize: 20, marginLeft: 15}}>Partly Unfavourable</Text>
                                        </View>
                                        <View style={{width: '100%', height: 65, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginLeft: 20}}>
                                             <Image style={styles.calendardayimage} source={GlobalAssests.Star2}></Image>
                                             <Text style={{color: '#c82713', fontSize: 20, marginLeft: 15}}>Unfavourable</Text>
                                        </View>
                                        <View style={{width: '100%', height: 65, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginLeft: 20}}>
                                             <Image style={styles.calendardayimage} source={GlobalAssests.Star3}></Image>
                                             <Text style={{color: '#c82713', fontSize: 20, marginLeft: 15}}>Partly Favourable</Text>
                                        </View>
                                        <View style={{width: '100%', height: 65, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginLeft: 20}}>
                                             <Image style={styles.calendardayimage} source={GlobalAssests.Star4}></Image>
                                             <Text style={{color: '#c82713', fontSize: 20, marginLeft: 15}}>Very Favourable</Text>
                                        </View>
                                        <View style={{width: '100%', height: 10}}></View>
                                   </View>
                              </View>
                         </View>
                    </View>
               </View>
          </ScrollView>
        {
            this.state.showHolidays ?
                <View style={{ position: 'absolute', width: '100%', height: '100%'}}>
                    <ShowHolidays
                        onClickedConfirmBtn={() => 
                         {
                              this.setState({ showHolidays: false })}
                         }
                        selectedyear={this.state.selectedYear}
                        selectedmonth={this.state.selectedMonth}
                    />
                </View> : null
        }
        {
            this.state.showModal ?
                <View style={{ position: 'absolute', width: '100%', height: '100%'}}>
                    <ShowHolidayInfo
                        onClickedConfirmBtn={() => this.setState({ showModal: false })}
                        selecteddate={this.state.mselecteddate}
                        tithi={this.state.mtithi}
                        masam={this.state.mmasam}
                        naksha1={this.state.mnaksha1}
                        naksha1_t={this.state.mnaksha1_t}
                        naksha2={this.state.mnaksha2}
                        naksha2_t={this.state.mnaksha2_t}
                        varj={this.state.mvarj}
                        durmu={this.state.mdurmu}
                        daystartdes={this.state.mdaystartdes}
                        dayenddes={this.state.mdayenddes}
                        selectedbirth={this.state.selectedbirth}
                    />
                </View> : null
        }
        {
            this.state.showCalc ?
                <View style={{ position: 'absolute', width: '100%', height: '100%'}}>
                    <ShowCalculation
                        onClickedConfirmBtn={(data, star0) => 
                              {
                                   this.setState({ showCalc: false })
                                   if(birtharray.includes(star0)) {

                                   } else {
                                        let index = birtharray1.length
                                        birtharray1.push(
                                             {
                                                  key: index, 
                                                  label: star0
                                             }
                                        )
                                        birtharray.push(
                                             {
                                                  name: star0
                                             }
                                        )
                                   }
                              }
                         }
                         onClickedConfirmCancel={() => this.setState({ showCalc: false })}
                    />
                </View> : null
        }
        {
            this.state.showReminder ?
                <View style={{ position: 'absolute', width: '100%', height: '100%'}}>
                    <ShowReminder
                        onClickedConfirmBtn={(hhtime, mmtime) => 
                              {
                                   PushNotification.cancelAllLocalNotifications()
                                   this.setState({ showReminder: false })
                                   let timehhvalue = parseInt(hhtime)
                                   let timemmvalue = parseInt(mmtime)

                                   this._onPresentToday_Reminder(timehhvalue, timemmvalue, this.state.eventsArrayList)
                              }
                         }
                         stimehh={this.state.notitimehh.toString()}
                         stimemm={this.state.notitimemm.toString()}
                         onClickedConfirmCancel={() => this.setState({ showReminder: false })}
                    />
                </View> : null
        }
        {
            this.state.showStarCity ?
                <View style={{ position: 'absolute', width: '100%', height: '100%'}}>
                    <ShowStarCity
                    onClickedConfirm={(star, starkey, city, citykey) => 
                         {
                              this.setState({ 
                                   showStarCity: false,
                                   selectedbirth: star,
                                   selectbirthkey: starkey,
                                   selectedarea: city,
                                   selectedareakey: citykey,
                              })
                              this._storeAppFirst()
                              this._storeMultiValues(star, starkey, city, citykey)
                              
                              var jsonURL = this.state.currentJsonUrl                                 
                              returnEvents = []
                              this.setState({jsondata: [], calendarflag: false})

                              fetch(jsonURL)
                              .then(response => response.json())
                              .then(data => { 
                                   if (data['data']) {
                                        let returnData = data['data'] 
                                        returnEvents = this.eventsConverter(returnData, starkey)
                                        this.setState({jsondata: returnEvents})
                                        this.getDayListFromJson()

                                        PushNotification.cancelAllLocalNotifications()
                                        this._onPresentToday_Reminder(this.state.notitimehh, this.state.notitimemm, this.state.eventsArrayList)

                                   } else {
                                        console.log('No data') 
                                   }
                              })
                              .catch(error => console.log(error)); 
                         }
                    }
                    />
                </View> : null
        }
      </Drawer>
    );
  }
}

const drawerStyles = {
     drawer: { shadowColor: '#000000', shadowOpacity: 0.0, shadowRadius: 30},
     // main: {paddingLeft: 3, backgroundColor: "black"},
}

let styles = StyleSheet.create({
  scrollviewcontent: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: 'white'
  },
  containerv: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  viewtitile: {
     width: '100%',
     height: 100,
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: 'white',
  },
          menuview: {
               width: 70,
               height: '100%',
               alignItems: 'center',
               justifyContent: 'center'
          },
          logoview: {
               flex: 1,
               flexDirection: 'row',
               height: '100%',
               alignItems: 'center',
               justifyContent: 'center'
          },
          menuicon: {
               width: 30,
               height: 20,
               resizeMode: 'stretch'
          },
          logoicon: {
               width: 70,
               height: 70,
               resizeMode: 'stretch',
               marginLeft: -35
          },
  contentview: {
     width: '100%',
     flex: 8,
     flexDirection: 'column',
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: 'white',
  },
          selectview: {
               width: '95%',
               height: 200,
               borderRadius: 5,
               borderColor: '#F0C600',
               backgroundColor: '#F0C600',
               marginTop: 15
          },
          calanderview: {
               width: '95%',
               alignItems: 'center',
               justifyContent: 'center',
               backgroundColor: 'white',
               marginTop: 30
          },
          calendardayimage: {
               width: 30,
               height: 30,
               resizeMode: 'stretch',
          },
          lastview: {
               width: '10%',
               height: 50,
          },
          explainview: {
               width: '95%',
               height: 700,
               borderRadius: 5,
               borderColor: '#F0C600',
               backgroundColor: '#F0C600',
          },
               oneview: {
                    width: '100%',
                    height: 350,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
               },
});

