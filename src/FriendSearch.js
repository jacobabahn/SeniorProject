import { DefaultTheme } from "@react-navigation/native"
import { StyleSheet, FlatList } from "react-native"
import { Box, Input, Text, Button, Center, Divider } from "native-base"
import { useEffect, useState } from "react"
import { supabase } from "../utils/supabase"


const FriendSearch = () => {
    const [search, setSearch] = useState("")
    const [searchData, setSearchData] = useState()

    useEffect(() => {
        getData()
    }, [search])

    const getData = async () => {
        const { data: User, error } = await supabase
            .from('User')
            .select('*')
            .ilike('email', `%${search}%`)
        setSearchData(User)
    }

    const Item = ({ item }) => (
        <Center>
            <Box p="3" w="90%" h="100%" bg="dark.100" rounded="md">
                <Center style={styles.card}>
                    <Text fontSize="md" color="white">{item.email}</Text>
                    <Button w="15%">Add</Button>
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

            <Input color="white" fontSize="xl" m="auto" h="6%" w="90%" varaint="outline" placeholder="Search Users" value={search} onChangeText={(text) => setSearch(text)}/>
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