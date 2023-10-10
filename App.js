// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appearance, useColorScheme } from 'react-native';

import MyPageScreen from './MyPage'; 
import MapScreen from './Map'; // 분리수거 기능
import CoinsScreen from './Coins'; // 포인트 기능
import RecordScreen from './Record'; // 

import OptionScreen from './Option'; //설정 기능

import ProfileDialog from './ProfileDialog';
import StatistcsScreen from './Statistcs';
import My_InforScreen from './My_Infor';





const Stack = createStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MyPage" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="MyPage" component={MyPageScreen} /> 
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Coins" component={CoinsScreen} /> 
        <Stack.Screen name="Record" component={RecordScreen} />
   

        <Stack.Screen name="Option" component={OptionScreen} />
        {/* <Stack.Screen name="bell" component={BellScreen}/> */}
      
        <Stack.Screen name="Statistcs" component={StatistcsScreen}/>
        <Stack.Screen name="My_Infor" component={My_InforScreen}/>

        

        





      </Stack.Navigator>
    </NavigationContainer>
  );
}
