import React, { useRef, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function Tip3Screen() {
    const scrollViewRef = useRef(null);

    // 각 subContainer에 대한 ref를 생성합니다.
    const subContainerRefs = Array.from({ length: 10 }, () => useRef(null));

    useEffect(() => {
        const calculateOffsets = () => {
            // subContainerRefs 배열의 각 요소에 대한 참조를 설정
            subContainerRefs.forEach((ref, index) => {
                if (ref.current) {
                    // 요소가 존재하는 경우 measure 메서드를 사용하여 offset 값을 계산합니다.
                    ref.current.measure((x, y, width, height) => {
                        console.log(`OffsetTop for subContainer ${index}: ${y}`);
                    });
                }
            });
        };

        calculateOffsets();
    }, [subContainerRefs]);

    const scrollToCategory = (categoryIndex) => {
        if (subContainerRefs[categoryIndex].current && scrollViewRef.current) {
            subContainerRefs[categoryIndex].current.measure((x, y) => {
                scrollViewRef.current.scrollTo({ y: y - 20 /* 여백 값 */, animated: true });
            });
        }
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ padding: 0 }} // props 설정해줘야 함, 0 이어도 지우지 않기 , , 
            ref={scrollViewRef}
        >
            <Text style={[styles.title,{alignSelf:'center', alignItems:'center', marginTop: 30}]}>키워드를 누르면 해당 리스트 번호로 이동합니다!</Text>
            <View style={[styles.rowContainer, { marginTop: 30 }]}>
                <TouchableOpacity onPress={() => scrollToCategory(0)}>
                    <Text style={styles.categoryTitle}>#1. 컵라면 용기</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => scrollToCategory(1)}>
                    <Text style={styles.categoryTitle}>#2. 스티로품 상자</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => scrollToCategory(2)}>
                    <Text style={styles.categoryTitle}>#3. 아이스팩</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.rowContainer}>
                <TouchableOpacity onPress={() => scrollToCategory(3)}>
                    <Text style={styles.categoryTitle}>#4. 완충재</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => scrollToCategory(4)}>
                    <Text style={styles.categoryTitle}>#5. 종이팩</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => scrollToCategory(5)}>
                    <Text style={styles.categoryTitle}>#6. 페트병</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.rowContainer}>
                <TouchableOpacity onPress={() => scrollToCategory(6)}>
                    <Text style={styles.categoryTitle}>#7. 전구, 형광등</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => scrollToCategory(9)}>
                    <Text style={styles.categoryTitle}>#8. 과일 / 달걀 껍질</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.rowContainer}>
                <TouchableOpacity onPress={() => scrollToCategory(7)}>
                    <Text style={styles.categoryTitle}>#9. 유리병</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => scrollToCategory(8)}>
                    <Text style={styles.categoryTitle}>#9-1 깨진 유리병</Text>
                </TouchableOpacity>
            </View>

            <View ref={subContainerRefs[0]} style={[styles.subContainer, { marginTop: 20 }]}>
                <Text style={styles.title}>1. 컵라면 용기</Text>
                <Text style={styles.content}>- 이물질 묻은 컵라면 용기는 플라스틱이든 종이든 접거나 잘라서 종량제 봉투로</Text>
            </View>
            <View ref={subContainerRefs[1]} style={styles.subContainer}>
                <Text style={styles.title}>2. 스티로품 상자</Text>
                <Text style={styles.content}>- 이물질 제거</Text>
                <Text style={styles.content}>- 신선식품을 주문했을 때 주로 생기는 스티로품 쓰레기는 이물질이 묻지 않은 흰색만 '플라스틱류'로 분류 가능</Text>
            </View>
            <View ref={subContainerRefs[2]} style={styles.subContainer}>
                <Text style={styles.title}>3. 아이스팩</Text>
                <Text style={styles.content}>- 아이스팩은 손수 뜯어 내용물을 버릴 필요 없으니 통째로 종량제 봉투에 버리기</Text>
            </View>
            <View ref={subContainerRefs[3]} style={styles.subContainer}>
                <Text style={styles.title}>4. 완충재</Text>
                <Text style={styles.content}>- 뽁뽁이로 불리는 에어캡은 비닐류, 과일 포장재는 스티로품류 단 이물질이 묻은 것은 일반 쓰레기
                </Text>
            </View>
            <View ref={subContainerRefs[4]} style={styles.subContainer}>
                <Text style={styles.title}>5. 종이팩</Text>
                <Text style={styles.content}>- 우유팩 등 안쪽을 헹궈 말린 후 납작하게 접어 종이류로 분류</Text>
            </View>
            <View ref={subContainerRefs[5]} style={styles.subContainer}>
                <Text style={styles.title}>6. 페트병</Text>
                <Text style={styles.content}>- 라벨은 제거 후 비닐류로</Text>
                <Text style={styles.content}>- 뚜껑은 뚜껑고리와 일반 플라스틱</Text>
                <Text style={styles.content}>- 납작하게 누른 후 페트병류로 배출</Text>
            </View>
            <View ref={subContainerRefs[6]} style={styles.subContainer}>
                <Text style={styles.title}>7. 전구, 형광등</Text>
                <Text style={styles.content}>- 깨지지 않도록 하여 전용 수거함으로 , 없을 경우 주민센터에 문의</Text>
            </View>
            <View ref={subContainerRefs[7]} style={styles.subContainer}>
                <Text style={styles.title}>8. 과일 / 달걀 껍질</Text>
                <Text style={styles.content}>- 파인애플처럼 단단한 껍질과 핵과류 씨앗은 일반 쓰레기로 배출</Text>
                <Text style={styles.content}>- 수박과 멜론처럼 수분이 많은 껍질은 음식물쓰레기로 배출</Text>
                <Text style={styles.content}> -석회질이 많은 달걀껍질은 일반쓰레기로 배출</Text>
            </View>
            <View ref={subContainerRefs[8]} style={styles.subContainer}>
                <Text style={styles.title}>9. 유리병</Text>
                <Text style={styles.content}>- 이물질 없이 유리병 안의 내용물 모두 비우기</Text>
                <Text style={styles.content}>- 보증금 환불 문구 확인 후 뚜껑과 라벨은 따로 배출</Text>
                <Text style={styles.content}>- 가까운 소매점에 반환하여 빈용기보증금 받기</Text>
            </View>
            <View ref={subContainerRefs[9]} style={styles.subContainer}>
                <Text style={styles.title}>9-1. 깨진 유리병</Text>
                <Text style={styles.content}>- 특수폐기물로 분류</Text>
                <Text style={styles.content}>- 특수 규격 마대에 넣어서 배출</Text>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    subContainer: {
        padding: 20,
        width: '80%',
        alignSelf: 'center',
        backgroundColor: '#EDF3FF',
        marginBottom: 30,
        borderRadius: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '90%',
        alignSelf: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontFamily: 'Pretendard-Bold',
        marginStart: 10,
        marginBottom: 20,
    },
    content: {
        fontSize: 16,
        fontFamily: 'Pretendard-Regular',
        marginStart: 20,
    },
})