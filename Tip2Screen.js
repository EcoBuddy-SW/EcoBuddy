import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Linking } from 'react-native';

// 데이터: 지역 정보
const regions = [
    '서울', '경기도', '강원도', '충청도', '경상북도', '경상남도', '전라북도', '전라남도',
];

// 데이터: 시 단위 지역 정보
const citiesByRegion = {
    '서울': [
        {
            name: '강남구',
            collectionDay: '전화 문의',
            description: '소형가전 1~4개 ☎ 1522-3833',
            websiteUrl: 'https://www.gangnam.go.kr/waste/apply/info.do?mid=ID03_020704',
        },
        // 다른 지역 정보...
    ],
    '경기도': [
        {
            name: '광명시',
            collectionDay: '월~일(10:00~19:00)',
            description: '광명시 재활용센터 ☎ 02-891-2543',
            websiteUrl: 'https://www.gm.go.kr/pt/partInfo/en/cleaning/recycle/PTMN227.jsp',
        },
        // 다른 지역 정보...
    ],
    '충청도': [
        {
            name: '통합',
            collectionDay: '전화 문의',
            description: '☎ 1599-0903',
            websiteUrl: 'https://www.15990903.or.kr/portal/main/main.do',
        },
        // 다른 지역도 추가해야 됨!!
    ],
};

function Tip2Screen() {
    const [selectedRegion, setSelectedRegion] = useState('서울'); // 디폴트로 '서울' 선택
    const [selectedCity, setSelectedCity] = useState(null);
    const [modalVisible, setModalVisible] = useState(false); // 모달 상태 추가

    const handleRegionPress = (region) => {
        setSelectedRegion(region);
        setSelectedCity(null);
    };

    const handleCityPress = (city) => {
        setSelectedCity(city);
        setModalVisible(true); // 도시를 누르면 모달 열기
    };

    const closeModal = () => {
        setModalVisible(false); // 모달 닫기
    };

    const gotoUrl = () => {
        if (selectedCity && selectedCity.websiteUrl) {
            Linking.openURL(selectedCity.websiteUrl); // 해당 도시의 웹 사이트로 이동
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Text style={[styles.text, { alignSelf: 'center', marginTop: 30, marginBottom: 30 }]}>원하는 지역을 눌러보세요</Text>
            <View style={styles.container}>
                <View style={styles.regionList}>
                    {regions.map((region) => (
                        <TouchableOpacity
                            key={region}
                            onPress={() => handleRegionPress(region)}
                            style={[
                                styles.regionItem,
                                selectedRegion === region && styles.selectedRegionItem,
                            ]}
                        >
                            <Text style={styles.regionText}>{region}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.cityList}>
                    {selectedRegion && citiesByRegion[selectedRegion] && (
                        <View style={styles.cityItemContainer}>
                            {citiesByRegion[selectedRegion].map((city, index) => (
                                <TouchableOpacity
                                    key={city.name}  // 각 도시의 이름을 키로 사용
                                    onPress={() => handleCityPress(city)}
                                    style={[
                                        styles.cityItem,
                                        selectedCity === city && styles.selectedCityItem,
                                    ]}
                                >
                                    <Text style={styles.cityText}>{city.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
            </View>

            {/* citiesByRegion 모달 */}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        {selectedCity && citiesByRegion[selectedRegion] && (
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>{selectedCity.name} 무상수거</Text>
                                <View style={styles.rowContainer}>
                                    <Text style={styles.text}>수거 요일: {selectedCity.collectionDay}</Text>
                                </View>
                                <Text style={styles.text}>상세 정보:</Text>
                                <Text style={styles.text}>{selectedCity.description}</Text>
                                <View style={styles.rowContainer}>
                                    <TouchableOpacity onPress={closeModal} style={[styles.closeButton,{marginRight:5}]}>
                                        <Text style={styles.text}>확인</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={gotoUrl} style={[styles.closeButton,{marginLeft:5}]}>
                                        <Text style={styles.text}>해당 사이트로 이동</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    regionList: {
        width: '30%',
        backgroundColor: 'white',
    },
    regionItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#DDD',
    },
    selectedRegionItem: {
        backgroundColor: '#F2FFED',
    },
    regionText: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'Pretendard-Bold',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        fontFamily: 'Pretendard-Bold',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        width: '60%',
        height: 30,
        backgroundColor: '#F2FFED',
        borderWidth: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.0,
        elevation: 3,
    },
    cityList: {
        flex: 1,
        backgroundColor: '#F2FFED',
    },
    cityItemContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cityItem: {
        padding: 16,
        width: '50%', // 화면에 2개의 도시가 나오도록 50%로 설정
        alignItems: 'center',
    },
    selectedCityItem: {
        backgroundColor: '#6DC933',
        // color:'white',
    },
    cityText: {
        fontSize: 15,
        color: '#333',
        fontFamily: 'Pretendard-Regular',
    },
    text: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 14
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:30,
    },
});

export default Tip2Screen;
