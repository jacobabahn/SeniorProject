import { View, FlatList, StyleSheet} from "react-native"
import { useState, useEffect, useContext, useRef } from "react"
import { UserContext } from "../App"
// Initialize the JS client
import { supabase } from "../utils/supabase"
import { Center, Box, Text, Divider, Button } from "native-base"

const ViewSession = ({ route }) => {
    const [sessionData, setSessionData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const startDuration = useRef(0)
    const userSession = useContext(UserContext)
    const id = route.params.id

    useEffect(() => {
        getData()
        setIsLoading(false)
    }, [])

    const getData = async () => {
        let { data: Session, error } = await supabase
            .from('Session')
            .select('*')
            .eq('id', id)
        
        startDuration.current = Session[0].duration
        Session[0].duration = handleTime(Session[0].duration)
        setSessionData(Session)
    }

    const handleTime = (time) => {
        let hours = Math.floor(time / 60)
        let minutes = time - hours * 60

        minutes = (minutes < 10 ? '0' : '') + minutes;
        
        return `${hours}:${minutes}`
    }

    const handleUpload = async () => {
        let { data, error } = await supabase
            .from('Post')
            .insert({ session_id: route.params.id, user_id: userSession.user.id, description: ""})
    }

    if (!sessionData) {
        return (
            <Center style={styles.main}>
                <Text>Loading...</Text>
            </Center>
        )
    }
    return (
        <Center>
            <Box h="100%" w="90%" style={styles.main}>
                <Center>
                    <Text color="dark.600" fontSize="3xl" pt="4" pb="2">{sessionData[0].title}</Text>
                    <Divider bg="dark.400" variant="horizontal" w="100%" m="1" thickness="0.5" my="3" />
                </Center>
                <Text color="dark.500" fontSize="xl" pt="2" pb="1" mx="2">Description: </Text>
                <Text color="dark.500" fontSize="lg" mx="3" mt="0.5">{sessionData[0].description}</Text>
                <Divider bg="dark.400" variant="horizontal" w="100%" thickness="0.5" mt="5" />
                <Text color="dark.500" fontSize="xl" mx="2" pt="2" pb="1">Duration: {sessionData[0].duration} </Text>

                <Button style={styles.upload} mt="5" rounded="xl" bg="info.700" onPress={handleUpload}>Upload</Button>

            </Box>
        </Center>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#18181b",
        height: "100%",
        width: "100%",
    },
    upload: {
        width: "25%",
        height: "6%",
        position: "absolute",
        bottom: "5%",
        right: "5%",
    }
})

export default ViewSession