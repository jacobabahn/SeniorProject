import { View, FlatList, StyleSheet, TouchableOpacity, RefreshControl} from "react-native"
import { useState, useEffect, useContext } from "react"
import Card from "../components/SessionCard"
// Initialize the JS client
import { supabase } from "../utils/supabase"
import { Center, Box, Text, Divider, Pressable, Button, Image } from "native-base"
import { UserContext } from "../App"
import ViewSession from "./ViewSession"
import { useNavigation } from "@react-navigation/native"
import { Feather, MaterialIcons } from '@expo/vector-icons';

/**
 * This is the batch sessions view where all of a users sessions are displayed.
 */
const ViewSessions = () => {
    const [sessionData, setSessionData] = useState()
    const [refreshing, setRefreshing] = useState(false)
    const userSession = useContext(UserContext)
    const navigation = useNavigation()
    
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        setRefreshing(true)
        let { data: Session, error } = await supabase
            .from('Session')
            .select('*')
            .eq('user_id', userSession.user.id)
            .order('created_at', { ascending: false })
        
        setSessionData(Session)
        setRefreshing(false)
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
            <FlatList
                style={styles.flatList}
                data={sessionData} 
                renderItem={Item} 
                refreshControl={
                    <RefreshControl tintColor="#fff" refreshing={refreshing} onRefresh={getData} />
                }/>
            <TouchableOpacity onPress={profile}>
                <MaterialIcons style={styles.profile} name="account-circle" size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={search}>
                <Feather style={styles.search} name="search" size={40} color="white" />
            </TouchableOpacity>
        </Box>
    )
}

const styles = StyleSheet.create({
    flatList: {
        height: "100%",
        width: "100%",
    },
    search: {
        position: "absolute",
        bottom: "5%",
        right: "0%",
        marginRight: "5%",
    },
    profile: {
        marginLeft: "5%",
    }
})

export default ViewSessions