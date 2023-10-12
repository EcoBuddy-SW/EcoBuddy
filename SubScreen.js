import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';

export default function SubScreen() {
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
        const url = "https://www.kua.go.kr/uaptm010/selectMain.do";
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.text, { marginTop: 30, alignSelf: 'center', justifyContent: 'center' }]}>
                근로능력과 구직의사가 있음에도 불구하고
                {"\n"}취업에 어려움을 겪고 있는 구직자에게 통합적인{"\n"}
                취업지원 서비스를 제공하고 생계를{"\n"}
                지원함으로써 구직활동 및 생계안정 도모
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
                    <View style={{ flex: 1, padding: 20 }}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}>신청 기간</Text>
                            <Text style={styles.content}>상시 신청</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}>전화 문의</Text>
                            <Text style={styles.content}>고용노동부 고객상담센터{"\n"}(1350)</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}>신청 방법</Text>
                            <Text style={styles.content}>참여를 희망하는 본인이 직접{"\n"}거주지 관할 고용센터에 방문하거나{"\n"}
                                온라인(www.kua.go.kr)을{"\n"}통해 신청</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}>접수 기관</Text>
                            <Text style={styles.content}>전국 고용센터</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}>지원 형태</Text>
                            <Text style={styles.content}>현금, 기타(상담)</Text>
                        </View>
                    </View>
                </>
            )}
            {selectedText === "지원대상" && (
                <>
                    <View style={[styles.line, { marginTop: 10 }]}></View>
                    <View style={{ flex: 1, padding: 20 }}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}> I유형</Text>
                            <Text style={styles.content}>(요건심사형) 중위소득 60% 이하,{"\n"}
                                재산 4억 이하(18~34세 청년은 재산 5억원 이하){"\n"}
                                이면서, 최근 2년 이내 100일 또는{"\n"}
                                800시간 이상의 취업경험이 있는 분
                                {"\n"}{"\n"}
                                (선발형) 요건심사형 중 취업경험 요건을{"\n"}
                                충족하지 못한 분( 18~34세 청년은 중위소득{"\n"}
                                120% 이하, 재산 5억원 이하, 취업경험 무관)</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}>II유형</Text>
                            <Text style={styles.content}>I유형에 해당하지 않는 가구단위{"\n"}중위소득 100% 이하(청년은 소득 무관)</Text>
                        </View>
                    </View>
                </>
            )}
            {selectedText === "지원내용" && (
                <>
                    <View style={[styles.line, { marginTop: 10 }]}></View>
                    <View style={{ flex: 1, padding: 20 }}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}> 취업취약계층</Text>
                            <Text style={styles.content}>저소득층, 청년, 경력단절여성 등에게{"\n"}
                                에게 취업지원서비스를 제공</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}> 저소득 구직자</Text>
                            <Text style={styles.content}>생계안정을 위한 소득도 결합하여 지원</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}>지원내용</Text>
                            <Text style={styles.content}>취업지원(I,II유형 공통){"\n"}
                                개인별 역량, 의지에 따른 직업훈련, 일경험,{"\n"}
                                복지 프로그램 연계 등 취업지원서비스 제공
                                {"\n"}{"\n"}
                                소득지원(I유형){"\n"}
                                구직촉진수당(월 50만원*6개월) 지원
                                {"\n"}{"\n"}
                                취업활동비용지원(II유형): 훈련참여지원수당 등</Text>
                        </View>
                    </View>
                </>
            )}
            {selectedText === "신청방법" && (
                <>
                    <View style={[styles.line, { marginTop: 10 }]}></View>
                    <View style={{ flex: 1, padding: 20 }}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}> 신청기간</Text>
                            <Text style={styles.content}>상시신청</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}>신청방법</Text>
                            <Text style={styles.content}>참여를 희망하는 본인이 직접 거주지{"\n"}관할 고용센터에
                                방문하거나 {"\n"}온라인(www.kua.go.kr)을 통해 신청</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}>제출서류</Text>
                            <Text style={styles.content}>(필수) 취업지원신청서 및 지원자격 확인을{"\n"}위한 개인정보 수집,
                                이용 및 제공 동의서 {"\n"}방문하거나 온라인(www.kua.go.kr)을 통해 신청{"\n"}(필요시 추가서류){"\n"}
                                - 가구단위 증빙서류: 가족관계증명원,{"\n"} 이혼소송확인서, 실종신고서 등{"\n"}
                                - 특정취약계층 증빙서류: 관련 추천서, 확인서 등{"\n"}
                                - 전산망으로 확인불가 또는 전산망에{"\n"}실시간 연계되지 않은 소득,{"\n"}
                                재산, 취업경험 관련정보: 사업주 확인자료 등{"\n"}관련 증빙자료
                            </Text>
                        </View>
                    </View>
                </>
            )}
            {selectedText === "접수/문의" && (
                <>
                    <View style={[styles.line, { marginTop: 10 }]}></View>
                    <View style={{ flex: 1, padding: 20 }}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}>접수기관</Text>
                            <Text style={styles.content}>전국 고용센터</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}>문의처</Text>
                            <Text style={styles.content}>고용노동부 고객상담센터 (☎1350)</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.title}>홈페이지</Text>
                            <Text style={styles.content}>http://www.kua.go.kr</Text>
                        </View>
                    </View>
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
        marginRight: 20,
        alignSelf: 'flex-start', // 상단으로 변경
        justifyContent: 'center',
    },
    content: {
        fontSize: 14,
        fontFamily: 'Pretendard-Regular',
        textAlign: 'left', // 왼쪽 정렬 추가
    }
})