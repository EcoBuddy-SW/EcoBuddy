
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Foundation';
import Icon1 from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';


function MyPageScreen() {

  

  const navigation = useNavigation();

  const goToMap = () => {
    navigation.navigate('Map'); // 'Map' 스크린으로 이동
  };
  const goToCoins = () => {
    navigation.navigate('Coins'); // 'Coins' 스크린으로 이동
  };
  const goToRecord = () =>{
    navigation.navigate('Record'); // record 스크린으로 이동

  };
  
  const goToOption =() =>{
    navigation.navigate('Option')// 설정으로 이동
  };
  const goToBell =() =>{
    navigation.navigate('bell')// 알림이로 이동

  };
  const goToStatistcs =() =>{
    navigation.navigate('Statistcs')// 알림이로 이동

  };
  const goToMy_Infor =() =>{
    navigation.navigate('My_Infor')// 프로필
  };
 
  return (

    <ScrollView contentContainerStyle={styles.container}>
      <Ionicons name="ios-earth" size={50} color="green" style={{ marginBottom: 10, top: 3 }} />
      <View style={[styles.gridColumn, { backgroundColor: '#FFFFFF', width: 405, height: 30, marginBottom: 100, flexDirection: 'row', alignItems: 'center', margin: 5, borderRadius: 10, elevation: 5 }]}>



  {/* 프로필 */}
  <View style={{
    borderColor: '#333',
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
    right: 60,
    borderRadius: 8,
    position: 'absolute', // 프로필을 겹쳐지게 만듭니다.
    top: 35, // 원하는 위치로 조정하세요.
    left: 30, // 원하는 위치로 조정하세요.
  }}>
    <FontAwesome name="user" size={80} color="#333" />
  </View>

  <View style={{
  position: 'absolute',
  top: 60,
  left: 120,
  width: 250,
  height: 40, // 높이를 조정하세요.
  backgroundColor: 'white',
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
  borderColor: "#e9e9e9",
  borderWidth: 1,
  shadowColor: 'black', // 그림자 색상
  shadowOffset: { width: 0, height: 3 }, // 그림자 위치 (가로, 세로)
  shadowOpacity: 0.1, // 그림자 투명도 (0에서 1 사이의 값)
  shadowRadius: 2, // 그림자의 퍼지는 정도
}}>
  <Text style={{ color: 'black' }}> 님</Text>
</View>



  {/* "내 정보" 테두리 */}
  <TouchableOpacity onPress={goToMy_Infor}>

    <View style={{ width: 65, height: 25, borderColor: '#e9e9e9', borderWidth: 1, borderRadius: 10, top: -1, marginLeft: 15,
     right: 60, shadowOffset: { width: 0, height: 3 },
     shadowOpacity: 0.1,  shadowRadius: 2, shadowColor: 'black',}}>
      <Text style={{ fontSize: 15, color: 'black', textAlign: 'center', textAlignVertical: 'center',top:5, }}>프로필</Text>
    </View>
  </TouchableOpacity>
</View>

      {/* 그리드 뷰 */}
      <View style={styles.gridRow}>

      
     <TouchableOpacity onPress={goToCoins}>
     <View style={[styles.gridColumn, { backgroundColor: '#FFFFFF', borderRadius: 10, width: 405, flexDirection: 'row', alignItems: 'center' }]}>
  <FontAwesome5 name="coins" size={30} color="#333" style={{ Left: 40 }} />
  <Text style={styles.gridText}>포인트</Text>
</View>

  </TouchableOpacity>
    </View>

      
      <View style={styles.gridRow}>
        <TouchableOpacity onPress={goToRecord}>
          <View style={[styles.gridColumn, { backgroundColor: '#FFFFFF', borderRadius: 10 ,width: 200}]}>
           <FontAwesome name="folder-open" size={30} color="#333" />
             <Text style={styles.gridText}>활동 기록</Text>
          </View>
        </TouchableOpacity >
        <TouchableOpacity onPress={goToMap}>
      <View style={[styles.gridColumn, { backgroundColor: '#FFFFFF', borderRadius: 10,width: 200 }]}>
    <FontAwesome name="map-marker" size={30} color="#333" />
    <Text style={styles.gridText}>분리수거장 위치</Text>
     </View>
     </TouchableOpacity>

       
      </View>
      
      <View style={styles.gridRow}>
       <TouchableOpacity onPress={goToOption}>  
         <View style={[styles.gridColumn, { backgroundColor: '#FFFFFF', borderRadius: 10, width: 200 }]}>
           <FontAwesome name="cog" size={30} color="#333" />
           <Text style={styles.gridText}>설정</Text>
         </View>
       </TouchableOpacity>

      <TouchableOpacity onPress={goToStatistcs}>
        <View style={[styles.gridColumn, { backgroundColor: '#FFFFFF', borderRadius: 10 ,width: 200}]}>
        <Icon name="graph-pie" size={30} color="#333" />
          <Text style={styles.gridText}>통계</Text>
        </View>
        </TouchableOpacity>
      </View>

     

    </ScrollView>
  );
}

export default MyPageScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // ScrollView가 화면 전체를 채우도록 합니다.
    backgroundColor: '#EDF3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridRow: {
    flexDirection: 'row',
  },
  gridColumn: {
    flex: 1,
    height: 120,
    borderWidth: 0.5,
    margin: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
});