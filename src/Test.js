import { View, Text} from "react-native"
import { useState, useEffect } from "react"
// Initialize the JS client
import { supabase } from "./supabase"

const Test = () => {
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

    return (
        <View>
            {tdata.map((item, index) => (
                <Text key={index}>{item.title}</Text>
            ))}
        </View>
    )
}

export default Test