import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Svg, { Circle } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ProfileDialog from './ProfileDialog';
import LocationContext from './LocationContext';
import storage from '@react-native-firebase/storage';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';



const { width, height } = Dimensions.get('window');
const circleRadius = 80;
const circleCenterX = width / 2;
const circleCenterY = height / 2;

export default function MyInfoScreen() {
  const storage = getStorage();
  const context = useContext(LocationContext);
  const [photo, setPhoto] = useState(undefined);
  const userId = context.userId;
  const [isProfileDialogVisible, setProfileDialogVisible] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    point:''
  });

  const fetchUserInfo = () => {
    axios.post(`http://${context.ip}:3003/downloadUserInfo`, { userId })
      .then(response => {
        if (response) {
          const userInfo = response.data;
          setProfileInfo({
            name: userInfo.nickname,
            email: userInfo.email,
            phoneNumber: userInfo.phoneNumber,
            point: userInfo.Point
          });
          setPhoto(userInfo.profileURL);
        } else {
          console.error('사용자 정보를 가져오는데 실패했습니다.');
        }
      })
      .catch(error => {
        console.error('네트워크 오류:', error);
      });
  };

  const savePhoto = async (photoUri) => {
    try {
      await AsyncStorage.setItem('photo', photoUri);
    } catch (error) {
      console.error('Error saving photo: ', error);
    }
  };

  const loadPhoto = async () => {
    axios.post(`http://${context.ip}:3003/downloadProfile`, { userId })
    .then(response => response.data)
    .then(data => {
      if (data.success) {
        const profileURL = data.data.profileUrl;
        setPhoto(profileURL);
        console.log('프로필 사진 로드 성공(클라이언트)',profileURL);
      } else {
        console.log('프로필 사진 로드 실패:', data.message);
      }
    });
  };


  useEffect(() => {
    loadPhoto();
    fetchUserInfo();
  }, []);

  const handleChangePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      handleUploadPhoto();
      setPhoto(result.assets[0].uri);
      savePhoto(result.assets[0].uri);
    }
  };

  // const handleUploadPhoto = async () => {
  //   if (photo) {
  //     try {
  //       const formData = new FormData();
  //       formData.append('photo', {
  //         uri: photo,
  //         type: 'image/jpeg',
  //         name: 'photo.jpg',
  //       });

  //       const response = await axios.post(`http://${context.ip}:3003/updateprofile`, formData, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       });

  //       console.log('이미지가 성공적으로 업로드되었습니다.');
  //       console.log('서버 응답:', response.data);
  //     } catch (error) {
  //       console.error('이미지 업로드 실패:', error);
  //     }
  //   } else {
  //     console.log('이미지가 선택되지 않았습니다.');
  //   }
  // };

  const handleUploadPhoto = async () => {
  if (photo) {
    try {
      const meta = {contentType:'image/jpeg'};
      const storageRef = ref(storage, 'profile/photo'+userId+'.jpg');
      const response = await uploadBytes(storageRef, photo, meta);
      const getDownloadURL2 = await getDownloadURL(storageRef);

      axios.post(`http://${context.ip}:3003/uploadProfile`,{userId, getDownloadURL2})
      .then(response => response.data)
    .then(data => {
      if(data.success){
        console.log('url 업로드 완료(클라이언트)');
      } else{
        console.log('url 업로드 오류(클라이언트)',response.data.message);
      }
    })
      console.log('이미지가 성공적으로 업로드되었습니다.');
      console.log('다운로드 URL:', getDownloadURL2);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  } else { 
    console.log('이미지가 선택되지 않았습니다.');
  }
};

  

  const handleSaveProfile = (profileData) => {
    setProfileInfo(profileData);
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
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={[styles.gridColumn, { backgroundColor: '#EDF3FF', width: width, height: height / 2, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: "#e9e9e9" }]}>
          <Svg height={height / 2} width={width}>
            <Circle cx={circleCenterX} cy={circleCenterY} r={circleRadius} fill="white" />
          </Svg>
          {renderPhoto()}
          <TouchableOpacity onPress={handleChangePhoto} style={styles.cameraButton}>
            <AntDesign name="camera" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => setProfileDialogVisible(true)}
          style={[
            styles.editButton,
            {
              marginTop: 100,
              borderWidth: 1,
              borderColor: "#e9e9e9",
              borderRadius: 10,
              padding: 10,
            },
          ]}
        >
          <Text style={{ fontSize: 20 }}>프로필 수정</Text>
        </TouchableOpacity>

        <ProfileDialog visible={isProfileDialogVisible} onClose={() => setProfileDialogVisible(false)} onSave={handleSaveProfile} />

       
  <View style={styles.rectangle}>
  <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 , left:140 }}>내 정보</Text>
    <Text>Username: {profileInfo.name}</Text>
    <Text>Email: {profileInfo.email}</Text>
    <Text>Phone: {profileInfo.phoneNumber}</Text>
    <Text>Point: {profileInfo.point}</Text>
  </View>
        </View>
    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  gridColumn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButton: {
    position: 'absolute',
    left: 250,
    bottom: 10,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
  editButton: {
    marginTop: 100,
    borderWidth: 1,
    borderColor: "#e9e9e9",
    borderRadius: 10,
    padding: 10,
  },
  rectangle: {
    width: 350,
    height: 200,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: "#e9e9e9",
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    marginTop: 20,
    justifyContent: 'left',
    alignItems: 'left',
  },
});