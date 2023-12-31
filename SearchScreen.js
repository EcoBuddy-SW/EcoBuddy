import React, { useState, useContext, useEffect } from 'react';
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
  const [userCity, setUserCity] = useState([]);

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

  const userLocation = ()=> {
    axios.post(`http://${context.ip}:3003/userGetLocation`,{userId})
    .then(response => {
      const location = response.data[0];
      setUserCity(location.CITY);
      console.log('사용자 위치:', location.CITY);
    })
    .catch(error => {
      console.error('요청 에러:', error);
    });
  }

  useEffect(() => {
    fetchSearches();
    userLocation();
  }, []);

  const handleSearch2 = (result2) => {
    setSearchText(result2);
    const data = { text: result2 }; // searchText 대신 result2 사용
    axios.post(`http://${context.ip}:3003/search`, { searchText: result2, userId }) // searchText 대신 result2 사용
      .then(response => response.data)
      .then(data => {
        if (data.success) {
          const results = data.results;
          const searchResults = results.map(result => ({
            product: result.product,
            sortation: result.sortation,
            way: result.way
          }));
          navigation.navigate('검색 결과', {
            searchKeyword: result2, // searchText 대신 result2 사용
            searchResults
          });
          console.log('검색어:', results);
        } else {
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
    axios.post(`http://${context.ip}:3003/search`, { searchText, userId })
      .then(response => response.data)
      .then(data => {
        if (data.success) {
          const results = data.results;
          const searchResults = results.map(result => ({
            product: result.product,
            sortation: result.sortation,
            way: result.way
          }));
          navigation.navigate('검색 결과', {
            searchKeyword: searchText,
            searchResults
          });
          console.log('검색어:', searchText);
          console.log('검색결과:', searchResults);
          // handleSearch2(results);
        } else {
          alert(data.message);
        }
      })
  };

  const handleSearch3 = () => {
    // if (userCity.trim() === '') {
    //   Alert.alert('경고', '사용자의 위치가 없음');
    //   return;
    // }
    axios.post(`http://${context.ip}:3003/searchLocation`,{searchText:userCity,userId})
    .then(response => response.data)
    .then(data => {
      if(data.success){
        const results = data.results;
        const searchResults = results.map(result => ({
          region: result.region,
          city: result.city,
          name: result.name,
          info: result.info,
          type: result.type,
          location: result.location
        }));
      navigation.navigate('검색 결과2', { 
        searchKeyword: userCity ,
        searchResults
      });
    } else{
      alert(response.data.message);
    }
    })
  };

  const deleteAll = () => {
    axios.post(`http:\\${context.ip}:3003/deleteAll`, { userId })
      .then(response => response.data)
      .then(data => {
        if (data.success) {
          console.log('전체삭제 완료(클라이언트)');
        } else {
          console.log('전체삭제 오류(클라이언트)', response.data.message);
        }
      }).finally(() => {
        fetchSearches(); // 삭제가 완료된 후에 fetchSearches를 호출합니다.
      });
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
    axios.post(`http://${context.ip}:3003/deleteSearch`, { search: result, userId })
      .then(response => response.data)
      .then(data => {
        if (data.success) {
          console.log('삭제완료!!');
          // fetchSearches(); // 삭제 후에 검색어 목록 새로 가져오기
          const updatedSearchValues = searchValues.filter(value => value !== result);
          setSearchValues(updatedSearchValues);
        }
        else {
          alert(data.message);
        }
      }).finally(() => {
        fetchSearches(); // 삭제가 완료된 후에 fetchSearches를 호출합니다.
      });
  }

  const handleCategory = () => {
    navigation.navigate('카테고리');
  }

  return (
    <View style={[styles.background]}>
      <View style={[styles.searchContainer, { width: '80%', marginTop: 10 }]}>
        <TextInput
          style={styles.input}
          placeholder="쓰레기 품목 검색"
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
            <TouchableOpacity onPress={() => {
              deleteAll();
            }}>
              <Text style={{ color: 'lightgray' }}>전체 삭제</Text>
            </TouchableOpacity>
          </View>
        </View>

        {searchValues.map((result, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => {
              handleSearch2(result);
            }}>
              <Text style={[styles.text, { fontSize: 15, marginBottom: 10, marginLeft: 10 }]}>
                {result}
              </Text>
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <TouchableOpacity onPress={() => {
                deleteSearch(result);
              }}>
                <Text style={{ color: 'lightgray' }}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity onPress={handleSearch3}>
        <View style={styles.container}>
          <View style={[styles.shadowContainer, { borderWidth: 1, borderColor: 'black', height: 50 }]}>
            <Text style={{ fontFamily: 'Pretendard-Bold', textAlign: 'center' }}>내 위치에서 시행중인 사업정보가 궁금해?</Text>
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