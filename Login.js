import React, { useState, useContext, useRef, useEffect } from 'react';
import * as Font from 'expo-font';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Text, KeyboardAvoidingView } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import axios from 'axios';
import LocationContext from './LocationContext';

import * as Notifications from 'expo-notifications';


export default function LoginScreen() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    // const [fontLoaded, onChangeLoading] = useState(false); // 폰트 로딩 상태

    ///////////////////// 알림
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    ///////////////
    
    const navigation = useNavigation();

    const context = useContext(LocationContext);

    const sendNotification = async (tokens) => {
        try {
          const response = await axios.post(`http://${context.ip}:3003/sendNotification`, {
            tokens: tokens,
          });
      
          if (response.data.success) {
            console.log('Notifications sent successfully');
          } else {
            console.log('Failed to send notifications');
          }
        } catch (error) {
          console.error(error);
        }
      };

    const handleLogin = async () => {
        console.log('IP value from context:', context.ip);

        const data = {
            id: id,
            password: password,
            token:context.expoPushToken
        };

        axios.post(`http://${context.ip}:3003/login`, data)
        .then(async response => {
            if (response.data.success) {

                const token = context.expoPushToken // 여기서 호출
                sendNotification([token]); 

                alert(response.data.message);
                context.setUserId(id);

                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            {name: 'Home'},
                        ],
                    })
                );
                //navigation.navigate('BottomTab');
            } else {
                alert(response.data.message); // 실패 메시지 표시
            }
        })
        .catch(error => {
            console.error(error);
        });
    };

    const handleJoin = () => {
        navigation.navigate('Join');
    };

    const handleID = () => {
        navigation.navigate('FindUserId');
    };

    const handlePW = () => {
        navigation.navigate('FindUserPW');
    };

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

            <TextInput
                style={styles.input}
                placeholder="Id"
                value={id}
                onChangeText={(text) => setId(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={handleLogin} style={[styles.buttonContainer, { width: '40%' }]}>
                    <Text style={[styles.buttonText]}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleJoin} style={[styles.buttonContainer, { width: '40%' }]}>
                    <Text style={[styles.buttonText]}>Sign up</Text>
                </TouchableOpacity>
            </View>

            <View style={{ height: 80 }} />
            <Text style={{ fontSize: 15 }}>Did you forget?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={handleID} style={[styles.buttonContainer, { width: '40%' }]}>
                    <Text style={[styles.buttonText]}>Find ID</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePW} style={[styles.buttonContainer, { width: '40%' }]}>
                    <Text style={[styles.buttonText]}>Find PW</Text>
                </TouchableOpacity>
            </View>
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
    input: {
        width: "100%",
        height: 40,
        borderColor: "#3E6B39",
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 10,
    },
    logo: {
        width: '35%',
        height: 'auto',
        aspectRatio: 1,
        marginBottom: 24,
    },
    buttonContainer: {
        width: "80%",
        height: "auto",
        backgroundColor: "#98C593",
        paddingVertical: 10,
        borderRadius: 10,
        margin: 10,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: .25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFF",
        textAlign: "center",
    },
});