import { View, FlatList, StyleSheet, TouchableOpacity} from "react-native"
import { useState, useEffect } from "react"
import Card from "../components/PostCard"
// Initialize the JS client
import { supabase } from "../utils/supabase"
import { Center, Box, Text, Divider } from "native-base"
import { useNavigation } from "@react-navigation/native"

const ViewPosts = () => {
    const [postData, setPostData] = useState()
    const navigation = useNavigation()
    
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let { data: Session, error } = await supabase
            .from('Session')
            .select('*')
        setPostData(Session)
    }

    const Item = ({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item.id)}>
            <Card title={item.title} description={item.description} duration={handleTime(item.duration)} />
        </TouchableOpacity>
    )

    const handlePress = (id) => {
        return (
            navigation.navigate("ViewPost", { id: id })
        )
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
                <Text color="dark.600" fontSize="3xl" pt="4" pb="2">Posts</Text>
                <Divider bg="dark.400" variant="horizontal" w="90%" m="1" thickness="0.5" />
            </Center>
            <FlatList style={styles.flatList} data={postData} renderItem={Item} />
        </Box>
    )
}

const styles = StyleSheet.create({
    flatList: {
        height: "100%",
        width: "100%",
    }
})

export default ViewPosts