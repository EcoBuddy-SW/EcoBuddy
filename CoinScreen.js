import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import { Asset } from 'expo-asset';
import axios from 'axios';
import LocationContext from './LocationContext';


export default function CoinScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalImage, setModalImage] = useState(null); // 모달 이미지 상태 추가
    const context = useContext(LocationContext);
    const userId = context.userId;
    const [userPoints, setUserPoints] = useState(undefined); // 30000으로 변경 ,  유저가 가지고 있는 포인트 임의로 넣음!

    useEffect(() => {
        fetchUserInfo();
      });

    const handleExchange = async (pointsNeeded, couponImage) => {
        if (userPoints < pointsNeeded) {
            Alert.alert('포인트 부족', '교환하기 위한 포인트가 부족합니다.');
        } else {
            const imageAsset = Asset.fromModule(couponImage); // 이미지를 Asset으로 불러오기
            await imageAsset.downloadAsync(); // 이미지를 다운로드합니다.

            // 쿠폰 이미지를 다운로드한 후 포인트 차감 로직을 추가
            const updatedPoints = userPoints - parseInt(pointsNeeded);
            // setUserPoints(updatedPoints); // 포인트 감소
            
            axios.post(`http://${context.ip}:3003/updateCoin`,{userId:userId, point:updatedPoints});//포인트 업데이트
            fetchUserInfo();
            setModalImage(imageAsset); // 모달 이미지 상태 업데이트
            setModalVisible(true)
        }
    };

    const fetchUserInfo = () => {
        axios.post(`http://${context.ip}:3003/downloadUserInfo`, { userId })
          .then(response => {
            if (response) {
              const userInfo = response.data;
              setUserPoints(userInfo.Point);
            } else {
              console.error('사용자 정보를 가져오는데 실패했습니다.');
            }
          })
          .catch(error => {
            console.error('네트워크 오류:', error);
          });
      };

    const handleModalClose = () => {
        setModalVisible(false);
    };

    const handleSaveImage = async () => {
        try {
            if (modalImage) {
                await modalImage.downloadAsync(); // 이미지를 다운로드합니다.
                const imageUri = modalImage.localUri; // 이미지의 로컬 URI 가져오기

                // 권한 확인
                const { status } = await MediaLibrary.requestPermissionsAsync();

                if (status === 'granted') {
                    // 앨범 이름
                    const albumName = 'ECOBUDDY';

                    // 이미 존재하는 앨범인지 확인
                    const albums = await MediaLibrary.getAlbumsAsync();
                    const album = albums.find((a) => a.title === albumName);

                    if (!album) {
                        // 앨범 생성
                        const createdAlbum = await MediaLibrary.createAlbumAsync(albumName);
                    }

                    // 이미지 저장
                    const asset = await MediaLibrary.createAssetAsync(imageUri);
                    await MediaLibrary.addAssetsToAlbumAsync([asset], album.id); // 앨범에 이미지 추가

                    console.log('Image saved to', asset.uri);
                    setModalVisible(false); // 모달 닫기
                } else {
                    console.log('Media Library permission not granted');
                }
            }
        } catch (error) {
            console.error('Error saving image : ', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 20 }}></View>
            <Text style={styles.title}>현재 포인트 : {userPoints} P</Text>
            <View style={styles.centeredTextContainer}>
                <Text style={styles.text}>모바일 쿠폰은 교환하기 버튼을 누르면 보여지고{'\n'}팝업창의 확인 버튼을 누르면 자동으로{'\n'}갤러리 → ECOBUDDY 에 저장됩니다</Text>
            </View>
            <Image
                source={require('./assets/images/11111.png')}
                style={{ width: 250, height: 150 }}
            />
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
                                handleExchange(4500, require('./assets/images/starbucksCupon.jpg'));
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
                        source={require('./assets/images/starbucks2.jpg')}
                        style={styles.image}
                    />
                    <View style={styles.subTextContainer}>
                        <Text style={[styles.text, styles.leftAlignText]}>스타벅스 커피X2 쿠폰</Text>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity onPress={() => {
                                handleExchange(8800, require('./assets/images/starbucks2.jpg'));
                            }}>
                                <View style={styles.btn}>
                                    <Text style={styles.btnText}>교환하기</Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.title}>8800 P</Text>
                        </View>
                    </View>
                </View>


                <View style={{ marginBottom: 30 }}></View>

                {/* 모바일 쿠폰 1개 */}
                <View style={styles.subContainer}>
                    <Image
                        source={require('./assets/images/chicken.jpg')}
                        style={styles.image}
                    />
                    <View style={styles.subTextContainer}>
                        <Text style={[styles.text, styles.leftAlignText]}>치킨 쿠폰</Text>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity onPress={() => {
                                handleExchange(20000, require('./assets/images/chicken.jpg'));
                            }}>
                                <View style={styles.btn}>
                                    <Text style={styles.btnText}>교환하기</Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.title}>20000 P</Text>
                        </View>
                    </View>
                </View>


                <View style={{ marginBottom: 30 }}></View>

                {/* 모바일 쿠폰 1개 */}
                <View style={styles.subContainer}>
                    <Image
                        source={require('./assets/images/strawberrycake.jpg')}
                        style={styles.image}
                    />
                    <View style={styles.subTextContainer}>
                        <Text style={[styles.text, styles.leftAlignText]}>딸기 케이크 쿠폰</Text>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity onPress={() => {
                                handleExchange(18000, require('./assets/images/strawberrycake.jpg'));
                            }}>
                                <View style={styles.btn}>
                                    <Text style={styles.btnText}>교환하기</Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.title}>18000 P</Text>
                        </View>
                    </View>
                </View>


                <View style={{ marginBottom: 30 }}></View>

                {/* 모바일 쿠폰 1개 */}
                <View style={styles.subContainer}>
                    <Image
                        source={require('./assets/images/cheesecake.jpg')}
                        style={styles.image}
                    />
                    <View style={styles.subTextContainer}>
                        <Text style={[styles.text, styles.leftAlignText]}>치즈 케이크 쿠폰</Text>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity onPress={() => {
                                handleExchange(13000, require('./assets/images/cheesecake.jpg'));
                            }}>
                                <View style={styles.btn}>
                                    <Text style={styles.btnText}>교환하기</Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.title}>13000 P</Text>
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
                        <Image
                            source={modalImage} // 모달 이미지는 상태에서 가져옵니다.
                            style={styles.image2}
                        />
                        <View style={{ marginBottom: 40 }}></View>
                        <TouchableOpacity onPress={handleSaveImage} style={[styles.closeButton, { marginRight: 5 }]}>
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
    image2: {
        width: '80%', // 조절하실 수 있습니다.
        height: '80%', // 조절하실 수 있습니다.
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
        width: '70%', // 모달 너비 조절
        height: '50%', // 모달 높이 조절
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
