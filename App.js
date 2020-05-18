import React from 'react';
import { Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer"

import SignIn from './SignIn';
import CreateAccount from './CreateAccount';
import Home from './Home';
import HomeDetails from './Home/details';
import Profile from './Profile';

import { AuthContext } from './context';

import firebase from './config/firebase';

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="HomeDetails" component={HomeDetails} />
  </HomeStack.Navigator>

)


const ProfileStack = createStackNavigator();

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
)

const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={HomeStackScreen} />
    <Tabs.Screen name="Profile" component={ProfileStackScreen} />
  </Tabs.Navigator>
)



export default () => {




  const [userToken, setUserToken] = React.useState(null);

  React.useEffect(() => {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUserToken(user)
      } else {
        setUserToken(null)
      }

    })
    // 
  }, []);



  const authContext = React.useMemo(() => {
    return {
      signIn: () => { setUserToken('umMontedeCaracteres') },
      signUp: () => { setUserToken('umMontedeCaracteres') },
      signOut: () => { setUserToken(null) },
    }
  })

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken ?
          <Drawer.Navigator>
            <Drawer.Screen name="Home" component={TabsScreen} />
            <Drawer.Screen name="Profile" component={ProfileStackScreen} />
          </Drawer.Navigator>

          :
          <AuthStack.Navigator>
            <AuthStack.Screen
              name="SignIn"
              component={SignIn}
              options={{ title: "Acessar" }}
            />
            <AuthStack.Screen
              name="CreateAccount"
              component={CreateAccount}
              options={{ title: "Criar Conta" }}
            />
          </AuthStack.Navigator>
        }
      </NavigationContainer>
    </AuthContext.Provider>

  )
}