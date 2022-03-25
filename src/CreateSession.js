import { Box, Input, TextArea, Center, Text, Divider, Button } from "native-base"
import { StyleSheet } from "react-native"

const CreateSession = () => {
    return (
        <Box h="100%" w="100%">
            <Center>
                <Text color="dark.600" fontSize="3xl" pt="4" pb="2">Create Session</Text>
                <Divider bg="dark.400" variant="horizontal" w="90%" m="1" thickness="0.5" />
            </Center>

            <Input variant="outline" mx="3" my="10" h="11%" fontSize={23} borderColor="dark.400" color="white" placeholder="Session Name" />
            <TextArea mx="3" h="30%" fontSize={25} borderColor="dark.400" color="white" placeholder="Session Description" />
            <Text mx="3" mt="10" fontSize={25} color="dark.500">Duration: 1:24</Text>
            <Button style={styles.upload} mt="5" rounded="xl" bg="info.700" onPress={() => {} }>Upload</Button>
        </Box>
    )
}

const styles = StyleSheet.create({
    upload: {
        width: "25%",
        height: "6%",
        position: "absolute",
        bottom: "5%",
        right: "5%",
    }
})

export default CreateSession