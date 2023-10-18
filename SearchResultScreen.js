import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import WebVIew from 'react-native-webview';

export default function SearchResultScreen() {
    const route = useRoute();
    const { searchKeyword ,searchResults} = route.params;
    
    const navigation = useNavigation();

    const goToMap = () => {
        navigation.navigate('지도'); // 'Map' 스크린으로 이동
    };

    const goToDetail = (info) => {
        navigation.navigate('세부사항',{info}); // 'Map' 스크린으로 이동
    };

    // 분리수거에 포함되는 검색 결과 필터링
  const separationResults = searchResults.filter(
    (result) => result.type === '배출요령'
  );

  // 복지혜택에 포함되는 검색 결과 필터링
  const welfareResults = searchResults.filter((result) => result.type === '복지');

return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding:0 }}>
      <View style={styles.container}>
        <View style={{ padding:30 }}>
          <Text style={[styles.text, { fontSize:15, marginBottom:30 }]}>
            검색하신 {searchKeyword} 결과
          </Text>

          {/* 카테고리 분리수거에 포함되는 검색 결과 */}
          <View style={[styles.resultContainer, { padding:30 }]}>
            <Text style={[styles.text,{marginBottom:20,fontFamily:'Pretendard-Bold',fontSize:18}]}>
              분리수거</Text>

            {/* 서브컨테이너 */}
            {separationResults.map((result) => (
              <View key={result.id} style={[styles.subContainer ,{ marginBottom:15 }]}>
                <View style={{ flexDirection:'row', alignItems:'center', marginBottom:10 }}>
              <Text style={[styles.text, { fontSize: 15 }]}>{result.name}</Text>
              <View style={{ flex:1 , alignItems:'flex-end'}}>
                <Text style={styles.text}>{result.city}</Text>
              </View>
            </View>
            <Text style={[styles.text, { marginStart: 15, marginBottom: 30 }]}>해당 분리수거 사업에 대한 설명</Text>
            {/* 버튼 */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <TouchableOpacity onPress={() => goToDetail(result.info)}style={styles.btn}>
              <Text style={[styles.text]}>자세히 보기</Text>
            </TouchableOpacity>
            
            {/* 정확한 위치 버튼 */}
          	<TouchableOpacity onPress={goToMap}style={[styles.btn,{backgroundColor:'#FAEDFF', marginStart:10}]}>
            	<Text style={[styles.text]}>정확한 위치</Text>
          	</TouchableOpacity>
            </View>
              </View>
            ))}
          </View>

          {/* 카테고리 복지혜택에 포함되는 검색 결과 */}
          <View style={[styles.resultContainer, { padding:30, marginTop:30 }]}>
            <Text style={[styles.text,{marginBottom:20,fontFamily:'Pretendard-Bold',fontSize:18}]}>
              복지혜택</Text>

            {/* 서브컨테이너 */}
            {welfareResults.map((result) => (
              <View key={result.id} style={[styles.subContainer ,{ marginBottom:15 }]}>
                <View style={{ flexDirection:'row', alignItems:'center', marginBottom:10 }}>
              <Text style={[styles.text, { fontSize: 15 }]}>{result.name}</Text>
              <View style={{ flex:1 , alignItems:'flex-end'}}>
                <Text style={styles.text}>{result.city}</Text>
              </View>
            </View>
            <Text style={[styles.text, { marginStart: 15, marginBottom: 30 }]}>해당 분리수거 사업에 대한 설명</Text>
            {/* 버튼 */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <TouchableOpacity onPress={() => goToDetail(result.info)}style={styles.btn}>
              <Text style={[styles.text]}>자세히 보기</Text>
            </TouchableOpacity>
            
            {/* 정확한 위치 버튼 */}
          	<TouchableOpacity onPress={goToMap}style={[styles.btn,{backgroundColor:'#FAEDFF', marginStart:10}]}>
            	<Text style={[styles.text]}>정확한 위치</Text>
          	</TouchableOpacity>
            </View>
              </View>
            ))}
          </View>
        </View>
      </View>
      
    </ScrollView >
)}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    shadowContainer: {
        width: '40%',
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: '#000', // 그림자 색상 (ios에서 그림자 효과 제공)
        shadowOffset: {
            width: 0,          // 그림자의 수평 위치
            height: 2,         // 그림자의 수직 위치
        },
        shadowOpacity: 0.2, // 그림자의 투명도
        shadowRadius: 2.0,  // 그림자의 반경
        elevation: 3,        // Android에서 그림자 효과를 제공합니다
    },
    resultContainer: {
        backgroundColor: '#F2FFED',
        padding: 8,
        borderRadius: 10,
        width: '100%',
        alignSelf: 'center',
    },
    subContainer: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        width: '100%',
        height: 130,
        alignSelf: 'center',
    },
    btn: {
        backgroundColor: '#EDF3FF',
        borderRadius: 10,
        width: '40%',
        height: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center', // 이게 가운데 정렬임 기억해 ㅡㅡ
    },
    text: {
        fontFamily: 'Pretendard-Regular',
    },
});
