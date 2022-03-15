import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const SafeArea = () => {
    return (
        <SafeAreaView style={styles.container}>
            {props.children}
        </SafeAreaView>
    )
}

// const style = StyleSheet.create({
//     value: {
//         backgroundColor: "",
//     }
// })