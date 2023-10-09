import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CategoryResultScreen() {

    const route = useRoute();

    // route.params가 존재하는지 확인 후 접근
    const isAnyCategorySelected = route.params?.isAnyCategorySelected || false;
    const isAnyCategorySelected2 = route.params?.isAnyCategorySelected2 || false;
    const isAnyCategorySelected3 = route.params?.isAnyCategorySelected3 || false;

    const renderResultContainer = (index) => {
        if (index === 0 && isAnyCategorySelected) {
            return (
                <View style={[styles.resultContainer, { padding: 30 }]}>
                    <Text style={[styles.text, { marginBottom: 20, fontFamily: 'Pretendard-Bold', fontSize: 18 }]}>경기</Text>
                    <View style={[styles.subContainer, { marginBottom: 15 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <View style={[styles.btn, { marginTop: 5, marginLeft: 10 }]} >
                                <Text style={[styles.text]}>평택</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Icon2 name="arrow-top-right-thin" style={styles.icon} />
                            </View>
                        </View>
                        <Text style={[styles.text, { marginStart: 30, marginBottom: 15 }]}>글 제목</Text>
                    </View>
                    {/* 여기까지가 서브컨테이너 1개 */}
                    <View style={[styles.subContainer, { marginBottom: 15 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <View style={[styles.btn, { marginTop: 5, marginLeft: 10 }]} >
                                <Text style={[styles.text]}>안양</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Icon2 name="arrow-top-right-thin" style={styles.icon} />
                            </View>
                        </View>
                        <Text style={[styles.text, { marginStart: 30, marginBottom: 15 }]}>글 제목</Text>
                    </View>
                    <View style={[styles.subContainer, { marginBottom: 15 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <View style={[styles.btn, { marginTop: 5, marginLeft: 10 }]} >
                                <Text style={[styles.text]}>남양주</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Icon2 name="arrow-top-right-thin" style={styles.icon} />
                            </View>
                        </View>
                        <Text style={[styles.text, { marginStart: 30, marginBottom: 15 }]}>글 제목</Text>
                    </View>
                </View>
            );
        }
        if (index === 1 && isAnyCategorySelected2) {
            return (
                <View style={[styles.resultContainer, { padding: 30 }]}>
                    <Text style={[styles.text, { marginBottom: 20, fontFamily: 'Pretendard-Bold', fontSize: 18 }]}>시행 예정</Text>
                    <View style={[styles.subContainer, { marginBottom: 15 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <View style={[styles.btn, { marginTop: 5, marginLeft: 10 }]} >
                                <Text style={[styles.text]}>의왕</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Icon2 name="arrow-top-right-thin" style={styles.icon} />
                            </View>
                        </View>
                        <Text style={[styles.text, { marginStart: 30, marginBottom: 15 }]}>글 제목</Text>
                    </View>
                    {/* 여기까지가 서브컨테이너 1개 */}
                    <View style={[styles.subContainer, { marginBottom: 15 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <View style={[styles.btn, { marginTop: 5, marginLeft: 10 }]} >
                                <Text style={[styles.text]}>부평</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Icon2 name="arrow-top-right-thin" style={styles.icon} />
                            </View>
                        </View>
                        <Text style={[styles.text, { marginStart: 30, marginBottom: 15 }]}>글 제목</Text>
                    </View>
                    <View style={[styles.subContainer, { marginBottom: 15 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <View style={[styles.btn, { marginTop: 5, marginLeft: 10 }]} >
                                <Text style={[styles.text]}>의정부</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Icon2 name="arrow-top-right-thin" style={styles.icon} />
                            </View>
                        </View>
                        <Text style={[styles.text, { marginStart: 30, marginBottom: 15 }]}>글 제목</Text>
                    </View>
                </View>
            );
        }
        if (index === 2 && isAnyCategorySelected3) {
            return (
                <View style={[styles.resultContainer, { padding: 30 }]}>
                    <Text style={[styles.text, { marginBottom: 20, fontFamily: 'Pretendard-Bold', fontSize: 18 }]}>카테고리</Text>
                    <View style={[styles.subContainer, { marginBottom: 15 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <View style={[styles.btn, { marginTop: 5, marginLeft: 10 }]} >
                                <Text style={[styles.text]}>포항시</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Icon2 name="arrow-top-right-thin" style={styles.icon} />
                            </View>
                        </View>
                        <Text style={[styles.text, { marginStart: 30, marginBottom: 15 }]}>글 제목</Text>
                    </View>
                    {/* 여기까지가 서브컨테이너 1개 */}
                    <View style={[styles.subContainer, { marginBottom: 15 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <View style={[styles.btn, { marginTop: 5, marginLeft: 10 }]} >
                                <Text style={[styles.text]}>경주시</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Icon2 name="arrow-top-right-thin" style={styles.icon} />
                            </View>
                        </View>
                        <Text style={[styles.text, { marginStart: 30, marginBottom: 15 }]}>글 제목</Text>
                    </View>
                    <View style={[styles.subContainer, { marginBottom: 15 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <View style={[styles.btn, { marginTop: 5, marginLeft: 10 }]} >
                                <Text style={[styles.text]}>구미시</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Icon2 name="arrow-top-right-thin" style={styles.icon} />
                            </View>
                        </View>
                        <Text style={[styles.text, { marginStart: 30, marginBottom: 15 }]}>글 제목</Text>
                    </View>
                </View>
            );
        }
    };

    return (

        <ScrollView
            style={styles.container}
            contentContainerStyle={{ padding: .0 }} // props 설정해줘야 함, 0 이어도 지우지 않기 , , 
        >
            <View style={styles.container}>
                <View style={{ padding: 30 }}>
                    <Text style={[styles.text, { fontSize: 15 }]}>선택하신 키워드 결과</Text>
                </View>

                {/* 검색 결과 데이터 디자인이에용 ~~ */}
                {/* 카테고리 분리수거에 포함되는 검색 결과 */}
                {/* 결과 컨테이너를 동적으로 렌더링 */}
                {isAnyCategorySelected && renderResultContainer(0)}
                {isAnyCategorySelected2 && renderResultContainer(1)}
                {isAnyCategorySelected3 && renderResultContainer(2)}

            </View>


        </ScrollView >
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
    resultContainer: {
        backgroundColor: '#F2FFED',
        padding: 8,
        borderRadius: 10,
        width: '100%',
        alignSelf: 'center',
        marginBottom: 50,
    },
    subContainer: {
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 0,
        borderWidth: 1,
        width: '100%',
        alignSelf: 'center',
    },
    btn: {
        backgroundColor: '#FAEDFF',
        borderRadius: 0,
        width: '20%',
        height: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center', // 이게 가운데 정렬임 기억해 ㅡㅡ
    },
    text: {
        fontFamily: 'Pretendard-Regular',
    },
    icon: {
        fontSize: 30,
    },
});
