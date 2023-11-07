import React, { } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from "react-native-gifted-charts";

const screenWidth = Dimensions.get("window").width;

export default function StatistcsScreen() {
    const data = [
        { value: 10, label: '비닐', dataPointText: '10' },
        { value: 20, label: '금속캔', dataPointText: '20' },
        { value: 18, label: '종이', dataPointText: '18' },
        { value: 40, label: '페트병', dataPointText: '40' },
        { value: 36, label: '유리병', dataPointText: '28' },
        { value: 54, label: '건전지', dataPointText: '54' },
        { value: 85, label: '형광등', dataPointText: '85' },
    ];


    const maxData = Math.max(...data.map(item => item.value));
    const minData = Math.min(...data.map(item => item.value));

    const today = new Date();
    const formattedDate = today.toLocaleDateString();

    return (
        <View style={styles.container}>
            <View style={{ margin: 20 }}>
                <Text style={styles.dateText}>{formattedDate}</Text>
            </View>
            <View style={styles.chartContainer}>
                <LineChart
                    width={screenWidth}
                    height={400}
                    areaChart
                    //hideDataPoints
                    startIndex={0}
                    isAnimated
                    animationDuration={1200}
                    startFillColor="#C7D3ED"
                    startOpacity={1}
                    endOpacity={0.3}
                    initialSpacing={20} // 초기 간격
                    endSpacing={20} // 끝 간격, , 안 먹힘 ㅠ
                    data={data}
                    // spacing={70}
                    adjustToWidth={true}
                    textColor1='#000'
                    textShiftY={-8}
                    textShiftX={-10}
                    textSize={16}
                    textFontSize={14} // dataPointText 크기 조절
                    thickness={5}
                    hideRules
                    hideYAxisText
                    yAxisColor="#C7D3ED"
                    showVerticalLines
                    verticalLinesColor="rgba(199, 211, 237, 0.5)"
                    xAxisColor="#C7D3ED"
                    color="#C7D3ED"
                    dataPointsColor="#C7D3ED"
                />
            </View>

            {/* 간격 */}
            <View style={{ marginBottom: 30 }}></View>

            <View style={styles.rowContainer}>
                <View style={styles.shadowContainer}>
                    <Text style={[styles.chartDataText, { fontSize: 14, marginBottom: 5 }]}>최대</Text>
                    <Text style={[styles.dateText, { marginBottom: 5 }]}>{data.find(item => item.value === maxData).label}</Text>
                    <Text style={styles.chartDataText}>[{maxData}]</Text>
                </View>
                <View style={styles.shadowContainer}>
                    <Text style={[styles.chartDataText, { fontSize: 14, marginBottom: 5 }]}>최대</Text>
                    <Text style={[styles.dateText, { marginBottom: 5, }]}>{data.find(item => item.value === minData).label}</Text>
                    <Text style={styles.chartDataText}>[{minData}]</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    chartContainer: {
        alignSelf: 'center',
        width: screenWidth,
        alignItems: 'center',
        position: 'relative',
        padding: 20,
    },
    dateText: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 20,
        alignSelf: 'center',
        color: '#8C8C8C',
    },
    shadowContainer: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000', // 그림자 색상 (ios에서 그림자 효과 제공)
        shadowOffset: {
            width: 0,          // 그림자의 수평 위치
            height: 2,         // 그림자의 수직 위치
        },
        shadowOpacity: 0.2, // 그림자의 투명도
        shadowRadius: 2.0,  // 그림자의 반경
        elevation: 3,        // Android에서 그림자 효과를 제공합니다
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 30,
    },
    chartDataText: {
        fontSize: 18,
        fontFamily: 'Pretendard-Regular',
        color: 'black',
        alignSelf: 'center',
        justifyContent: 'center',
    },
});
