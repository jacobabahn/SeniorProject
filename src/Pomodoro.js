import { useEffect, useRef, useState, useContext } from "react"
import { Box, Text, Button, Progress, Center, AlertDialog } from "native-base"
import { StyleSheet, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"

const Pomodoro = () => {
    const defaulTime = useRef(25 * 60)
    const breakTime = useRef(5 * 60)
    const isStarted = useRef(false)
    const isBreak = useRef(false)
    const totTime = useRef(0)
    const [time, setTime] = useState(defaulTime.current)
    const [startMin, setStartMin] = useState(Math.floor(time / 60))
    const [breakMin, setBreakMin] = useState(Math.floor(breakTime.current / 60))
    const [isRunning, setIsRunning] = useState()
    const navigation = useNavigation()

        useEffect(() => {
            const interval = setInterval(() => {
                if (isRunning && time > 0) {
                    setTime(time => time - 1)
                    totTime.current += 1
                } else if (time === 0) {
                    // handleReset()
                }
            }, 1000);
            return () => clearInterval(interval);
        }, [isRunning, time])

    const minutes = Math.floor(time / 60)
    let seconds = time - minutes * 60

    seconds = (seconds < 10 ? '0' : '') + seconds;

    const handleButton = () => {
        isStarted.current = true
        setIsRunning(!isRunning)
    }

    const handleReset = () => {
        console.log("reset")
        isBreak.current = !isBreak.current
        if (isBreak.current) {
            return (
                <Box mt="60%">
                    <Center>
                        <Button m="3" mt="3" bg="info.700" rounded="2xl" w="70%" onPress={handleBreakStart}>Start Break</Button>
                        <Button m="3" bg="info.700" rounded="2xl" w="70%" onPress={() => setTime(defaulTime.current)}>Restart Timer</Button>
                    </Center>
                </Box>
            )
        } else {
            setIsRunning(false)
            isStarted.current = false
            setTime(defaulTime.current)
        }
    }

    const handleBreakStart = () => {
        setTime(breakTime.current)
        return (
            <Box h="100%" w="100%">
                <Center>
                    <Text style={style.time} mt="45%" fontSize="8xl" color="white">{minutes}:{seconds}</Text>
                </Center>
                {/* <Progress colorScheme="info" size="lg" m="6" value={Math.abs(100 - (time / (breakMin * 60) * 100))} /> */}
                <Box style={style.buttons}>
                    {!isRunning || !isStarted.current ? <Button bg="info.700" rounded="2xl" w="30%" onPress={handleButton}>Start</Button> :
                                                        <Button bg="info.700" rounded="2xl" w="30%" onPress={handleButton}>Pause</Button>}
                </Box>
            </Box>
        )
    }

    const handleEndSession = () => {
        return (
            Alert.alert(
                "End Session",
                "If you end your session, you will not be able to resume it later.",
                [
                    {
                        text: "Cancel",
                        // onPress: () => navigation.navigate("Timer"),
                        onPress: () => {},
                        style: "cancel"
                    },
                    {
                        text: "Ok",
                        onPress: () => {
                            navigation.navigate("CreateSession", {time: totTime.current})
                            totTime.current = 0
                            setTime(defaulTime.current)
                        }
                    }
                ]
            )
        )
    }

    const handlePomodoroStart = () => {
        return (
            <Box h="100%" w="100%">
                <Center>
                    <Text style={style.time} mt="45%" fontSize="8xl" color="white">{minutes}:{seconds}</Text>
                </Center>
                <Progress colorScheme="info" size="lg" m="6" value={Math.abs(100 - (time / (startMin * 60) * 100))} />
                <Box style={style.buttons}>
                    {!isRunning || !isStarted.current ? <Center w="100%">
                                                            <Button bg="info.700" m="6" rounded="2xl" w="30%" onPress={handleButton}>Start</Button> 
                                                            <Button bg="info.700" rounded="2xl" w="30%" onPress={handleEndSession}>End Session</Button>
                                                        </Center> :
                                                        <Button bg="info.700" m="6" rounded="2xl" w="30%" onPress={handleButton}>Pause</Button>}
                </Box>
            </Box>
        )
    }

    return (
            <Box h="100%" w="100%" bg="dark.50">
                { time === 0 && isStarted.current ? handleReset() : handlePomodoroStart() }
            </Box>
    )
        
}

const style = StyleSheet.create({
    buttons: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: "10%"
    },
    time: {
        fontVariant: ["tabular-nums"],
    },
    card: {
    }
})

export default Pomodoro