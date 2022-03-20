import React from "react";
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Pomodoro from "./src/Pomodoro"
import ViewPosts from "./src/ViewPosts"
import ViewSession from "./src/ViewSession"
import ViewSessions from "./src/ViewSessions"

const Tab = createMaterialTopTabNavigator()

const Navigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBarPosition="bottom"
                initialRouteName="Pomodoro"
                swipeEnabled="true"
                navigationOptions={{
                    // swipeEnabled: true,
                }}
                screenOptions={{
                    headerShown: false,
                    // swipeEnabled: true,
                    tabBarStyle: {
                        poition: "absolute",
                        bottom: 25,
                        elevation: 0,
                        borderRadius: 15,
                        left: "13%",
                        height: 70,
                        width: "74%",
                        backgroundColor: "#27272a",
                        borderTopWidth: 0,
                    },
                    tabBarIconStyle: { display: "none" },
                    tabBarLabelStyle: { 
                        fontSize: 14,
                        justifyContent: "center",
                        marginTop: 15,
                    },
                    
                }}
                tabBarOptions={{
                    activeTintColor: "#006ba7",
                    inactiveTintColor: "white",
                    indicatorStyle: {
                        backgroundColor: "#006ba7",
                        width: "22%",
                        marginLeft: "4.5%",
                    }
                }}
                >
                <Tab.Screen name="Sessions" component={ViewSessions} />
                <Tab.Screen name="Timer" component={Pomodoro} />
                <Tab.Screen name="Feed" component={ViewPosts} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Navigator

