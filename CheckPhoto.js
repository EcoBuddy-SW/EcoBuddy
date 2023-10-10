import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper'; // react-native-paper의 Button을 불러옵니다.

function CheckPhoto({ route, navigation }) {
  const { photo } = route.params;

  const description = "이 사진에 대한 설명을 여기에 추가하세요.";

  // 확인 버튼을 눌렀을 때 Home으로 이동합니다.
  const handleConfirm = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={{ uri: photo.uri }}
        style={{ width: 300, height: 400 }}
      />
      <Text style={styles.description}>{description}</Text>
      {/* children 속성을 사용하여 버튼 내용을 설정 */}
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
  button: {
    marginTop: 20,
    backgroundColor: '#628F5D'
  },
});

export default CheckPhoto;
