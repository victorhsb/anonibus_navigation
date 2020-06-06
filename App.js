import React, { useMemo } from "react"

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createDrawerNavigator } from "@react-navigation/drawer"

import SignIn from "./SignIn"
import CreateAccount from "./CreateAccount"
import Profile from "./Profile"
import Chat from "./Chat"
import Upload from "./Upload"

// import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesome5 } from "@expo/vector-icons"

import { AuthContext } from "./context"

import firebase from "./config/firebase"

const AuthStack = createStackNavigator()
const Tabs = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

const ProfileStack = createStackNavigator()

const ProfileStackScreen = () => (
	<ProfileStack.Navigator>
		<ProfileStack.Screen name="Profile" component={Profile} />
	</ProfileStack.Navigator>
)

const iconNames = {
	Profile: "user",
	Chat: "comments",
	Upload: "cloud-upload-alt",
}

const TabsScreen = () => (
	<Tabs.Navigator
		screenOptions={({ route }) => ({
			tabBarIcon: ({ color, size }) => <FontAwesome5 name={iconNames[route.name]} size={size} color={color} />,
		})}
		tabBarOptions={{ activeTintColor: "tomato", inactiveTintColor: "gray" }}
	>
		<Tabs.Screen name="Profile" component={ProfileStackScreen} />
		<Tabs.Screen name="Chat" component={Chat} />
		<Tabs.Screen name="Upload" component={Upload} />
	</Tabs.Navigator>
)

export default () => {
	const [userToken, setUserToken] = React.useState(null)

	React.useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			setUserToken(user ? user : null)
		})
	}, [])

	const authContext = useMemo(() => {
		return {
			signIn: () => {
				setUserToken("umMontedeCaracteres")
			},
			signUp: () => {
				setUserToken("umMontedeCaracteres")
			},
			signOut: () => {
				setUserToken(null)
			},
		}
	})

	return (
		<AuthContext.Provider value={authContext}>
			<NavigationContainer>
				{userToken ? (
					<Drawer.Navigator>
						<Drawer.Screen name="Home" component={TabsScreen} />
						<Drawer.Screen name="Profile" component={ProfileStackScreen} />
					</Drawer.Navigator>
				) : (
					<AuthStack.Navigator>
						<AuthStack.Screen name="SignIn" component={SignIn} options={{ title: "Acessar" }} />
						<AuthStack.Screen name="CreateAccount" component={CreateAccount} options={{ title: "Criar Conta" }} />
					</AuthStack.Navigator>
				)}
			</NavigationContainer>
		</AuthContext.Provider>
	)
}
