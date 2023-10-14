import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

function PaperHighCurrentInfoScreen() {

    const navigation = useNavigation();
    const handleCategory = () => {
        navigation.navigate('카테고리'); // 'Map' 스크린으로 이동
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ padding: 0 }} // props 설정해줘야 함, 0 이어도 지우지 않기 , , 
        >
            <View style={[styles.shadowContainer, { marginTop: 20, height: 50, justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', fontFamily: 'Pretendard-Bold' }}>세부품목: 신문지 등</Text>
            </View>
            <View style={[styles.infoContainer, { marginBottom: 30 }]}>
                <Text style={[styles.listItem, { fontFamily: 'Pretendard-Bold', fontSize: 16 }]}>배출 방법</Text>
                <Text style={styles.listItem}>
                    •물기에 젖지 않도록 하고, 반듯하게 펴서 차곡차곡 쌓은 후 흩날리지 않도록{'\n'}끈 등으로 묶어서 배출
                </Text>
            </View>

            <View style={[styles.infoContainer, { height: 90, backgroundColor: 'white', borderWidth: 2, borderColor: '#86B381', marginBottom: 15, }]}>
                <Text style={[styles.listItem, { fontWeight: 'bold', fontSize: 18, }]}>해당품목</Text>
                <Text style={styles.listItem}>
                    • 비닐 코팅 종이(광고지, 치킨 속포장재 등), {'\n'}금박·은박지, 벽지, 자석전단지, 이물질을 제거하기 어려운 경우 등{'\n'}
                    📢 종량제봉투로 배출
                </Text>
            </View>

            {/* 두번째 */}
            <TouchableOpacity onPress={handleCategory}>
                <View style={[styles.shadowContainer, { width: '95%', height: 150, marginBottom: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'left', fontFamily: 'Pretendard-Bold', marginLeft: 20 }}>분리수거 교환 사업 !</Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', fontFamily: 'Pretendard-Bold', marginLeft: 20 }}>지금 확인하러 가보세요</Text>
                    </View>
                    <Icon name="arrow-right" style={{ fontSize: 30, marginRight: 20 }} />
                </View>
            </TouchableOpacity>

            <View style={[styles.shadowContainer, { marginTop: 20, height: 50, justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', fontFamily: 'Pretendard-Bold' }}>세부품목: 책자, 노트 등</Text>
            </View>
            <View style={[styles.infoContainer, { marginBottom: 30, height: 150 }]}>
                <Text style={[styles.listItem, { fontFamily: 'Pretendard-Bold', fontSize: 16 }]}>배출 방법</Text>
                <Text style={styles.listItem}>
                    • 스프링 등 종이류와 다른 재질은 제거한 후 배출
                </Text>
            </View>

            <View style={[styles.infoContainer, { height: 90, backgroundColor: 'white', borderWidth: 2, borderColor: '#86B381', marginBottom: 15, }]}>
                <Text style={[styles.listItem, { fontWeight: 'bold', fontSize: 18, }]}>해당품목</Text>
                <Text style={styles.listItem}>
                    • 책, 잡지, 공책, 노트 등
                </Text>
            </View>

            <View style={[styles.infoContainer, { height: 110, backgroundColor: 'white', borderWidth: 2, borderColor: '#86B381', marginBottom: 50 }]}>
                <Text style={[styles.listItem, { fontWeight: 'bold', fontSize: 18, }]}>비해당품목</Text>
                <Text style={styles.listItem}>
                    • 비닐 코팅된 표지, 공책의 스프링 등
                    📢 부속 재질에 따라 분리배출하거나 종량제봉투 등으로 배출{'\n'}
                </Text>
            </View>

            {/* 세번째 */}
            <View style={[styles.shadowContainer, { marginTop: 20, height: 50, justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', fontFamily: 'Pretendard-Bold' }}>세부품목: 종이컵</Text>
            </View>
            <View style={[styles.infoContainer, { marginBottom: 30, height: 150 }]}>
                <Text style={[styles.listItem, { fontFamily: 'Pretendard-Bold', fontSize: 16 }]}>배출 방법</Text>
                <Text style={styles.listItem}>
                    • 내용물을 비우고 물로 헹구는 등 이물질을 제거하여 배출
                </Text>
            </View>

            {/* 네번째 */}
            <View style={[styles.shadowContainer, { marginTop: 20, height: 50, justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', fontFamily: 'Pretendard-Bold' }}>세부품목: 상자류</Text>
            </View>
            <View style={[styles.infoContainer, { marginBottom: 30, height: 150 }]}>
                <Text style={[styles.listItem, { fontFamily: 'Pretendard-Bold', fontSize: 16 }]}>배출 방법</Text>
                <Text style={styles.listItem}>
                    • 테이프 등 종이류와 다른 재질은 제거한 후 배출
                </Text>
            </View>

            <View style={[styles.infoContainer, { height: 90, backgroundColor: 'white', borderWidth: 2, borderColor: '#86B381', marginBottom: 15, }]}>
                <Text style={[styles.listItem, { fontWeight: 'bold', fontSize: 18, }]}>해당품목</Text>
                <Text style={styles.listItem}>
                    • 종이박스, 골판지 등
                </Text>
            </View>

            <View style={[styles.infoContainer, { height: 110, backgroundColor: 'white', borderWidth: 2, borderColor: '#86B381', marginBottom: 50 }]}>
                <Text style={[styles.listItem, { fontWeight: 'bold', fontSize: 18, }]}>비해당품목</Text>
                <Text style={styles.listItem}>
                    • 비닐코팅 부분, 상자에 붙어있는 테이프, 철핀 등
                    📢 부속 재질에 따라 분리배출하거나 종량제봉투 등으로 배출
                </Text>
            </View>

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

export default PaperHighCurrentInfoScreen;
