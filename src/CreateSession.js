import { Box, Input, TextArea, Center, Text, Divider, Button } from "native-base"
import { StyleSheet } from "react-native"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "../App"
import { supabase } from "../utils/supabase"

const CreateSession = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const userSession = useContext(UserContext)

    const handleUpload = async (name, description) => {
        console.log(name, description, userSession.user.id)
        const { data, error} = await supabase
            .from('Session')
            .insert([{
                title: name, description: description, duration: 0, user_id: userSession.user.id
            }])

    }

    return (
        <Box h="100%" w="100%" style={styles.main}>
            <Center>
                <Text color="dark.600" fontSize="3xl" pt="4" pb="2">Create Session</Text>
                <Divider bg="dark.400" variant="horizontal" w="90%" m="1" thickness="0.5" />
            </Center>

            <Input variant="outline" mx="3" my="10" h="11%" fontSize={23} borderColor="dark.400" color="white" placeholder="Session Name" value={name} onChange={(e) => setName(e.target.value)}/>
            <TextArea mx="3" h="30%" fontSize={25} borderColor="dark.400" color="white" placeholder="Session Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <Text mx="3" mt="10" fontSize={25} color="dark.500">Duration: 1:24</Text>
            <Button style={styles.upload} mt="5" rounded="xl" bg="info.700" onPress={() => handleUpload({name}, {description})}>Upload</Button>
        </Box>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#18181b",
    },
    upload: {
        width: "25%",
        height: "6%",
        position: "absolute",
        bottom: "5%",
        right: "5%",
    }
})

export default CreateSession