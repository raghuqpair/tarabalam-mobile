import React, { Component } from "react"
import { Text, View, StyleSheet , Image,TouchableOpacity} from "react-native"
import PropTypes from 'prop-types'
import GlobalAssests from "../Global/GlobalAssests.js";

class ShowHolidayInfo extends Component {

    ok = () => {
        this.props.onClickedConfirmBtn()
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <View style={styles.titleview}>
                        <Text style={{textAlign : 'center', fontSize: 22, color: '#c82713'}}>Day's Muhurtham</Text>
                    </View>
                    <View style={styles.spaceview}>
                    </View>
                    <View style={styles.contentview}>
                        <View style={styles.viewa}>
                            <View style={{width: '100%', height: 30, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                                <Image style={{width: 18, height: 18, resizeMode: 'stretch'}} source={GlobalAssests.Stars}></Image>
                                <Text style={{textAlign : 'center', fontSize: 15, color: 'black', marginLeft: 5}}>{this.props.selecteddate + ' Panchang'}</Text>
                            </View>
                            <View style={{borderWidth: 1, borderColor: '#bebebe', width: '95%', height: 265, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                                <View style={{flex: 1, flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                                    <View style={{borderTopColor: '#bebebe', borderTopWidth: 1, borderBottomColor: '#bebebe', borderBottomWidth: 1, width: '100%', height: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f1f1'}}>
                                        <Text style={{textAlign : 'center', fontSize: 15, color: '#29aa8a'}}>Tithi</Text>
                                    </View>  
                                    <View style={{borderBottomColor: '#bebebe', borderBottomWidth: 1, width: '100%', height: 30, alignItems: 'center', justifyContent: 'center',}}>
                                        <Text style={{textAlign : 'center', fontSize: 15, color: '#c82713'}}>Masam</Text>
                                    </View> 
                                    <View style={{borderBottomColor: '#bebebe', borderBottomWidth: 1, width: '100%', height: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f1f1'}}>
                                        <Text style={{marginTop: 5, textAlign : 'center', fontSize: 15, color: '#c82713'}}>Nakshatram</Text>
                                    </View> 
                                    <View style={{borderBottomColor: '#bebebe', borderBottomWidth: 1, width: '100%', height: 30, alignItems: 'center', justifyContent: 'center',}}>
                                        <Text style={{textAlign : 'center', fontSize: 15, color: '#c82713'}}>Varjyam Timings</Text>
                                    </View> 
                                    <View style={{borderBottomColor: '#bebebe', borderBottomWidth: 1, width: '100%', height: 75, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f1f1'}}>
                                        <Text style={{textAlign : 'center', fontSize: 15, color: 'black'}}>Durmuhurtham Timings(Raahu kaalam)</Text>
                                    </View>                                    
                                </View>
                                <View style={{width: 1, height: '100%', backgroundColor: '#bebebe'}}>                                    
                                </View>
                                <View style={{flex: 1.5, flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center'}}> 
                                    <View style={{borderTopColor: '#bebebe', borderTopWidth: 1, borderBottomColor: '#bebebe', borderBottomWidth: 1, width: '100%', height: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f1f1'}}>
                                        <Text style={{textAlign : 'center', fontSize: 15, color: 'black'}}>{this.props.tithi}</Text>
                                    </View>  
                                    <View style={{borderBottomColor: '#bebebe', borderBottomWidth: 1, width: '100%', height: 30, alignItems: 'center', justifyContent: 'center',}}>
                                        <Text style={{textAlign : 'center', fontSize: 15, color: 'black'}}>{this.props.masam}</Text>
                                    </View> 
                                    <View style={{borderBottomColor: '#bebebe', borderBottomWidth: 1, width: '100%', height: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f1f1'}}>
                                        <Text style={{textAlign : 'center', fontSize: 15, color: 'black', marginHorizontal: 5}}>{this.props.naksha1 + ' ' + this.props.naksha1_t + ' ,' + this.props.naksha2 + ' ' + this.props.naksha2_t}</Text>
                                    </View> 
                                    <View style={{borderBottomColor: '#bebebe', borderBottomWidth: 1, width: '100%', height: 30, alignItems: 'center', justifyContent: 'center',}}>
                                        <Text style={{textAlign : 'center', fontSize: 15, color: 'black'}}>{this.props.varj}</Text>
                                    </View> 
                                    <View style={{borderBottomColor: '#bebebe', borderBottomWidth: 1, width: '100%', height: 75, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#f1f1f1'}}>
                                        <Text style={{textAlign : 'center', fontSize: 15, color: 'black', marginTop: 8}}>{this.props.durmu}</Text>
                                    </View>                                     
                                </View>
                            </View>
                        </View>
                        <View style={styles.viewb}>
                            <View style={{width: '100%', height: 40, alignItems: 'center', justifyContent: 'center',}}>
                                <Text style={{textAlign : 'center', fontSize: 18, color: '#c82713'}}>{'Tarabalam for ' + this.props.selectedbirth}</Text>
                            </View>
                            <View style={{width: '100%', height: 235, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                                
                                <View style={{flex: 1, flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                                    <View style={{width: '100%', height: 30, alignItems: 'flex-end', justifyContent: 'center',}}>
                                        <Text style={{textAlign : 'center', fontSize: 13, color: '#404040', marginRight: 15}}>From 12 am</Text>
                                    </View>  
                                    <View style={{width: '100%', height: 80, alignItems: 'center', justifyContent: 'center',}}>
                                        
                                    </View> 
                                    <View style={{width: '100%', height: 30, alignItems: 'flex-end', justifyContent: 'center',}}>
                                        <Text style={{textAlign : 'center', fontSize: 13, color: '#404040', marginRight: 15}}>{'Until ' + this.props.naksha1_t}</Text>
                                    </View> 
                                    <View style={{width: '100%', height: 55, alignItems: 'center', justifyContent: 'center',}}>
                                        
                                    </View> 
                                    <View style={{width: '100%', height: 30, alignItems: 'flex-end', justifyContent: 'center',}}>
                                        <Text style={{textAlign : 'center', fontSize: 13, color: '#404040', marginRight: 15}}>{'Until ' + this.props.naksha2_t}</Text>
                                    </View>                                    
                                </View>
                                <View style={{width: 1, height: 230, backgroundColor: '#bebebe', alignItems: 'center',}}>                                  
                                    <View style={[styles.roundview, {marginTop: 12}]}></View> 
                                    <View style={[styles.roundview, {marginTop: 120}]}></View> 
                                    <View style={[styles.roundview, {marginTop: 205}]}></View>                                  
                                </View>
                                <View style={{flex: 2, flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center'}}> 
                                    <View style={{width: '100%', height: 30, alignItems: 'center', justifyContent: 'center',}}>
                                        <Text style={{textAlign : 'center', fontSize: 15, color: 'black'}}>{this.props.naksha1}</Text>
                                    </View>  
                                    <View style={{width: '100%', height: 80, alignItems: 'center', justifyContent: 'flex-start',}}>
                                        <Text style={{textAlign : 'center', fontSize: 13, color: '#9636c6', marginHorizontal: 5}}>{this.props.daystartdes}</Text>
                                    </View> 
                                    <View style={{width: '100%', height: 30, alignItems: 'center', justifyContent: 'center',}}>
                                        <Text style={{textAlign : 'center', fontSize: 15, color: 'black'}}>{this.props.naksha2}</Text>
                                    </View>  
                                    <View style={{width: '100%', height: 55, alignItems: 'center', justifyContent: 'flex-start',}}>
                                        <Text style={{textAlign : 'center', fontSize: 13, color: '#9636c6', marginHorizontal: 5}}>{this.props.dayenddes}</Text>
                                    </View>   
                                    <View style={{width: '100%', height: 30, alignItems: 'center', justifyContent: 'center',}}>
                                        <Text style={{textAlign : 'center', fontSize: 15, color: '#404040'}}>End of Day</Text>
                                    </View>                                   
                                </View>                                
                            </View>
                        </View>
                    </View>
                    <View style={styles.spaceview}>
                    </View>
                    <View style={styles.bottomview}>
                         <TouchableOpacity onPress={()=> this.ok()} style={{borderColor : '#ed7315', borderWidth: 2, borderRadius: 25, width : 80 ,
                         height : 35, marginRight: 20, alignItems : 'center', justifyContent : 'center', backgroundColor: '#ed7315'}}>
                              <Text style={{textAlign : 'center', color: 'white', fontSize: 15}}>Close</Text>
                         </TouchableOpacity>
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
        height: 680,
        flexDirection : 'column',
        shadowColor: 'black',
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 10,
        shadowRadius: 20,
        elevation: 10,
    },    
        titleview: {
            width: '100%',
            height: 50,
            alignItems: 'center',
            justifyContent: 'center'        
        },
        contentview: {
            width: '100%',
            height: 578,
            alignItems: 'center',
            justifyContent: 'center',    
        },
            viewa: {
                width: '100%',
                height: 303,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            },
            viewb: {
                width: '100%',
                height: 275,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            },
        spaceview: {
            width: '100%',
            height: 1,
            backgroundColor: '#bebebe'       
        },
        bottomview: {
            width: '100%',
            height: 50,
            alignItems: 'flex-end',
            justifyContent: 'center'        
        },
});

ShowHolidayInfo.propType = {
    onClickedConfirmBtn : PropTypes.func,
    selecteddate : PropTypes.string,
    tithi : PropTypes.string,
    masam : PropTypes.string,
    naksha1 : PropTypes.string,
    naksha1_t : PropTypes.string,
    naksha2 : PropTypes.string,
    naksha2_t : PropTypes.string,
    varj : PropTypes.string,
    durmu : PropTypes.string,
    daystartdes : PropTypes.string,
    dayenddes : PropTypes.string,
    selectedbirth : PropTypes.string,
}

export default ShowHolidayInfo