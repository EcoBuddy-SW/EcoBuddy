import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Text, KeyboardAvoidingView, ScrollView } from 'react-native';

function PaperInfoScreen() {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ padding: 0 }} // props 설정해줘야 함, 0 이어도 지우지 않기 , , 
        >
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, padding: 5, textAlign: 'center' }}>세부품목: 종이팩</Text>
            <View style={styles.infoContainer}>
                <Text style={[styles.listItem, { fontWeight: 'bold', fontSize: 18 }]}>배출 방법</Text>
                <Text style={styles.listItem}>
                    • 내용물을 비우고 물로 헹구는 등 이물질을 제거하고 {'\n'} 말린 후 배출
                </Text>
                <Text style={styles.listItem}>
                    • 빨대, 비닐 등 종이팩과 다른 재질은 제거한 후 배출
                </Text>
                <Text style={styles.listItem}>
                    • 일반 종이류와 혼합되지 않게 종이팩 전용수거함에 배출
                </Text>
                <Text style={styles.listItem}>
                    • 종이팩 전용수거함이 없는 경우에는 종이류와 구분할 수 {'\n'} 있도록 가급적 끈 등으로 묶어 종이류 수거함으로 배출
                </Text>
            </View>

            {/* 2x2 이미지 테이블 */}
            <View style={styles.imageTable}>
                <View style={styles.imageCell}>
                    <Image
                        source={require('./assets/images/paperTrash.png')}
                        style={styles.image}
                    />
                    <Image
                        source={require('./assets/images/paperTrash.png')}
                        style={styles.image}
                    />
                    <Image
                        source={require('./assets/images/paperTrash.png')}
                        style={styles.image}
                    />
                    <Image
                        source={require('./assets/images/paperTrash.png')}
                        style={styles.image}
                    />
                </View>
            </View>

            <View style={[styles.infoContainer,{height: 80}]}>
                <Text style={[styles.listItem, { fontWeight: 'bold', fontSize: 18 }]}>해당품목</Text>
                <Text style={styles.listItem}>
                    • 우유팩, 두유팩, 소주팩, 쥬스팩 등
                </Text>
            </View>

            <View style={[styles.infoContainer,{height: 110}]}>
                <Text style={[styles.listItem, { fontWeight: 'bold', fontSize: 18 }]}>비해당품목</Text>
                <Text style={styles.listItem}>
                    • 종이, 신문지 등 종이류, 종이컵 등{'\n'}
                    📢 종이류 수거함으로 배출
                </Text>
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
        marginTop: 3,
        backgroundColor: '#F2FFED',
        padding: 8,
        borderRadius: 10,
        width: '100%',
        height: 220,
        alignSelf: 'center',
        marginTop: 16,
    },
    listItem: {
        fontSize: 15,
        marginBottom: 1,
        padding: 5,
        textAlign: 'left',
    },
    imageTable: {
        flexDirection: 'row',  // 행 방향으로 이미지 셀 배치
        flexWrap: 'wrap',       // 넘칠 경우 다음 줄로 이동
        marginTop: 20,          // 이미지 테이블과 리스트 간 간격 조정
        justifyContent: 'center'
    },
    imageCell: {
        width: '48%',           // 화면의 반을 차지하도록 설정 (2x2 그리드)
        aspectRatio: 1,         
        marginBottom: 10,       // 이미지 셀 간 간격 조정
        
    },
    image: {
        flex: 1,
        resizeMode: 'contain', // 이미지를 비율 유지하면서 셀 내에 맞춤
        // width: 100, 
        // height: 100,
    },
});

export default PaperInfoScreen;
