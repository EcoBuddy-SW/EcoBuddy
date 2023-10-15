import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

// // React Native에서 이미지 업로드 요청 보내기
// import axios from 'axios';

// // 이미지와 사용자 정보를 서버로 업로드
// const uploadImage = async (userId, imageUri) => {
//   try {
//     const response = await axios.post('http://your-backend-server/upload-image', {
//       userId: userId,
//       image: imageUri,
//     });
//     console.log('Image uploaded successfully:', response.data);
//   } catch (error) {
//     console.error('Image upload error:', error);
//   }
// };

// // 사용법
// const userId = 'user123'; // 로그인한 사용자 ID
// const imageUri = 'file://path/to/your/image.jpg'; // 이미지 파일 경로
// uploadImage(userId, imageUri);


function CheckPhoto({ route, navigation }) {
  const { photo } = route.params;
  const [currentPage, setCurrentPage] = useState(1);
  const [trashTypeConfirmed, setTrashTypeConfirmed] = useState(false);
  const [selectedTrashType, setSelectedTrashType] = useState('종이'); // 초기값을 종이로 설정합니다.
  const [isBlinking, setIsBlinking] = useState(true);

  const trashTypes = [
    '비닐',
    '스티로폼',
    '금속캔 (알루미늄)',
    '금속캔 (철)',
    '종이',
    '페트병 (무색 단일)',
    '페트병 (유색 단일)',
    '플라스틱 (PE)',
    '플라스틱 (PP)',
    '플라스틱 (PS)',
    '유리병 (갈색)',
    '유리병 (녹색)',
    '유리병 (투명)',
    '건전지',
    '형광등'
  ];

  // 분리수거 방법 정보를 저장하는 객체
  const disposalMethods = {
    '비닐': '비닐을 재활용하려면 깨끗하게 씻은 후 재활용 컨테이너에 버려주세요.',
    '스티로폼': '스티로폼은 재활용하기 어렵습니다. 일반 쓰레기로 버려야 합니다.',
    '금속캔 (알루미늄)': '알루미늄 캔은 재활용 컨테이너에 버려주세요.',
    '금속캔 (철)': '철 캔은 재활용 컨테이너에 버려주세요.',
    '종이': '종이는 깨끗한 상태로 재활용 컨테이너에 버려주세요.',
    '페트병 (무색 단일)': '무색 페트병은 재활용 컨테이너에 버려주세요.',
    '페트병 (유색 단일)': '유색 페트병은 재활용 컨테이너에 버려주세요.',
    '플라스틱 (PE)': 'PE 플라스틱은 재활용 컨테이너에 버려주세요.',
    '플라스틱 (PP)': 'PP 플라스틱은 재활용 컨테이너에 버려주세요.',
    '플라스틱 (PS)': 'PS 플라스틱은 재활용하기 어렵습니다. 일반 쓰레기로 버려야 합니다.',
    '유리병 (갈색)': '갈색 유리병은 재활용 컨테이너에 버려주세요.',
    '유리병 (녹색)': '녹색 유리병은 재활용 컨테이너에 버려주세요.',
    '유리병 (투명)': '투명 유리병은 재활용 컨테이너에 버려주세요.',
    '건전지': '건전지는 특수 폐기물 수거소에 버려야 합니다.',
    '형광등': '형광등은 특수 폐기물 수거소에 버려야 합니다.'
  };

  // 사용자가 선택한 쓰레기 종류
  const [userSelectedTrashType, setUserSelectedTrashType] = useState('');

  const handleRetakePhoto = () => {
    setTrashTypeConfirmed(false);
    setSelectedTrashType(''); // 쓰레기 종류 초기화
    setCurrentPage(2);
  };

  const handleConfirm = () => {
    if (currentPage === 3 || trashTypeConfirmed) {
      navigation.navigate('Home');
    }
  };

  useEffect(() => {
    // 0.5 초마다 깜빡임을 변경
    const interval = setInterval(() => {
      setIsBlinking((prevIsBlinking) => !prevIsBlinking);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <Image
        source={{ uri: photo.uri }}
        style={{ width: 300, height: 400 }}
      />
      {currentPage === 1 && !trashTypeConfirmed && (
        <View style={styles.buttonGroup}>
          <Text style={styles.question}>
            {selectedTrashType ? `이 쓰레기가 ${selectedTrashType} 이/가 맞나요?` : '이 쓰레기가 어떤 종류인가요?'}
          </Text>
          <View style={styles.rowContainer}>
            <Button mode="contained" onPress={() => setTrashTypeConfirmed(true)} style={styles.button}>
              네
            </Button>
            <Button mode="contained" onPress={handleRetakePhoto} style={styles.button}>
              아니요
            </Button>
          </View>
        </View>
      )}
      {currentPage === 2 && !trashTypeConfirmed && (
        <View style={styles.container}>
          <Text style={styles.question}>
            이 쓰레기는 어떤 종류인가요?
          </Text>
          <ScrollView style={{ padding: 20, marginBottom: 30 }}>
            {trashTypes.map((trashType, index) => (
              <Button
                key={index}
                mode="contained"
                onPress={() => {
                  setTrashTypeConfirmed(true);
                  setUserSelectedTrashType(trashType);
                  setSelectedTrashType(trashType); // 선택한 쓰레기 종류 설정
                }}
                style={[
                  styles.button,
                  index === trashTypes.length - 1 && { marginBottom: 30 } // 마지막 버튼에만 marginBottom 적용
                ]}
              >
                {trashType}
              </Button>
            ))}
          </ScrollView>
        </View>
      )}
      {currentPage === 3 || trashTypeConfirmed && (
        <View style={styles.buttonGroup}>
          <Text style={[styles.description, { color: 'white', fontSize: 15, fontFamily: 'Pretendard-Bold', }, isBlinking && styles.blinkingText]}>
            깨끗한 상태로 분리수거 하시는 것을 권장합니다
          </Text>
          <Text style={styles.description}>
            {disposalMethods[selectedTrashType || userSelectedTrashType] || '분리수거 정보가 없습니다.'}
          </Text>
          <Button mode="contained" onPress={handleConfirm} style={styles.button}>
            홈
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  question: {
    marginTop: 20,
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
  },
  buttonGroup: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#74A16F',
    color: 'black', // 버튼의 글자 색상을 검정색으로 설정
  },
  description: {
    fontFamily: 'Pretendard-Regular',
    marginTop: 20,
  },
  blinkingText: {
    color: 'red', // 빨간색 텍스트
    fontSize: 15,
    fontFamily: 'Pretendard-Bold',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CheckPhoto;
