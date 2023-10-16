import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useContext, useEffect, useRef } from 'react';

import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as Font from "expo-font";
import Constants from 'expo-constants';
import { Platform } from 'react-native';

import BottomTab from './BottomTabNavigationApp';
import LoginScreen from './Login';
import HomeBottom from './BottomTabNavigationApp';
import HomeScreen from './HomeScreen';
import JoinScreen from './Join';
import NotificationScreen from './Notification';
import FindUserId from './FindUserIdScreen';
import FindUserPW from './FindUserPWScreen';
import Camera from './CameraScreen';
import CheckPhoto from './CheckPhoto';
import PaperInfo from './PaperInfoScreen';
import GlassInfo from './GlassInfoScreen';
import Search from './SearchScreen';
import SearchResult from './SearchResultScreen';
import Map from './MapScreen';
import Category from './CategoryScreen';
import CategoryResult from './CateogryResultScreen';
import Detail from './DetailScreen';
import KakaoMap from './Kakaomap';

//알림설정
import * as Notifications from 'expo-notifications';
//채연 페이지
import Mypage from './MypageScreen';
import OptionScreen from './Option'; //설정 기능a
import BottomTabNavigationApp from './BottomTabNavigationApp';

import LocationContext from './LocationContext'; //위치 저장용

const Stack = createStackNavigator();



export default function App() {

  const [location, setLocation] = useState(null); //위치
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [ip, setIp] = useState('106.101.3.201');
  const [locstate, setLocstate] = useState(null);
  ///////////////////// 알림
  const [expoPushToken, setExpoPushToken] = useState(''); // 추가
  ///////////////
  const notificationListener = useRef();
  const responseListener = useRef();

  const [fontsLoaded] = useFonts({
    // 글씨체는 임의로 넣었어용
    'Giants-Bold': require('./assets/fonts/Giants-Bold.ttf'),
    'Giants-Inline': require('./assets/fonts/Giants-Inline.ttf'),
    'Giants-Regular': require('./assets/fonts/Giants-Regular.ttf'),
    'Pretendard-Black': require('./assets/fonts/Pretendard-Black.ttf'),
    'Pretendard-Bold': require('./assets/fonts/Pretendard-Bold.ttf'),
    'Pretendard-ExtraBold': require('./assets/fonts/Pretendard-ExtraBold.ttf'),
    'Pretendard-Regular': require('./assets/fonts/Pretendard-Regular.ttf'),
  });

  ///////////////////////////알림
  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
    // Foreground notifications
    notificationListener.current = 
      Notifications.addNotificationReceivedListener(notification => {
        console.log(notification);
      });
  
    // Background notifications
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);
  console.log('FCM토큰은:',expoPushToken);
/////////////////////////////////////////////////
  if (!fontsLoaded) {
    return null;
  }

  return (
    <LocationContext.Provider value={{ location, setLocation, userId, setUserId, userEmail, setUserEmail, ip, setIp, locstate, setLocstate }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="HomeBtn" component={HomeBottom} options={{ headerShown: false }} />
        <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Join" component={JoinScreen} />
        <Stack.Screen name="알림창" component={NotificationScreen} />
        <Stack.Screen name="Mypage" component={Mypage} />
        <Stack.Screen name="FindUserId" component={FindUserId} />
        <Stack.Screen name="FindUserPW" component={FindUserPW} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="결과 확인" component={CheckPhoto} />
        <Stack.Screen name="종이팩" component={PaperInfo} />
        <Stack.Screen name="유리병" component={GlassInfo} />
        <Stack.Screen name="검색 페이지" component={Search} />
        <Stack.Screen name="검색 결과" component={SearchResult} />
        <Stack.Screen name="지도" component={Map}/>
        <Stack.Screen name="카테고리" component={Category}/>
        <Stack.Screen name="카테고리 선택 결과" component={CategoryResult}/>
        <Stack.Screen name="세부사항" component={Detail}/>
        <Stack.Screen name="카카오맵" component={KakaoMap}/>

        {/* 채연 페이지 */}
        <Stack.Screen name="Option" component={OptionScreen} />
        {/* 추가 화면을 여기에 추가할 수 있습니다 */}
        </Stack.Navigator>
      </NavigationContainer>
    </LocationContext.Provider>
  );
}