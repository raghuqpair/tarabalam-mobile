
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainCalander from '../MainScreens/MainCalander';

const RootStack = createStackNavigator({
     Main: { screen: MainCalander },
   }, {
        initialRouteName: 'Main',
        transitionConfig: (sceneProps) => ({
       transitionSpec: {
         duration: sceneProps.scene.route.routeName.endsWith('_noTransition') ? 0 : 260,
       },
     }),
   });
   
   const AppNavigator = createAppContainer(RootStack);
   export default AppNavigator;
   
   