import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
//import { FontAwesome } from '@expo/vector-icons';

export default function OptionScreen() {
  return (
    <View style={styles.container}>
        
        
        <Text style={{ fontSize: 17, color: 'gray', top:95, right:160,}}>사용자
        
        </Text>     
        <View style={[styles.gridColumn, { backgroundColor: '#FFFFFF', width: 415, height: 55, marginBottom: 15, flexDirection: 'row', marginTop: 10, alignItems: 'center', margin: 5, top: 100, borderWidth: 1, borderColor:"#e9e9e9" }]}>
         <Text style={styles.textStyle}>로그인 정보</Text>
       </View>

            <View style={[styles.gridColumn, { backgroundColor: '#FFFFFF', width: 415,
              height: 55,  flexDirection: 'row',
              alignItems: 'center', margin: 5,top:80, borderWidth: 1,borderColor:"#e9e9e9", }]}>
            </View>
           
          
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF3FF', // 원하는 배경색을 여기에 지정하세요
    ustifyContent: 'center',
    alignItems: 'center',

  },
});
