import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from 'react'
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import ViewSessions from "./src/ViewSessions";
import 'react-native-url-polyfill/auto'
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "native-base";
import { supabase } from "./src/supabase"
import { Box, NativeBaseProvider, Center } from "native-base";
import Pomodoro from "./src/Pomodoro";

const Stack = createNativeStackNavigator()

export default function App() {

    // const [session, setSession] = useState(null)
    // const [StackData, setStackData] = useState({})

    // useEffect(() => {
    //     setSession(supabase.auth.session())

    //     supabase.auth.onAuthStateChange((_event, session) => {
    //         setSession(session)
    //     })
    // }, [])

    return (
        <NavigationContainer>
            <NativeBaseProvider>
                <StatusBar barStyle="light-content" />
                    <Box h="100%" w="100%" bg="dark.50">
                        <SafeAreaView>
                            <Center>
                                    <Stack.Navigator initialRouteName="Pomodoro">
                                        <Stack.Screen name="Sessions" component={ViewSessions} /> 
                                        <Stack.Screen name="Pomodoro" component={Pomodoro} />
                                    </Stack.Navigator>
                                {/* <Pomodoro /> */}
                                <ViewSessions />
                            </Center>
                        </SafeAreaView>
                    </Box>
            </NativeBaseProvider>
        </NavigationContainer>
    )
}
