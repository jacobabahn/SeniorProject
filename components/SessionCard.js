import { Box, Center, Divider, Flex, Text} from "native-base"
import { StyleSheet, View } from "react-native"

const Card = (props) => {
    return (
        <Center>
            <Box style={styles.body} p="5" h="auto" w ="90%" bg="dark.100" m="4%" rounded="2xl" shadow="3">
                <Box style={styles.container}>
                    <Text style={styles.title} numberOfLines={1} py="2" px="3" color="white" fontSize="2xl" >{props.title}</Text>
                    <Text numberOfLines={2} w="95%" pl="2" color="lightgray" fontSize="md">{props.description}</Text>
                </Box>
                <Center>
                    <Box style={styles.rounded} bg="info.700" rounded="xl" mb="5" mt="5" mx="3" shadow="3" p="3">
                        <Text h="30px" color="white" fontSize="2xl">{props.duration}</Text>
                    </Box>
                </Center>
            </Box>
        </Center>
    )
}

const styles = StyleSheet.create({
    body: {
        flexDirection: "row",
    },
    container: {
        flexDirection: "column",
        width: "74%",
    },
    rounded: {
        // display: "flex",
        alignItems: "center",
    },
})

export default Card