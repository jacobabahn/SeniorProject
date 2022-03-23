import * as React from 'react'
import { useState, useEffect } from "react";
// import { AsyncStorage } from 'react-native';
import 'react-native-url-polyfill/auto'
import { StatusBar } from "native-base"
import { supabase } from "./utils/supabase"
import { Box, NativeBaseProvider, Center } from "native-base"
import Navigator from './utils/Navigator';
import Auth from './utils/Auth';

export default function App() {

    const [session, setSession] = useState(null)

    useEffect(() => {
        setSession(supabase.auth.session())

        supabase.auth.onAuthStateChange((_event, supsession) => {
            setSession(supsession)
        })
    }, [session])

    return (
            <NativeBaseProvider>
                <StatusBar barStyle="light-content" />
                    <Box h="100%" w="100%" bg="dark.50" safeArea>
                        {/* <Navigator /> */}
                        {!session ? <Auth /> : <Navigator id={session.user.id} session={session} />}
                    </Box>
            </NativeBaseProvider>
    )
}
