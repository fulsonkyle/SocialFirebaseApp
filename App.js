import React from 'react';
import { NavigationContainer, useRoute } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'

import MessageScreen from './screens/MessageScreen'
import PostScreen from './screens/PostScreen'
import NotificationScreen from './screens/NotificationScreen'
import ProfileScreen from './screens/ProfileScreen'

import * as firebase from 'firebase'

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}



var firebaseConfig = {
    apiKey: "AIzaSyDdtDMFd2ofvezYKsI4Is4DnDE_GDe0Yg4",
    authDomain: "socialfirebaseapp.firebaseapp.com",
    databaseURL: "https://socialfirebaseapp.firebaseio.com ",
    projectId: "socialfirebaseapp",
    storageBucket: "socialfirebaseapp.appspot.com",
    messagingSenderId: "669193157155",
    appId: "1: 669193157155: web: 3977061eb9471840b14f96"
}; 

firebase.initializeApp(firebaseConfig);


const MainStack = createBottomTabNavigator()

const aStack = createStackNavigator()

const bottomStack = createBottomTabNavigator()

const wrapStack = createStackNavigator()

function AppContainer() {
    return (
        <wrapStack.Navigator mode="modal" headerMode="none">
            <wrapStack.Screen name="default" component={DeepContainer} />
            <wrapStack.Screen name="postModal" component={PostScreen} />
        </wrapStack.Navigator>
    );
}

function DeepContainer() {
    return (
        <bottomStack.Navigator
            tabBarOptions={{
                activeTintColor: "#161F3D",
                inActiveTintColor: "#B8BBC4",
                showLabel: false
            }}

        >
            <bottomStack.Screen name="Home" component={HomeScreen}
                options={{ tabBarIcon: ({ color }) => <Ionicons name="ios-person" size={24} color={color}></Ionicons> }} />
            <bottomStack.Screen name="Message" component={MessageScreen}
                options={{ tabBarIcon: ({ color }) => <Ionicons name="ios-person" size={24} color={color}></Ionicons> }} />
            <bottomStack.Screen name="Post" component={PostScreen}
                options={{
                    tabBarIcon: ({ color }) => <Ionicons name="ios-person" size={24} color={color}
                        style={{
                            shadowColor: "#E9446A",
                            shadowOffset: { width: 0, height: 0 }
                            , shadowRadius: 10, shadowOpacity: 0.3
                        }}></Ionicons>
                }} />
            <bottomStack.Screen name="Notification" component={NotificationScreen}
                options={{ tabBarIcon: ({ color }) => <Ionicons name="ios-person" size={24} color={color}></Ionicons> }} />
            <bottomStack.Screen name="Profile" component={ProfileScreen}
                options={{ tabBarIcon: ({ color }) => <Ionicons name="ios-person" size={24} color={color}></Ionicons> }} />
        </bottomStack.Navigator>
    );

}

function AuthStack() {
    return (
        <aStack.Navigator>
            <aStack.Screen name="Login" component={LoginScreen} />
            <aStack.Screen name="Register" component={RegisterScreen} />
        </aStack.Navigator>
    );
}

const WithRoute = CloneComponent => {
    class WithRouteComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                change: false
            }
        }

        componentDidMount() {
            const unsubscribe = this.props.navigation.addListener('tabPress', e => {
                this.setState(previousState => {
                    return {
                        ...previousState,
                        change: !previousState.change
                    }
                });
            });
        }

        render() {
            console.log(this.props);

            return (
                <React.Fragment>
                    <CloneComponent {...this.props} />
                </React.Fragment>
            )
        }
    }

    return WithRouteComponent;
}

export default function createAppContainer(props) {
    return (
        <NavigationContainer>
            <MainStack.Navigator initialRouteName="WithRouter" screenOptions={{ headerShown: false }}>
                <MainStack.Screen name="Loading" component={WithRoute(LoginScreen)} />
                <MainStack.Screen name="App" component={WithRoute(AppContainer)} />
                <MainStack.Screen name="Auth" component={WithRoute(AuthStack)} />
            </MainStack.Navigator>
        </NavigationContainer>
    );
}


// const AppContainer = createStackNavigator(
//   {
//     default: createBottomTabNavigator(
//       {
//         Home: {
//           screen: HomeScreen,
//           navigationOptions: {
//             tabBarIcon: ({ tintColor }) => <Ionicons name="ios-home" size={24} color={tintColor}></Ionicons>
//           }
//         },
//         Message: {
//           screen: MessageScreen,
//           navigationOptions: {
//             tabBarIcon: ({ tintColor }) => <Ionicons name="ios-chatboxes" size={24} color={tintColor}></Ionicons>
//           }
//         },
//         Post: {
//           screen: PostScreen,
//           navigationOptions: {
//             tabBarIcon: ({ tintColor }) => <Ionicons name="ios-add-circle" size={48} color="#E9446A"
//               style={{
//                 shadowColor: "#E9446A",
//                 shadowOffset: { width: 0, height: 0 }
//                 , shadowRadius: 10, shadowOpacity: 0.3
//               }}
//             ></Ionicons>
//           }
//         },
//         Notification: {
//           screen: NotificationScreen,
//           navigationOptions: {
//             tabBarIcon: ({ tintColor }) => <Ionicons name="ios-notifications" size={24} color={tintColor}></Ionicons>
//           }
//         },
//         Profile: {
//           screen: ProfileScreen,
//           navigationOptions: {
//             tabBarIcon: ({ tintColor }) => <Ionicons name="ios-person" size={24} color={tintColor}></Ionicons>
//           }
//         }
//       },
//       {
//         defaultNavigationOptions: {
//           tabBarOnPress: ({ navigation, defaultHandler }) => {
//             if (navigation.state.key === "Post") {
//               navigation.navigate("postModal")
//             } else {
//               defaultHandler()
//             }
//           }
//         },
//         tabBarOptions: {
//           activeTintColor: "#161F3D",
//           inActiveTintColor: "#B8BBC4",
//           showLabel: false
//         }
//       }
//     ),
//     postModal: {
//       screen: PostScreen
//     }
//   },
//   {
//     mode: "modal",
//     headerMode: "none",
//     initialRouteName: "postModal"
//   }
// )

// const AuthStack = createStackNavigator({
//   Login: LoginScreen,
//   Register: RegisterScreen
// });

// export default createAppContainer(
//   createSwitchNavigator(
//     {
//       Loading: LoadingScreen,
//       App: AppContainer,
//       Auth: AuthStack
//     },
//     {
//       initialRouteName: 'Loading'
//     }
//   )
// );