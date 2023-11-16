import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

function SyntheticResinsInfoScreen() {

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
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', fontFamily: 'Pretendard-Bold' }}>세부품목: 투명(음료·생수) 페트병</Text>
            </View>
            <View style={[styles.infoContainer, { marginBottom: 30, height: 100 }]}>
                <Text style={[styles.listItem, { fontFamily: 'Pretendard-Bold', fontSize: 16 }]}>배출 방법</Text>
                <Text style={styles.listItem}>
                    • 내용물을 깨끗이 비우고 부착상표(라벨) 등을 제거한 후{'\n'}가능한 압착하여 뚜껑을 닫아 배출
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
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', fontFamily: 'Pretendard-Bold' }}>세부품목: PET, PVC, PE,{'\n'}PP, PS, PSP재질 등의{'\n'}용기·트레이류</Text>
            </View>
            <View style={[styles.infoContainer, { marginBottom: 30 }]}>
                <Text style={[styles.listItem, { fontFamily: 'Pretendard-Bold', fontSize: 16 }]}>배출 방법</Text>
                <Text style={styles.listItem}>
                    •내용물을 비우고 물로 헹구는 등 이물질을 제거하여 배출
                    📢 안내사항가스용기는 가급적 통풍이 잘되는 장소에서 노즐을{'\n'}누르는 등 내용물을 완전히 제거한 후 배출
                </Text>
                <Text style={styles.listItem}>
                    • 부착상표, 부속품 등 본체와 다른 재질은 제거한 후 배출
                </Text>
            </View>

            <View style={[styles.infoContainer, { height: 90, backgroundColor: 'white', borderWidth: 2, borderColor: '#86B381', marginBottom: 15, }]}>
                <Text style={[styles.listItem, { fontWeight: 'bold', fontSize: 18, }]}>해당품목</Text>
                <Text style={styles.listItem}>
                    • 유색·불투명 음료용기, 세정용기 등{'\n'}
                    📢 노끈 : 딱딱한 재질(PP)의 노끈은 플라스틱으로,{'\n'}부드러운 노끈은 비닐류로 재활용 배출
                </Text>
            </View>

            <View style={[styles.infoContainer, { height: 110, backgroundColor: 'white', borderWidth: 2, borderColor: '#86B381', marginBottom: 50 }]}>
                <Text style={[styles.listItem, { fontWeight: 'bold', fontSize: 18, }]}>비해당품목</Text>
                <Text style={styles.listItem}>
                    • 플라스틱 이외의 재질이 부착된 완구·문구류,{'\n'} 옷걸이, 칫솔, 파일철, 전화기, 낚싯대, 유모차·보행기, CD·DVD 등
                    📢 안내사항종량제봉투, 특수규격마대 또는 대형폐기물{'\n'}처리 등 지자체 조례에 따라 배출
                </Text>
            </View>

            {/* 세번째 */}
            <View style={[styles.shadowContainer, { marginTop: 20, height: 50, justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', fontFamily: 'Pretendard-Bold' }}>세부품목: 비닐포장재, 1회용비닐봉투</Text>
            </View>
            <View style={[styles.infoContainer, { marginBottom: 30, height: 100 }]}>
                <Text style={[styles.listItem, { fontFamily: 'Pretendard-Bold', fontSize: 16 }]}>배출 방법</Text>
                <Text style={styles.listItem}>
                    • 내용물을 비우고 물로 헹구는 등 이물질을 제거하여 배출
                    • 흩날리지 않도록 봉투에 담아 배출
                </Text>
            </View>

            <View style={[styles.infoContainer, { height: 90, backgroundColor: 'white', borderWidth: 2, borderColor: '#86B381', marginBottom: 15, }]}>
                <Text style={[styles.listItem, { fontWeight: 'bold', fontSize: 18, }]}>해당품목</Text>
                <Text style={styles.listItem}>
                    • 1회용 봉투 등 각종 비닐류{'\n'}
                    📢 분리배출표시가 없는 비닐류 포함
                </Text>
            </View>

            <View style={[styles.infoContainer, { height: 110, backgroundColor: 'white', borderWidth: 2, borderColor: '#86B381', marginBottom: 50 }]}>
                <Text style={[styles.listItem, { fontWeight: 'bold', fontSize: 18, }]}>비해당품목</Text>
                <Text style={styles.listItem}>
                    • 깨끗하게 이물질 제거가 되지 않은 랩필름 등
                    • 식탁보, 고무장갑, 장판, 돗자리, 섬유류 등{'\n'}(천막, 현수막, 의류, 침구류 등)
                    📢 종량제봉투, 특수규격마대 또는 대형폐기물 처리 등{'\n'}지자체 조례에 따라 배출
                </Text>
            </View>

            {/* 네번째 */}
            <View style={[styles.shadowContainer, { marginTop: 20, height: 50, justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', fontFamily: 'Pretendard-Bold' }}>세부품목: 스티로폼 완충재</Text>
            </View>
            <View style={[styles.infoContainer, { marginBottom: 30, height: 100 }]}>
                <Text style={[styles.listItem, { fontFamily: 'Pretendard-Bold', fontSize: 16 }]}>배출 방법</Text>
                <Text style={styles.listItem}>
                    • 내용물을 비우고 물로 헹구는 등 이물질을 제거하여 배출
                    • 부착상표 등 스티로폼과 다른 재질은 제거한 후 배출
                    • TV 등 전자제품 구입 시 완충재로 사용되는{'\n'}발포합성수지 포장재는 가급적 구입처로 반납
                </Text>
            </View>

            <View style={[styles.infoContainer, { height: 90, backgroundColor: 'white', borderWidth: 2, borderColor: '#86B381', marginBottom: 15, }]}>
                <Text style={[styles.listItem, { fontWeight: 'bold', fontSize: 18, }]}>해당품목</Text>
                <Text style={styles.listItem}>
                    • 농·수·축산물 포장용 발포스티렌상자,{'\n'}전자제품 완충재로 사용되는 발포합성수지포장재
                </Text>
            </View>

            <View style={[styles.infoContainer, { height: 110, backgroundColor: 'white', borderWidth: 2, borderColor: '#86B381', marginBottom: 50 }]}>
                <Text style={[styles.listItem, { fontWeight: 'bold', fontSize: 18, }]}>비해당품목</Text>
                <Text style={styles.listItem}>
                    • 타 재질과 코팅 또는 접착된 발포스티렌,{'\n'}건축용 내·외장재 스티로폼, 이물질을 제거하기 어려운 경우 등
                    📢 종량제봉투, 특수규격마대 또는 대형폐기물 처리 등{'\n'}지자체 조례에 따라 배출
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

export default SyntheticResinsInfoScreen;
