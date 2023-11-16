import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from "react-native-gifted-charts";
import LocationContext from './LocationContext';
import axios from 'axios';

const screenWidth = Dimensions.get("window").width;
const chartHeight = 400; // 수정: height 값을 상수로 설정

export default function StatistcsScreen() {
    const context = useContext(LocationContext);
    const userId = context.userId;
    const [data, setData] = useState(null); // 수정: 초기 상태를 null로 설정

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.post(`http://${context.ip}:3003/getData`, { userId });
            setData(response.data);
        } catch (error) {
            console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
        }
    };

    const maxData = data ? Math.max(...data.map(item => item.value)) : 0; // 수정: data가 존재할 때만 최대값 계산
    const minData = data ? Math.min(...data.map(item => item.value)) : 0; // 수정: data가 존재할 때만 최소값 계산

    const today = new Date();
    const formattedDate = today.toLocaleDateString();

    return (
        <View style={styles.container}>
            <View style={{ margin: 20 }}>
                <Text style={styles.dateText}>{formattedDate}</Text>
            </View>
            <View style={styles.chartContainer}>
                {data && (
                    <LineChart
                        width={screenWidth}
                        height={chartHeight}
                        areaChart
                        startIndex={0}
                        isAnimated
                        animationDuration={1200}
                        startFillColor="#C7D3ED"
                        startOpacity={1}
                        endOpacity={0.3}
                        initialSpacing={20}
                        endSpacing={20}
                        spacing={110}
                        data={data}
                        adjustToWidth={true}
                        textColor1='#000'
                        textShiftY={-8}
                        textShiftX={-10}
                        textSize={16}
                        textFontSize={14}
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
                )}
            </View>

            <View style={{ marginBottom: 30 }}></View>

            <View style={styles.rowContainer}>
                <View style={styles.shadowContainer}>
                    <Text style={[styles.chartDataText, { fontSize: 14, marginBottom: 5 }]}>최대</Text>
                    <Text style={[styles.dateText, { marginBottom: 5 }]}>{data && data.find(item => item.value === maxData)?.label || '쓰레기'}</Text>
                    <Text style={styles.chartDataText}>[{maxData}]</Text>
                </View>
                <View style={styles.shadowContainer}>
                    <Text style={[styles.chartDataText, { fontSize: 14, marginBottom: 5 }]}>최소</Text>
                    <Text style={[styles.dateText, { marginBottom: 5, }]}>{data && data.find(item => item.value === minData)?.label || '쓰레기'}</Text>
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
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.0,
        elevation: 3,
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
