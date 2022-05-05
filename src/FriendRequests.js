import { DefaultTheme } from "@react-navigation/native"
import { StyleSheet, FlatList, Alert } from "react-native"
import { Box, Input, Text, Button, Center, Divider } from "native-base"
import { useEffect, useState, useContext } from "react"
import { supabase } from "../utils/supabase"
import { UserContext } from "../App"

/**
 * View where a user accepts or declines friend requests.
 */
const FriendRequests = () => {
    const [requests, setRequests] = useState()
    const [users, setUsers] = useState()
    const userSession = useContext(UserContext)

    useEffect(() => {
        getData()
    }, [requests])

    const getData = async () => {
        const { data: FriendRequest, error } = await supabase
            .from('FriendRequest')
            .select('friend_id, users (email)')
            .eq('user_id', userSession.user.id)

        setRequests(FriendRequest)
    }

    const handleAddButton = async (id) => {
        return (
            Alert.alert(
                "Add Friend",
                "Are you sure you want to Add this person as a friend?",
                [
                    {
                        text: "Cancel",
                        onPress: () => {},
                        style: "cancel"
                    },
                    {
                        text: "Ok",
                        onPress: () => {
                            sendData(id)
                            removeRequest(id)
                            console.log("You friend request has successfully been sent!")
                        }
                    }
                ]
            )
        )
    }

    const handleXButton = async (id) => {
        return (
            Alert.alert(
                "Decline Friend Request",
                "Are you sure you want to Decline this friend request?",
                [
                    {
                        text: "Cancel",
                        onPress: () => {},
                        style: "cancel"
                    },
                    {
                        text: "Ok",
                        onPress: () => {
                            removeRequest(id)
                            console.log("The friend request has successfully been declined!")
                        }
                    }
                ]
            )
        )
    }

    const sendData = async (id) => {
        const { data, error } = await supabase
            .from('Friend')
            .insert({ user_id: userSession.user.id, friend_id: id })
        
        secondRequest(id)
    }

    const secondRequest = async (id) => {
        const { data, error } = await supabase
            .from('Friend')
            .insert({ user_id: id, friend_id: userSession.user.id })
    }

    const removeRequest = async (id) => {
        const { data: FriendRequest, error } = await supabase
            .from('FriendRequest')
            .delete()
            .match({friend_id: id})
        
        getData()
    }

    const Item = ({ item }) => (
        <Center>
            <Box p="3" w="90%" m="3" bg="dark.100" rounded="md">
                <Center style={styles.card}>
                    <Box>
                        <Text fontSize="md" color="white">{item.users.email}</Text>
                    </Box>
                    <Box style={styles.buttons}>
                        <Button w="55" bg="info.700" onPress={() => handleAddButton(item.friend_id)}>Add</Button>
                        <Button w="55" ml="3" bg="danger.700" onPress={() => handleXButton(item.friend_id)}>X</Button>
                    </Box>
                </Center>
            </Box>
        </Center>
    )

    if (!requests) {
        return (
            <Center style={styles.main}>
                <Text>Loading...</Text>
            </Center>
        )
    }
    
    return (
        <Box h="100%" w="100%" bg="dark.50">
            <Center pb="3">
                <Text color="dark.600" fontSize="3xl" pt="4" pb="2">Friend Requests</Text>
                <Divider bg="dark.400" variant="horizontal" w="90%" m="1" thickness="0.5" />
            </Center>
            <FlatList style={styles.flatList} data={requests} renderItem={Item} />
        </Box>
    )
}

const styles = StyleSheet.create({
    flatList: {
        width: "100%",
        height: "100%",
        marginTop: "5%",
    },
    card: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
    },
    buttons: {
        flexDirection: "row",

    },
    main: {
        backgroundColor: "#18181b",
        height: "100%",
        width: "100%",
    },
})

export default FriendRequests