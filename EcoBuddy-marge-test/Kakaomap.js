import React, { useState, useContext, useEffect } from 'react';
import * as Font from 'expo-font';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Text, KeyboardAvoidingView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import LocationContext from './LocationContext';
import {Alert} from 'react-native';

export default function KakaoMapScreen() {
    const navigation = useNavigation();
    const locationContext = useContext(LocationContext);

    useEffect(() => {
        (async () => {
            let location = await locationContext.location;
            if (!location) {
                // 위치 정보가 없으면 앱 설정 화면으로 이동하도록 유도하는 알림창 띄우기
                Alert.alert(
                    "Location Permission Required",
                    "This app needs location permissions to work correctly.",
                    [
                        {
                            text: "Go to Settings",
                            onPress: () => Linking.openSettings(), // 앱 설정 화면 열기
                        },
                        {
                            text: "Cancel",
                            style: "cancel"
                        },
                    ]
                );
            }
        })();
    }, []);

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Image
                source={require('./assets/planet-earth.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            {/* {fontLoaded && ( // 폰트 로딩이 완료된 경우에만 폰트를 사용
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 50 }}>
                    <Text style={{ fontSize: 35, fontWeight: 'bold', fontFamily: 'Giants-Bold' }}>ECOBUDDY</Text>
                </View>
            )} */}

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 50 }}>
                <Text style={{ fontSize: 35, fontWeight: 'bold'}}>ECOBUDDY</Text>
            </View>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Text style={{ fontSize: 25 }}>Login</Text> 
            </View> */}

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2FFED',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    logo: {
        width: '35%',
        height: 'auto',
        aspectRatio: 1,
        marginBottom: 24,
    },
});
