import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const KakaoMapScreen = () => {
  // 카카오맵 웹 페이지의 URL
  const mapUrl = 'https://map.kakao.com/';

  return (
    <View style={styles.container}>
      <WebView source={{ uri: mapUrl }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default KakaoMapScreen;


// 박서윤 - 실패...
// import React, { useState, useEffect } from 'react';
// import { View, Text, Button } from 'react-native';
// import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
// import axios from 'axios';

// const KakaoMapScreen = () => {
//     const [origin, setOrigin] = useState({ latitude: 37.5665, longitude: 126.9780 });
//     const [destination, setDestination] = useState({ latitude: 37.5502, longitude: 126.9820 });
//     const [route, setRoute] = useState([]); // 경로 정보를 저장할 상태
//     const [polylineCoordinates, setPolylineCoordinates] = useState([]); // Polyline 좌표를 저장할 상태

//     const findDirections = async () => {
//         try {
//             // 카카오맵 API를 사용하여 경로 정보 가져오기
//             const response = await axios.get(
//                 `https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${origin.longitude}&y=${origin.latitude}&input_coord=WGS84&output_coord=TM&output=json`, // WGS84에서 TM으로 변경
//                 {
//                     headers: {
//                         Authorization: 'KakaoAK d1d59c3959f65eca05bdfc46b8679b77', // REST API 키 사용
//                     },
//                 }
//             );

//             // 응답에서 경로 정보를 추출하여 route 상태로 설정
//             // 경로 정보를 가져오기 위해 실제 API를 호출하는 부분이 누락되어 있으므로 여기서 경로 정보 설정을 더 확장해야 합니다.
//             // 경로 정보는 API 응답의 구조에 따라 다를 수 있습니다.
//             setRoute(response.data);

//         } catch (error) {
//             console.error('Error finding directions:', error);
//         }
//     };

//     useEffect(() => {
//         if (route && route.documents && route.documents.length > 0) {
//             // 경로 정보가 있을 때, Polyline로 표시
//             const path = route.documents[0].points;
//             setPolylineCoordinates(path);
//         }
//     }, [route]);

//     return (
//         <View style={{ flex: 1 }}>
//             <MapView
//                 provider={PROVIDER_GOOGLE}
//                 style={{ flex: 1 }}
//                 initialRegion={{
//                     latitude: origin.latitude,
//                     longitude: origin.longitude,
//                     latitudeDelta: 0.0922,
//                     longitudeDelta: 0.0421,
//                 }}
//             >
//                 <Marker coordinate={origin} title="출발지" />
//                 <Marker coordinate={destination} title="목적지" />
//                 {route && route.documents && route.documents.length > 0 && (
//                     <Polyline
//                         coordinates={route.documents[0].points}
//                         strokeWidth={4}
//                         strokeColor="blue"
//                     />
//                 )}
//             </MapView>
//             <Button title="길찾기" onPress={findDirections} />
//         </View>
//     );
// };

// export default KakaoMapScreen;

// axios 에서 값 받아올 때
// import axios from 'axios';

// const apiKey = 'af58816a418e05e82fefcf7ba13be588';

// const api = axios.create({
//   baseURL: 'https://api.example.com', // API 엔드포인트 주소
//   headers: {
//     Authorization: `Bearer ${apiKey}`,
//   },
// });

// // API 요청 함수
// const fetchData = async () => {
//   try {
//     const response = await api.get('/your-endpoint'); // 실제 엔드포인트로 대체
//     // API 응답 처리
//     console.log(response.data);
//   } catch (error) {
//     // 에러 처리
//     console.error('API 요청 에러:', error);
//   }
// };

// export default fetchData;



// 형조님이 올려 주신 카카오맵
// import React, { useState, useContext, useEffect } from 'react';
// import * as Font from 'expo-font';
// import { View, TextInput, TouchableOpacity, StyleSheet, Image, Text, KeyboardAvoidingView, Linking } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import LocationContext from './LocationContext';
// import {Alert} from 'react-native';

// export default function KakaoMapScreen() {
//     const navigation = useNavigation();
//     const locationContext = useContext(LocationContext);

//     useEffect(() => {
//         (async () => {
//             let location = await locationContext.location;
//             if (!location) {
//                 // 위치 정보가 없으면 앱 설정 화면으로 이동하도록 유도하는 알림창 띄우기
//                 Alert.alert(
//                     "Location Permission Required",
//                     "This app needs location permissions to work correctly.",
//                     [
//                         {
//                             text: "Go to Settings",
//                             onPress: () => Linking.openSettings(), // 앱 설정 화면 열기
//                         },
//                         {
//                             text: "Cancel",
//                             style: "cancel"
//                         },
//                     ]
//                 );
//             }
//         })();
//     }, []);

//     return (
//         <KeyboardAvoidingView style={styles.container} behavior="padding">
//             <Image
//                 source={require('./assets/planet-earth.png')}
//                 style={styles.logo}
//                 resizeMode="contain"
//             />
//             {/* {fontLoaded && ( // 폰트 로딩이 완료된 경우에만 폰트를 사용
//                 <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 50 }}>
//                     <Text style={{ fontSize: 35, fontWeight: 'bold', fontFamily: 'Giants-Bold' }}>ECOBUDDY</Text>
//                 </View>
//             )} */}

//             <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 50 }}>
//                 <Text style={{ fontSize: 35, fontWeight: 'bold'}}>ECOBUDDY</Text>
//             </View>
//             {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
//                 <Text style={{ fontSize: 25 }}>Login</Text>
//             </View> */}

//         </KeyboardAvoidingView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F2FFED',
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: 16,
//     },
//     logo: {
//         width: '35%',
//         height: 'auto',
//         aspectRatio: 1,
//         marginBottom: 24,
//     },
// });