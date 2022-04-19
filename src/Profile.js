import { Text, Box, Center, Divider, Pressable } from "native-base"
import { StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native"

const Profile = () => {
    const navigation = useNavigation()

    const requests = () => {
        navigation.navigate("FriendRequests")
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
                        <Text color="dark.500" fontSize="lg" mx="3" mt="0.5">jdoe@gmail.com</Text>
                    </Box>
                    <Box style={styles.inner}>
                        <Text color="white" fontSize="xl" pt="2" pb="1" mx="2">UserName: </Text>
                        <Text color="dark.500" fontSize="lg" mx="3" mt="0.5">jdoe</Text>
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
    }
})

export default Profile