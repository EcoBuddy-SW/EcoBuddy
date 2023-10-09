import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, Pressable, StatusBar } from 'react-native';
import { useColorScheme, Appearance } from 'react-native-appearance'; // useColorScheme을 Appearance과 함께 import

export default function OptionScreen() {
  const colorScheme = useColorScheme();
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
            // 로그아웃 로직을 추가
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

    // 선택한 모드에 따라 StatusBar 스타일 변경 및 기타 스타일 적용
    if (mode === 'dark') {
      StatusBar.setBarStyle('light-content');
      // 여기에서 다크 모드에 필요한 스타일을 적용할 수 있습니다.
    } else {
      StatusBar.setBarStyle('dark-content');
      // 여기에서 라이트 모드에 필요한 스타일을 적용할 수 있습니다.
    }
  };

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 기본 StatusBar 스타일을 설정
    StatusBar.setBarStyle(colorScheme === 'dark' ? 'light-content' : 'dark-content');
  }, [colorScheme]);

  
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>사용자</Text>

      <TouchableOpacity
        onPress={handleLogoutPress}
        style={styles.button}
      >
        <Text style={styles.buttonText}>로그아웃</Text>
      </TouchableOpacity>

      <Text style={styles.headerText}>화면</Text>

      <TouchableOpacity
        onPress={handleScreenModePress}
        style={styles.button}
      >
        <Text style={styles.buttonText}>화면 모드</Text>
      </TouchableOpacity>



      <Text style={{ fontSize: 16, color: 'gray', top:65, right:155,}}>이용 약관</Text>
      <View style={[styles.gridColumn, { backgroundColor: '#FFFFFF', width: 415,
        height: 55,  flexDirection: 'row',
        alignItems: 'center', margin: 5,top:75, borderWidth: 1,borderColor:"#e9e9e9", }]}>
        <Text style={[styles.textStyle, { left: 20,  }]}>이용 약관 </Text>
      </View>
      <View style={[styles.gridColumn, { backgroundColor: '#FFFFFF', width: 415,
        height: 55,  flexDirection: 'row',
        alignItems: 'center', margin: 5,top:65, borderWidth: 1,borderColor:"#e9e9e9", }]}>
        <Text style={[styles.textStyle, { left: 20,  }]}>개인 정보 방침 </Text>
      </View>

      <Text style={{ fontSize: 17, color: 'gray', top:85, right:170,}}>언어</Text>
      <View style={[styles.gridColumn, { backgroundColor: '#FFFFFF', width: 415,
        height: 55,  flexDirection: 'row',
        alignItems: 'center', margin: 5,top:100, borderWidth: 1,borderColor:"#e9e9e9", }]}>
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
            <Text style={styles.modalText}>화면 모드를 선택하세요</Text>
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
    backgroundColor: '#EDF3FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 17,
    color: 'gray',
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FFFFFF',
    width: 415,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    borderWidth: 1,
    borderColor: "#e9e9e9",
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
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