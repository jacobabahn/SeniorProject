import { View, FlatList, StyleSheet, TouchableOpacity, RefreshControl} from "react-native"
import { useState, useEffect, useContext, useRef } from "react"
import Card from "../components/PostCard"
// Initialize the JS client
import { supabase } from "../utils/supabase"
import { Center, Box, Text, Divider } from "native-base"
import { useNavigation } from "@react-navigation/native"
import { UserContext } from "../App"

/**
 * This is the Posts page where all of a users friends posts are displayed.
 */
const ViewPosts = () => {
    const [posts, setPosts] = useState()
    const [refreshing, setRefreshing] = useState(false)
    const postData = useRef()
    const friends = useRef()
    const navigation = useNavigation()
    const userSession = useContext(UserContext)
    
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let { data: Post, error } = await supabase
            .from('Post')
            .select('session_id, created_at, Session (title, description, duration, user_id)')
            .order('created_at', { ascending: false })

        postData.current = Post

        getFriends()
    }

    const getFriends = async () => {
        let { data: Friend, error } = await supabase
            .from('Friend')
            .select('friend_id, users (email)')
            .eq('user_id', userSession.user.id)

        friends.current = Friend

        arrangeData()
    }

    const arrangeData = () => {
        let friendsMutated = {}

        for (let val of friends.current) {
            if (val.friend_id in friendsMutated) {
                continue
            } else {
                friendsMutated[val.friend_id] = val.users.email
            }
        }
        friends.current = friendsMutated

        let postDataMutated = []
        for (let session of postData.current) {
            if (session.Session.user_id in friendsMutated) {
                session.Session.email = friendsMutated[session.Session.user_id]
                postDataMutated.push(session.Session)
            }
        }
        setPosts(postDataMutated)
    }

    const Item = ({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item.id)}>
            <Card email={item.email} title={item.title} description={item.description} duration={handleTime(item.duration)} />
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

        minutes = (minutes < 10 ? '0' : '') + minutes
        
        return `${hours}:${minutes}`
    }
    
    if (!posts) {
        return (
            <Center>
                <Text>Loading...</Text>
            </Center>
        )
    }

    return (
        <Box h="96%" w="100%" bg="dark.50">
            <Center>
                <Text color="dark.600" fontSize="3xl" pt="4" pb="2">Posts</Text>
                <Divider bg="dark.400" variant="horizontal" w="90%" m="1" thickness="0.5" />
            </Center>
            <FlatList style={styles.flatList} data={posts} renderItem={Item} 
                refreshControl={
                    <RefreshControl tintColor="#fff" refreshing={refreshing} onRefresh={getData} />
                }/>
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