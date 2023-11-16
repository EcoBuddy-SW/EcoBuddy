import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

function MetalCanInfoScreen() {

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
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', fontFamily: 'Pretendard-Bold' }}>세부품목: 음료·주류캔, 식료품캔</Text>
            </View>
            <View style={[styles.infoContainer, { marginBottom: 30 , height: 150 }]}>
                <Text style={[styles.listItem, { fontFamily: 'Pretendard-Bold', fontSize: 16 }]}>배출 방법</Text>
                <Text style={styles.listItem}>
                    • 내용물을 비우고 물로 헹구는 등 이물질을 제거하여 배출
                </Text>
                <Text style={styles.listItem}>
                    • 담배꽁초 등 이물질을 넣지 않고 배출
                </Text>
                <Text style={styles.listItem}>
                    • 플라스틱 뚜껑 등 금속캔과 다른 재질은 제거한 후 배출
                </Text>
            </View>

            <View style={[styles.infoContainer, { height: 90, backgroundColor: 'white', borderWidth: 2, borderColor: '#86B381', marginBottom: 15, }]}>
                <Text style={[styles.listItem, { fontWeight: 'bold', fontSize: 18, }]}>해당품목</Text>
                <Text style={styles.listItem}>
                    • 음료수캔, 맥주캔, 통조림캔 등
                </Text>
            </View>

            <View style={[styles.infoContainer, { height: 110, backgroundColor: 'white', borderWidth: 2, borderColor: '#86B381', marginBottom: 50 }]}>
                <Text style={[styles.listItem, { fontWeight: 'bold', fontSize: 18, }]}>비해당품목</Text>
                <Text style={styles.listItem}>
                    • 알루미늄 호일 등{'\n'}
                    📢 종량제 봉투로 배출
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
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', fontFamily: 'Pretendard-Bold' }}>세부품목: 기타캔류(부탄가스, 살충제용기 등)</Text>
            </View>
            <View style={[styles.infoContainer, { marginBottom: 30  , height: 150}]}>
                <Text style={[styles.listItem, { fontFamily: 'Pretendard-Bold', fontSize: 16 }]}>배출 방법</Text>
                <Text style={styles.listItem}>
                    • 내용물을 제거한 후 배출{'\n'}
                    📢 가스용기는 가급적 통풍이 잘되는 장소에서{'\n'}노즐을 누르는 등 내용물을 완전히 제거한 후 배출
                </Text>
            </View>

            <View style={[styles.infoContainer, { height: 90, backgroundColor: 'white', borderWidth: 2, borderColor: '#86B381', marginBottom: 15, }]}>
                <Text style={[styles.listItem, { fontWeight: 'bold', fontSize: 18, }]}>해당품목</Text>
                <Text style={styles.listItem}>
                    • 부탄가스 용기, 살충제 용기, 스프레이 용기 등
                </Text>
            </View>

            <View style={[styles.infoContainer, { height: 110, backgroundColor: 'white', borderWidth: 2, borderColor: '#86B381', marginBottom: 50 }]}>
                <Text style={[styles.listItem, { fontWeight: 'bold', fontSize: 18, }]}>비해당품목</Text>
                <Text style={styles.listItem}>
                    📢 내용물이 남아있는 캔류(락카, 페인트통 등)는{'\n'}특수규격마대 등 지자체 조례에 따라 배출
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

export default MetalCanInfoScreen;
