import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function SearchResultScreen() {
  const route = useRoute();
  const { searchKeyword } = route.params;

  return (
    <View style={styles.container}>
      <Text>검색 결과 화면</Text>
      <Text>검색어: {searchKeyword}</Text>
      {/* 검색 결과 데이터를 표시하도록 추가 */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
