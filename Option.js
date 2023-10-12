import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';

export default function OptionScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMode, setSelectedMode] = useState('light');

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
            // 로그아웃 로직을 여기에 추가하세요 (예: AsyncStorage나 API 호출 등)
            // 로그아웃이 성공하면 화면을 다시 로딩하거나 홈 화면으로 이동할 수 있습니다.
            // 예: navigation.navigate('Home');
          },
        },
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
    // 선택한 모드에 따른 로직을 추가할 수 있습니다.
    // 예를 들어, 다크 모드와 라이트 모드로 화면을 변경하는 등의 작업을 수행할 수 있습니다.
  };

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
      <View style={[styles.gridColumn, { backgroundColor: '#FFFFFF', width: 415,
        height: 55,  flexDirection: 'row',
        alignItems: 'center', margin: 5,top:150, borderWidth: 1,borderColor:"#e9e9e9", }]}>
        <Text style={[styles.textStyle, { left: 20 }]}>탈퇴 </Text>
      </View>

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