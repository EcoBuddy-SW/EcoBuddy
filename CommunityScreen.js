import React, { useContext, useState, useEffect, useCallback } from 'react';
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
    KeyboardAvoidingView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import Swiper from 'react-native-swiper';

export default function CommunityScreen() {
    const navigation = useNavigation();
    const context = useContext(LocationContext);
    const [iconsVisible, setIconsVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHeartSelected, setIsHeartSelected] = useState(false); // 하트 누르기
    const [showCommentBox, setShowCommentBox] = useState(false); // 게시물에 해당하는 댓글창
    const [comments, setComments] = useState([]); // 댓글 목록
    const [newComment, setNewComment] = useState('');
    const [postData, setPostData] = useState([]); // 게시물 데이터 저장
    const [, updateState] = useState();
    // const forceUpdate = useCallback(() => updateState({}), []);
    const [originalData, setOriginalData] = useState([]);  // 원본 게시물 데이터
    const [isFiltered, setIsFiltered] = useState(false);
    const imageArray = postData.imageUrl ? postData.imageUrl.split(', ') : [];
    const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' '); // 현재 날짜와 시간
    const [activePostNum, setActivePostNum] = useState(null); // 댓글창 열 때 몇 번째 게시글인지 저장
    const totalImages = imageArray.length;
    // const postId = postData && postData[currentImageIndex] ? postData[currentImageIndex].postId : null;


    // useEffect(() => {
    //     // API를 호출하여 게시물 데이터를 가져옴
    //     axios.get(`http://${context.ip}:3003/community`, {
    //         headers: {
    //             'Cache-Control': 'no-cache',
    //         },
    //     })
    //         .then((response) => {
    //             console.log('API 응답:', response.data);
    //             if (Array.isArray(response.data) && response.data.length === 0) {
    //                 console.log('서버에서 데이터가 없습니다.');
    //                 // 빈 배열을 받으면 "등록된 글이 없습니다" 메시지 표시
    //                 setPostData(null);
    //             } else {
    //                 setOriginalData(response.data); // 원본 데이터 저장
    //                 setPostData([...response.data]);
    //                 fetchComments(response.data);
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('API 호출 실패:', error);
    //         });
    // }, []);

    useEffect(() => {
        // 초기 렌더링 시 API 호출
        fetchData();
    }, []);

    const fetchData = () => {
        // API를 호출하여 게시물 데이터를 가져옴
        axios.get(`http://${context.ip}:3003/community`, {
            headers: {
                'Cache-Control': 'no-cache',
            },
        })
            .then((response) => {
                console.log('API 응답:', response.data);
                if (Array.isArray(response.data) && response.data.length === 0) {
                    console.log('서버에서 데이터가 없습니다.');
                    // 빈 배열을 받으면 "등록된 글이 없습니다" 메시지 표시
                    setPostData(null);
                } else {
                    setOriginalData(response.data); // 원본 데이터 저장
                    setPostData([...response.data]);
                    fetchComments(response.data);
                }
            })
            .catch((error) => {
                console.error('API 호출 실패:', error);
            });
    };

    useEffect(() => {
        if (isFiltered) {

            // isFiltered가 true일 때, 필터링된 게시물만 보여줌
            const filteredPosts = postData.filter((post) => post.writer === context.userId);
            setPostData(filteredPosts);
            console.log('필터링 됨 !');
        } else {
            // isFiltered가 false일 때, 모든 게시물을 보여줌
            setPostData(originalData);
            console.log('모든 게시물 보이게 됨 !');
        }
    }, [isFiltered]);


    // useEffect(() => {
    //     fetchComments(postData); // 게시물 데이터를 인자로 전달
    // }, [postData]);

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
                            <TouchableOpacity
                                onPress={toggleFilter}
                                style={[styles.shadowContainer, { marginRight: 20 }]}>
                                <Icon2 name="account-check" style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={fetchData}
                                style={[styles.shadowContainer, { marginRight: 20 }]}>
                                <Icon2 name="refresh" style={styles.icon} />
                            </TouchableOpacity>
                        </View>)
                    }
                </View>
                <Text style={[styles.text, { justifyContent: 'center' }]}>등록된 글이 없습니다!</Text>
            </View>
        );
    }

    const renderPostData = postData.map((post, index) => {

        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gestureState) => {
                if (gestureState.dx > 50) {
                    showPreviousImage();
                } else if (gestureState.dx < -50) {
                    showNextImage();
                }
            },
        });

        function showNextImage() {
            if (currentImageIndex < post.imageUrl.split(', ').length - 1) {
                console.log('ShowNext, currentImageIndex:', currentImageIndex);
                setCurrentImageIndex(currentImageIndex + 1);
            }
        }

        function showPreviousImage() {
            if (currentImageIndex > 0) {
                console.log('ShowPrevious, currentImageIndex:', currentImageIndex);
                setCurrentImageIndex(currentImageIndex - 1);
            }
        }
        return (
            <View style={styles.container2} key={index}>
                <View style={[styles.rowContainer, { alignContent: 'center', justifyContent: 'center' }]}>
                    <Text style={[styles.title, { width: 100 }]}>{post.writer}</Text>
                    <Text style={[styles.text, { justifyContent: 'flex-end' }]}>{post.date}</Text>
                </View>

                <View style={{ padding: 20 }}>
                    <Text style={styles.text}>{post.context}</Text>
                </View>

                {/* {post.imageUrl && (
                <View {...panResponder.panHandlers}>
                    {renderImages(post.imageUrl.split(','))}
                </View>
            )} */}

                {post.imageUrl.split(', ').map((imageUrl, index) => {
                    const trimmedUrl = imageUrl.trim();
                    if (trimmedUrl === '') {
                        return null; // 이미지 URL이 비어있을 때는 렌더링하지 않음
                    }
                    // console.log('trimmedUrl :', trimmedUrl)
                    return (
                        <View
                            key={index}
                            style={[
                                styles.imageContainer,
                                { display: index === currentImageIndex ? 'flex' : 'none' }
                            ]}
                            {...panResponder.panHandlers}
                        >
                            <Image
                                source={{ uri: trimmedUrl }}
                                style={styles.image}
                            />
                        </View>

                    );
                })}


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
                        {/* {isHeartSelected ? (
                        <Icon2 name="cards-heart" style={[styles.icon, { color: '#FFEDF2' }]} />
                    ) : (
                        <Icon2 name="cards-heart-outline" style={[styles.icon, { color: '#FFEDF2' }]} />
                    )} */}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        if (!showCommentBox) {
                            toggleCommentBox(post.num);
                        } else if (showCommentBox && activePostNum === post.num) {
                            toggleCommentBox(null);
                        }
                    }} style={[styles.icon, { color: '#EDF3FF' }]}>
                        <Icon name="chat-bubble" style={[styles.icon, { color: '#EDF3FF' }]} />
                    </TouchableOpacity>
                </View>

                <Modal animationType="slide" transparent={true} visible={showCommentBox}>
                    <TouchableWithoutFeedback onPress={() => toggleCommentBox()}>
                        <View style={styles.modal}>
                            <ScrollView style={styles.modalContent}>
                                {comments.map((comment, index) => {
                                    console.log('comment:', comment);
                                    return (
                                        <View key={index} style={styles.comment}>
                                            <Text style={styles.commentWriter}>{comment.commentWriter}</Text>
                                            <Text style={styles.commentText}>{comment.comment}</Text>
                                        </View>
                                    );
                                })}
                            </ScrollView>
                            <KeyboardAvoidingView style={styles.container} behavior="padding">
                                <View style={styles.commentBox}>
                                    {showCommentBox && (
                                        <>
                                            <TextInput
                                                style={styles.commentInput}
                                                placeholder="댓글을 입력하세요..."
                                                value={newComment}
                                                onChangeText={(text) => setNewComment(text)}
                                            />
                                            <TouchableOpacity style={styles.submitButton} onPress={() => submitComment()}>
                                                <Text style={styles.submitButtonText}>댓글 달기</Text>
                                            </TouchableOpacity>
                                        </>
                                    )}
                                </View>
                            </KeyboardAvoidingView>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

            </View>
        )
    });

    function toggleIconsVisibility() {
        setIconsVisible(!iconsVisible);
    }

    function toggleIconsVisibility() {
        setIconsVisible(!iconsVisible);
    }

    // isFiltered 상태 토글 함수
    function toggleFilter() {
        setIsFiltered(!isFiltered);
        console.log('isFiltered 는', isFiltered);
    }

    function gotoWrite() {
        navigation.navigate('글 등록');
    }

    const toggleHeartIcon = () => {
        setIsHeartSelected(!isHeartSelected);
    };

    const toggleCommentBox = (postNum) => {
        setShowCommentBox(!showCommentBox);
        setActivePostNum(postNum);
        if (!showCommentBox) { // 댓글 창을 열 때만 댓글을 불러옴
            fetchComments(postNum);
            console.log('postNum: ', postNum)
        }
    };

    const fetchComments = async (postNum) => {
        console.log('fetchComments postNum: ', postNum)
        if (postNum) {
            axios.get(`http://${context.ip}:3003/commentList?num=${postNum}`)
                .then((response) => {
                    if (Array.isArray(response.data)) {
                        setComments(response.data);
                        console.log('댓글 데이터:', response.data);
                    }
                })
                .catch((error) => {
                    console.error('댓글 데이터를 불러오는 데 실패했습니다:', error);
                });
        }
    }

    const submitComment = async () => {
        console.log('postNum 2: ', activePostNum)
        if (newComment.trim() !== '') {
            setNewComment('');
            try {
                if (activePostNum) {
                    console.log('postNum 3: ', activePostNum);
                    const success = await comment(activePostNum);
                    if (success) {
                        fetchComments(activePostNum);
                    } else {
                        console.error('댓글 등록 실패');
                    }
                } else {
                    console.error('postId가 null 또는 유효하지 않습니다.');
                }
            } catch (error) {
                console.error('예외 발생:', error);
            }
        }
    };

    const comment = async (postId) => {
        if (!postId) {
            console.error('댓글 등록 실패: postId가 null 또는 유효하지 않습니다.');
            return false; // 댓글 등록 실패
        }

        try {
            // 사용자의 ID에 대한 NICKNAME을 가져오는 요청
            const userResponse = await axios.post(`http://${context.ip}:3003/getUserNickname`, {
                userId: context.userId,
            });

            if (!userResponse.data.success) {
                console.error(userResponse.data.message);
                return false; // 댓글 등록 실패
            }

            const commentWriter = userResponse.data.nickname;

            // 댓글 등록 요청
            const response = await axios.post(`http://${context.ip}:3003/comment`, {
                postId: postId,
                commentWriter: commentWriter,
                comment: newComment,
                date: currentDateTime,
            });

            if (response.data.success) {
                console.log(response.data);
                return true; // 댓글 등록 성공
            } else {
                console.error(response.data.message);
                return false; // 댓글 등록 실패
            }
        } catch (error) {
            console.error(error);
            return false; // 댓글 등록 실패
        }
    }

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
                        <TouchableOpacity
                            onPress={toggleFilter}
                            style={[styles.shadowContainer, { marginRight: 20 }]}>
                            <Icon2 name="account-check" style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={fetchData}
                            style={[styles.shadowContainer, { marginRight: 20 }]}>
                            <Icon2 name="refresh" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <ScrollView
                pagingEnabled={false}
                scrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                    const offsetX = event.nativeEvent.contentOffset.x;
                    const index = Math.round(offsetX / screenWidth);
                    setCurrentImageIndex(index);
                }}
            >
                {renderPostData}
            </ScrollView>

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
    commentWriter:{
        fontFamily: 'Pretendard-Regular',
        color: 'lightgray',
        fontSize: 13,
        marginBottom: 5,
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