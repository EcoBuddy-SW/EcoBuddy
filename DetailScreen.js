import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { style } from 'deprecated-react-native-prop-types/DeprecatedViewPropTypes';

export default function DetailScreen() {

  return (
    <View style={[styles.background, {}]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Text style={[styles.title, { marginTop: 30 }]}>글 제목입니다</Text>
        <View style={{ flex: 1, alignItems: 'flex-end', marginTop: 30 }}>
          <Text style={styles.text}>작성 날짜</Text>
        </View>
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.text}>본문입니다.</Text>
        <Text style={styles.text}>스크롤 넣음!</Text>
      </ScrollView>

      <View style={{ marginBottom: 30 }}></View>
      {/* 버튼 두 개 */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 30 }}>
        <View style={styles.btn}>
          <Text style={style.text}>이미지 확인</Text>
        </View>
        <View style={[styles.btn, { backgroundColor: '#EDF3FF' }]}>
          <Text style={style.text}>위치 확인</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20 ,
  },
  container: {
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    marginTop: 10,
  },
  shadowContainer: {
    width: '90%',
    height: 70,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.0,
    elevation: 3,
  },
  btn: {
    backgroundColor: '#FFEDF2',
    width: '30%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 15,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 17,
  },
});
