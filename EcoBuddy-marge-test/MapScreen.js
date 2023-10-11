import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';

export default function MapScreen() {
  // const [origin, setOrigin] = useState(null); // 출발지 좌표
  // const [origin, setOrigin] = useState({ latitude: 37.5557, longitude: 126.9707 }); // 출발지 좌표 (서울역)
  const [origin, setOrigin] = useState({ latitude: 37.55470, longitude: 126.9707 }); // 출발지 좌표, 임의로 서울역 위치 넣음
  const [destination, setDestination] = useState({ latitude: 36.80055, longitude: 127.0773 }); // 목적지 좌표 , 임의로 선문대학교 위치 넣음

  //서버로부터 도착지 위치 요청 하기
  //   const axios = require('axios');

  // // 사용할 Google Maps Geocoding API 키
  // const apiKey = 'AIzaSyD8u3lg4QLT6d9149vckWqfu90X2DXRsJI';

  // // 변환할 주소
  // const address = '충청남도 아산시 탕정면 선문로221번길 70';

  // // Google Maps Geocoding API 요청 URL
  // const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  // axios.get(geocodingUrl)
  //   .then((response) => {
  //     const results = response.data.results;
  //     if (results.length > 0) {
  //       const location = results[0].geometry.location;
  //       const latitude = location.lat;
  //       const longitude = location.lng;
  //       console.log(`선문대학교의 좌표: 위도 ${latitude}, 경도 ${longitude}`);
  //     } else {
  //       console.error('주소를 좌표로 변환할 수 없습니다.');
  //     }
  //   })
  //   .catch((error) => {
  //     console.error('API 요청 중 오류가 발생했습니다.', error);
  //   });
  // const destination = {
  //   latitude: 선문대학교의 위도,
  //   longitude: 선문대학교의 경도,
  // };


  // useEffect(() => {
  //   // 위치 권한을 요청하고 현재 위치를 얻어옵니다.
  //   (async () => {
  //     const { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       console.error('Location permission denied');
  //       return;
  //     }

  //     const location = await Location.getCurrentPositionAsync({});
  //     const { latitude, longitude } = location.coords;
  //     // setOrigin({ latitude, longitude });
  //   })();
  // }, []);

  // if (!origin) {
  //   // 현재 위치가 아직 얻어지지 않았다면 로딩 상태를 표시하거나 에러 처리를 할 수 있습니다.
  //   return (
  //     <View style={styles.container}>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{ // 경복궁으로 함
          latitude: 37.5786, // 경복궁의 북위 37° 34′ 43″
          longitude: 126.9783, // 경복궁의 동경 126° 58′ 38″
          latitudeDelta: 5,
          longitudeDelta: 1,
        }}
      >
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={'19751466dace31297a55ac7bd700feba1'}
          strokeWidth={3}
          strokeColor="hotpink"
          mode={'TRANSIT'} // 방향을 계산할 때 사용할 교통 모드
        />
        <Marker coordinate={origin} title="출발지" />
        <Marker coordinate={destination} title="선문대학교" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
