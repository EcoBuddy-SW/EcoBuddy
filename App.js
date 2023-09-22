import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from './Login';
import Home from './Home';
import JoinScreen from './Join';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Join" component={JoinScreen} />
        {/* 추가 화면을 여기에 추가할 수 있습니다 */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
