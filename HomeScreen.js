import React, { Component, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';
import { ScrollView } from 'react-native-gesture-handler';
// import HomeScreen from './HomeScreen';
import CameraScreen from './CameraScreen';
import MypageScreen from './MypageScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CommunityScreen from './CommunityScreen';
import LocationContext from './LocationContext';
import * as Location from 'expo-location';

const { width } = Dimensions.get('window');


const Tab = createBottomTabNavigator();

function BottomTabNavigationApp() {

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: 'Home' });
  }, [navigation]);

  return (
    <Tab.Navigator
      initialRouteName="Home1" // 앱이 시작될 때 표시할 초기화면 지정
      screenOptions={{
        tabBarActiveTintColor: '#628F5D', // 눌리면 변하는 버튼 색상
        tabBarShowLabel: true,
      }}>
      <Tab.Screen
        name="Home1"
        component={HomeScreen}
        // initialParams={{ navigation }} // navigation을 전달
        options={{
          title: '홈',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          title: '카메라',
          tabBarIcon: ({ color, size }) => (
            <Icon name="camera" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={CommunityScreen}
        options={{
          title: '커뮤니티',
          tabBarIcon: ({ color, size }) => (
            <Icon name="chat" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={MypageScreen}
        options={{
          title: '설정',
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

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

  static contextType = LocationContext;

  constructor(props) {
    super(props);
    this.state = {
      find: '',
      currentView: 1,
      location: null,
    };
  }

  handleBtn2 = () => {
    // 웹사이트 URL을 여기에 넣으세요.
    const url = "https://www.data.go.kr/tcs/dss/selectDataSetList.do?dType=TOTAL&keyword=%ED%8F%90%EC%9D%98%EC%95%BD%ED%92%88+%EC%88%98%EA%B1%B0%ED%95%A8&operator=AND&detailKeyword=&publicDataPk=&recmSe=&detailText=&relatedKeyword=&commaNotInData=&commaAndData=&commaOrData=&must_not=&tabId=&dataSetCoreTf=&coreDataNm=&sort=&relRadio=&orgFullName=&orgFilter=&org=&orgSearch=&currentPage=1&perPage=10&brm=&instt=&svcType=&kwrdArray=&extsn=&coreDataNmArray=&pblonsipScopeCode=";
    Linking.openURL(url);
};

  handleBtn() {
    const { navigation } = this.props;
    navigation.navigate('출석 이벤트');
  }

  handleAttendance() {
    const { navigation } = this.props;
    navigation.navigate('출석 이벤트');
  }

  handleTip2() {
    const { navigation } = this.props;
    navigation.navigate('무상수거 꿀팁');
  }

  handleTip3() {
    const { navigation } = this.props;
    navigation.navigate('자취생용 꿀팁');
  }

  componentDidMount() {
    this.startTimer();
    this.getLocation();
  }

  async getLocation() {

    console.log('getLocation 실행');
    let { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
        //console.error('Permission to access location was denied');
        return;
    }
    
    this.context.setLocstate(status);
    
    let newLocation = await Location.getCurrentPositionAsync({});
      
    // 위치 정보에서 위도와 경도 추출
    const { latitude, longitude } = newLocation.coords;

    // 역지오코딩 실행
    let addresses = await Location.reverseGeocodeAsync({ latitude, longitude });

    if (addresses && addresses.length > 0) {
        console.log(addresses[0]);
        this.setState({ location: addresses[0] });
        this.context.setLocation(addresses[0]); //LocationContext에 위치 값 저장
    }
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
    navigation.navigate('알림창');
  }

  handlePaper() {
    const { navigation } = this.props;
    navigation.navigate('종이팩');
  }

  handlePaper2() {
    const { navigation } = this.props;
    navigation.navigate('종이류(고지류)');
  }

  handleGlass() {
    const { navigation } = this.props;
    navigation.navigate('유리병');
  }

  handleMetalCan() {
    const { navigation } = this.props;
    navigation.navigate('금속캔');
  }

  handleSyntheicResins() {
    const { navigation } = this.props;
    navigation.navigate('합성수지류');
  }

  handleSyntheicResins() {
    const { navigation } = this.props;
    navigation.navigate('종이류(고지류)');
  }

  handleScrapMetal() {
    const { navigation } = this.props;
    navigation.navigate('고철류');
  }

  handleClothing() {
    const { navigation } = this.props;
    navigation.navigate('의류 및 원단류');
  }

  handleClothing() {
    const { navigation } = this.props;
    navigation.navigate('의류 및 원단류');
  }

  handleWasteElectricCurrent() {
    const { navigation } = this.props;
    navigation.navigate('폐건전지류');
  }

  handleLED() {
    const { navigation } = this.props;
    navigation.navigate('폐형광등, 폐LED등');
  }

  handleOil() {
    const { navigation } = this.props;
    navigation.navigate('식용유');
  }

  handleSub1(){
    const { navigation } = this.props;
    navigation.navigate('국민 취업 제도');
  }

  handleSub2() {
    const { navigation } = this.props;
    navigation.navigate('내집마련 디딤돌 대출');
  }

  handleSub3() {
    const { navigation } = this.props;
    navigation.navigate('다함께 돌봄');
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
        <View style={[styles.container, { backgroundColor: 'white' }]}>
          <View style={styles.rowContainer}>
            <TouchableOpacity onPress={() => this.goToNotificationScreen()}>
              <Icon name="notifications" style={styles.icon1} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleSearchPress()}>
              <View style={styles.searchContainer}>
                <Text style={styles.searchText}>궁금한 정보들을 알려드릴게요, 검색해 보세요!         </Text>
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
                <CircleIcon onPress={() => this.handleMetalCan()}>
                  <Icon name="local-drink" style={styles.icon2} />
                </CircleIcon>
                <Text style={styles.iconText}>금속캔</Text>
              </View>
              <View style={styles.iconWithText}>
                <CircleIcon onPress={() => this.handleSyntheicResins()}>
                  <Icon name="dangerous" style={styles.icon2} />
                </CircleIcon>
                <Text style={styles.iconText}>합성수지류</Text>
              </View>
              <View style={styles.iconWithText}>
                <CircleIcon onPress={() => this.handlePaper2()}>
                  <Icon name="menu-book" style={styles.icon2} />
                </CircleIcon>
                <Text style={styles.iconText}>종이류{"\n"}(고지류)</Text>
              </View>
            </View>
            <View style={styles.iconRow}>
              <View style={styles.iconWithText}>
                <CircleIcon onPress={() => this.handleScrapMetal()}>
                  <Icon name="restore-from-trash" style={styles.icon2} />
                </CircleIcon>
                <Text style={styles.iconText}>고철류</Text>
              </View>
              <View style={styles.iconWithText}>
                <CircleIcon onPress={() => this.handleClothing()}>
                  <Icon2 name="tshirt-crew-outline" style={styles.icon2} />
                </CircleIcon>
                <Text style={styles.iconText}>의류 및{"\n"}원단류</Text>
              </View>
              <View style={styles.iconWithText}>
                <CircleIcon onPress={() => this.handleWasteElectricCurrent()}>
                  <Icon name="battery-alert" style={styles.icon2} />
                </CircleIcon>
                <Text style={styles.iconText}>폐전지류</Text>
              </View>
              <View style={styles.iconWithText}>
                <CircleIcon onPress={() => this.handleLED()}>
                  <Icon name="highlight" style={styles.icon2} />
                </CircleIcon>
                <Text style={styles.iconText}>폐형광등{"\n"}폐LED등</Text>
              </View>
              <View style={styles.iconWithText}>
                <CircleIcon onPress={() => this.handleOil()}>
                  <Icon2 name="oil" style={styles.icon2} />
                </CircleIcon>
                <Text style={styles.iconText}>식용유</Text>
              </View>
            </View>
          </View>

          {/* <View style=
          <View style={[styles.shadowContainer,{flexDirection: 'row',}]}>

          </View> */}
          <View style={{marginBottom:30}}></View>
          <TouchableOpacity
            style={{ flex: 1 }} onPress={() => this.handleBtn2(this.props.navigation)}>
            <View style={[styles.shadowContainer, { width: '100%', borderWidth: 1, borderColor: 'black', height: 100 }]}>
              <Text style={{ fontFamily: 'Pretendard-Bold', textAlign: 'center' }}>폐의약품 수거함 위치 확인하러 가기</Text>
            </View>
          </TouchableOpacity>

          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 50, marginBottom: 10 }}>꿀팁 알아가기!</Text>
          <View style={styles.container2}>
            <Swiper style={styles.wrapper} height={200} horizontal={false} autoplay loop spaceBetween={20}>
              <TouchableOpacity
                style={{ flex: 1 }} onPress={() => this.handleAttendance(this.props.navigation)}>
                <ImageBackground
                  source={require('./assets/images/5892437.jpg')}
                  style={styles.slide1}>
                  <Text style={styles.text}>출석 포인트 받고{"\n"}쿠폰으로 교환하자!</Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flex: 1 }} onPress={() => this.handleTip2(this.props.navigation)}>
                <ImageBackground
                  source={require('./assets/images/5591276.jpg')}
                  // {/* zIndex 는 요소의 레이어 순서를 제어하는 것이고 값이 높을 수록 화면 위쪽에 표시 */}
                  style={[styles.slide1]}>
                  <Text style={styles.text}>무상수거{"\n"}알고 있어?</Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flex: 1 }} onPress={() => this.handleTip3(this.props.navigation)}>
                <ImageBackground
                  source={require('./assets/images/v1053-004.jpg')}
                  style={styles.slide1}>
                  <Text style={styles.text}>자취생을 위한{"\n"}분리수거 꿀팁!</Text>
                </ImageBackground>
              </TouchableOpacity>
            </Swiper>
          </View>

          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 50, marginBottom: 15, }}>복지 소식 알고 있어?</Text>
          <TouchableOpacity onPress={() => this.handleSub1(this.props.navigation)} style={{ flex: 1 }}>
            <ImageBackground
              source={require('./assets/images/6207681.jpg')}
              style={[styles.iconContainer3, { opacity: 0.5, }]}
            >
              <View style={styles.transparentView}>
                <Text style={styles.text2}>국민 취업 제도</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleSub2(this.props.navigation)} style={{ flex: 1 }}>
            <ImageBackground
              source={require('./assets/images/4341846.jpg')}
              style={[styles.iconContainer3, { opacity: 0.5, }]}
            >
              <View style={styles.transparentView}>
                <Text style={styles.text2}>내집마련 디딤돌 대출</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleSub3(this.props.navigation)} style={{ flex: 1 }}>
            <ImageBackground
              source={require('./assets/images/5968832.jpg')}
              style={[styles.iconContainer3, { opacity: 0.5, }]}
            >
              <View style={styles.transparentView}>
                <Text style={styles.text2}>다함께 돌봄</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
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
  iconContainer3: {
    backgroundColor: '#F2FFED',
    padding: 8,
    borderRadius: 30,
    width: 350, // 원하는 너비로 조절
    height: 300, // 원하는 높이로 조절
    alignSelf: 'center',
    justifyContent: 'center', // 수직 정렬을 중앙으로 설정
    alignItems: 'center', // 수평 정렬을 중앙으로 설정
    marginBottom: 30,
    overflow: 'hidden',
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
    fontFamily: 'Pretendard-Bold',
  },
  searchText: {
    flex: 1,
    color: '#BDBDBD',
  },
  transparentView: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // 투명한 배경 색상
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text2: {
    color: 'white', // 검정색으로 설정, 더 진하게 원하면 색상 코드를 'black' 대신 'rgba(0, 0, 0, 1)'로 변경
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
    alignItems: 'center',
    padding: 10, // 텍스트 주위의 여백

  },
});

export default BottomTabNavigationApp;
