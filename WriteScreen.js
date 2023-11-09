import React, { useContext, useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Modal, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as FileSystem from 'expo-file-system';
import firebase from '@firebase/app';
import 'firebase/storage';
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { LoadingModal } from "react-native-loading-modal";

import LocationContext, { getLocation } from './LocationContext';
import axios from 'axios';

export default function WriteScreen() {
    const context = useContext(LocationContext);
    const navigation = useNavigation();
    const storage = getStorage();

    const writer = context.userId;
    // const writer = 'kkk'; //임의로 넣음
    const [lodingModal, setLodingModal] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [inputText, setInputText] = useState("");
    const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' '); // 현재 날짜와 시간
    const maxImages = 5; // 최대 이미지 수
    let postData = null; // postData 변수를 선언

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('사진 라이브러리 액세스 권한이 거부되었습니다.');
            }
        })(); 
    }, []);

    useEffect(() => {
        console.log('selectedImages:', selectedImages);
    }, [selectedImages]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
    
        if (!result.cancelled) {
            const selectedImageUri = result.assets[0].uri;
    
            // 이미지가 배열에 없을 때만 추가
            if (selectedImages.length < maxImages && !selectedImages.includes(selectedImageUri)) {
                setSelectedImages([...selectedImages, selectedImageUri]);
            } else {
                alert('최대 5장까지 선택할 수 있습니다.');
            }
        }
    };

    // 프론트에서 글 뜨는지 확인하는 함수 
    function closeModal() {
        setModalVisible(false);
        navigation.navigate('Home', { postData });
    };

    const openModal = async () => {
        try {
            // write 함수 호출
            const success = await write();

            if (success) {
                setModalVisible(true);
            } else {
                console.error('글 등록 실패');
            }
        } catch (error) {
            console.error('예외 발생:', error);
        }
    };

    // 로딩 모달
    const LoadingModal = ({ modalVisible }) => {
        return (
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#F2FFED', padding: 20, borderRadius: 10 }}>
                        <ActivityIndicator size="large" color="black" />
                        <Text>Loading...</Text>
                    </View>
                </View>
            </Modal>
        );
    };

    // Firebase Storage에 이미지 업로드
    const uploadImagesToFirebase = async () => {
        const storage = getStorage();
        const imageUrls = [];

        try {
            await Promise.all(selectedImages.map(async (imageUri) => {
                console.log('Uploading image:', imageUri);
                console.log('2');

                try {
                    console.log('3');
                    const response = await fetch(imageUri);
                    console.log('Fetch 성공 함, 그리고 상태: ' , response.status);
                    if (!response.ok) {
                        console.error('Fetch failed with status:', response.status);
                        throw new Error('Fetch failed');
                    }
                    console.log('Fetch 성공 함, 그리고 상태: ' , response.status);
                    const blob = await response.blob();
                    console.log('4');
                    const meta = { contentType: 'image/jpeg' };
                    const uniqueImageName = `writing/${Date.now()}_${Math.random()}.jpg`;
                    const storageRef = ref(storage, uniqueImageName);
                    const uploadTask = uploadBytes(storageRef, blob, meta);

                    console.log('Uploading bytes...');
                    await uploadTask;

                    console.log('Getting download URL...');
                    const url = await getDownloadURL(storageRef);
                    imageUrls.push(url);

                    console.log('Firebase image upload success:', url);
                } catch (uploadError) {
                    console.error('Error during image upload:', uploadError);
                    // throw uploadError;
                }
            }));

            // imageUrls 배열을 문자열로 변환하여 리턴
            return imageUrls.join(', ');
        } catch (error) {
            console.error('Error during image upload:', error);
            throw error; // 에러를 상위로 다시 던져서 처리하도록 함
        }
    };

    // // uploadImagesToFirebase 함수 사용 예시
    // (async () => {
    //     try {
    //         const urls = await uploadImagesToFirebase();
    //         console.log('All images uploaded. URLs:', urls);
    //     } catch (error) {
    //         console.error('Error during image upload process:', error);
    //         console.error(error.stack);
    //     }
    // })();

    const write = async () => {

        setLodingModal(true); // 업로딩 시작 시 modalVisible을 true로 설정

        try {
            const imageUrls = await uploadImagesToFirebase();
            const response = await axios.post(`http://${context.ip}:3003/write`, {
                writer: writer,
                context: inputText,
                imageUrl: imageUrls,
                date: currentDateTime,
            });

            if (response.data.success) {
                console.log(response.data);
                setModalVisible(false);
                return true; // 글 등록 성공
            } else {
                console.error(response.data.message);
                setModalVisible(false);
                return false; // 글 등록 실패
            }
        } catch (error) {
            console.error(error);
            setModalVisible(false);
            return false; // 글 등록 실패
        }  finally {
            setLodingModal(false); // 업로딩이 끝나면 modalVisible을 false로 설정
        }
    }

    return (
        <View style={styles.background}>
            <View style={{ marginBottom: 30 }}></View>
            <Text style={styles.title}>최대 5장까지 선택할 수 있습니다</Text>
            <ScrollView horizontal={true} contentContainerStyle={styles.rowContainer} style={{ flexGrow: 0 }}>
                {selectedImages.map((image, index) => (
                    <View key={index} style={styles.imageContainer}>
                        <Image source={{ uri: image }} style={styles.image} />
                    </View>
                ))}
                {selectedImages.length < maxImages && (
                    <TouchableOpacity style={styles.container} onPress={pickImage}>
                        <Icon name="photo" style={styles.icon} />
                    </TouchableOpacity>
                )}
            </ScrollView>

            <View style={styles.line}></View>

            <ScrollView contentContainerStyle={styles.background} style={{ padding: 20, }}>
                <TextInput
                    style={styles.text}
                    placeholder="내용을 입력하세요"
                    onChangeText={(text) => setInputText(text)} // 입력한 텍스트 업데이트
                    value={inputText} // 입력 필드의 값
                />
            </ScrollView>

            <View style={styles.line}></View>
            <TouchableOpacity onPress={openModal} style={[styles.closeButton, { marginBottom: 50 }]}>
                <Text style={styles.title}>글 등록</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                        <Text style={[styles.text, { textAlign: 'center' }]}>글을 등록하였습니다.</Text>
                        <TouchableOpacity onPress={closeModal} style={[styles.closeButton, { width: 100, marginTop: 30 }]}>
                            <Text style={[styles.text, { textAlign: 'center', }]}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* LoadingModal을 modalVisible 상태에 따라 표시 */}
            <LoadingModal modalVisible={lodingModal} />
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'white',
    },
    rowContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 20,
    },
    container: {
        width: 200,
        height: 200,
        backgroundColor: '#F2FFED',
        padding: 10,
        borderRadius: 10,
        marginRight: 10, // 오른쪽 여백 추가
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: 200,
        height: 200,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        marginRight: 10, // 오른쪽 여백 추가
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        height: 1, // 구분선의 높이
        backgroundColor: '#E6E6E6', // 구분선의 색상
        marginVertical: 10, // 상하 여백
    },
    text: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 15,
    },
    title: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 17,
        textAlign: 'center',
    },
    icon: {
        fontSize: 20,
        color: '#353535',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    closeButton: {
        width: '80%',
        height: 70,
        backgroundColor: 'white',
        borderWidth: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
});
