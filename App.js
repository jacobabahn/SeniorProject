import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Test from "./src/Test";
import Card from "./components/SessionCard";
import 'react-native-url-polyfill/auto'
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "native-base";
import { supabase } from "./src/supabase"
import { Box, NativeBaseProvider, Center } from "native-base";
import Pomodoro from "./src/Pomodoro";

export default function App() {

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
                            {/* <Test /> */}
                            <Pomodoro />
                        </Center>
                    </SafeAreaView>
                </Box>
                
        </NativeBaseProvider>
    );
}
