import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Calendar } from 'react-native-calendars';

const AttendanceScreen = () => {
    const [attendance, setAttendance] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [markedDates, setMarkedDates] = useState({});
    const today = '2023-10-12'; // 임의로 날짜 넣음!
    const [modalMessage, setModalMessage] = useState(''); // 모달에 표시될 메시지
    // const [points, setPoints] = useState(0); // 유저의 포인트

    const handleAttendance = () => {
        if (attendance) {
            // 이미 출석한 경우, 알림 창 표시
            setModalMessage('출석이 이미 완료되었습니다.');
        } else {
            // 출석 처리
            setAttendance(true);

            // 달력에 출석 완료 날짜를 표시
            const updatedMarkedDates = {
                ...markedDates,
                [today]: { marked: true, dotColor: 'green' },
            };
            setMarkedDates(updatedMarkedDates);

            // 알림 창에 출석 완료 메시지 설정
            setModalMessage('출석이 완료되었습니다. \n마이페이지 → 포인트에서 포인트 점수를 확인하세요.');
            // 포인트 증가
            //  setPoints(points + 1);
        }

        // 알림 창을 엽니다.
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>출석 이벤트 진행!</Text>
            <View style={{marginBottom : 30}}></View>
            <Text style={styles.text}>포인트 쌓고 마이페이지 → 상점에서 {"\n"}모바일 쿠폰으로 교환하세요</Text>
            <Calendar style={styles.calendar} markedDates={markedDates} theme={{
                selectedDayBackgroundColor: 'green', // 선택된 날짜의 배경색
                arrowColor: 'green', // 화살표 아이콘의 색상
            }}
            />
            <Button title="출석" onPress={handleAttendance} />

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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    calendar: {
        width:'95%',
        marginTop: 20,
    },
    messageContainer: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    message: {
        fontSize: 18,
        marginBottom: 10,
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
    },
});

export default AttendanceScreen;
