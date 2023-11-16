import React, { useState, useContext, useEffect} from 'react';
import { View, Text, StyleSheet, Image ,ScrollView, TouchableOpacity, Alert, Modal, Pressable} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import axios from 'axios';
import LocationContext from './LocationContext';

// import LocationContext from './LocationContext';

export default function MyPageScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const context = useContext(LocationContext);
  const userId = context.userId;
  const [photo, setPhoto] = useState(undefined);
  const [point, setPoint] = useState(undefined);
  const [name, setName] = useState(undefined);

  //사용자 현재 위치 데이터베이스 저장 코드
  const userLocation = async() => {
    try{
      await axios.post(`http://${context.ip}:3003/userLocation`, {
                  userId: context.userId,
                  region: context.location.region,
                  city:context.location.city,
                  district: context.location.district,
                  street: context.location.name
              });
              console.log('성공했습니당');
        } catch (error) {
            console.log('Failed to save attendance:', error);
        }
      }
  
  //유저정보 데이터베이스에서 불러와서 업데이트 코드
  const fetchUserInfo = () => {
    axios.post(`http://${context.ip}:3003/downloadUserInfo`, { userId })
      .then(response => {
        if (response) {
          const userInfo = response.data;
          setPoint(userInfo.Point);
          setName(userInfo.nickname);
        } else {
          console.error('사용자 정보를 가져오는데 실패했습니다.');
        }
      })
      .catch(error => {
        console.error('네트워크 오류:', error);
      });
  };

  //데이터베이스에 저장된 사진 띄우기
  const loadPhoto = async () => {
    axios.post(`http://${context.ip}:3003/downloadProfile`, { userId })
    .then(response => response.data)
    .then(data => {
      if (data.success) {
        const profileURL = data.data.profileUrl;
        setPhoto(profileURL);
      } else {
        console.log('프로필 사진 로드 실패:', data.message);
      }
    });
  };

  useEffect(() => {
    loadPhoto();
    fetchUserInfo();
    userLocation();
  });
  
  const handleLogoutPress = () => {
    Alert.alert(
      '로그아웃',
      '로그아웃하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: () => {
            axios.post(`http://${context.ip}:3003/logout`)
              .then(response => {
                if (response.data.success) {
                  alert(response.data.message);
                  context.setUserId(null);
                  context.setUserEmail(null);

                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [
                        { name: 'Login' },
                      ],
                    })
                  );
                  //navigation.navigate('BottomTab');
                } else {
                  alert(response.data.message); // 실패 메시지 표시
                }
              })
              .catch(error => {
                console.error(error);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleDelAccountPress = () => {
    Alert.alert(
      '탈퇴',
      '탈퇴하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: () => {
            const data = {
              id: context.userId
            };
            axios.post(`http://${context.ip}:3003/delAccount`, data)
              .then(response => {
                if (response.data.success) {
                  alert(response.data.message);
                  context.setUserId(null);
                  context.setUserEmail(null);

                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [
                        { name: 'Login' },
                      ],
                    })
                  );
                  //navigation.navigate('BottomTab');
                } else {
                  alert(response.data.message); // 실패 메시지 표시
                }
              })
              .catch(error => {
                console.error(error);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleOne = () => {
    Alert.alert(
      '이용 약관',
      '다음 내용은 이와 같습니다.',
      [
        {
          text: '확인',
          style: 'cancel',
        }
      ],
      { cancelable: false }
    );
  };

  const handleTwo = () => {
    Alert.alert(
      '개인 정보 방침',
      '다음 내용은 이와 같습니다.',
      [
        {
          text: '확인',
          style: 'cancel',
        }
      ],
      { cancelable: false }
    );
  };

  const handleScreenModePress = () => {
    setModalVisible(true);
  };

  const handleModeSelection = (mode) => {
    setSelectedMode(mode);
    setModalVisible(false);
    // 선택한 모드에 따른 테마를 변경하는 로직을 추가할 수 있습니다.
    // 예를 들어, 선택한 모드가 'light'일 때 라이트 모드 테마로 변경하는 등의 작업을 수행할 수 있습니다.
  };

  const goToMap = () => {
    navigation.navigate('카카오맵'); // 'Map' 스크린으로 이동
  };
  const goToCoins = () => {
    navigation.navigate('포인트'); // '포인트' 스크린으로 이동
  };
  const goToBell = () => {
    navigation.navigate('bell')// 알림이로 이동

  };
  const goToStatistcs = () => {
    navigation.navigate('통계')// 통계로 이동

  };
  const goToMy_Infor = () => {
    navigation.navigate('My_Infor')// 프로필
  };

  const renderPhoto = () => {
    if (photo) {
      const imageSize = circleRadius * 2;
      return (
        <Image
          source={{ uri: photo }}
          style={{
            width: imageSize,
            height: imageSize,
            borderRadius: circleRadius,
            position: 'absolute',
            top: circleCenterY - circleRadius,
            left: circleCenterX - circleRadius,
          }}
        />
      );
    }
    return null;
  };

  return (

    <View style={styles.container}>
      <View style={styles.inforContainer}>
        {/* <Ionicons name="ios-earth" size={50} color="green" style={{ marginBottom: 10, top: 3 }} /> */}
        <View style={{ flexDirection: 'row', }}>
          {/* 프로필 */}
          <View style={{
            borderColor: '#333',
            padding: 2,
            borderRadius: 40,
            right: 30,
            alignItems: 'center',
            overflow: 'hidden', // 내용물이 틀을 벗어나지 않도록 overflow 속성을 설정합니다.
            // marginRight: 10,
            flexDirection: 'row',
            
          }}>
          {photo ? (
              <Image source={{ uri: photo }} style={{ width: 80, height: 80 }} />
            ) : (
              <FontAwesome name="user" size={80} color="#333" />
            )}
          </View>

          <View style={[styles.shadowContainer, {
            width: 150,
            height: 40, // 높이를 조정하세요.
            backgroundColor: 'white',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }]}>
            <Text style={{ color: 'black' }}> {name} 님</Text>
          </View>
        </View>
      </View>

      {/* 그리드 뷰 */}
      {/* <View style={styles.gridRow}></View> */}
      <ScrollView style={{ marginBottom: 5, padding: 5, flex: 1, width: '100%' }}>
        <View style={styles.left}>
          <Text style={[styles.title, {}]}>편의 기능</Text>
        </View>
        {/* <TouchableOpacity onPress={goToMy_Infor} style={[styles.button, {}]}>
          <Text style={[styles.textStyle, {}]}>프로필 수정 </Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={goToCoins} style={[styles.button, {}]}>
          <Text style={[styles.textStyle, {}]}>포인트 상점 </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToMap} style={[styles.button, {}]}>
          <Text style={[styles.textStyle, {}]}>분리수거 위치 검색 </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToStatistcs} style={[styles.button, {}]}>
          <Text style={[styles.textStyle, {}]}>통계 </Text>
        </TouchableOpacity>


        <View style={styles.left}>
          <Text style={[styles.title, {}]}>이용 약관</Text>
        </View>

        <TouchableOpacity onPress={handleOne}>
          <View style={[styles.button, {}]}>
            <Text style={[styles.textStyle, {}]}>이용 약관</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTwo}>
          <View style={[styles.button, {}]}>
            <Text style={[styles.textStyle, {}]}>개인 정보 방침</Text>
          </View>
        </TouchableOpacity>

        {/* <View style={styles.left}>
          <Text style={[styles.title, {}]}>언어</Text>
        </View>
        <View style={[styles.button, {}]}>
          <Text style={[styles.textStyle, {}]}>번역</Text>
        </View> */}

        <View style={styles.left}>
          <Text style={[styles.title, {}]}>계정</Text>
        </View>
        <TouchableOpacity onPress={handleLogoutPress} style={[styles.button, {}]}>
          <Text style={[styles.textStyle, {}]}>로그아웃 </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelAccountPress} style={[styles.button, { marginBottom: 20 }]}>
          <Text style={[styles.textStyle, {}]}>탈퇴</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>화면 모드를 선택하세요:</Text>
            <Pressable style={[styles.modeButton, selectedMode === 'light' ? styles.selectedMode : null]} onPress={() => handleModeSelection('light')}>
              <Text style={styles.modeButtonText}>라이트 모드</Text>
            </Pressable>
            <Pressable style={[styles.modeButton, selectedMode === 'dark' ? styles.selectedMode : null]} onPress={() => handleModeSelection('dark')}>
              <Text style={styles.modeButtonText}>다크 모드</Text>
            </Pressable>
          </View>
        </View>
      </Modal> */}


    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF3FF',
    alignItems: 'center', // 가운데 정렬
    // justifyContent: 'center', // 가운데 정렬
    padding: 10,
  },
  inforContainer: {
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: '#FFFFFF',
    width: 380,
    height: 100,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    justifyContent: 'center',
  },
  gridRow: {
    flexDirection: 'row',
  },
  gridColumn: {
    height: 120,
    borderWidth: 0.5,
    margin: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: 180,
  },
  gridText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 30,       // 아이콘 크기
    color: '#333',      // 아이콘 색상
  },
  shadowContainer: {
    width: '40%',
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000', // 그림자 색상 (ios에서 그림자 효과 제공)
    shadowOffset: {
      width: 0,          // 그림자의 수평 위치
      height: 2,         // 그림자의 수직 위치
    },
    shadowOpacity: 0.2, // 그림자의 투명도
    shadowRadius: 2.0,  // 그림자의 반경
    elevation: 3,        // Android에서 그림자 효과를 제공합니다
  },
  lightContainer: {
    backgroundColor: '#EDF3FF',
  },
  darkContainer: {
    backgroundColor: '#242c40',
  },
  lightThemeText: {
    color: '#242c40',
  },
  darkThemeText: {
    color: '#d0d0c0',
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: "#e9e9e9",
    width: '100%',
    height: 55,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 18,
  },
  modeButton: {
    padding: 10,
    marginVertical: 10,
    width: 200,
    borderRadius: 5,
    alignItems: "center",
  },
  selectedMode: {
    backgroundColor: "#DDDDDD",
  },
  modeButtonText: {
    fontSize: 16,
  },
  gridColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: 415,
    height: 55,
    borderWidth: 1,
    borderColor: "#e9e9e9"
  },
  textStyle: {
    fontSize: 16,
    marginLeft: 20,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 17,
    color: 'gray',
    marginLeft: 5,
    marginTop: 30,
    marginBottom: 10,
  },
  left: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  }

});