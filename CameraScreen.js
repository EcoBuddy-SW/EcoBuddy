import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);


  if (hasPermission === null) {
    return <View />;
  }
  
  if (hasPermission === false) {
    return (
      <View style={{ flex:1 , justifyContent:'center', alignItems:'center'}}>
        <Text>No access to camera</Text>
        <TouchableOpacity onPress={requestCameraPermission}>
          <Text>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      navigation.navigate('결과 확인', { photo });
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
            <Text style={{ fontSize: 20, color: 'black' }}>Take Photo</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

export default CameraScreen;
