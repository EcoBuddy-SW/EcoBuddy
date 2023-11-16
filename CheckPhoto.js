import React, { useContext, useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler'; 
import LocationContext from './LocationContext';

function CheckPhoto({ route, navigation }) {
  const { photo, message, cls } = route.params;
  const context = useContext(LocationContext);

  const dataTf = message;
  const userId = context.userId;
  
  const [currentPage, setCurrentPage] = useState(dataTf ? 1 : 4);
  const [trashTypeConfirmed, setTrashTypeConfirmed] = useState(dataTf);
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
  
  //const [selectedTrashType, setSelectedTrashType] = useState(dataTf == false ? '' : trashTypes[responseData[0].class]); // 초기값을 종이로 설정합니다.
  const [selectedTrashType, setSelectedTrashType] = useState(dataTf == false ? '' : trashTypes[cls]);
  // 사용자가 선택한 쓰레기 종류
  const [userSelectedTrashType, setUserSelectedTrashType] = useState('');

  const handleRetakePhoto = () => {
    navigation.navigate('Camera');
  };

  const correctClassPhoto = () => {
    setTrashTypeConfirmed(true);
    setCurrentPage(3);
    setSelectedTrashType(trashTypes[cls]);
    axios.post(`http://${context.ip}:3003/trashAdd`,{trash:selectedTrashType, userId:userId});
    axios.post(`http://${context.ip}:3003/updatePoint`,{userId : userId});
  }

  const wrongClassPhoto = () => {
    setTrashTypeConfirmed(false);
    setCurrentPage(2);
    setSelectedTrashType(''); // 쓰레기 종류 초기화
  };

  const handleConfirm = () => {
  //   if (currentPage === 3 || trashTypeConfirmed) {
  //     navigation.navigate('Home');
  //   }
  // };

  // 확인 버튼을 눌렀을 때 Home으로 이동합니다.
  // const handleConfirm = () => {
  //   let formData = new FormData();
  //   formData.append('image', {
  //     uri: photo.uri,
  //     type: 'image/jpeg', // or your mime type what you want
  //     name: 'testPhoto.jpg',
  //   });

  //   axios.post(`http://${context.ip}:5000/predict`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     })
  //     .then(function (response) {
  //       console.log(response.data);
  //       console.log('클래스타입은');
  //       // 'data' 필드의 값을 JSON 객체로 변환
  //       const data = JSON.parse(response.data.data);
        
  //       // 'class' 값을 출력
  //       console.log(data[0].class);

  //       if (data[0].class != null) {
  //         setTrashTypeConfirmed = true;
  //         setCurrentPage = 1;
  //         setSelectedTrashType = trashTypes[data[0].class];
  //       }

  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });

      // id
    navigation.navigate('Home');
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
      {currentPage === 4 && !trashTypeConfirmed && (
        <View style={styles.buttonGroup}>
          <Text style={styles.question}>
            {'물체를 감지하지 못하였습니다.'}
          </Text>
          <Text style={styles.question}>
            {'다시 촬영하시겠습니까?'}
          </Text>
          <View style={styles.rowContainer}>
            <Button mode="contained" onPress={handleRetakePhoto} style={styles.button}>
              네
            </Button>
            <Button mode="contained" onPress={handleConfirm} style={styles.button}>
              아니오
            </Button>
            {/* <Button mode="contained" onPress={() => setTrashTypeConfirmed(true)} style={styles.button}>
              네
            </Button>
            <View style={{marginLeft:10}}></View>
            <Button mode="contained" onPress={handleRetakePhoto} style={styles.button}>
              아니요
            </Button> */}
          </View>
        </View>
      )}
      {currentPage === 1 && trashTypeConfirmed && (
        <View style={styles.buttonGroup}>
          <Text style={styles.question}>
            {`이 쓰레기가 ${selectedTrashType} 이/가 맞나요?`}
          </Text>
          <View style={styles.rowContainer}>
            <Button mode="contained" onPress={correctClassPhoto} style={styles.button}>
              네
            </Button>
            <View style={{marginLeft:10}}></View>
            <Button mode="contained" onPress={wrongClassPhoto} style={styles.button}>
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
                  setCurrentPage(3);
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
      {currentPage === 3 && trashTypeConfirmed && (
        <View style={styles.buttonGroup}>
          <Text style={[styles.description, { color: 'white', fontSize: 15, fontFamily: 'Pretendard-Bold', }, isBlinking && styles.blinkingText]}>
            깨끗한 상태로 분리수거 하시는 것을 권장합니다
          </Text>
          <Text style={styles.description}>
            {disposalMethods[selectedTrashType || userSelectedTrashType] || '분리수거 정보가 없습니다.'}
          </Text>
          <Button mode="contained" onPress={handleConfirm} style={styles.button}>
            홈(+13p)
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