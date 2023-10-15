import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useContext } from 'react';

import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as Font from "expo-font";

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
import Tip2 from './Tip2Screen';
import Tip3 from './Tip3Screen';
import Sub1 from './SubScreen';
import Sub2 from './Sub2Screen';
import Sub3 from './Sub3Screen';
import Attendance from './Attendance';

//채연 페이지
import Mypage from './MypageScreen';
import OptionScreen from './Option'; //설정 기능
//import BottomTabNavigationApp from './BottomTabNavigationApp';

import KakaoMap from './KakaoMap';

import LocationContext from './LocationContext'; //위치 저장용

const Stack = createStackNavigator();

export default function App() {

  const [location, setLocation] = useState(null); //위치
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [ip, setIp] = useState('10.20.101.226');
  const [locstate, setLocstate] = useState(null);

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

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LocationContext.Provider value={{ location, setLocation, userId, setUserId, userEmail, setUserEmail, ip, setIp, locstate, setLocstate }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        {/* <Stack.Screen name="HomeBtn" component={HomeBottom} options={{ headerShown: false }} /> */}
        <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }}/>
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
        <Stack.Screen name="무상수거 꿀팁" component={Tip2}/>
        <Stack.Screen name="자취생용 꿀팁" component={Tip3}/>
        <Stack.Screen name="국민 취업 제도" component={Sub1}/>
        <Stack.Screen name="내집마련 디딤돌 대출" component={Sub2}/>
        <Stack.Screen name="다함께 돌봄" component={Sub3}/>
        <Stack.Screen name="카카오맵" component={KakaoMap}/>
        <Stack.Screen name="출석 이벤트" component={Attendance}/>

        {/* 채연 페이지 */}
        <Stack.Screen name="Option" component={OptionScreen} />
        {/* 추가 화면을 여기에 추가할 수 있습니다 */}
        </Stack.Navigator>
      </NavigationContainer>
    </LocationContext.Provider>
  );
}