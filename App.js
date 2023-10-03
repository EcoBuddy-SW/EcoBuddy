import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from './Login';
import HomeBottom from './HomeBottom';
import Home from './HomeScreen';
import JoinScreen from './Join';
import NotificationScreen from './Notification';
import Mypage from './MypageScreen';
import FindUserId from './FindUserIdScreen';
import FindUserPW from './FindUserPWScreen';
import Camera from './CameraScreen';
import PaperInfo from './PaperInfoScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="HomeBtn" component={HomeBottom} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Join" component={JoinScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="Mypage" component={Mypage} />
        <Stack.Screen name="FindUserId" component={FindUserId} />
        <Stack.Screen name="FindUserPW" component={FindUserPW} />
        <Stack.Screen name="Camera" component={Camera}/>
        <Stack.Screen name="종이팩 분리수거" component={PaperInfo}/>
        {/* 추가 화면을 여기에 추가할 수 있습니다 */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
