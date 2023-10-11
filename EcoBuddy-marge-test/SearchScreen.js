import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function SearchScreen() {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
 
  // 검색을 수행하는 함수
  const handleSearch = () => { 
    if (searchText.trim() === '') {
      Alert.alert('경고', '키워드를 입력하세요.');
      return;
    }

    navigation.navigate('검색 결과', { searchKeyword: searchText });
    console.log('검색어:', searchText); 
  };

  const handleCategory = () => {
    navigation.navigate('카테고리');
  }

  return (
    <View style={[styles.background]}>
      <View style={[styles.searchContainer, { width: '80%', marginTop: 10 }]}>
        <TextInput
          style={styles.input}
          placeholder="키워드 검색"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Icon name="search" style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={[styles.container, { marginTop: 30, padding: 30, flexDirection: 'column', marginBottom: 10 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <Text style={[styles.text, { fontFamily: 'Pretendard-Bold', fontSize: 18, }]}>최근 검색어</Text>
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

      <TouchableOpacity onPress={handleCategory}>
        <View style={styles.container}>
          <View style={[styles.shadowContainer, { borderWidth: 1, borderColor: 'black', height: 50 }]}>
            <Text style={{ fontFamily: 'Pretendard-Bold', textAlign: 'center' }}>카테고리를 눌러서 검색하고 싶다면?</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    height: 60,
  },
  shadowContainer: {
    width: '90%',
    height: 70,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.0,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 1,
    height: 40,
  },
  icon: {
    fontSize: 30,
    marginLeft: 20,
  },
  text: {
    fontFamily: 'Pretendard-Regular',
  },
});
