import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './HomeScreen'; 
import MypageScreen from './MypageScreen';

const Tab = createBottomTabNavigator();

// function SearchScreen() {
//   return <Text>Search</Text>;
// }

// function NotificationScreen() {
//   return <Text>Notification</Text>;
// }

// function SettingScreen() {
//   return <Text>설정 페이지</Text>;
// }

function BottomTabNavigationApp() {

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: 'Home' });
  }, [navigation]);

  return (
    <Tab.Navigator
      initialRouteName="Home" // 앱이 시작될 때 표시할 초기화면 지정
      screenOptions={{
        tabBarActiveTintColor: '#628F5D', // 눌리면 변하는 버튼 색상
        tabBarShowLabel: true,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          // title: '홈',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: '알림',
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          title: '검색',
          tabBarIcon: ({ color, size }) => (
            <Icon name="notifications" color={color} size={size} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Setting"
        component={MypageScreen}
        options={{
          title: '설정',
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigationApp;