import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function SearchResultScreen() {
    const route = useRoute();
    const { searchKeyword } = route.params;
    const navigation = useNavigation();

    const goToMap = () => {
        navigation.navigate('지도'); // 'Map' 스크린으로 이동
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ padding: 0 }} // props 설정해줘야 함, 0 이어도 지우지 않기 , , 
        >
            <View style={styles.container}>
                <View style={{ padding: 30 }}>
                    <Text style={[styles.text, { fontSize: 15 , marginBottom: 30 }]}>검색하신 {searchKeyword} 결과</Text>

                    {/* 검색 결과 데이터 디자인이에용 ~~ */}
                    {/* 카테고리 분리수거에 포함되는 검색 결과 */}
                    <View style={[styles.resultContainer, { padding: 30 }]}>
                        <Text style={[styles.text, { marginBottom: 20, fontFamily: 'Pretendard-Bold', fontSize: 18 }]}>분리수거</Text>
                        <View style={[styles.subContainer, { marginBottom: 15 }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                <Text style={[styles.text, { fontSize: 15 }]}>제목 1</Text>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={styles.text}>지역</Text>
                                </View>
                            </View>
                            <Text style={[styles.text, { marginStart: 15, marginBottom: 30 }]}>해당 분리수거 사업에 대한 설명</Text>
                            {/* 버튼 2개 */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                <TouchableOpacity style={styles.btn} >
                                    <Text style={[styles.text]}>자세히 보기</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={goToMap} style={[styles.btn,{backgroundColor:'#FAEDFF', marginStart:10}]}>
                                    <Text style={[styles.text]}>정확한 위치</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* 여기까지가 서브컨테이너 1개 */}

                        <View style={[styles.subContainer, { marginBottom: 15 }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                <Text style={[styles.text, { fontSize: 15 }]}>제목 2 </Text>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={styles.text}>지역</Text>
                                </View>
                            </View>
                            <Text style={[styles.text, { marginStart: 15, marginBottom: 30 }]}>해당 분리수거 사업에 대한 설명</Text>
                            {/* 버튼 2개 */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                <TouchableOpacity style={styles.btn}>
                                    <Text style={[styles.text]}>자세히 보기</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.btn,{backgroundColor:'#FAEDFF', marginStart:10}]}>
                                    <Text style={[styles.text]}>정확한 위치</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* 카테고리 복지에 포함되는 검색 결과 */}
                    <View style={[styles.resultContainer, { padding: 30, marginTop: 30 }]}>
                        <Text style={[styles.text, { marginBottom: 20, fontFamily: 'Pretendard-Bold', fontSize: 18 }]}>복지</Text>
                        <View style={[styles.subContainer, { marginBottom: 15 }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                <Text style={[styles.text, { fontSize: 15 }]}>제목 1</Text>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={styles.text}>지역</Text>
                                </View>
                            </View>
                            <Text style={[styles.text, { marginStart: 15, marginBottom: 30 }]}>해당 복지에 대한 설명</Text>
                            {/* 버튼 2개 */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                <TouchableOpacity style={styles.btn}>
                                    <Text style={[styles.text]}>자세히 보기</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.btn,{backgroundColor:'#FAEDFF', marginStart:10}]}>
                                    <Text style={[styles.text]}>정확한 위치</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* 여기까지가 서브컨테이너 1개 */}

                        <View style={[styles.subContainer, { marginBottom: 15 }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                <Text style={[styles.text, { fontSize: 15 }]}>제목 2</Text>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={styles.text}>지역</Text>
                                </View>
                            </View>
                            <Text style={[styles.text, { marginStart: 15, marginBottom: 30 }]}>해당 복지에 대한 설명</Text>
                            {/* 버튼 2개 */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                <TouchableOpacity style={styles.btn}>
                                    <Text style={[styles.text]}>자세히 보기</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.btn,{backgroundColor:'#FAEDFF', marginStart:10}]}>
                                    <Text style={[styles.text]}>정확한 위치</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>


                </View>
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
    },
    subContainer: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        width: '100%',
        height: 130,
        alignSelf: 'center',
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
    text: {
        fontFamily: 'Pretendard-Regular',
    },
});
