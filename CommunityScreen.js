import React, { useContext, useState, useEffect } from 'react';
import LocationContext from './LocationContext';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    PanResponder,
    TextInput,
    Modal,
    TouchableWithoutFeedback,
    Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

export default function CommunityScreen() {
    const navigation = useNavigation();
    const context = useContext(LocationContext);
    const [iconsVisible, setIconsVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHeartSelected, setIsHeartSelected] = useState(false);
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [comments, setComments] = useState([]); // 댓글 목록
    const [newComment, setNewComment] = useState('');
    const [postData, setPostData] = useState([]); // 게시물 데이터 저장

    const imageArray = postData.imageUrl ? postData.imageUrl.split(',') : [];
    const totalImages = imageArray.length;

    const [panResponder, setPanResponder] = useState(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gestureState) => {
                if (gestureState.dx > 50) {
                    showPreviousImage();
                } else if (gestureState.dx < -50) {
                    showNextImage();
                }
            },
        })
    );

    useEffect(() => {
        // API를 호출하여 게시물 데이터를 가져옴
        axios.get(`http://${context.ip}:3003/community`)
            .then((response) => {
                console.log('API 응답:', response.data);
                if (Array.isArray(response.data) && response.data.length === 0) {
                    console.log('서버에서 데이터가 없습니다.');
                    // 빈 배열을 받으면 "등록된 글이 없습니다" 메시지 표시
                    setPostData(null);
                } else {
                    setPostData(response.data);
                }
            })
            .catch((error) => {
                console.error('API 호출 실패:', error);
            });
    }, []);

    const screenWidth = Dimensions.get('window').width;

    if (postData === null) {
        // postData가 정의되지 않았을 때의 예외 처리
        // 예: 화면에 어떤 오류 메시지를 표시하거나 다른 조치를 취할 수 있음
        return (
            <View style={styles.background}>
                <View style={[styles.rowContainer, { marginBottom: 30, }]}>
                    <TouchableOpacity
                        onPress={toggleIconsVisibility}
                        style={[styles.shadowContainer, { marginRight: 20 }]}
                    >
                        <Icon2 name="dots-horizontal" style={styles.icon} />
                    </TouchableOpacity>
                    {iconsVisible && (
                        <View style={styles.iconContainer}>
                            <TouchableOpacity
                                onPress={gotoWrite}
                                style={[styles.shadowContainer, { marginRight: 20 }]}
                            >
                                <Icon2 name="plus" style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.shadowContainer, {}]}>
                                <Icon2 name="account-check" style={styles.icon} />
                            </TouchableOpacity>
                        </View>)
                    }
                </View>
                <Text style={[styles.text, { justifyContent: 'center' }]}>등록된 글이 없습니다!</Text>
            </View>
        );
    }

    const renderPostData = postData.map((post, index) => (
        <View style={styles.container2} key={index}>
            <View style={[styles.rowContainer, { alignContent: 'center', justifyContent: 'center' }]}>
                <View style={styles.profile}></View>
                <Text style={[styles.title, { width: 100 }]}>{post.writer}</Text>
                <Text style={[styles.text, { textAlign: 'right' }]}>{post.date}</Text>
            </View>

            <View style={{ padding: 20 }}>
                <Text style={styles.text}>{post.context}</Text>
            </View>

            {post.imageUrl && (
                <View {...panResponder.panHandlers}>
                    <Image
                                source={{ uri: imageArray[currentImageIndex] }}
                                style={styles.image}
                            />
                    {/* {renderImages(post.imageUrl.split(','))} */}
                </View>
            )}

            {post.imageUrl && post.imageUrl.split(',').length > 1 && (
                <View style={styles.imagePagination}>
                    {post.imageUrl.split(',').map((_, imageIndex) => (
                        <View
                            key={imageIndex}
                            style={[
                                styles.imagePage,
                                currentImageIndex === imageIndex && styles.activeImagePage,
                            ]}
                        />
                    ))}
                </View>
            )}

            <View style={{ marginBottom: 30 }}></View>
            <View style={[styles.rowContainer, { marginBottom: 5 }]}>
                <TouchableOpacity
                    onPress={toggleHeartIcon}
                    style={[
                        styles.icon,
                        { color: isHeartSelected ? '#FAEDFF' : 'black', marginRight: 10, marginLeft: 10 },
                    ]}
                >
                    {isHeartSelected ? (
                        <Icon2 name="cards-heart" style={[styles.icon, { color: '#FFEDF2' }]} />
                    ) : (
                        <Icon2 name="cards-heart-outline" style={[styles.icon, { color: '#FFEDF2' }]} />
                    )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleCommentBox()} style={[styles.icon, { color: '#EDF3FF' }]}>
                    <Icon name="chat-bubble" style={[styles.icon, { color: '#EDF3FF' }]} />
                </TouchableOpacity>
            </View>
        </View>
    ));

    // const images = [
    //     require('./assets/images/쿼카.jpg'),
    //     require('./assets/images/cat3.jpg'),
    //     require('./assets/images/cat5.jpg'),
    // ];

    function toggleIconsVisibility() {
        setIconsVisible(!iconsVisible);
    }

    function gotoWrite() {
        navigation.navigate('글 등록');
    }


    function showNextImage() {
        if (currentImageIndex < totalImages - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    }

    function showPreviousImage() {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    }

    const toggleHeartIcon = () => {
        setIsHeartSelected(!isHeartSelected);
    };

    const toggleCommentBox = () => {
        setShowCommentBox(!showCommentBox);
    };

    const submitComment = () => {
        if (newComment.trim() !== '') {
            setComments([...comments, newComment]);
            setNewComment('');
        }
    };

    function renderImages(images) {
        return images.map((imageUrl, index) => (
            <View
                key={index}
                style={[
                    styles.imageContainer,
                    { display: index === currentImageIndex ? 'flex' : 'none' }
                ]}
            >
                <Image
                    source={{ uri: imageUrl.trim() }}
                    style={styles.image}
                />
            </View>
        ));
    }

    return (
        <View style={styles.background}>
            <View style={[styles.rowContainer, { marginBottom: 30 }]}>
                <TouchableOpacity onPress={toggleIconsVisibility} style={[styles.shadowContainer, { marginRight: 20 }]}>
                    <Icon2 name="dots-horizontal" style={styles.icon} />
                </TouchableOpacity>
                {iconsVisible && (
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={gotoWrite} style={[styles.shadowContainer, { marginRight: 20 }]}>
                            <Icon2 name="plus" style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.shadowContainer, {}]}>
                            <Icon2 name="account-check" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <ScrollView
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                    const offsetX = event.nativeEvent.contentOffset.x;
                    const index = Math.round(offsetX / screenWidth);
                    setCurrentImageIndex(index);
                }}
            >
                {renderPostData}
            </ScrollView>

            <Modal animationType="slide" transparent={true} visible={showCommentBox}>
                <TouchableWithoutFeedback onPress={() => toggleCommentBox()}>
                    <View style={styles.modal}>
                        <ScrollView style={styles.modalContent}>
                            {comments.map((comment, index) => (
                                <View key={index} style={styles.comment}>
                                    <Text style={styles.commentText}>{comment}</Text>
                                </View>
                            ))}
                        </ScrollView>
                        <View style={styles.commentBox}>
                            <TextInput
                                style={styles.commentInput}
                                placeholder="댓글을 입력하세요..."
                                value={newComment}
                                onChangeText={(text) => setNewComment(text)}
                            />
                            <TouchableOpacity style={styles.submitButton} onPress={submitComment}>
                                <Text style={styles.submitButtonText}>댓글 달기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* 글 간격 */}
            <View style={{ height: 30, backgroundColor: '#F2FFED' }}></View>
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
        marginTop: 10,
    },
    container2: {
        width: '100%',
        marginBottom: 70,
        backgroundColor: 'white',
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
    text: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 15,
    },
    title: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 17,
    },
    icon: {
        fontSize: 30,
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
        marginRight: 30,
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
        backgroundColor: 'lightgray',
    },
    commentBox: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    commentInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    submitButton: {
        backgroundColor: '#FFEDF2',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginBottom: 30,
    },
    submitButtonText: {
        color: 'black',
    },
    modal: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        maxHeight: '70%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    comment: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#CCC',
    },
    commentText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 16,
    },
    retryButton: {
        width: '80%',
        height: 50,
        backgroundColor: 'white',
        borderWidth: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
});
