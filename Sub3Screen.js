import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function Sub3Screen() {
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
        const url = "https://www.gov.kr/portal/rcvfvrSvc/dtlEx/999000000041";
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.text, { marginTop: 30, alignSelf: 'center', justifyContent: 'center' }]}>
                돌봄이 필요한 만 6~12세 아동에게 맞춤형 돌봄 서비스를 제공하여{"\n"}
                돌봄 사각지대를 해소하고 맞벌이 가구의 육아부담 경감{"\n"}
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
                            <Text style={styles.content}>보건복지상담센터 (129),{"\n"} 아동권리보장원 (02-6454-8500){"\n"}
                            </Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}>신청 방법</Text>
                            <Text style={styles.content}>이용을 희망하는 다함께돌봄센터에 {"\n"}
                                전화, 온라인* 등으로 신청{"\n"}* 정부24 온종일돌봄 원스톱 서비스{"\n"}(www.gov.kr)</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}>접수 기관</Text>
                            <Text style={styles.content}>시·군·구청</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}>지원 형태</Text>
                            <Text style={styles.content}>서비스(돌봄)</Text>
                        </View>
                    </ScrollView>
                </>
            )}
            {selectedText === "지원대상" && (
                <>
                    <View style={[styles.line, { marginTop: 10 }]}></View>
                    <ScrollView style={{ flex: 1, padding: 20 }}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}> 👶</Text>
                            <Text style={styles.content}>돌봄이 필요한 만 6~12세 아동(소득수준 무관)
                            </Text>
                        </View>
                    </ScrollView>
                </>
            )}
            {selectedText === "지원내용" && (
                <>
                    <View style={[styles.line, { marginTop: 10 }]}></View>
                    <ScrollView style={{ flex: 1, padding: 20 }}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}> 돌봄</Text>
                            <Text style={styles.content}>정기,일시돌봄,방과후 프로그램 연계 등{"\n"}
                                하원지원, 정보제공 등 다양한 형태의{"\n"}지역 맞춤형 돌봄 서비스를 제공
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
                            <Text style={styles.content}>이용을 희망하는 다함께돌봄센터에 전화,{"\n"} 온라인* 등으로 신청
                                {"\n"}* 정부24 온종일돌봄 원스톱 서비스{"\n"}(www.gov.kr)</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}>제출서류</Text>
                            <Text style={styles.content}>신청서, 기타 지자체장이 대상자 선정을 위해{"\n"}요구하는 증빙자료
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
                            <Text style={styles.title}>문의처</Text>
                            <Text style={styles.content}>보건복지상담센터 (☎129){"\n"}
                            아동권리보장원 (☎02-6454-8500)
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
