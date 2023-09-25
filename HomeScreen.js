import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function HomeScreen() {
  const [find, setFind] = useState('');
  const navigation = useNavigation();

  // 알림 페이지로 이동하는 함수
  const goToNotificationScreen = () => {
    navigation.navigate('Notification'); // 'Notification'은 알림 페이지의 스크린 이름입니다.
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={goToNotificationScreen}>
          <Icon name="notifications" style={styles.icon} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="검색창"
          value={find}
          onChangeText={(text) => setFind(text)}
        />
      </View>
      <ScrollView horizontal style={styles.iconContainer}>
        {/* 2줄로 배치된 4개의 아이콘 */}
        <View style={styles.iconRow}>
          <Icon name="icon1" style={styles.icon} />
          <Icon name="icon2" style={styles.icon} />
        </View>
        <View style={styles.iconRow}>
          <Icon name="icon3" style={styles.icon} />
          <Icon name="icon4" style={styles.icon} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2FFED',
    alignItems: 'flex-start', // 왼쪽 정렬
    justifyContent: 'flex-start', // 상단 정렬
    padding: 16,
  },
  rowContainer: {
    flexDirection: 'row', // 아이콘과 입력란을 가로로 나란히 정렬
    alignItems: 'center', // 수직 가운데 정렬
  },
  input: {
    flex: 1, // 입력창이 남은 공간을 모두 차지하도록 설정
    height: 40,
    borderColor: '#3E6B39',
    borderWidth: 1,
    marginLeft: 8, // 아이콘과 입력창 사이의 간격 조정
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  icon: {
    fontSize: 30, // 아이콘 크기 조정
    color: '#628F5D', // 아이콘 색상 변경
  },
  iconContainer: {
    marginTop: 16, // 아이콘 컨테이너와 검색창 사이 간격 조정
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 10,
  },
  iconRow: {
    flexDirection: 'row',
    marginBottom: 8, // 아이콘 로우와 로우 사이 간격 조정
  },
  icon: {
    fontSize: 30, // 아이콘 크기 조정
    color: '#628F5D', // 아이콘 색상 변경
    marginRight: 8, // 아이콘과 아이콘 사이 간격 조정
  },
});

export default HomeScreen;
