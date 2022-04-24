import { Text, Box, Center, Divider, Pressable, Button } from "native-base"
import { StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native"
import { useEffect, useState, useContext } from "react"
import { supabase } from "../utils/.supabase"
import { UserContext } from "../App"

const Profile = () => {
    const [profileData, setProfileData] = useState()
    const userSession = useContext(UserContext)
    const navigation = useNavigation()

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let { data: users, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userSession.user.id)

        setProfileData(users[0])
    }

    const requests = () => {
        navigation.navigate("FriendRequests")
    }

    const logOut = () => {
        supabase.auth.signOut()
    }

    if (!profileData) {
        return (
            <Center style={styles.main}>
                <Text>Loading...</Text>
            </Center>
        )
    }

    return (
        <Box h="100%" w="100%" bg="dark.50">
            <Center>
                <Text color="dark.600" fontSize="3xl" pt="4" pb="2">Profile</Text>
                <Divider bg="dark.400" variant="horizontal" w="90%" m="1" thickness="0.5" />
            </Center>

            <Box p="5" h="auto" w ="90%" bg="dark.100" m="4%" rounded="2xl" shadow="3">
                <Center bg="dark.50" rounded="2xl" shadow="3" m="1" p="1">
                    <Text color="white" fontSize="3xl">Info</Text>
                </Center>
                <Box style={styles.stats}>
                    <Box style={styles.inner}>
                        <Text color="white" fontSize="xl" pt="2" pb="1" mx="2">Name: </Text>
                        <Text color="dark.500" fontSize="lg" mx="3" mt="0.5">John Doe</Text>
                        <Text color="white" fontSize="xl" pt="2" pb="1" mx="2">Email: </Text>
                        <Text color="dark.500" fontSize="lg" mx="3" mt="0.5">{profileData.email}</Text>
                    </Box>
                    <Box style={styles.inner}>
                        <Text color="white" fontSize="xl" pt="2" pb="1" mx="2">UserName: </Text>
                        <Text color="dark.500" fontSize="lg" mx="3" mt="0.5">{!profileData.username ? "Set" : profileData.username}</Text>
                        <Text color="white" fontSize="xl" pt="2" pb="1" mx="2">Password: </Text>
                        <Text color="dark.500" fontSize="lg" mx="3" mt="0.5">********</Text>
                    </Box>
                </Box>
            </Box>

            <Box p="5" h="auto" w ="90%" bg="dark.100" m="4%" rounded="2xl" shadow="3">
                <Center bg="dark.50" rounded="2xl" shadow="3" m="1" p="1">
                    <Text color="white" fontSize="3xl">Stats </Text>
                </Center>
                <Box style={styles.stats}>
                    <Box style={styles.inner}>
                        <Text color="white" fontSize="xl" pt="2" pb="1" mx="2">Post Count: </Text>
                        <Text color="dark.500" fontSize="lg" mx="3" mt="0.5">0</Text>
                        <Text color="white" fontSize="xl" pt="2" pb="1" mx="2">Session Count: </Text>
                        <Text color="dark.500" fontSize="lg" mx="3" mt="0.5">0</Text>
                    </Box>
                    <Box style={styles.inner}>
                        <Text color="white" fontSize="xl" pt="2" pb="1" mx="2">Friend Count: </Text>
                        <Text color="dark.500" fontSize="lg" mx="3" mt="0.5">0</Text>
                        <TouchableOpacity onPress={requests}>
                            <Text color="white" fontSize="xl" pt="2" pb="1" mx="2">Friend Requests: </Text>
                            <Text color="dark.500" fontSize="lg" mx="3" mt="0.5">0</Text>
                        </TouchableOpacity>
                    </Box>
                </Box>
            </Box>
            <Button mt="3" w="35%" ml="58%" onPress={logOut}>Log Out</Button>
        </Box>
    )
}

const styles = StyleSheet.create({
    stats: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    inner: {
        flexDirection: "column",
        paddingBottom: "5%",
    },
    main: {
        backgroundColor: "#18181b",
        height: "100%",
        width: "100%",
    },
})

export default Profile