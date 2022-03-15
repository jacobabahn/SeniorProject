import { View, FlatList, StyleSheet} from "react-native"
import { useState, useEffect } from "react"
import Card from "../components/SessionCard"
// Initialize the JS client
import { supabase } from "./supabase"
import { Center, Box, Text, Divider, Button } from "native-base"
// import { ItemClick } from "native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types"

const ViewSession = () => {
    const [sessionData, setSessionData] = useState()
    
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let { data: Session, error } = await supabase
            .from('Session')
            .select('*')
            .eq('id', '2')
        setSessionData(Session)
        sessionData[0].duration = handleTime(sessionData[0].duration)
    }

    const handleTime = (time) => {
        let hours = Math.floor(time / 60)
        let minutes = time - hours * 60

        minutes = (minutes < 10 ? '0' : '') + minutes;
        
        return `${hours}:${minutes}`
    }
    
    return (
        <Box h="100%" w="90%">
            <Center>
                <Text color="dark.600" fontSize="3xl" pt="4" pb="2">{sessionData[0].title}</Text>
                <Divider bg="dark.400" variant="horizontal" w="100%" m="1" thickness="0.5" my="3" />
            </Center>
            <Text color="dark.500" fontSize="xl" pt="2" pb="1">Description:</Text>
            <Text color="dark.500" fontSize="lg" mx="0.5" mt="0.5">{sessionData[0].description}</Text>
            <Divider bg="dark.400" variant="horizontal" w="100%" m="1" thickness="0.5" mt="5" />
            <Text color="dark.500" fontSize="xl" pt="2" pb="1">Duration: {sessionData[0].duration} </Text>

            <Button style={styles.upload} mt="5" rounded="xl" bg="info.700" onPress={() => {} }>Upload</Button>

        </Box>
    )
}

const styles = StyleSheet.create({
    upload: {
        width: "25%",
        height: "6%",
        position: "absolute",
        bottom: "5%",
        right: "5%",
    }
})

export default ViewSession