import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

function ClothingInfoScreen() {

    const navigation = useNavigation();
    const handleCategory = () => {
        navigation.navigate('카테고리'); // 'Map' 스크린으로 이동
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ padding: 0 }} // props 설정해줘야 함, 0 이어도 지우지 않기 , , 
        >
            <View style={[styles.shadowContainer, { marginTop: 20, height: 80, justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', fontFamily: 'Pretendard-Bold' }}>세부품목: 면의류, 기타 의류,{'\n'}동·식물성 섬유, 합성섬유류</Text>
            </View>
            <View style={[styles.infoContainer, { marginBottom: 30 , heigh: 170}]}>
                <Text style={[styles.listItem, { fontFamily: 'Pretendard-Bold', fontSize: 16 }]}>배출 방법</Text>
                <Text style={styles.listItem}>
                    • 지자체 또는 민간 재활용사업자가 비치한 폐의류{'\n'}전용수거함에 배출
                </Text>
                <Text style={styles.listItem}>
                    • 전용수거함이 없는 문전수거 지역 등에서는 물기에 젖지{'\n'} 않도록 마대 등에 담거나 묶어서 배출
                </Text>
            </View>

            <TouchableOpacity onPress={handleCategory}> 
                <View style={[styles.shadowContainer, { width: '95%', height: 150, marginBottom: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'left', fontFamily: 'Pretendard-Bold', marginLeft: 20 }}>분리수거 교환 사업 !</Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', fontFamily: 'Pretendard-Bold', marginLeft: 20 }}>지금 확인하러 가보세요</Text>
                    </View>
                    <Icon name="arrow-right" style={{ fontSize: 30, marginRight: 20 }} />
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    shadowContainer: {
        width: '90%',
        height: 70,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: '#000', // 그림자 색상 (ios에서 그림자 효과 제공)
        shadowOffset: {
            width: 0,          // 그림자의 수평 위치
            height: 2,         // 그림자의 수직 위치
        },
        shadowOpacity: 0.2, // 그림자의 투명도
        shadowRadius: 2.0,  // 그림자의 반경
        elevation: 3,        // Android에서 그림자 효과를 제공합니다
    },
    infoContainer: {
        marginTop: 3,
        backgroundColor: '#F2FFED',
        borderRadius: 5,
        padding: 10,
        width: '90%',
        height: 220,
        alignSelf: 'center',
        marginTop: 16,
        justifyContent: 'center',
    },
    listItem: {
        fontSize: 14,
        marginBottom: 1,
        padding: 5,
        textAlign: 'left',
        fontFamily: 'Pretendard-Regular',
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

export default ClothingInfoScreen;
