import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image, PanResponder } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CommunityScreen() {
    const navigation = useNavigation();
    const [iconsVisible, setIconsVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = [
        require('./assets/images/쿼카.jpg'),
        require('./assets/images/cat3.jpg'),
        require('./assets/images/cat5.jpg'),
    ];

    function toggleIconsVisibility() {
        setIconsVisible(!iconsVisible);
    }

    function gotoWrite() {
        navigation.navigate('글 등록');
    }

    function showNextImage() {
        if (currentImageIndex < images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    }

    function showPreviousImage() {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gestureState) => {
            if (gestureState.dx > 50) { // 오른쪽 스와이프
                showPreviousImage();
            } else if (gestureState.dx < -50) { // 왼쪽 스와이프
                showNextImage();
            }
        },
    });

    return (
        <View style={styles.background}>
            <View style={[styles.rowContainer]}>
                <TouchableOpacity onPress={toggleIconsVisibility} style={[styles.shadowContainer, { marginRight: 20 }]}>
                    <Icon2 name="dots-horizontal" style={styles.icon} />
                </TouchableOpacity>
                {/* ... 아이콘 누르면 아이콘 두 개 펼쳐지고 다시 누르면 안 보임 */}
                {iconsVisible && (
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={gotoWrite} style={[styles.shadowContainer, {marginRight: 20 }]}>
                            <Icon2 name="plus" style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.shadowContainer, {}]}>
                            <Icon2 name="account-check" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <ScrollView contentContainerStyle={styles.container2}>
                {/* 글 목록 */}
                <View style={styles.container}>
                    <View style={[styles.rowContainer, { alignSelf: 'center' }]}>
                        {/* 글을 작성한 유저의 프로필이 들어갈 곳 */}
                        <View style={styles.profile}></View>
                        {/* 글을 작성한 유저의 이름이 들어갈 곳 */}
                        <Text style={[styles.title, { width: 100 }]}>작성자</Text>
                        <Text style={[styles.text, { alignSelf: 'flex-end' }]}>작성 날짜</Text>
                    </View>

                    <View style={{ marginBottom: 30 }}></View>

                    <ScrollView contentContainerStyle={{ padding: 20 }}>
                        <Text style={styles.text}>
                            내용은 다음과 같습니다...{'\n'}{'\n'}
                            자취생 분들을 위한 꿀팁, 많이 퍼트려 주세요!{'\n'}
                            1. ~~~~{'\n'}
                            2. ~~~~{'\n'}
                            3. ~~~~{'\n'}
                            4. ~~~~{'\n'}
                        </Text>
                    </ScrollView>

                    {/* 유저가 올린 사진 */}
                    <View style={styles.imageContainer}>
                        <View {...panResponder.panHandlers}>
                            <Image
                                source={images[currentImageIndex]}
                                style={styles.image}
                            />
                        </View>
                    </View>
                    {/* 몇 번째 사진인지 표시 */}
                    <View style={styles.imagePagination}>
                        {images.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.imagePage,
                                    currentImageIndex === index && styles.activeImagePage,
                                ]}
                            />
                        ))}
                    </View>
                </View>

                
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#F2FFED',
        padding: 20,
    },
    rowContainer: {
        flexDirection: 'row',
        marginBottom: 30,
        marginTop: 10,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
    },
    container2: {
        flex: 1,
        marginBottom: 70
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shadowContainer: {
        width: 50,
        height: 50,
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
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    btn: {
        backgroundColor: '#FFEDF2',
        width: '30%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 15,
    },
    title: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 17,
    },
    icon: {
        fontSize: 20,
        color: '#353535',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    profile: {
        borderRadius: 50,
        backgroundColor: '#F2FFED',
        width: 50,
        height: 50,
        marginLeft: 20,
        alignItems: 'center',
    },
    navigationButton: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    navigationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image: {
        width: 300,
        height: 300,
        alignItems: 'center',
    },
    imagePagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    imagePage: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#F0F0F0',
        margin: 5,
    },
    activeImagePage: {
        backgroundColor: '#EDF3FF',
    },

});
