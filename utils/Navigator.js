import React from "react";
import { NavigationContainer } from "@react-navigation/native"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Pomodoro from "../src/Pomodoro"
import ViewPosts from "../src/ViewPosts"
import ViewPost from "../src/ViewPost";
import ViewSessions from "../src/ViewSessions"
import ViewSession from "../src/ViewSession"
import CreateSession from "../src/CreateSession"
import FriendSearch from "../src/FriendSearch";
import FriendRequests from "../src/FriendRequests";
import Profile from "../src/Profile";

const Tab = createMaterialTopTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator
            tabBarPosition="bottom"
            initialRouteName="Pomodoro"
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    poition: "absolute",
                    bottom: 25,
                    elevation: 0,
                    borderRadius: 15,
                    left: "13%",
                    height: 70,
                    width: "74%",
                    marginTop: "1%",
                    backgroundColor: "#27272a",
                    borderTopWidth: 0,
                },
                tabBarIconStyle: { display: "none" },
                tabBarLabelStyle: { 
                    fontSize: 14,
                    justifyContent: "center",
                    marginTop: 15,
                },
                tabBarActiveTintColor: "#006ba7",
                tabBarInactiveTintColor: "white",
                tabBarIndicatorStyle: {
                backgroundColor: "#006ba7",
                width: "22%",
                marginLeft: "4.5%"
                }}
            }
            >
            <Tab.Screen name="Sessions" component={ViewSessions} />
            <Tab.Screen name="Timer" component={Pomodoro} />
            <Tab.Screen name="Feed" component={ViewPosts} />
        </Tab.Navigator>
    )
}

const Stack = createNativeStackNavigator()

const navTheme = {
    colors: {
        background: "#18181b",
    }
}

const Navigator = () => {
    return (
        <NavigationContainer theme={navTheme}>
            <Stack.Navigator 
                initialRouteName="Tabs" 
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name="Tabs" component={Tabs} />
                <Stack.Screen name="ViewSession" component={ViewSession} />
                <Stack.Screen name="ViewPost" component={ViewPost} />
                <Stack.Screen name="CreateSession" component={CreateSession} />
                <Stack.Screen name="FriendSearch" component={FriendSearch} />
                <Stack.Screen name="FriendRequests" component={FriendRequests} />
                <Stack.Screen name="Profile" component={Profile} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator

