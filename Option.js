import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, Pressable, StatusBar, useColorScheme } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import axios from 'axios';
import LocationContext from './LocationContext';


export default function OptionScreen() {
    const navigation = useNavigation();
    const context = useContext(LocationContext);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMode, setSelectedMode] = useState(colorScheme || 'light');
    const colorScheme = useColorScheme();

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
                                            {name: 'Login'},
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
                                            {name: 'Login'},
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
    const handleScreenModePress = () => {// 화면모드 
        setModalVisible(true);
    };

    const handleModeSelection = (mode) => {
        setSelectedMode(mode);
        setModalVisible(false);
        // 선택한 모드에 따른 테마를 변경하는 로직을 추가할 수 있습니다.
        // 예를 들어, 선택한 모드가 'light'일 때 라이트 모드 테마로 변경하는 등의 작업을 수행할 수 있습니다.
      };
    
      const themeContainerStyle =
        selectedMode === 'light' ? styles.lightContainer : styles.darkContainer;
      const themeTextStyle =
        selectedMode === 'light' ? styles.lightThemeText : styles.darkThemeText;
    

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 17, color: 'gray', top:-35, right:160,}}>사용자 </Text>
      
      <TouchableOpacity
        onPress={handleLogoutPress}
        style={[styles.gridColumn, {
          backgroundColor: '#FFFFFF',
          width: 415,
          height: 55,
          flexDirection: 'row',
          alignItems: 'center',
          margin: 5,
          top: -15,
          borderWidth: 1,
          borderColor: "#e9e9e9",
        }]}
      >
        <Text style={[styles.textStyle, { left: 20 }]}>로그아웃</Text>
      </TouchableOpacity>





      <Text style={{ fontSize: 17, color: 'gray', top:25, right:170,}}>화면</Text>

      <TouchableOpacity
        onPress={handleScreenModePress}
        style={[styles.gridColumn, {
          backgroundColor: '#FFFFFF',
          width: 415,
          height: 55,
          flexDirection: 'row',
          alignItems: 'center',
          margin: 5,
          top: 45,
          borderWidth: 1,
          borderColor: "#e9e9e9",
        }]}
      >
        <Text style={[styles.textStyle, { left: 20 }]}>화면 모드</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 16, color: 'gray', top:80, right:155,}}>이용 약관</Text>
      <View style={[styles.gridColumn, { backgroundColor: '#FFFFFF', width: 415,
        height: 55,  flexDirection: 'row',
        alignItems: 'center', margin: 5,top:95, borderWidth: 1,borderColor:"#e9e9e9", }]}>
        <Text style={[styles.textStyle, { left: 20,  }]}>이용 약관 </Text>
      </View>
      <View style={[styles.gridColumn, { backgroundColor: '#FFFFFF', width: 415,
        height: 55,  flexDirection: 'row',
        alignItems: 'center', margin: 5,top:87, borderWidth: 1,borderColor:"#e9e9e9", }]}>
        <Text style={[styles.textStyle, { left: 20,  }]}>개인 정보 방침 </Text>
      </View>

      <Text style={{ fontSize: 17, color: 'gray', top:115, right:170,}}>언어</Text>
      <View style={[styles.gridColumn, { backgroundColor: '#FFFFFF', width: 415,
        height: 55,  flexDirection: 'row',
        alignItems: 'center', margin: 5,top:130, borderWidth: 1,borderColor:"#e9e9e9", }]}>
        <Text style={[styles.textStyle, { left: 20,  }]}>번역 </Text>
      </View>
      <TouchableOpacity
                onPress={handleDelAccountPress}
                style={[styles.gridColumn, {
                    backgroundColor: '#FFFFFF', width: 415,
                    height: 55, flexDirection: 'row',
                    alignItems: 'center', margin: 5, top: 150, borderWidth: 1, borderColor: "#e9e9e9",
                }]}
            >
                <Text style={[styles.textStyle, { left: 20 }]}>탈퇴 </Text>
            </TouchableOpacity>

      <Modal
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
            <Pressable
              style={[styles.modeButton, selectedMode === 'light' ? styles.selectedMode : null]}
              onPress={() => handleModeSelection('light')}
            >
              <Text style={styles.modeButtonText}>라이트 모드</Text>
            </Pressable>
            <Pressable
              style={[styles.modeButton, selectedMode === 'dark' ? styles.selectedMode : null]}
              onPress={() => handleModeSelection('dark')}
            >
              <Text style={styles.modeButtonText}>다크 모드</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF3FF', // 원하는 배경색을 여기에 지정하세요
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridColumn: {
    backgroundColor: '#FFFFFF',
    width: 415,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    borderWidth: 1,
    borderColor: "#e9e9e9",
  },
  textStyle: {
    left: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
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
});