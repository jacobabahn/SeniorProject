import * as React from 'react'
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import ViewSessions from "./src/ViewSessions";
import 'react-native-url-polyfill/auto'
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, StatusBar } from "native-base";
import { supabase } from "./src/supabase"
import { Box, NativeBaseProvider, Center } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Pomodoro from "./src/Pomodoro";


export default function App() {
    const Stack = createNativeStackNavigator();

    const [session, setSession] = useState(null)
    const [testData, setTestData] = useState({})

    useEffect(() => {
        setSession(supabase.auth.session())

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    return (
        <NativeBaseProvider>
            <StatusBar barStyle="light-content" />
                <Box h="100%" w="100%" bg="dark.50">
                    <SafeAreaView>
                        <Center>
                            <NavigationContainer>
                                <Stack.Navigator initialRouteName="Pomodoro">
                                    <Stack.Screen name="Sessions" component={ViewSessions} /> 
                                    <Stack.Screen name="Pomodoro" component={Pomodoro} />
                                </Stack.Navigator>
                            </NavigationContainer>
                            <Pomodoro />
                        </Center>
                    </SafeAreaView>
                </Box>
        </NativeBaseProvider>
    )
}
