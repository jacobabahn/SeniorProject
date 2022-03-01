import { View, FlatList, StyleSheet} from "react-native"
import { useState, useEffect } from "react"
import Card from "../components/SessionCard"
// Initialize the JS client
import { supabase } from "./supabase"
import { Center, Box, Text, Divider } from "native-base"

const ViewSessions = () => {
    const [tdata, setTData] = useState([])
    
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let { data: test, error } = await supabase
            .from('test')
            .select('*')
        
        setTData(test)
    }

    const Item = ({ item }) => (
        <Card title={item.title} description="This is a description... testing 1 2 3" />
    )
    
    return (
        <Box h="100%" w="100%">
            <Center>
                <Text color="dark.600" fontSize="3xl" pt="4" pb="2">Your Sessions</Text>
                <Divider bg="dark.400" variant="horizontal" w="90%" m="1" thickness="0.5" />
            </Center>
            <FlatList style={styles.flatList} data={tdata} renderItem={Item} /> 
        </Box>
    )
}

const styles = StyleSheet.create({
    flatList: {
        height: "100%",
        width: "100%",
    }
})

export default ViewSessions