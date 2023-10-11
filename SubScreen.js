import React, { Component, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SubScreen() {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, { marginBottom: 30 }]}>근로능력과 구직의사가 있음에도 불구하고 취업에 어려움을
                {"\n"}겪고 있는 구직자에게 통합적인 취업지원서비스를{"\n"}
                제공하고 생계를 지원함으로써 구직활동{"\n"}
                및 생계안정 도모</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    textBold: {
        fontSize: 20,
        fontFamily: 'Pretendard-Bold',
        justifyContent: 'center',
    },
    text: {
        fontSize: 15,
        fontFamily: 'Pretendard-Regular',
    },
    grayText: {
        fontSize: 15,
        fontFamily: 'Pretendard-Regular',
        color: 'lightgray',
    },
})