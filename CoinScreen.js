import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, PermissionsAndroid } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

// const admin = require('firebase-admin');

// // Firebase 서비스 계정 키 (Firebase 콘솔에서 다운로드한 파일)
// const serviceAccount = require('./path/to/serviceAccountKey.json');

// // Firebase Admin SDK 초기화
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// // 대상 디바이스의 FCM 토큰
// const registrationToken = '대상_기기의_FCM_토큰_여기에_입력';

// // 푸시 알림 메시지 생성
// const message = {
//   notification: {
//     title: '제목',
//     body: '푸시 알림 내용',
//   },
//   token: registrationToken, // 메시지 수신 대상의 FCM 토큰
// };

// // Firebase Cloud Messaging을 통해 메시지 보내기
// admin.messaging().send(message)
//   .then((response) => {
//     console.log('푸시 알림 보내기 성공:', response);
//   })
//   .catch((error) => {
//     console.error('푸시 알림 보내기 실패:', error);
//   });


export default function CoinScreen() {
    const [modalVisible, setModalVisible] = useState(false);

    const handleExchange = () => {
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 50 }}></View>
            <Text style={styles.title}>현재 포인트 : 1587 P</Text>
            <View style={styles.centeredTextContainer}>
                <Text style={styles.text}>모바일 쿠폰은 가입하실 때{"\n"}사용하신 전화번호로 보내드립니다</Text>
            </View>
            <ScrollView style={{ width: '100%', }}>
                {/* 모바일 쿠폰 1개 */}
                <View style={styles.subContainer}>
                    <Image
                        source={require('./assets/images/starbucks.jpg')}
                        style={styles.image}
                    />
                    <View style={styles.subTextContainer}>
                        <Text style={[styles.text, styles.leftAlignText]}>스타벅스 커피 쿠폰</Text>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity onPress={() => {
                                handleExchange(); // 첫 번째 동작 수행
                            }}>
                                <View style={styles.btn}>
                                    <Text style={styles.btnText}>교환하기</Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.title}>4500 P</Text>
                        </View>
                    </View>
                </View>


                <View style={{ marginBottom: 30 }}></View>

                {/* 모바일 쿠폰 1개 */}
                <View style={styles.subContainer}>
                    <Image
                        source={require('./assets/images/starbucks.jpg')}
                        style={styles.image}
                    />
                    <View style={styles.subTextContainer}>
                        <Text style={[styles.text, styles.leftAlignText]}>스타벅스 커피 쿠폰</Text>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity onPress={handleExchange}>
                                <View style={styles.btn}>
                                    <Text style={styles.btnText}>교환하기</Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.title}>4500 P</Text>
                        </View>
                    </View>
                </View>


                <View style={{ marginBottom: 30 }}></View>

                {/* 모바일 쿠폰 1개 */}
                <View style={styles.subContainer}>
                    <Image
                        source={require('./assets/images/starbucks.jpg')}
                        style={styles.image}
                    />
                    <View style={styles.subTextContainer}>
                        <Text style={[styles.text, styles.leftAlignText]}>스타벅스 커피 쿠폰</Text>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity onPress={handleExchange}>
                                <View style={styles.btn}>
                                    <Text style={styles.btnText}>교환하기</Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.title}>4500 P</Text>
                        </View>
                    </View>
                </View>


                <View style={{ marginBottom: 30 }}></View>

                {/* 모바일 쿠폰 1개 */}
                <View style={styles.subContainer}>
                    <Image
                        source={require('./assets/images/starbucks.jpg')}
                        style={styles.image}
                    />
                    <View style={styles.subTextContainer}>
                        <Text style={[styles.text, styles.leftAlignText]}>스타벅스 커피 쿠폰</Text>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity onPress={handleExchange}>
                                <View style={styles.btn}>
                                    <Text style={styles.btnText}>교환하기</Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.title}>4500 P</Text>
                        </View>
                    </View>
                </View>


                <View style={{ marginBottom: 30 }}></View>

                {/* 모바일 쿠폰 1개 */}
                <View style={styles.subContainer}>
                    <Image
                        source={require('./assets/images/starbucks.jpg')}
                        style={styles.image}
                    />
                    <View style={styles.subTextContainer}>
                        <Text style={[styles.text, styles.leftAlignText]}>스타벅스 커피 쿠폰</Text>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity onPress={handleExchange}>
                                <View style={styles.btn}>
                                    <Text style={styles.btnText}>교환하기</Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.title}>4500 P</Text>
                        </View>
                    </View>
                </View>


                <View style={{ marginBottom: 30 }}></View>

            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleModalClose}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={[styles.title, { fontSize: 15 }]}>쿠폰을 전화번호로 보내드렸습니다.{"\n"}{"\n"}메시지를 확인해보세요!</Text>
                        <View style={{ marginBottom: 40 }}></View>
                        <TouchableOpacity onPress={handleModalClose} style={[styles.closeButton, { marginRight: 5 }]}>
                            <Text style={styles.text}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center', // 화면 가운데 정렬
        justifyContent: 'center', // 화면 가운데 정렬
    },
    centeredTextContainer: {
        marginBottom: 40,
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center', // 텍스트 중앙 정렬
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // 가운데 정렬
    },
    subContainer: {
        backgroundColor: '#F2FFED',
        borderRadius: 10,
        width: '85%',
        height: 150,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // 가운데 정렬
        alignSelf: 'center',
        padding: 20,
    },
    subTextContainer: {
        flex: 1,
        marginLeft: 20,
        justifyContent: 'center', // 가운데 정렬
    },
    btn: {
        backgroundColor: '#FFEDF2',
        borderRadius: 10,
        width: 100,
        height: 30,
        justifyContent: 'center', // 텍스트 가운데 정렬
        marginRight: 10,
        marginTop: 10,
    },
    btnText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 15,
        textAlign: 'center',
    },
    text: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 15,
        textAlign: 'center', // 텍스트 가운데 정렬
    },
    leftAlignText: {
        textAlign: 'left', // 왼쪽 정렬
    },
    title: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 20,
        textAlign: 'center', // 텍스트 가운데 정렬
    },
    image: {
        width: 100, // 조절하실 수 있습니다.
        height: 100, // 조절하실 수 있습니다.
        borderRadius: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: 300, // 모달 너비 조절
        height: 150, // 모달 높이 조절
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    closeButton: {
        width: 200,
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
});
