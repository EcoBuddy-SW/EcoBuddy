import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as Font from "expo-font";

import LoginScreen from './Login';
import HomeBottom from './BottomTabNavigationApp';
import HomeScreen from './HomeScreen';
import JoinScreen from './Join';
import NotificationScreen from './Notification';
import Mypage from './MypageScreen';
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

// import HomeScreen from './HomeScreen'; 
// import MypageScreen from './MypageScreen';
// import CameraScreen from './CameraScreen';

const Stack = createStackNavigator();

export default function App() {
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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: true , headerStyle:{borderBottomColor:'#D0FAE8', borderBottomWidth: 2}}}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="HomeBtn" component={HomeBottom} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Join" component={JoinScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
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
        {/* 추가 화면을 여기에 추가할 수 있습니다 */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
