import { DefaultTheme } from "@react-navigation/native"
import { StyleSheet, FlatList } from "react-native"
import { Box, Input, Text, Button, Center, Divider } from "native-base"
import { useEffect, useState } from "react"
import { supabase } from "../utils/supabase"


const FriendRequests = () => {
    const [requests, setRequests] = useState()

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const { data: users, error } = await supabase
            .from('users')
            .select('*')
        setRequests(users)
    }

    const Item = ({ item }) => (
        <Center>
            <Box p="3" w="90%" m="3" bg="dark.100" rounded="md">
                <Center style={styles.card}>
                    <Box>
                        <Text fontSize="md" color="white">{item.email}</Text>
                    </Box>
                    <Box style={styles.buttons}>
                        <Button w="55">Add</Button>
                        <Button w="55" ml="3" bg="danger.500">X</Button>
                    </Box>
                </Center>
            </Box>
        </Center>
    )
    
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

    }
})

export default FriendRequests