import { View, FlatList, StyleSheet, TouchableOpacity} from "react-native"
import { useState, useEffect, useContext } from "react"
import Card from "../components/SessionCard"
// Initialize the JS client
import { supabase } from "../utils/supabase"
import { Center, Box, Text, Divider, Pressable, Button, Image } from "native-base"
import { UserContext } from "../App"
import ViewSession from "./ViewSession"
import { useNavigation } from "@react-navigation/native"
import { Feather } from '@expo/vector-icons';

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

    const search = () => {
        navigation.navigate("FriendSearch")
    }

    const requests = () => {
        navigation.navigate("FriendRequests")
    }
    
    const profile = () => {
        navigation.navigate("Profile")
    }

    const handleTime = (time) => {
        let hours = Math.floor(time / 60)
        let minutes = time - hours * 60

        minutes = (minutes < 10 ? '0' : '') + minutes;
        
        return `${hours}:${minutes}`
    }
    
    return (
        <Box h="96%" w="100%" bg="dark.50">
            <Center>
                <Text color="dark.600" fontSize="3xl" pt="4" pb="2">Your Sessions</Text>
                <Divider bg="dark.400" variant="horizontal" w="90%" m="1" thickness="0.5" />
            </Center>
            <FlatList style={styles.flatList} data={sessionData} renderItem={Item} />
            {/* <Button mt="3"w="30%" ml="60%" onPress={search}>Search Users</Button>
            <Button mt="3" w="35%" ml="58%" onPress={requests}>Friend Requests</Button> */}
            <Button mt="3" mb="10" w="30%" onPress={profile}>Profile</Button>
            <TouchableOpacity onPress={search}>
                <Feather name="search" size="40%" color="white" />
            </TouchableOpacity>
            {/* <Button mt="3" w="35%" ml="58%" onPress={logOut}>Log Out</Button> */}
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