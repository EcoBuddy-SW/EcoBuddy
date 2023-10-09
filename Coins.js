import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CoinsScreen() {
  return (
    <View style={styles.container}>
      <Text>This is the Map Screen</Text>
      {/* 화면 내용 추가 */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF3FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
