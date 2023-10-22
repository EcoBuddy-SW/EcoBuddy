import React, { useState ,useContext, useEffect} from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import LocationContext from './LocationContext';

export default function SearchScreen() {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const context = useContext(LocationContext);
  const userId = context.userId;
  const [searchValues, setSearchValues] = useState([]);

  // useEffect(() => { 

  //   axios.post(`http://${context.ip}:3003/recentsearch`, { userId })
  //     .then(response => {
  //       const searches = response.data.results;
  //       const searchValues = searches.map(item => item.searchs);
  //       setSearchValues(searchValues); 
  //     })
  //     .catch(error => {
  //       console.error('데이터 조회 실패:', error);
  //       console.log(error.response);
  //     });
  // }, []);
  const fetchSearches = () => {
    axios.post(`http://${context.ip}:3003/recentsearch`, { userId })
      .then(response => {
        const searches = response.data.results;
        const searchValues = searches.map(item => item.searchs);
        setSearchValues(searchValues); 
      })
      .catch(error => {
        console.error('데이터 조회 실패:', error);
        console.log(error.response);
      });
  };
  useEffect(() => {
    fetchSearches();
  }, []);

    const handleSearch2 = (result2) => { 
      setSearchText(result2);
      const data = { text : result2 }; // searchText 대신 result2 사용
      axios.post(`http://${context.ip}:3003/search`,{searchText: result2, userId}) // searchText 대신 result2 사용
      .then(response => response.data)
      .then(data => {
        if(data.success){
          const results = data.results;
          const searchResults = results.map(result => ({
            region: result.region,
            city: result.city,
            name: result.name,
            info: result.info,
            type: result.type
          }));
        navigation.navigate('검색 결과', { 
          searchKeyword: result2 , // searchText 대신 result2 사용
          searchResults
        });
        console.log('검색어:', result); 
      } else{
        alert(response.data.message);
      }
    });
  };
//
  // 검색을 수행하는 함수
  const handleSearch = () => { 
    if (searchText.trim() === '') {
      Alert.alert('경고', '키워드를 입력하세요.');
      return;
    }
    const data = { text : searchText};
    axios.post(`http://${context.ip}:3003/search`,{searchText,userId})
    .then(response => response.data)
    .then(data => {
      if(data.success){
        const results = data.results;
        const searchResults = results.map(result => ({
          region: result.region,
          city: result.city,
          name: result.name,
          info: result.info,
          type: result.type
        }));
      navigation.navigate('검색 결과', { 
        searchKeyword: searchText ,
        searchResults
      });
      console.log('검색어:', searchText,region,city); 
    } else{
      alert(response.data.message);
    }
    })
  };

  const deleteAll = () => {
    axios.post(`http:\\${context.ip}:3003/deleteAll` ,{userId})
    .then(response => response.data)
    .then(data => {
      if(data.success){
        console.log('전체삭제 완료(클라이언트)');
      } else{
        console.log('전체삭제 오류(클라이언트)',response.data.message);
      }
    })
  }
  
// const deleteSearch = (result) => {
//   axios.post(`http://${context.ip}:3003/deleteSearch`,{search:result, userId})
//   .then(response => response.data)
//   .then(data => {
//     if(data.success){
//       console.log('삭제완료!!');
//     }
//     else{
//       alert(response.data.message);
//     }
//   })
// }
const deleteSearch = (result) => {
  axios.post(`http://${context.ip}:3003/deleteSearch`,{search:result, userId})
    .then(response => response.data)
    .then(data => {
      if(data.success){
        console.log('삭제완료!!');
        // fetchSearches(); // 삭제 후에 검색어 목록 새로 가져오기
        const updatedSearchValues = searchValues.filter(value => value !== result);
        setSearchValues(updatedSearchValues);
      }
      else{
        alert(response.data.message);
      }
    })
}

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
          <TouchableOpacity onPress={ ()=>{
            deleteAll();
          }}>
            <Text style={{ color: 'lightgray' }}>전체 삭제</Text>
            </TouchableOpacity>
          </View>
        </View>

        {searchValues.map((result, index) => (
        <View  key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={ ()=>{
            handleSearch2(result);
          }}>
          <Text style={[styles.text, { fontSize: 15, marginBottom: 10, marginLeft: 10 }]}>
            {result}
          </Text>
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={ ()=>{
            deleteSearch(result);
          }}>
            <Text style={{ color: 'lightgray' }}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
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
