import { Calendar } from "react-native-calendars";
import { ScrollView } from 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';


function Calendar() {
    return (
        <Calendar style={styles.calendar} />
    );
}

function CalendarView() {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ padding: 0 }} // props 설정해줘야 함, 0 이어도 지우지 않기 , , 
        >

            <View style={{ marginTop: 50, }}>
                {/* 함수를 호출하지 않고 JSX로 렌더링 */}
                <Calendar
                //  markedDates={markedDates}
                    theme={{ selectedDayBackgroundColor: 'green' }}
                    calendarStyle={{ arrowColor: 'green' }}
                />
            </View>
        </ScrollView>
    );
}

export default CalendarView;

