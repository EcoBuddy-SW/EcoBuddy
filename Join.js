import React, { useContext, useState, useRef } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert, Image, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LocationContext, {getLocation} from './LocationContext';

import axios from 'axios';

export default function JoinScreen() {

    const context = useContext(LocationContext);

    <View style={styles.container}>
        <Text style={styles.text}>회원가입 페이지</Text>
    </View>
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const navigation = useNavigation();

    // TextInput에 ref 설정
    const emailInputRef = useRef(null);
    const IdInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const nicknameInputRef = useRef(null);
    const phoneNumberInputRef = useRef(null);
    const handleSignUp = () => {
        // 간단한 유효성 검사 수행
        if (!email || !password || !nickname || !phoneNumber) {
            Alert.alert('모든 필드를 채워주세요', '모든 필드를 입력해야 합니다.'); // "제목", "소제목"
            return;
        }

        // 이메일 형식 검사 (간단한 예시)
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(email)) {
            Alert.alert('유효한 이메일을 입력하세요', '올바른 이메일 주소를 입력해주세요.');
            emailInputRef.current.focus();
            return;
        }

        // 아이디 길이 검사 (6자 이상으로 설정)
        if (IdInputRef.length < 5) {
            Alert.alert('아이디를 더 길게 설정하세요', '아이디는 6자 이상이어야 합니다.');
            IdInputRef.current.focus();
            return;
        }

        // 비밀번호 길이 검사 (6자 이상으로 설정)
        if (password.length < 6) {
            Alert.alert('비밀번호를 더 길게 설정하세요', '비밀번호는 6자 이상이어야 합니다.');
            passwordInputRef.current.focus();
            return;
        }

        // 전화번호에 10~11자리 숫자만 입력
        const numRegex = /^[0-9]{10,11}$/;
        if (!numRegex.test(phoneNumber)) {
            Alert.alert('전화번호 오류', '10~11자리 숫자만 입력하세요');
            phoneNumberInputRef.current.focus();
            return;
        }

        // 회원가입 로직 처리
        console.log('Email:', email);
        console.log('ID:', id);
        console.log('Password:', password);
        console.log('Nickname:', nickname);
        console.log('PhoneNumber:', phoneNumber);

        const data={
            "email": email,
            "id": id,
            "password": password,
            "nickname": nickname,
            "phoneNumber": phoneNumber
        }

        axios.post(`http://${context.ip}:3003/join`, data)
        .then(response => {
            // 서버 응답 처리

            if (response.data.success) {
                console.log(response.data);
                // 회원가입 성공하면 알림창 뜨면서 로그인 페이지로 이동
                Alert.alert("회원가입 성공!", "환영합니다");
                navigation.navigate('Login');

            }
            else {
                Alert.alert("회원가입 실패", response.data.message);
            }
        })
        .catch(error => {
            console.error(error);
            return;
        });

    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Image
                source={require('./assets/planet-earth.png')}
                style={styles.logo}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 40 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>ECOBUDDY</Text>
            </View>

            <Text style={{ fontSize: 12, marginBottom: 10 }}>이메일 형식을 맞춰서 작성해 주세요</Text>
            <TextInput
                ref={emailInputRef} // ref 설정
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <Text style={{ fontSize: 12, marginBottom: 10 }}>아이디는 5자 이상이어야 합니다</Text>
            <TextInput
                ref={IdInputRef} // ref 설정
                placeholder="ID"
                value={id}
                onChangeText={setId}
                style={styles.input}
            />
            <Text style={{ fontSize: 12, marginBottom: 10 }}>비밀번호는 6자 이상이어야 합니다</Text>
            <TextInput
                ref={passwordInputRef} // ref 설정
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Text style={{ fontSize: 12, marginBottom: 10 }}>본명을 권장하지 않습니다</Text>
            <TextInput
                ref={nicknameInputRef} // ref 설정
                placeholder="Nickname"
                value={nickname}
                onChangeText={setNickname}
                style={styles.input}
            />
            <Text style={{ fontSize: 12, marginBottom: 10 }}>숫자만 입력해 주세요</Text>
            <TextInput
                ref={phoneNumberInputRef} // ref 설정
                placeholder="PhoneNumber"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                style={styles.input}
            />
            <TouchableOpacity onPress={handleSignUp} style={[styles.buttonContainer]}>
                <Text style={[styles.buttonText]}>Sign Up</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 10,
    },
    buttonContainer: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#628F5D',
        paddingVertical: 10,
        borderRadius: 10,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    logo: {
        width: '35%',
        height: 'auto',
        aspectRatio: 1,
        marginBottom: 24,
    },
});
