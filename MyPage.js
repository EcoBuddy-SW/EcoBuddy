
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
  const goToAnnouncements =() =>{
    navigation.navigate('Announcements')// Announcements(공지) 스크린으로 이동
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
    navigation.navigate('My_Infor')// 내 정보로 이동
  };
  return (

    <ScrollView contentContainerStyle={styles.container}>
      <Ionicons name="ios-earth" size={50} color="green" style={{ marginBottom: 10, top: 3 }} />
      <View style={[styles.gridColumn, { backgroundColor: '#FFFFFF', width: 415, height: 100, marginBottom: 15, flexDirection: 'row', alignItems: 'center', margin: 5 }]}>
        {/* 아이콘 */}
        <View style={{
          borderColor: '#333',
          padding: 2,
          flexDirection: 'row',
          alignItems: 'center',
          right: 60,
          borderRadius: 8, // 원 형태로 만들기 위한 속성
          borderWidth: 1, // 테두리 두께 설정
        }}>
          <FontAwesome name="user" size={150} color="#333" />
        </View>
        
        <TouchableOpacity onPress={goToMy_Infor}>
         {/* "내 정보" 테두리 */}
         <View style={{ width: 65, height: 25, borderColor: '#333', borderWidth: 1, borderRadius: 10, top: 65, marginLeft: 15 ,right:60,}}>
           <Text style={{ fontSize: 15, color: 'black', textAlign: 'center', textAlignVertical: 'center' }}>프로필</Text>
         </View>
        </TouchableOpacity>

      </View>
      {/* 그리드 뷰 */}
      <View style={styles.gridRow}>

      <TouchableOpacity onPress={goToMap}>
      <View style={[styles.gridColumn, { backgroundColor: '#FFFFFF', borderRadius: 10,width: 200 }]}>
    <FontAwesome name="map-marker" size={30} color="#333" />
    <Text style={styles.gridText}>분리수거장 위치</Text>
     </View>
     </TouchableOpacity>

           

     <TouchableOpacity onPress={goToCoins}>
    <View style={[styles.gridColumn, { backgroundColor: '#FFFFFF', borderRadius: 10, width: 200 }]}>
      <FontAwesome5 name="coins" size={30} color="#333" />
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

        <TouchableOpacity onPress={goToAnnouncements}>
         <View style={[styles.gridColumn, { backgroundColor: '#FFFFFF', borderRadius: 10,width: 200 }]}>
           <Icon name="sound" size={30} color="#333" />
           <Text style={styles.gridText}>공지</Text>
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

     <TouchableOpacity onPress={goToBell}>
       <View style={[styles.gridColumn, { backgroundColor: '#FFFFFF', borderRadius: 10, width: 200 }]}>
       <FontAwesome name="bell" size={27} color="#333" />
          <Text style={styles.gridText}>알림</Text>
          </View>
     </TouchableOpacity>
      </View>

      <View style={styles.gridRow}>
      
      <TouchableOpacity onPress={goToStatistcs}>
        <View style={[styles.gridColumn, { backgroundColor: '#FFFFFF', borderRadius: 10 ,width: 200}]}>
        <Icon name="graph-pie" size={30} color="#333" />
          <Text style={styles.gridText}>통계</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToBell}>
        <View style={[styles.gridColumn, { backgroundColor: '#FFFFFF', borderRadius: 10 ,width: 200}]}>
          <Icon1 name="language" size={30} color="#333" />
          <Text style={styles.gridText}>번역</Text>
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
    height: 130,
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