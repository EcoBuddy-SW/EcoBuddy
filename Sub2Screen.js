import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function Sub2Screen() {
    const [selectedText, setSelectedText] = useState("주요내용");

    // 본문 토글 함수
    const toggleContent = (text) => {
        if (selectedText === text) {
            setSelectedText(null); // 이미 선택된 텍스트를 다시 누르면 본문을 숨깁니다.
        } else {
            setSelectedText(text); // 새로운 텍스트를 선택하면 해당 본문을 표시합니다.
        }
    };

    const handleBtn = () => {
        // 웹사이트 URL을 여기에 넣으세요.
        const url = "https://enhuf.molit.go.kr/";
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.text, { marginTop: 30, alignSelf: 'center', justifyContent: 'center' }]}>
                저소득, 무주택자에 대해 주택 구입자금 대출이자율을{"\n"}
                추가 감면하여 주택 마련 부담을 완화하고{"\n"}
                내 집 마련 지원을 통해 주거생활의 안정을 도모{"\n"}

            </Text>

            <View style={{ marginBottom: 30 }}></View>
            <View style={[styles.rowContainer, { justifyContent: 'space-between' }]}>
                <TouchableOpacity onPress={() => toggleContent("주요내용")}>
                    <Text style={selectedText === "주요내용" ? styles.selectedText : styles.notSelectedText}>주요내용</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleContent("지원대상")}>
                    <Text style={selectedText === "지원대상" ? styles.selectedText : styles.notSelectedText}>지원대상</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleContent("지원내용")}>
                    <Text style={selectedText === "지원내용" ? styles.selectedText : styles.notSelectedText}>지원내용</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleContent("신청방법")}>
                    <Text style={selectedText === "신청방법" ? styles.selectedText : styles.notSelectedText}>신청방법</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleContent("접수/문의")}>
                    <Text style={selectedText === "접수/문의" ? styles.selectedText : styles.notSelectedText}>접수/문의</Text>
                </TouchableOpacity>
            </View>

            {/* 본문을 버튼 아래에 배치 */}
            {selectedText === "주요내용" && (
                <>
                    <View style={[styles.line, { marginTop: 10 }]}></View>
                    <ScrollView style={{ flex: 1, padding: 20 }}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}>신청 기간</Text>
                            <Text style={styles.content}>접수기관 별 상이</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}>전화 문의</Text>
                            <Text style={styles.content}>국토교통부 (1599-0001),{"\n"} 주택도시보증공사 (1566-9009),{"\n"}
                                한국주택금융공사 (1688-8114),{"\n"} 우리은행 (1599-0800), {"\n"}
                                민은행 (1599-1771),{"\n"}기업은행 (1566-2566),{"\n"}
                                농협은행 (1588-2100),{"\n"}신한은행 (1599-8000)</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}>신청 방법</Text>
                            <Text style={styles.content}>한국주택금융공사 및 기금e든든 웹사이트 신청 {"\n"}
                                또는 수탁은행(우리, 국민, 기업, 농협, 신한) {"\n"} 방문 신청</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}>접수 기관</Text>
                            <Text style={styles.content}>국토교통부, 주택도시보증공사,{"\n"}
                                한국주택금융공사, 주택도시기금 수탁은행</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}>지원 형태</Text>
                            <Text style={styles.content}>현금(융자)</Text>
                        </View>
                    </ScrollView>
                </>
            )}
            {selectedText === "지원대상" && (
                <>
                    <View style={[styles.line, { marginTop: 10 }]}></View>
                    <ScrollView style={{ flex: 1, padding: 20 }}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}> 🙍‍♀️🙍‍♂️</Text>
                            <Text style={styles.content}>연소득(부부합산) 6천만 원 이하인 자{"\n"}
                                (단, 생애 최초 주택구입자는 연소득(부부합산){"\n"}
                                7천만 원 이하인 자)로서, {"\n"}
                                만 19세 이상 무주택자로서 전용면적 85㎡ 이하{"\n"}
                                (단, 수도권 제외, 읍·면 지역은 100㎡ 이하){"\n"}
                                평가액 5억 원 이하 주택을 구입하는 경우
                                {"\n"}{"\n"}
                                (선발형) 요건심사형 중 취업경험 요건을{"\n"}
                                충족하지 못한 분( 18~34세 청년은 중위소득{"\n"}
                                120% 이하, 재산 5억원 이하, 취업경험 무관)</Text>
                        </View>
                    </ScrollView>
                </>
            )}
            {selectedText === "지원내용" && (
                <>
                    <View style={[styles.line, { marginTop: 10 }]}></View>
                    <ScrollView style={{ flex: 1, padding: 20 }}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}> 대출한도 </Text>
                            <Text style={styles.content}>호당 2.5억 원 이내
                            </Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}>대출금리 </Text>
                            <Text style={styles.content}> 연 2.15% ~ 3.00%(소득과 만기에 따라 차등)</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}>금리우대 </Text>
                            <Text style={styles.content}> - 다자녀 가구 0.7%p, 2자녀 가구 0.5%p,{"\n"}
                                1자녀 가구 0.3%p, 연소득 6천만 원 이하  {"\n"}한부모 가구 0.5%p,
                                다문화 가구, 장애인 가구,{"\n"} 생애 최초 주택구입자,{"\n"}
                                , 신혼 가구(결혼예정자 포함){"\n"} 각각 0.2%p 금리우대
                                (우대금리 중 택1,{"\n"}중복적용 불가하나 다자녀 가구 0.7%p, {"\n"}
                                2자녀 가구 0.5%p, 1자녀 가구 0.3%p는 상기 타{"\n"}
                                우대금리와 중복적용 가능)
                                {"\n"}{"\n"}

                                - 본인 또는 배우자 명의의 청약(종합){"\n"}저축 가입 중인 경우 금리우대{"\n"}
                                가입기간 1년 이상(3년 이상)이고 12회차(36회차){"\n"}
                                이상 납입한 경우 0.1% p(0.2%p){"\n"}(타 우대금리와 중복 적용 가능)
                                {"\n"}{"\n"}

                                - 국토교통부 전자계약시스템 활용{"\n"}매매계약 체결시{"\n"}
                                0.1%p 우대{"\n"}(2023.12.31 신규 접수분까지 한시적 운영)
                                {"\n"}{"\n"}


                                - 청약저축, 부동산 전자계약 우대금리는{"\n"}
                                타 우대금리와 중복 적용 가능
                                {"\n"}{"\n"}

                                - 우대금리 적용결과 최종 대출금리가{"\n"}
                                1.5%p 미만인 경우에는 1.5%p 적용
                                {"\n"}{"\n"}

                                - 생애 최초 주택구입 연소득 7천이하{"\n"}
                                신혼가구 최대 0.3%p 추가인하(하한선 연1.2%){"\n"}

                            </Text>
                        </View>
                    </ScrollView>
                </>
            )}
            {selectedText === "신청방법" && (
                <>
                    <View style={[styles.line, { marginTop: 10 }]}></View>
                    <ScrollView style={{ flex: 1, padding: 20 }}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}> 신청기간</Text>
                            <Text style={styles.content}>접수기관 별 상이</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}>신청방법</Text>
                            <Text style={styles.content}>한국주택금융공사 및 기금e든든 웹사이트 신청
                                {"\n"}또는 수탁은행(우리, 국민, 기업, 농협, 신한){"\n"}방문 신청</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}>제출서류</Text>
                            <Text style={styles.content}>소득 및 재직 증빙 서류, 개인 정보 제공동의서 등
                            </Text>
                        </View>
                    </ScrollView>
                </>
            )}
            {selectedText === "접수/문의" && (
                <>
                    <View style={[styles.line, { marginTop: 10 }]}></View>
                    <ScrollView style={{ flex: 1, padding: 20 }}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}>접수기관</Text>
                            <Text style={styles.content}>국토교통부, 주택도시보증공사, {"\n"}한국주택금융공사, 주택도시기금 수탁은행</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}>문의처</Text>
                            <Text style={styles.content}>국토교통부 (☎1599-0001){"\n"}
                                주택도시보증공사 (☎1566-9009){"\n"}
                                한국주택금융공사 (☎1688-8114){"\n"}
                                우리은행 (☎1599-0800){"\n"}
                                국민은행 (☎1599-1771){"\n"}
                                기업은행 (☎1566-2566) {"\n"}
                                농협은행 (☎1588-2100){"\n"}
                                신한은행 (☎1599-8000){"\n"}
                            </Text>
                        </View>
                    </ScrollView>
                </>
            )}

            {/* 이제 버튼을 추가합니다. */}
            <TouchableOpacity onPress={handleBtn} style={{ marginBottom: 40 }}>
                <View style={[styles.shadowContainer, { borderWidth: 1, borderColor: 'black', height: 50 }]}>
                    <Text style={{ fontFamily: 'Pretendard-Bold', textAlign: 'center' }}>해당 사이트로 이동</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    textBold: {
        fontSize: 20,
        fontFamily: 'Pretendard-Bold',
        justifyContent: 'center',
    },
    text: {
        fontSize: 13,
        fontFamily: 'Pretendard-Regular',
        textAlign: 'center'
    },
    grayText: {
        fontSize: 15,
        fontFamily: 'Pretendard-Regular',
        color: 'lightgray',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        padding: 20,
    },
    shadowContainer: {
        width: '90%',
        height: 70,
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
    selectedText: {
        fontSize: 18,
        fontFamily: 'Pretendard-Bold',
    },
    notSelectedText: {
        fontSize: 18,
        fontFamily: 'Pretendard-Bold',
        color: '#B5B5B5',
    },
    line: {
        borderBottomWidth: 1,  // 선의 두께
        borderBottomColor: '#B5B5B5',  // 선의 색상
        width: '100%',
    },
    title: {
        width: '20%',
        fontSize: 16,
        fontFamily: 'Pretendard-Bold',
        marginRight: 5,
        alignSelf: 'flex-start', // 상단으로 변경
        justifyContent: 'center',
    },
    content: {
        fontSize: 14,
        fontFamily: 'Pretendard-Regular',
        textAlign: 'left', // 왼쪽 정렬 추가
    }
})
