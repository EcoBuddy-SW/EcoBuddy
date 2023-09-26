import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';

const ipv4 = "10.20.102.158";

export default function FindUserPWScreen() {
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPNum] = useState('');

    const handleFindPassword = async () => {

        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(email)) {
            Alert.alert('유효한 이메일을 입력하세요', '올바른 이메일 주소를 입력해주세요.');
            return;
        }

        const data = {
            id: id,
            email: email,
            phoneNumber: phoneNumber
        };
        
        axios.post(`http://${ipv4}:3003/findPw`, data)
        .then(response => {
            if (response.data.success) {
                alert(`pw는 ${response.data.message} 입니다.`);
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
            <Text style={styles.title}>비밀번호 찾기</Text>
            <Text style={styles.subtitle}>등록한 이메일 주소를 입력하세요.</Text>
            <TextInput
                placeholder="Id"
                value={id}
                onChangeText={setId}
                style={styles.input}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="pNum"
                value={phoneNumber}
                onChangeText={setPNum}
                style={styles.input}
            />
            <TouchableOpacity onPress={handleFindPassword} style={styles.button}>
                <Text style={styles.buttonText}>비밀번호 찾기</Text>
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
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
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