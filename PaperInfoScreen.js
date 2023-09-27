import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Text, KeyboardAvoidingView, ScrollView } from 'react-native';

function PaperInfoScreen() {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ padding: 0 }} // props 설정해줘야 함, 0 이어도 지우지 않기 , , 
        >

            <View style={styles.infoContainer}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 25, padding: 5 }}>분리수거 방법 제대로 알기!</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
    },
    infoContainer: {
        marginTop: 16, // 아이콘 컨테이너와 검색창 사이 간격 조정
        backgroundColor: '#F2FFED',
        padding: 8,
        borderRadius: 10,
        width: '100%',
        height: 260,
        alignSelf: 'center',
    },
    info:{
        
    },
})

export default PaperInfoScreen;
