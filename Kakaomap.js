import React, { useState, useContext, useEffect } from 'react';
import * as Font from 'expo-font';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Text, KeyboardAvoidingView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import LocationContext from './LocationContext';


export default function KakaoMapScreen() {

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
