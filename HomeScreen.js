import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';
import { ScrollView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

function CircleIcon({ children, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.circle}>
        {children}
      </View>
    </TouchableOpacity>
  );
}

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      find: '',
      currentView: 1,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.moveToNextView();
    }, 5000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  moveToNextView() {
    const { currentView } = this.state;
    const maxViews = 4;
    this.setState({
      currentView: (currentView % maxViews) + 1,
    });
  }

  handleSearchPress() {
    const { navigation } = this.props;
    navigation.navigate('검색 페이지');
  }

  goToNotificationScreen() {
    const { navigation } = this.props;
    navigation.navigate('Notification');
  }

  handlePaper() {
    const { navigation } = this.props;
    navigation.navigate('종이팩');
  }

  handleGlass() {
    const { navigation } = this.props;
    navigation.navigate('유리병');
  }

  render() {
    const { currentView } = this.state;

    const getViewContent = () => {
      switch (currentView) {
        case 1:
          return (
            <View style={styles.iconContainer}>
              <Text style={styles.text}>첫 번째 뷰</Text>
            </View>
          );
        case 2:
          return (
            <View style={styles.iconContainer}>
              <Text style={styles.text}>두 번째 뷰</Text>
            </View>
          );
        case 3:
          return (
            <View style={styles.iconContainer}>
              <Text style={styles.text}>세 번째 뷰</Text>
            </View>
          );
        case 4:
          return (
            <View style={styles.iconContainer}>
              <Text style={styles.text}>네 번째 뷰</Text>
            </View>
          );
        default:
          return null;
      }
    };

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ padding: 0 }} // props 설정해줘야 함, 0 이어도 지우지 않기 , , 
      >
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <TouchableOpacity onPress={() => this.goToNotificationScreen()}>
              <Icon name="notifications" style={styles.icon1} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleSearchPress()}>
              <View style={styles.searchContainer}>
                <Text style={styles.searchText}>분리수거 사업을 진행하는 지역들을 검색해봐요! </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.iconContainer}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 25, padding: 5 }}>분리수거 방법 제대로 알기!</Text>
            <View style={styles.iconRow}>
              <View style={styles.iconWithText}>
                <CircleIcon onPress={() => this.handlePaper()}>
                  <Icon2 name="paper-roll-outline" style={styles.icon2} />
                </CircleIcon>
                <Text style={styles.iconText}>종이팩</Text>
              </View>
              <View style={styles.iconWithText}>
                <CircleIcon onPress={() => this.handleGlass()}>
                  <Icon2 name="glass-pint-outline" style={styles.icon2} />
                </CircleIcon>
                <Text style={styles.iconText}>유리병</Text>
              </View>
              <View style={styles.iconWithText}>
                <CircleIcon onPress={() => this.handlePaper()}>
                  <Icon name="local-drink" style={styles.icon2} />
                </CircleIcon>
                <Text style={styles.iconText}>금속캔</Text>
              </View>
              <View style={styles.iconWithText}>
                <CircleIcon onPress={() => this.handlePaper()}>
                  <Icon name="dangerous" style={styles.icon2} />
                </CircleIcon>
                <Text style={styles.iconText}>합성수지류</Text>
              </View>
              <View style={styles.iconWithText}>
                <CircleIcon onPress={() => this.handlePaper()}>
                  <Icon name="menu-book" style={styles.icon2} />
                </CircleIcon>
                <Text style={styles.iconText}>종이류{"\n"}(고지류)</Text>
              </View>
            </View>
            <View style={styles.iconRow}>
              <View style={styles.iconWithText}>
                <CircleIcon onPress={() => this.handlePaper()}>
                  <Icon name="restore-from-trash" style={styles.icon2} />
                </CircleIcon>
                <Text style={styles.iconText}>고철류</Text>
              </View>
              <View style={styles.iconWithText}>
                <CircleIcon onPress={() => this.handlePaper()}>
                  <Icon2 name="tshirt-crew-outline" style={styles.icon2} />
                </CircleIcon>
                <Text style={styles.iconText}>의류 및{"\n"}원단류</Text>
              </View>
              <View style={styles.iconWithText}>
                <CircleIcon onPress={() => this.handlePaper()}>
                  <Icon name="battery-alert" style={styles.icon2} />
                </CircleIcon>
                <Text style={styles.iconText}>폐전지류</Text>
              </View>
              <View style={styles.iconWithText}>
                <CircleIcon onPress={() => this.handlePaper()}>
                  <Icon name="highlight" style={styles.icon2} />
                </CircleIcon>
                <Text style={styles.iconText}>폐형광등{"\n"}폐LED등</Text>
              </View>
              <View style={styles.iconWithText}>
                <CircleIcon onPress={() => this.handlePaper()}>
                  <Icon2 name="oil" style={styles.icon2} />
                </CircleIcon>
                <Text style={styles.iconText}>식용유</Text>
              </View>
            </View>
          </View>

          {/* <View style=
          <View style={[styles.shadowContainer,{flexDirection: 'row',}]}>

          </View> */}

          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 50, marginBottom: 10 }}>꿀팁 알아가기!</Text>
          <View style={styles.container2}>
            <Swiper style={styles.wrapper} height={200} horizontal={false} autoplay loop spaceBetween={20}>
              <View style={styles.slide1}>
                <Text style={styles.text}>꿀팁 1</Text>
              </View>
              <View style={styles.slide2}>
                <Text style={styles.text}>꿀팁 2</Text>
              </View>
              <View style={styles.slide3}>
                <Text style={styles.text}>꿀팁 3</Text>
              </View>
            </Swiper>
          </View>

          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 50, }}>복지 소식 알고 있어?</Text>
          <View style={[styles.iconContainer, { width: '90%' }]}></View>
          <View style={[styles.iconContainer, { width: '90%' }]}></View>
          <View style={[styles.iconContainer, { width: '90%' }]}></View>
          <View style={[styles.iconContainer, { width: '90%' }]}></View>
          <View style={[styles.iconContainer, { width: '90%' }]}></View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  container2: {
    flex: 1,
  },
  shadowContainer: {
    width: '40%',
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
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
  },
  wrapper: {

  },
  calendar: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#EDF3FF',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEFFED',
    borderRadius: 10,
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDF3FF',
    borderRadius: 10,
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFEDF2',
    borderRadius: 10,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchContainer: {
    flex: 1,
    borderColor: '#3E6B39',
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    marginLeft: 8,
  },
  icon1: {
    fontSize: 30,
    color: '#628F5D',
  },
  icon2: {
    fontSize: 35,
    color: '#628F5D',
  },
  iconContainer: {
    marginTop: 16,
    backgroundColor: '#F2FFED',
    padding: 8,
    borderRadius: 10,
    width: '100%',
    height: 280,
    alignSelf: 'center',
  },
  iconContainer2: {
    backgroundColor: '#F2FFED',
    padding: 8,
    borderRadius: 30,
    width: 200,
    height: 300,
    marginRight: 20,
    alignSelf: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    marginBottom: 4,
    justifyContent: 'space-around',
  },
  iconWithText: {
    alignItems: 'center',
  },
  iconText: {
    marginTop: 5,
    marginBottom: 15,
    fontFamily: 'Giants-Regular',
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchText: {
    color: '#BDBDBD',
  },
});

export default HomeScreen;
