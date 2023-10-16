import React, {useContext} from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { Button } from 'react-native-paper'; 
import LocationContext from './LocationContext';

function CheckPhoto({ route, navigation }) {
  const { photo } = route.params;
  const context = useContext(LocationContext);

  const description = `photo.uri: ${photo.uri}`;

  // 확인 버튼을 눌렀을 때 Home으로 이동합니다.
  const handleConfirm = () => {
    let formData = new FormData();
    formData.append('image', {
      uri: photo.uri,
      type: 'image/jpeg', // or your mime type what you want
      name: 'testPhoto.jpg',
    });

    axios.post(`http://${context.ip}:5000/predict`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(function (response) {
        console.log(response.data);
        navigation.navigate('Home');
      })
      .catch(function (error) {
        console.log(error);
      });

    navigation.navigate('Home');
  };

  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={{ uri: photo.uri }}
        style={{ width: 300, height: 400 }}
      />
      <Text style={styles.description}>{description}</Text>
      
      <Button mode="contained" onPress={handleConfirm} style={styles.button}>
        확인
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    marginTop: 20,
    fontSize: 16,
   },
   button:{
     marginTop :20,
     backgroundColor:'#628F5D'
   }
});

export default CheckPhoto;
