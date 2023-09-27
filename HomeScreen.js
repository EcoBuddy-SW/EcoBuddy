import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

function HomeScreen() {
  const [find, setFind] = useState('');
  const navigation = useNavigation();

  // 알림 페이지로 이동하는 함수
  const goToNotificationScreen = () => {
    navigation.navigate('Notification'); // 'Notification'은 알림 페이지의 스크린 이름입니다.
  };

  // 분리수거 페이지 이동 함수들
  const handlePaper = () => {
    navigation.navigate('PaperInfo');
};

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 0 }} // props 설정해줘야 함, 0 이어도 지우지 않기 , , 
    >
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={goToNotificationScreen}>
          <Icon name="notifications" style={styles.icon1} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="검색창"
          value={find}
          onChangeText={(text) => setFind(text)}
        />
      </View>
      <View style={styles.iconContainer}>
        {/* 2줄로 배치된 4개의 아이콘 */}
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 25, padding: 5 }}>분리수거 방법 제대로 알기!</Text>
        <View style={styles.iconRow}>
          <View style={styles.iconWithText}>
            <Icon2 name="paper-roll-outline" style={styles.icon2} onPress={handlePaper}/>
            <Text style={styles.iconText}>종이팩</Text>
          </View>
          <View style={styles.iconWithText}>
            <Icon2 name="glass-pint-outline" style={styles.icon2} />
            <Text style={styles.iconText}>유리병</Text>
          </View>
          <View style={styles.iconWithText}>
            <Icon name="local-drink" style={styles.icon2} />
            <Text style={styles.iconText}>금속캔</Text>
          </View>
          <View style={styles.iconWithText}>
            <Icon name="dangerous" style={styles.icon2} />
            <Text style={styles.iconText}>합성수지류</Text>
          </View>
          <View style={styles.iconWithText}>
            <Icon name="menu-book" style={styles.icon2} />
            <Text style={styles.iconText}>종이류{"\n"}(고지류)</Text>
          </View>
        </View>
        <View style={styles.iconRow}>
          <View style={styles.iconWithText}>
            <Icon name="restore-from-trash" style={styles.icon2} />
            <Text style={styles.iconText}>고철류</Text>
          </View>
          <View style={styles.iconWithText}>
            <Icon2 name="tshirt-crew-outline" style={styles.icon2} />
            <Text style={styles.iconText}>의류 및{"\n"}원단류</Text>
          </View>
          <View style={styles.iconWithText}>
            <Icon name="battery-alert" style={styles.icon2} />
            <Text style={styles.iconText}>폐전지류</Text>
          </View>
          <View style={styles.iconWithText}>
            <Icon name="highlight" style={styles.icon2} />
            <Text style={styles.iconText}>폐형광등{"\n"}폐LED등</Text>
          </View>
          <View style={styles.iconWithText}>
            <Icon2 name="oil" style={styles.icon2} />
            <Text style={styles.iconText}>식용유</Text>
          </View>
        </View>
      </View>

      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop:50}}>꿀팁 알아가기!</Text>
      <ScrollView horizontal={true} style={[styles.iconContainer, { backgroundColor: 'white' }]}>
        <View style={styles.iconContainer2}></View>
        <View style={styles.iconContainer2}></View>
        <View style={styles.iconContainer2}></View>
        <View style={styles.iconContainer2}></View>
      </ScrollView>

      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop:50}}>복지 소식 알고 있어?</Text>
        <View style={[styles.iconContainer, { width: '90%' }]}></View>
        <View style={[styles.iconContainer, { width: '90%' }]}></View>
        <View style={[styles.iconContainer, { width: '90%' }]}></View>
        <View style={[styles.iconContainer, { width: '90%' }]}></View>
        <View style={[styles.iconContainer, { width: '90%' }]}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'flex-start', // 왼쪽 정렬
    // justifyContent: 'flex-start', // 상단 정렬
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
  icon1: {
    fontSize: 30, // 아이콘 크기 조정
    color: '#628F5D', // 아이콘 색상 변경
  },
  icon2: {
    fontSize: 35, // 아이콘 크기 조정
    color: '#628F5D', // 아이콘 색상 변경
    marginHorizontal: 50,

  },
  iconContainer: {
    marginTop: 16, // 아이콘 컨테이너와 검색창 사이 간격 조정
    backgroundColor: '#F2FFED',
    padding: 8,
    borderRadius: 10,
    width: '100%',
    height: 260,
    alignSelf: 'center',
  },
  iconContainer2: {
    backgroundColor: '#F2FFED',
    padding: 8,
    borderRadius: 30,
    width: 200,
    height: 300,
    marginRight: 20, // 아이콘 컨테이너 사이 간격 추가
    alignSelf: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    marginBottom: 4, // 아이콘 로우와 로우 사이 간격 조정
    justifyContent: 'space-around',
  },
  iconWithText: {
    alignItems: 'center', // 아이콘과 텍스트를 가로로 중앙 정렬
  },
  iconText: {
    marginTop: 5,
    marginBottom: 15,
  },
});

export default HomeScreen;