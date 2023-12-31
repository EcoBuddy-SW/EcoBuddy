import { style } from 'deprecated-react-native-prop-types/DeprecatedViewPropTypes';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, Pressable, ScrollView } from 'react-native';
import { useColorScheme } from 'react-native';

export default function OptionScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const colorScheme = useColorScheme();

  const [selectedMode, setSelectedMode] = useState(colorScheme || 'light');

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

  const themeContainerStyle =
    selectedMode === 'light' ? styles.lightContainer : styles.darkContainer;
  const themeTextStyle =
    selectedMode === 'light' ? styles.lightThemeText : styles.darkThemeText;

  return (
    <View style={[styles.container, themeContainerStyle]}>

      {/* <Text style={{ fontSize: 16, color: 'gray', top: -15, right: 170 }}>화면</Text>
      <TouchableOpacity onPress={handleScreenModePress} style={[styles.button, themeTextStyle, { width: 415, height: 55, }]}>
        <Text style={[styles.textStyle, { left: 10, top: 5, }]}>화면 설정    Color scheme: {selectedMode}</Text>
      </TouchableOpacity> */}

      <View style={styles.left}>
        <Text style={[styles.title, {}]}>이용 약관</Text>
      </View>

      <TouchableOpacity onPress={handleOne}>
        <View style={[styles.gridColumn, {}]}>
          <Text style={[styles.textStyle, {}]}>이용 약관</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleTwo}>
        <View style={[styles.gridColumn, {}]}>
          <Text style={[styles.textStyle, {}]}>개인 정보 방침</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.left}>
        <Text style={[styles.title, {}]}>언어</Text>
      </View>
      <View style={[styles.gridColumn, {}]}>
        <Text style={[styles.textStyle, {}]}>번역</Text>
      </View>

      <View style={styles.left}>
        <Text style={[styles.title, {}]}>사용자</Text>
      </View>
      <TouchableOpacity onPress={handleLogoutPress} style={[styles.button, themeTextStyle, {}]}>
        <Text style={[styles.textStyle, {}]}>로그아웃 </Text>
      </TouchableOpacity>
      <View style={[styles.gridColumn, {}]}>
        <Text style={[styles.textStyle, {}]}>탈퇴</Text>
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
            <Pressable style={[styles.modeButton, selectedMode === 'light' ? styles.selectedMode : null]} onPress={() => handleModeSelection('light')}>
              <Text style={styles.modeButtonText}>라이트 모드</Text>
            </Pressable>
            <Pressable style={[styles.modeButton, selectedMode === 'dark' ? styles.selectedMode : null]} onPress={() => handleModeSelection('dark')}>
              <Text style={styles.modeButtonText}>다크 모드</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    padding: 10,
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
    width: 415,
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