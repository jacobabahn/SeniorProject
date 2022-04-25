import { DefaultTheme } from "@react-navigation/native"
import { StyleSheet, FlatList, Alert } from "react-native"
import { Box, Input, Text, Button, Center, Divider } from "native-base"
import { useEffect, useState, useContext } from "react"
import { supabase } from "../utils/supabase"
import { UserContext } from "../App"

const FriendSearch = () => {
    const [search, setSearch] = useState("")
    const [searchData, setSearchData] = useState("")
    const userSession = useContext(UserContext)

    useEffect(() => {
        getData()
    }, [search])

    const getData = async () => {
        const { data: users, error } = await supabase
            .from('users')
            .select('*')
            .ilike('email', `%${search}%`)
        setSearchData(users)
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
                            console.log("You friend request has successfully been sent!")
                        }
                    }
                ]
            )
        )
    }

    const sendData = async (id) => {
        let { data, error } = await supabase
            .from('FriendRequest')
            .insert({ user_id: id, friend_id: userSession.user.id })
    }

    const Item = ({ item }) => (
        <Center>
            <Box p="3" w="90%" m="3" bg="dark.100" rounded="md">
                <Center style={styles.card}>
                    <Text fontSize="md" color="white">{item.email}</Text>
                    <Button w="15%" bg="info.700" onPress={() => handleAddButton(item.id)}>Add</Button>
                </Center>
            </Box>
        </Center>
    )
    
    return (
        <Box h="100%" w="100%" bg="dark.50">
            <Center pb="3">
                <Text color="dark.600" fontSize="3xl" pt="4" pb="2">Friend Search</Text>
                <Divider bg="dark.400" variant="horizontal" w="90%" m="1" thickness="0.5" />
            </Center>

            <Input color="white" borderColor="grey" fontSize="xl" m="auto" h="6%" w="90%" variant="outline" placeholder="Search Users" value={search} onChangeText={(text) => setSearch(text)}/>
            <FlatList style={styles.flatList} data={searchData} renderItem={Item} />
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
        justifyContent: "space-between",
    }
})

export default FriendSearch