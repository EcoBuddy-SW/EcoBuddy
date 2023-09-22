import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Text, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [fontLoaded, onChangeLoading] = useState(false); // 폰트 로딩 상태
    const navigation = useNavigation();

    // const loadAssetsAsync = async () => {
    //     await Font.loadAsync({
    //         'Giants-Bold': require('./assets/fonts/Giants-Bold.ttf'),
    //     });
    //     onChangeLoading(true);
    // }
    // 폰트 로드 이후에 실행되는 useEffect 추가
    // useEffect(() => {
    //     loadAssetsAsync();
    // }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때 한 번만 실행

    const handleLogin = () => {
        // 로그인 처리 로직 작성

        // 예시: 간단한 확인 메시지 출력
        alert(`Username: ${username}, Password: ${password}`);

        navigation.navigate('Home');
    };

    const handleJoin = () => {
        navigation.navigate('Join');
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
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Text style={{ fontSize: 25 }}>Login</Text>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={username}
                onChangeText={(text) => setUsername(text)}
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
                <TouchableOpacity onPress={handleLogin} style={[styles.buttonContainer, { width: '40%' }]}>
                    <Text style={[styles.buttonText]}>Find ID</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleJoin} style={[styles.buttonContainer, { width: '40%' }]}>
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
