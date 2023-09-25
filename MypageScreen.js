import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Foundation';
import Icon1 from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

export default function MypageScreen() {
    const navigation = useNavigation();

    const goToMap = () => {
        navigation.navigate('Map'); // 'Map' 스크린으로 이동
    };
    const goToCoins = () => {
        navigation.navigate('Coins'); // 'Coins' 스크린으로 이동
    };
    const goToRecord = () => {
        navigation.navigate('Record'); // record 스크린으로 이동
    };
    const goToAnnouncements = () => {
        navigation.navigate('Announcements')// Announcements(공지) 스크린으로 이동
    };
    const goToOption = () => {
        navigation.navigate('Option')// 설정으로 이동
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Ionicons name="ios-earth" size={30} color="green" style={{ marginBottom: 10, top: 3 }} />
            <View style={[styles.gridColumn, { backgroundColor: '#FFFFFF', width: 415, height: 100, marginBottom: 20, flexDirection: 'row', alignItems: 'center', margin: 10 }]}>
                <View style={{ backgroundColor: '#333', width: 20, height: 20, marginRight: 10 }}></View>
                <Text style={{ fontSize: 20, color: 'black', left: 35 }}>_________ 님</Text>
                <View style={{ Color: '#333', width: 65, height: 25, left: 100, top: 70, borderColor: '#333', borderWidth: 1, borderRadius: 10 }}>
                    <Text style={{ fontSize: 15, color: 'black', textAlign: 'center', textAlignVertical: 'center', top: 3 }}>내 정보</Text>
                </View>

                <TouchableOpacity onPress={goToMap}>
                    <View style={[styles.gridColumn, { backgroundColor: '#FFFFFF', borderRadius: 10 }]}>
                        <FontAwesome  name="map-marker" size={30} color="#333" />
                        <Text style={styles.gridText}>분리수거장 위치</Text>
                    </View>
                </TouchableOpacity>



                <TouchableOpacity onPress={goToCoins}>
                    <View style={[styles.gridColumn, { backgroundColor: '#FFFFFF', borderRadius: 10 }]}>
                        <FontAwesome5 name="coins" size={30} color="#333" />
                        <Text style={styles.gridText}>포인트</Text>
                    </View>
                </TouchableOpacity>
            </View>


            <View style={styles.gridRow}>
                <TouchableOpacity onPress={goToRecord}>
                    <View style={[styles.gridColumn, { backgroundColor: '#FFFFFF', borderRadius: 10 }]}>
                        <FontAwesome  name="folder-open" size={30} color="#333" />
                        <Text style={styles.gridText}>활동 기록</Text>
                    </View>
                </TouchableOpacity >

                <TouchableOpacity onPress={goToAnnouncements}>
                    <View style={[styles.gridColumn, { backgroundColor: '#FFFFFF', borderRadius: 10 }]}>
                        <Icon name="sound" size={30} color="#333" />
                        <Text style={styles.gridText}>공지</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.gridRow}>
                <TouchableOpacity onPress={goToOption}>
                    <View style={[styles.gridColumn, { backgroundColor: '#FFFFFF', borderRadius: 10 }]}>
                        <FontAwesome  name="cog" size={30} color="#333" />
                        <Text style={styles.gridText}>설정</Text>
                    </View>
                </TouchableOpacity>


                <View style={[styles.gridColumn, { backgroundColor: '#FFFFFF', borderRadius: 10 }]}>
                    <FontAwesome  name="bell" size={27} color="#333" />
                    <Text style={styles.gridText}>알림</Text>
                </View>
            </View>
            <View style={styles.gridRow}>
                <View style={[styles.gridColumn, { backgroundColor: '#FFFFFF', borderRadius: 10 }]}>
                    <Text style={styles.gridText}>통계</Text>
                </View>
                <View style={[styles.gridColumn, { backgroundColor: '#FFFFFF', borderRadius: 10 }]}>
                    <Icon1 name="language" size={30} color="#333" />
                    <Text style={styles.gridText}>번역</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1, // ScrollView가 화면 전체를 채우도록 합니다.
        backgroundColor: '#EDF3FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gridRow: {
        flexDirection: 'row',
    },
    gridColumn: {
        flex: 1,
        height: 130,
        borderWidth: 0.5,
        margin: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gridText: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
    },
});