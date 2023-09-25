import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';

export default function FindUserIdScreen() {
    const [email, setEmail] = useState('');

    const handleFindUsername = async () => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(email)) {
            Alert.alert('유효한 이메일을 입력하세요', '올바른 이메일 주소를 입력해주세요.');
            return;
        }

        try {
            // 서버에 이메일 검증 요청을 보내기
            const response = await axios.post('서버_API_URL/find-username', { email });

            // 서버 응답에서 결과를 확인
            if (response.data.username) {
                // 아이디를 찾은 경우
                const foundUsername = response.data.username;
                Alert.alert('아이디 찾기 성공', `아이디: ${foundUsername}`);
            } else {
                // 이메일이 등록되어 있지 않은 경우
                Alert.alert('아이디 찾기 실패', '일치하는 계정이 없습니다.');
            }
        } catch (error) {
            console.error('아이디 찾기 요청 오류:', error);
            // 오류 처리
            Alert.alert('아이디 찾기 오류', '서버와의 통신 중 오류가 발생했습니다.');
        }
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
