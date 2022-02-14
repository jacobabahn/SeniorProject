import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Test from "./src/Test";
import HelloWorld from "./src/HelloWorld";
import 'react-native-url-polyfill/auto'
import { supabase } from "./src/supabase"
import { NativeBaseProvider } from "native-base";

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
            <View>
                <Test />
                <HelloWorld />
                <Text></Text>
            </View>
        </NativeBaseProvider>
    );
}
