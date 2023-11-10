import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SearchResultScreen() {
    const route = useRoute();
    const { searchKeyword } = route.params;
    const navigation = useNavigation();
    const [result, setResult] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleKeyword = () => {
        setResult("바나나 (음식물)");
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ padding: 0 }}
        >
            <View style={styles.container}>
                <View style={{ padding: 30 }}>
                    <Text style={[styles.text, { fontSize: 15 }]}>
                        검색하신 '{searchKeyword}' 결과
                    </Text>
                </View>
                <View style={styles.container}>
                    <Text style={[styles.title, { padding: 10, marginLeft: 20 }]}>
                        분리수거
                    </Text>
                    <View style={[styles.line, { marginTop: 10 }]}></View>

                    <TouchableOpacity
                        style={styles.subContainer}
                        onPress={handleKeyword}
                    >
                        <Text style={styles.text2}>빙그레 바나나 우유 (플라스틱)</Text>
                        <Icon2
                            name="arrow-right-bold-circle"
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={[styles.title,{marginBottom: 5}]}>빙그레 바나나 우유 (플라스틱)</Text>
                            <Text style={styles.title}>배출 안내</Text>
                        </View>
                        <Text style={styles.modalText}>뚜껑 껍질만 일반 쓰레기로 분리</Text>
                        <Text style={styles.modalText}>용기는 플라스틱으로 배출</Text>
                        <TouchableOpacity
                            onPress={closeModal}
                            style={[styles.closeButton, { marginRight: 5 }]}
                        >
                            <Text style={styles.text}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    shadowContainer: {
        width: '40%',
        height: 50,
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
    subContainer: {
        backgroundColor: 'white',
        width: '100%',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btn: {
        backgroundColor: '#EDF3FF',
        borderRadius: 10,
        width: '40%',
        height: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center', // 이게 가운데 정렬임 기억해 ㅡㅡ
    },
    title: {
        fontSize: 18,
        fontFamily: 'Pretendard-Bold',
    },
    text: {
        fontFamily: 'Pretendard-Regular',
    },
    text2: {
        fontFamily: 'Pretendard-Regular',
        justifyContent: 'center',
        margin: 40,
    },
    line: {
        borderBottomWidth: 1,  // 선의 두께
        borderBottomColor: '#B5B5B5',  // 선의 색상
        width: '100%',
    },
    icon: {
        fontSize: 35,
        color: '#628F5D',
        margin: 30,
    },  
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        paddingBottom: 20,
    },
    modalText: {
        fontSize: 15,
        fontFamily: 'Pretendard-Regular',
    },
    modalContent: {
        width: '100%',
        backgroundColor: '#F2FFED',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 20,
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
        marginTop: 20,
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

});
