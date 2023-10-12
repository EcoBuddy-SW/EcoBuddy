import React, { useState, useEffect } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet, View, Text , ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import MapViewDirections from 'react-native-maps-directions'; // Import MapViewDirections
import { ScrollView } from 'react-native-gesture-handler';

export default function MapScreen() {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [steps, setSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (origin && destination) {
      getDirections();
    }
  }, [origin, destination]);

  const getDirections = async () => {
    if (origin && destination) {
      try {
        let responseDirectionsAPI = await axios.get(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&mode=transit&key=AIzaSyD8u3lg4QLT6d9149vckWqfu90X2DXRsJI`
        );

        if (responseDirectionsAPI.data.status === 'OK') {
          if (responseDirectionsAPI.data.routes.length > 0 && responseDirectionsAPI.data.routes[0].legs.length > 0) {
            let steps = responseDirectionsAPI.data.routes[0].legs[0].steps;

            // Get the details of each step
            let stepDetails = [];
            steps.forEach((step) => {
              stepDetails.push({
                distance: step.distance.text,
                duration: step.duration.text,
                instructions: step.html_instructions.replace(/<[^>]*>?/gm, ''), // Remove HTML tags
              });
            });

            // Set the state variable for steps
            setSteps(stepDetails);
          } else {
            console.error('No routes or legs found in the response.');
          }
        } else {
          console.error('Error with Google Maps Directions API:', responseDirectionsAPI.data.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude: currentLatitude, longitude: currentLongitude } = location.coords;

      setOrigin({ latitude: currentLatitude, longitude: currentLongitude });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const apiKey = 'AIzaSyD8u3lg4QLT6d9149vckWqfu90X2DXRsJI';
      const address = encodeURIComponent('서울특별시 중구 소공동 세종대로18길 2');

      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
        );

        if (response.data.results.length > 0) {
          const { lat, lng } = response.data.results[0].geometry.location;
          setDestination({ latitude: lat, longitude: lng });
        }
      } catch (error) {
        console.error('API request error:', error);
      }
    })();
  }, []);

  if (!origin || !destination || isLoading) { 
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#628F5D" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
 }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={getMapRegion(origin, destination)}>
        <Marker coordinate={origin} title="현위치" />
        <Marker coordinate={destination} title="도착지" />
        {steps.map((step, index) => {
          const stepCoordinates = []; // Replace with actual coordinates
          return <Polyline key={index} coordinates={stepCoordinates} strokeColor="#F00" strokeWidth={2} />;
        })}
        {/* Use MapViewDirections component to draw directions */}
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey="AIzaSyD8u3lg4QLT6d9149vckWqfu90X2DXRsJI"
          strokeWidth={3}
          strokeColor="hotpink"
          mode="TRANSIT"
        />
      </MapView>
      {/* Scrollable view for steps */}
      <ScrollView contentContainerStyle={{ ...styles.directionsContainer, paddingBottom: 60 }}>
        {steps.map((step, index) => (
          <View key={index} style={[styles.stepContainer, index === steps.length - 1 && styles.lastStepContainer]}>
            <Text>{`Step ${index + 1}`}</Text>
            <Text>{`Distance : ${step.distance}`}</Text>
            <Text>{`Duration : ${step.duration}`}</Text>
            <Text>{`${step.instructions}`}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
// 아래의 함수를 추가하여 지도 영역을 계산합니다.
function getMapRegion(origin, destination) {
  if (!origin || !destination) {
    return null;
  }

  const allCoordinates = [origin, destination];
  const minX = Math.min(...allCoordinates.map(coord => coord.latitude));
  const maxX = Math.max(...allCoordinates.map(coord => coord.latitude));
  const minY = Math.min(...allCoordinates.map(coord => coord.longitude));
  const maxY = Math.max(...allCoordinates.map(coord => coord.longitude));

  return {
    latitude: (minX + maxX) / 2,
    longitude: (minY + maxY) / 2,
    latitudeDelta: (maxX - minX) * 1.2, // 작은 값으로 조절
    longitudeDelta: (maxY - minY) * 1.2, // 작은 값으로 조절
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  map: {
    flex: 2,
    width: '100%',
  },
  directionsContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20,
  },
  stepContainer: {
    marginVertical: 10,
    marginBottom: 10,
  },
  lastStepContainer: {
    marginBottom: 80,
  }, 
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    fontFamily: 'Pretendard-Bold',
    marginTop: 10,
  },
});
