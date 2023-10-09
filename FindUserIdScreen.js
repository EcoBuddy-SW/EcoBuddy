import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';

const ipv4 = "10.20.101.224";

export default function FindUserIdScreen() {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPNum] = useState('');

    const handleFindUsername = async () => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(email)) {
            Alert.alert('유효한 이메일을 입력하세요', '올바른 이메일 주소를 입력해주세요.');
            return;
        }
        const numRegex = /^[0-9]{10,11}$/;
        if (!numRegex.test(phoneNumber)) {
            Alert.alert('전화번호 오류', '10~11자리 숫자만 입력하세요');
            phoneNumberInputRef.current.focus();
            return;
        }

        const data = {
            email: email,
            phoneNumber: phoneNumber
        };
        
        axios.post(`http://${ipv4}:3003/findId`, data)
        .then(response => {
            if (response.data.success) {
                alert(`id는 ${response.data.message} 입니다.`);
            } else {
                alert(response.data.message); // 실패 메시지 표시
            }
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Text style={styles.title}>아이디 찾기</Text>
            <Text style={styles.subtitle}>등록한 이메일 주소를 입력하세요.</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="PhoneNumber"
                value={phoneNumber}
                onChangeText={setPNum}
                style={styles.input}
            />
            <TouchableOpacity onPress={handleFindUsername} style={styles.button}>
                <Text style={styles.buttonText}>아이디 찾기</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2FFED',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 80,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 8,
        borderRadius: 10,
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: '#628F5D',
        paddingVertical: 10,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
    },
});
