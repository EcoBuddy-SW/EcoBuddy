import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useRef } from 'react';
import LocationContext from './LocationContext';
import LoginScreen from './Login';
import Home from './HomeBottom';
import JoinScreen from './Join';

const Stack = createStackNavigator();

export default function App() {
  const [location, setLocation] = useState(null);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Join" component={JoinScreen} />
          {/* 추가 화면을 여기에 추가할 수 있습니다 */}
        </Stack.Navigator>
      </NavigationContainer>
    </LocationContext.Provider>
  );
}
