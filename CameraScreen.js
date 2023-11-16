import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios';
import LocationContext from './LocationContext';

function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const context = useContext(LocationContext);

  useEffect(() => {
    const requestCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    requestCameraPermission();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      
      let formData = new FormData();
      formData.append('image', {
        uri: photo.uri,
        type: 'image/jpeg',
        name: 'testPhoto.jpg',
      });
  
      try {
        const response = await axios.post(`http://${context.ip}:5000/predict`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        console.log('camerascreen response.data: ', response.data);
        const cls = response.data['cls'];
        const message = response.data['message'];
        console.log(cls);
        console.log(message);
        console.log('conf: ', response.data['conf']);
        // if (data.length > 0) {
        //   dataTf = true;
        //   // 'class' 값을 출력
        //   console.log('class: ', data[0].class);
        //   console.log(dataTf, '=true');
        // } 
        // console.log('전환 전', dataTf);

        navigation.navigate('결과 확인', { photo: photo, message: message, cls: cls });
  
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        ref={(ref) => setCameraRef(ref)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'flex-end',
          }}
        >
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              marginBottom: 20,
              padding: 10,
              borderRadius: 5,
              backgroundColor: 'white',
            }}
            onPress={takePicture}
          >
            <Text style={{ fontSize: 20, color: 'black' }}>촬영하기</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

export default CameraScreen;