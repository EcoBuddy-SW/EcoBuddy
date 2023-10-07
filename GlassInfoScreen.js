import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function GlassInfoScreen() {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ padding: 0 }} // props 설정해줘야 함, 0 이어도 지우지 않기 , , 
        >
            <View style={[styles.shadowContainer, { marginTop: 20, height: 50, justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', fontFamily: 'Pretendard-Bold' }}>세부품목: 음료수병, 기타병류</Text>
            </View>
            <View style={[styles.infoContainer, { marginBottom: 30 }]}>
                <Text style={[styles.listItem, { fontFamily: 'Pretendard-Bold', fontSize: 16 }]}>배출 방법</Text>
                <Text style={styles.listItem}>
                    • 내용물을 비우고 물로 헹구는 등 이물질을 제거하여 배출
                </Text>
                <Text style={styles.listItem}>
                    • 담배꽁초 등 이물질을 넣지 않고 배출
                </Text>
                <Text style={styles.listItem}>
                    • 유리병이 깨지지 않도록 주의하여 배출
                </Text>
                <Text style={styles.listItem}>
                    • 소주, 맥주 등 빈용기보증금 대상 유리병은{'\n'} 소매점 등으로 반납하여 보증금 환급
                </Text>
            </View>

            <TouchableOpacity>
                <View style={[styles.shadowContainer, { width: '95%', height: 150, marginBottom: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'left', fontFamily: 'Pretendard-Bold', marginLeft: 20 }}>분리수거 교환 사업 !</Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', fontFamily: 'Pretendard-Bold', marginLeft: 20 }}>지금 확인하러 가보세요</Text>
                    </View>
                    <Icon name="arrow-right" style={{ fontSize: 30, marginRight: 20 }} />
                </View>
            </TouchableOpacity>


            <View style={[styles.infoContainer, { height: 90, backgroundColor: 'white', borderWidth: 2, borderColor: '#86B381', marginBottom: 15, }]}>
                <Text style={[styles.listItem, { fontWeight: 'bold', fontSize: 18, }]}>해당품목</Text>
                <Text style={styles.listItem}>
                    • 음료수병, 와인병, 양주병, 드링크병 등
                </Text>
            </View>

            <View style={[styles.infoContainer, { height: 170, backgroundColor: 'white', borderWidth: 2, borderColor: '#86B381', marginBottom: 50 }]}>
                <Text style={[styles.listItem, { fontWeight: 'bold', fontSize: 18, }]}>비해당품목</Text>
                <Text style={styles.listItem}>
                    • 깨진 유리제품은 신문지 등에 싸서 종량제 봉투 배출{'\n'}
                    • 코팅 및 다양한 색상이 들어간 유리제품, 내열 유리제품,{'\n'}크리스탈 유리제품, 판유리, 조명기구용 유리류,{'\n'} 사기·도자기류 등{'\n'}
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

export default GlassInfoScreen;
