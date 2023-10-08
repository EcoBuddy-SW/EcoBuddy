import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SearchScreen() {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={[styles.background]}>
      <View style={[styles.searchContainer, { width: '80%', marginTop: 10 }]}>
        <TextInput
          style={styles.input}
          placeholder="키워드 검색"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <Icon name="search" style={styles.icon} />
      </View>

      <View style={[styles.container, { marginTop: 30, padding: 30, flexDirection: 'column', marginBottom: 10 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center',  marginBottom: 20  }}>
          <Text style={[styles.text, { fontFamily: 'Pretendard-Bold', fontSize: 18,}]}>최근 검색어</Text>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>  
            <Text style={{ color: 'lightgray' }}>전체 삭제</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.text, { fontSize: 15, marginBottom: 10, marginLeft: 10 }]}>키워드 1</Text>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={{ color: 'lightgray' }}>X</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.text, { fontSize: 15, marginBottom: 10, marginLeft: 10 }]}>키워드 2</Text>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={{ color: 'lightgray' }}>X</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.text, { fontSize: 15, marginBottom: 10, marginLeft: 10 }]}>키워드 3</Text>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={{ color: 'lightgray' }}>X</Text>
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <View style={[styles.shadowContainer, { borderWidth: 1, borderColor: 'black' , height:50}]}>
          <Text style={{ fontFamily: 'Pretendard-Bold', textAlign: 'center' }}>카테고리를 눌러서 검색하고 싶다면?</Text>
        </View>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  background:{
    flex:1,
    backgroundColor:'white',
  },
  container: {
    width:'100%',
    // height:170,
    backgroundColor: 'white',
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row', // 가로 정렬을 위해 flexDirection를 row로 설정
    justifyContent: 'center', // 수평 가운데 정렬을 위해 justifyContent를 center로 설정
    alignItems: 'center', // 세로 정렬을 위해 alignItems를 center로 설정
    alignSelf: 'center', // 이게 세로 가운데 정렬임 ㅡㅡ!!!
    paddingHorizontal: 20, // 좌우 여백을 조절
    borderBottomWidth: 1, // 밑줄 추가 (선택적)
    borderBottomColor: 'lightgray', // 밑줄 색상 설정 (선택적)
    height: 60, // 컨테이너의 높이를 명시적으로 설정
  },
  shadowContainer: {
    width: '90%',
    height: 70,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000', // 그림자 색상 (ios에서 그림자 효과 제공)
    shadowOffset: {
      width: 0,          // 그림자의 수평 위치
      height: 2,         // 그림자의 수직 위치
    },
    shadowOpacity: 0.2, // 그림자의 투명도
    shadowRadius: 2.0,  // 그림자의 반경
    elevation: 3,        // Android에서 그림자 효과를 제공합니다
  },
  input: {
    flex: 1, // TextInput이 화면의 나머지 부분을 차지하도록 설정
    fontSize: 18,
    paddingVertical: 1,
    height: 40, // TextInput의 높이를 명시적으로 설정
  },
  icon: {
    fontSize: 30,
    marginLeft: 20, // 아이콘을 검색창에서 일정한 간격으로 떨어뜨림
  },
  text: {
    fontFamily: 'Pretendard-Regular',

  },
});
