import React from "react";
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Pomodoro from "./src/Pomodoro"
import ViewPosts from "./src/ViewPosts"
import ViewSession from "./src/ViewSession"
import ViewSessions from "./src/ViewSessions"

const Tab = createBottomTabNavigator()

const Navigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator 
                initialRouteName="Pomodoro"
                swipeEnabled="true"
                navigationOptions={{
                    swipeEnabled: true,
                }}
                screenOptions={{
                    headerShown: false,
                    swipeEnabled: true,
                    // tabBarLabel: { focused: true, color: "#006ba7" },
                    tabBarStyle: {
                        poition: "absolute",
                        bottom: 25,
                        elevation: 0,
                        borderRadius: 15,
                        left: "17.5%",
                        height: 70,
                        width: "65%",
                        backgroundColor: "#27272a",
                        borderTopWidth: 0,
                    },
                    tabBarIconStyle: { display: "none" },
                    tabBarLabelStyle: { 
                        fontSize: 14,
                        justifyContent: "center",
                    },
                }}
                >
                <Tab.Screen name="Sessions" component={ViewSessions} />
                <Tab.Screen name="Pomodoro" component={Pomodoro} />
                <Tab.Screen name="Feed" component={ViewPosts} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Navigator

