import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import LocationContext from './LocationContext'; //위치 저장용

import React, { useState, useRef, useEffect } from 'react';
import { Appearance, useColorScheme, Platform } from 'react-native';

//파이어베이스
import { initializeApp } from "@firebase/app";
import { getAnalytics } from "@firebase/analytics";

//알림설정
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

import * as Font from "expo-font";

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
import MetalCanInfo from './MetalCanInfoScreen';
import SyntheticResinsInfo from './SyntheticResinsInfoScreen';
import PaperHighCurrentInfo from './PaperHighCurrentInfoScreen';
import ScrapMetalInfo from './ScrapMetalInfoScreen';
import ClothingInfo from './ClothingInfoScreen';
import WasteElectricCurrentInfo from './WasteElectricCurrentInfoScreen';
import LedLightInfo from './LedLightInfoScreen';
import CookingOilInfo from './CookingOilInfoScreen';
import Search from './SearchScreen';
import SearchResult from './SearchResultScreen';
import Map from './MapScreen';
import Category from './CategoryScreen';
import CategoryResult from './CateogryResultScreen';
import Detail from './DetailScreen';
import Tip2 from './Tip2Screen';
import Tip3 from './Tip3Screen';
import Sub1 from './SubScreen';
import Sub2 from './Sub2Screen';
import Sub3 from './Sub3Screen';
import Attendance from './Attendance';
import Coins from './CoinScreen';
import Community from './CommunityScreen';
import Write from './WriteScreen';
import Statistcs from './StatistcsScreen'
import Map2 from './Map2Screen';


//채연 페이지
import Mypage from './MypageScreen';
import OptionScreen from './Option'; //설정 기능
// import MapScreen from './Map'; // 분리수거 기능
// import RecordScreen from './Record'; // 

// import ProfileDialog from './ProfileDialog';
// import My_InforScreen from './My_InforScreen';

import KakaoMap from './KakaoMap';

// import HomeScreen from './HomeScreen'; 
// import MypageScreen from './MypageScreen';
// import CameraScreen from './CameraScreen';

const Stack = createStackNavigator();


const firebaseConfig = {
  apiKey: "AIzaSyAeOIme7xkU2X7yQKOJ0-lgGjSJokO1VmI",
  authDomain: "ecobuddy-swu-e269d.firebaseapp.com",
  projectId: "ecobuddy-swu-e269d",
  storageBucket: "ecobuddy-swu-e269d.appspot.com",
  messagingSenderId: "416881669874",
  appId: "1:416881669874:web:fbf6df8f51b2de0076c26b",
  measurementId: "G-7Y8ERTXE6V"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default function App() {
  // Firebase Analytics 초기화
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const [location, setLocation] = useState(null); //위치
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [ip, setIp] = useState('10.20.100.95'); // IPv4 주소로
  const [locstate, setLocstate] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  ///////////////////// 알림
  const [expoPushToken, setExpoPushToken] = useState(''); // 추가
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  ///////////////

  // 글 작성 
  const [write, setWrite] = useState(null);

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

  // ✅ 알림 권한 설정
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }


  return (
    <LocationContext.Provider value={{ location, setLocation, userId, setUserId, userEmail, setUserEmail, ip, setIp, locstate, setLocstate, profileImage, setProfileImage, expoPushToken, setExpoPushToken, write, setWrite }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: true, headerStyle: { borderBottomColor: '#D0FAE8', borderBottomWidth: 2 } }}>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          {/* <Stack.Screen name="HomeBtn" component={HomeBottom} options={{ headerShown: false }} /> */}
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Join" component={JoinScreen} />
          <Stack.Screen name="알림창" component={NotificationScreen} />
          <Stack.Screen name="Mypage" component={Mypage} />
          <Stack.Screen name="FindUserId" component={FindUserId} />
          <Stack.Screen name="FindUserPW" component={FindUserPW} />
          <Stack.Screen name="Camera" component={Camera} />
          <Stack.Screen name="결과 확인" component={CheckPhoto} />
          <Stack.Screen name="종이팩" component={PaperInfo} />
          <Stack.Screen name="유리병" component={GlassInfo} />
          <Stack.Screen name="금속캔" component={MetalCanInfo} />
          <Stack.Screen name="합성수지류" component={SyntheticResinsInfo} />
          <Stack.Screen name="종이류(고지류)" component={PaperHighCurrentInfo} />
          <Stack.Screen name="고철류" component={ScrapMetalInfo} />
          <Stack.Screen name="의류 및 원단류" component={ClothingInfo} />
          <Stack.Screen name="폐건전지류" component={WasteElectricCurrentInfo} />
          <Stack.Screen name="폐형광등, 폐LED등" component={LedLightInfo} />
          <Stack.Screen name="식용유" component={CookingOilInfo} />
          <Stack.Screen name="검색 페이지" component={Search} />
          <Stack.Screen name="검색 결과" component={SearchResult} />
          <Stack.Screen name="지도" component={Map} />
          <Stack.Screen name="카테고리" component={Category} />
          <Stack.Screen name="카테고리 선택 결과" component={CategoryResult} />
          <Stack.Screen name="세부사항" component={Detail} />
          <Stack.Screen name="무상수거 꿀팁" component={Tip2} />
          <Stack.Screen name="자취생용 꿀팁" component={Tip3} />
          <Stack.Screen name="국민 취업 제도" component={Sub1} />
          <Stack.Screen name="내집마련 디딤돌 대출" component={Sub2} />
          <Stack.Screen name="다함께 돌봄" component={Sub3} />
          <Stack.Screen name="카카오맵" component={KakaoMap} />
          <Stack.Screen name="출석 이벤트" component={Attendance} />
          <Stack.Screen name="포인트" component={Coins} />
          <Stack.Screen name="커뮤니티" component={Community} />
          <Stack.Screen name="글 등록" component={Write} />
          <Stack.Screen name="통계" component={Statistcs} />
          <Stack.Screen name="지도 TEST" component={Map2} />

          {/* 채연 페이지 */}
          <Stack.Screen name="Option" component={OptionScreen} />
          {/* <Stack.Screen name="Record" component={RecordScreen} /> */}

          {/* <Stack.Screen name="bell" component={BellScreen}/> */}

          {/* 
        <Stack.Screen name="My_Infor" component={My_InforScreen}/> */}
          {/* 추가 화면을 여기에 추가할 수 있습니다 */}
        </Stack.Navigator>
      </NavigationContainer>
    </LocationContext.Provider>
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
      }
      if (finalStatus !== 'granted') {
          console.log('Failed to get push token for push notification!');
          return;
      }
      token = (await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig.extra.eas.projectId,
      })).data;
      console.log('token: ', token);

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
