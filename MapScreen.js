import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';

export default function MapScreen() {
  const [origin, setOrigin] = useState(null); // 출발지 좌표
  const destination = { latitude: YOUR_DESTINATION_LATITUDE, longitude: YOUR_DESTINATION_LONGITUDE }; // 목적지 좌표

  useEffect(() => {
    // 위치 권한을 요청하고 현재 위치를 얻어옵니다.
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setOrigin({ latitude, longitude });
    })();
  }, []);

  if (!origin) {
    // 현재 위치가 아직 얻어지지 않았다면 로딩 상태를 표시하거나 에러 처리를 할 수 있습니다.
    return <View style={styles.container}>Loading...</View>;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={AIzaSyD8u3lg4QLT6d9149vckWqfu90X2DXRsJI}
          strokeWidth={3}
          strokeColor="hotpink"
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
