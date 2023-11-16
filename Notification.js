import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import LocationContext from './LocationContext';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

export default function NotificationScreen() {
  const context = useContext(LocationContext);
  const userId = context.userId;
  const [notifications, setNotifications] = useState([]); // 알림 데이터를 저장할 상태 변수

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.post(`http://${context.ip}:3003/getNotifications`, { userId });
      setNotifications(response.data); // 알림 데이터를 상태 변수에 저장
    } catch (error) {
      console.error('알림 데이터를 가져오는 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <ScrollView style={styles.background}>
    {notifications.map((notification, index) => (
      <React.Fragment key={index}>
        <View style={[styles.line, { marginTop: index === 0 ? 50 : 0 }]}></View>
        <View style={{ padding: 30 }}>
          <View style={{ flexDirection: 'row' }}>
            <Icon2 name="bell-alert-outline" style={styles.icon} />
            <Text style={styles.title}>{notification.title}</Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={styles.text}>{notification.time.split('T')[0]}</Text>
            </View>
          </View>
          <Text style={[styles.text, { marginStart: 30, marginTop: 10 }]}>{notification.message}</Text>
        </View>
        <View style={[styles.line, {}]}></View>
      </React.Fragment>
    ))}
    <View style={{marginBottom: 30}}></View>
  </ScrollView>
  );
}

// 스타일 시트 생략


const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white',
    // padding: 10,
  },
  line: {
    borderWidth: 0.5,
    borderColor: '#F2F2F2',
  },
  text: {
    fontFamily: 'Pretendard-Regular',
    color:'#737373',
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 15,
    marginStart: 10
  },
  icon: {
    fontSize: 20
  }
});