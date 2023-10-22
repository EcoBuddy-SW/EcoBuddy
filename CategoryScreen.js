import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function CategoryScreen() {
    const [isRegionSelected, setIsRegionSelected] = useState([false, false, false, false]);
    const [isThisYearSelected, setIsThisYearSelected] = useState([false, false, false]);
    const [isCategorySelected, setIsCategorySelected] = useState([false, false, false, false]);

    const regionTexts = ['지역1', '지역2', '지역3', '지역4'];
    const thisYearTexts = ['올해까지', '내년까지', '시행 예정'];
    const categoryTexts = ['카테고리', '카테고리', '카테고리', '카테고리'];

    const handleRegionPress = (index) => {
        const updatedSelection = [...isRegionSelected];
        updatedSelection[index] = !updatedSelection[index];
        setIsRegionSelected(updatedSelection);
    };

    const handleThisYearPress = (index) => {
        const updatedSelection = [...isThisYearSelected];
        updatedSelection[index] = !updatedSelection[index];
        setIsThisYearSelected(updatedSelection);
    };

    const handleCategoryPress = (index) => {
        const updatedSelection = [...isCategorySelected];
        updatedSelection[index] = !updatedSelection[index];
        setIsCategorySelected(updatedSelection);
    };

    const navigation = useNavigation();

    const isAnyCategorySelected = isRegionSelected.some((selected) => selected);
    const isAnyCategorySelected2 = isThisYearSelected.some((selected) => selected);
    const isAnyCategorySelected3 = isCategorySelected.some((selected) => selected);

    const handleResult = () => {
        if (isAnyCategorySelected || isAnyCategorySelected2 || isAnyCategorySelected3) {
            navigation.navigate('카테고리 선택 결과', {
                isAnyCategorySelected: isRegionSelected.some((selected) => selected),
                isAnyCategorySelected2: isThisYearSelected.some((selected) => selected),
                isAnyCategorySelected3: isCategorySelected.some((selected) => selected),
              });
        } else {
            Alert.alert('알림', '선택된 카테고리가 없습니다.');
        }
    };

    return (
        <View style={styles.background}>
            <Text style={[styles.text, { alignSelf: 'center', marginTop: 30, marginBottom: 30 }]}>1개 이상 카테고리를 선택해 주세요</Text>
            <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-around', marginStart: 20, marginEnd: 20, marginBottom: 20 }}>
                {isRegionSelected.map((selected, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleRegionPress(index)}
                        style={selected ? styles.selectedContainer : styles.notSelectedContainer}
                    >
                        <Text>{regionTexts[index]}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-around', marginStart: 20, marginEnd: 20, marginBottom: 20 }}>
                {isThisYearSelected.map((selected, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleThisYearPress(index)}
                        style={selected ? styles.selectedContainer2 : styles.notSelectedContainer2}
                    >
                        <Text>{thisYearTexts[index]}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-around', marginStart: 20, marginEnd: 20, marginBottom: 40 }}>
                {isCategorySelected.map((selected, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleCategoryPress(index)}
                        style={selected ? styles.selectedContainer : styles.notSelectedContainer}
                    >
                        <Text>{categoryTexts[index]}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.shadowContainer} onPress={handleResult}>
                <Text style={[styles.text, { fontFamily: 'Pretendard-Bold' }]}>선택 완료</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    notSelectedContainer: {
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 10,
        width: '20%',
        borderWidth: 1,
        borderColor: 'lightgray',
        alignItems: 'center',
    },
    selectedContainer: {
        backgroundColor: '#EDF3FF',
        padding: 8,
        borderRadius: 10,
        width: '20%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    notSelectedContainer2: {
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 10,
        width: '30%',
        borderWidth: 1,
        borderColor: 'lightgray',
        alignItems: 'center',
    },
    selectedContainer2: {
        backgroundColor: '#EDF3FF',
        padding: 8,
        borderRadius: 10,
        width: '30%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    shadowContainer: {
        width: '90%',
        height: 50,
        backgroundColor: '#F2FFED',
        borderWidth: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
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
    text: {
        fontFamily: 'Pretendard-Regular',
    },
});
