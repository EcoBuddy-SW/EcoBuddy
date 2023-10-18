import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';


export default function CommunityScreen() {
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('사진 라이브러리 액세스 권한이 거부되었습니다.');
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log("selectedImage:", selectedImage);


        if (!result.cancelled) {
            setSelectedImage(result.uri);
        }
    };

    function gotoCommunity() {
        setModalVisible(true);
    }

    function closeModal() {
        setModalVisible(false);
        navigation.navigate('커뮤니티');
    }

    return (
        <View style={styles.background}>
            <ScrollView horizontal={true} contentContainerStyle={[styles.rowContainer]}>
                <TouchableOpacity style={styles.container} onPress={pickImage}>
                    {selectedImage && (
                        <Image source={{ uri: selectedImage }} style={styles.image} />
                    )}
                </TouchableOpacity>
            </ScrollView>

            <View style={styles.line}></View>

            <View style={[styles.text, { padding: 20, color: 'lightgray' }]}>
                <Text style={styles.text}>내용을 입력하세요{'\n'}최대 3000자까지 입력 가능합니다</Text>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                        <Text>글을 등록하였습니다.</Text>
                        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                            <Text style={styles.text}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#F2FFED',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        width: 200,
        height: 200,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: 0,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        height: 1,
    },
    shadowContainer: {
        width: 200,
        height: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
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
    text: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 15,
        color: 'lightgray',
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
