import { View, FlatList, StyleSheet} from "react-native"
import { useState, useEffect } from "react"
import Card from "../components/SessionCard"
// Initialize the JS client
import { supabase } from "./supabase"
import { Center, Box, Text, Divider } from "native-base"

const ViewSessions = () => {
    const [sessionData, setSessionData] = useState()
    
    useEffect(() => {
        getData()
        console.log(sessionData)
    }, [])

    const getData = async () => {
        let { data: Session, error } = await supabase
            .from('Session')
            .select('*')
        
        setSessionData(Session)
    }

    const Item = ({ item }) => (
        <Card title={item.title} description={item.description} duration={handleTime(item.duration)} />
    )

    const handleTime = (time) => {
        let hours = Math.floor(time / 60)
        let minutes = time - hours * 60

        minutes = (minutes < 10 ? '0' : '') + minutes;
        
        return `${hours}:${minutes}`
    }
    
    return (
        <Box h="100%" w="100%">
            <Center>
                <Text color="dark.600" fontSize="3xl" pt="4" pb="2">Your Sessions</Text>
                <Divider bg="dark.400" variant="horizontal" w="90%" m="1" thickness="0.5" />
            </Center>
            <FlatList style={styles.flatList} data={sessionData} renderItem={Item} />
        </Box>
    )
}

const styles = StyleSheet.create({
    flatList: {
        height: "100%",
        width: "100%",
    }
})

export default ViewSessions