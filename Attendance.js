import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import Modal from 'react-native-modal';
import { Calendar } from 'react-native-calendars';
import { ScrollView } from 'react-native-gesture-handler';

const AttendanceScreen = () => {
    const [attendance, setAttendance] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [markedDates, setMarkedDates] = useState({});
    const today = '2023-10-13'; // 임의로 날짜 넣음!
    const [modalMessage, setModalMessage] = useState(''); // 모달에 표시될 메시지
    // const [points, setPoints] = useState(0); // 유저의 포인트

    useEffect(() => {
        // 사용자의 포인트를 서버에서 가져오는 코드 
        // 포인트를 가져오기 위한 API를 호출하고 가져온 포인트를 setPoints로 설정
        // 이 부분은 백엔드와의 통신이 필요
        fetchUserPoints();
    }, []);

    // 포인트를 가져오는 함수 (백엔드 API를 호출하도록 설정 필요)
    const fetchUserPoints = async () => {
        try {
            // 서버로 요청을 보내어 사용자의 포인트를 가져옵니다.
            const response = await fetch('서버의_포인트_조회_API_URL');
            const data = await response.json();
            setPoints(data.points); // 가져온 포인트를 상태에 저장
        } catch (error) {
            console.error('포인트를 가져오는 동안 오류 발생: ', error);
        }
    };


    const handleAttendance = () => {
        if (attendance) {
            // 이미 출석한 경우, 알림 창 표시
            setModalMessage('출석이 이미 완료되었습니다.');
        } else {
            // 출석 처리
            setAttendance(true);

            // // 포인트 증가
            // const updatedPoints = points + 1;
            // setPoints(updatedPoints);


            // 달력에 출석 완료 날짜를 표시
            const updatedMarkedDates = {
                ...markedDates,
                [today]: { marked: true, dotColor: 'green' },
            };
            setMarkedDates(updatedMarkedDates);

            // 알림 창에 출석 완료 메시지 설정
            setModalMessage('출석이 완료되었습니다. \n마이페이지 → 포인트에서 포인트 점수를 확인하세요.');
            // await updatePointsOnServer(updatedPoints);
        }

        // 알림 창을 엽니다.
        setModalVisible(true);
    };

    // 서버에 포인트 업데이트 요청을 보내는 함수 (백엔드 API 호출 필요)
    const updatePointsOnServer = async (updatedPoints) => {
        try {
            // 서버로 포인트 업데이트 요청을 보냅니다.
            await fetch('서버의_포인트_업데이트_API_URL', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ points: updatedPoints }),
            });
        } catch (error) {
            console.error('포인트 업데이트 중 오류 발생: ', error);
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('./assets/images/63965-removebg-preview.png')}
                style={{ width: '100%', alignItems: 'center' }}
            >
                <View style={{ marginTop: 50 }}></View>
                <Text style={styles.title}>출석 이벤트 진행!</Text>
                <View style={{ marginBottom: 50 }}></View>
                <Text style={styles.text}>포인트 쌓고 마이페이지 → 상점에서 {"\n"}모바일 쿠폰으로 교환하세요</Text>
                <View style={{ marginBottom: 50 }}></View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.sub}>
                        <Text style={[styles.title, { fontSize: 15 }]}>이벤트 기간</Text>
                    </View>
                    <Text style={[styles.text, { marginLeft: 10 }]}>~ 2024.01.01 까지</Text>
                </View>
            </ImageBackground>
            <Calendar
                style={{ width: '100%' }}
                markedDates={markedDates}
                theme={{ selectedDayBackgroundColor: 'green' }}
                calendarStyle={{ arrowColor: 'green' }}
            />
            <View style={{ marginBottom: 50 }}></View>
            <View style={styles.shadowContainer}>
                <Button title="출석" onPress={handleAttendance} />
            </View>

            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>
                        {modalMessage}
                    </Text>
                    <Button title="닫기" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    calendar: {
        marginTop: 20,
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontFamily: 'Pretendard-Bold',
    },
    text: {
        fontSize: 15,
        fontFamily: 'Pretendard-Regular',
        alignContent: 'center',
        textAlign: 'center',
    },
    sub: {
        width: 100,
        height: 30,
        borderRadius: 20,
        backgroundColor: '#F2FFED',
        justifyContent: 'center',
        alignItems: 'center',
    },
    shadowContainer: {
        width: '40%',
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#F2FFED',
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
});

export default AttendanceScreen;
