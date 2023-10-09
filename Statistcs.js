import React from 'react';
import { View, Text,StyleSheet } from 'react-native';

export default function StatistcsScreen() {
  return (
    <View style={styles.container}>
      <Text>통계</Text>
      {/* 화면 내용 추가 */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF3FF', // 배경색을 #EDF3FF으로 설정
    justifyContent: 'center',
    alignItems: 'center',
  },
});
