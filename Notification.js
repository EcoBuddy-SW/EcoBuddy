import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

export default function NotificationScreen() {
  return (
    <View style={styles.background}>
      {/* 알림 1개 */}
      <View style={[styles.line, { marginTop: 50 }]}></View>
      <View style={{ padding: 30 }}>
        <View style={{ flexDirection: 'row' }}>
          <Icon2 name="bell-alert-outline" style={styles.icon} />
          <Text style={styles.title}>의왕시에서 공지가 올라왔습니다</Text>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={styles.text}>2023.10.09</Text>
          </View>
        </View>
        <Text style={[styles.text, { marginStart: 30, marginTop: 10 }]}>11월부터 종이팩 교환 사업 시작합니다.</Text>
      </View>
      <View style={[styles.line, {}]}></View>

      <View style={{ padding: 30 }}>
        <View style={{ flexDirection: 'row' }}>
          <Icon2 name="camera-outline" style={styles.icon} />
          <Text style={styles.title}>분리수거 촬영 후 포인트 적립되었습니다</Text>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={styles.text}>2023.10.08</Text>
          </View>
        </View>
        <Text style={[styles.text, { marginStart: 30, marginTop: 10 }]}>감사합니다.</Text>
      </View>
      <View style={[styles.line, {}]}></View>

      <View style={{ padding: 30 }}>
        <View style={{ flexDirection: 'row' }}>
          <Icon2 name="cash" style={styles.icon} />
          <Text style={styles.title}>출석 이벤트 포인트가 적립되었습니다</Text>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={styles.text}>2023.09.11</Text>
          </View>
        </View>
        <Text style={[styles.text, { marginStart: 30, marginTop: 10 }]}>감사합니다.</Text>
      </View>
      <View style={[styles.line, {}]}></View>

    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white',
    // padding: 10,
  },
  line: {
    borderWidth: 0.5,
    borderColor: '#F2F2F2',
  },
  text: {
    fontFamily: 'Pretendard-Regular',
    color:'#737373',
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 15,
    marginStart: 10
  },
  icon: {
    fontSize: 20
  }
});
