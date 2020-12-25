
import React, {Component} from 'react';
import { View, SafeAreaView } from 'react-native';
import AppNavigator from './Screens/AppNavigator/AppNavigator';

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={{flex : 1, backgroundColor: 'white'}}>
          <AppNavigator/>
      </SafeAreaView>
    );
  }
}
