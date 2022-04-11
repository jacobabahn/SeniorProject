import { View, FlatList, StyleSheet, TouchableOpacity} from "react-native"
import { useState, useEffect, useContext } from "react"
import Card from "../components/SessionCard"
// Initialize the JS client
import { supabase } from "../utils/supabase"
import { Center, Box, Text, Divider, Pressable, Button } from "native-base"
import { UserContext } from "../App"
import ViewSession from "./ViewSession"
import { useNavigation } from "@react-navigation/native"

const ViewSessions = () => {
    const [sessionData, setSessionData] = useState()
    const userSession = useContext(UserContext)
    const navigation = useNavigation()
    
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let { data: Session, error } = await supabase
            .from('Session')
            .select('*')
            .eq('user_id', userSession.user.id)
        
        setSessionData(Session)
    }

    const Item = ({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item.id)}>
            <Card title={item.title} description={item.description} duration={handleTime(item.duration)} onPress={handlePress}/>
        </TouchableOpacity>
    )

    const handlePress = (id) => {
        return (
            navigation.navigate("ViewSession", { id: id })
        )
    }

    const logOut = () => {
        supabase.auth.signOut()
    }

    const handleTime = (time) => {
        let hours = Math.floor(time / 60)
        let minutes = time - hours * 60

        minutes = (minutes < 10 ? '0' : '') + minutes;
        
        return `${hours}:${minutes}`
    }
    
    return (
        <Box h="100%" w="100%" bg="dark.50">
            <Center>
                <Text color="dark.600" fontSize="3xl" pt="4" pb="2">Your Sessions</Text>
                <Divider bg="dark.400" variant="horizontal" w="90%" m="1" thickness="0.5" />
            </Center>
            <FlatList style={styles.flatList} data={sessionData} renderItem={Item} />
            {/* <Button mb="12" onPress={logOut}>Log Out</Button> */}
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