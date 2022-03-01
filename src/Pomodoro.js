import { useEffect, useRef, useState } from "react"
import { Box, Text, Button, Progress, Center } from "native-base"
import { StyleSheet } from "react-native"


const Pomodoro = () => {
    const defaulTime = useRef(25 * 60)
    const breakTime = useRef(5 * 60)
    const isStarted = useRef(false)
    const isBreak = useRef(false)
    const [time, setTime] = useState(defaulTime.current)
    const [startMin, setStartMin] = useState(Math.floor(time / 60))
    const [isRunning, setIsRunning] = useState()

        useEffect(() => {
            const interval = setInterval(() => {
                if (isRunning && time > 0) {
                    setTime(time => time - 1)
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
            console.log("break")
            return (
                <Box mt="60%">
                    <Center>
                        <Button m="3" bg="info.700" rounded="2xl" w="70%" onPress={handleBreakStart}>Start Break</Button>
                        <Button m="3" bg="info.700" rounded="2xl" w="70%" onPress={() => setTime(defaulTime.current)}>Restart Timer</Button>
                    </Center>
                </Box>
            )
        } else {
            console.log("not Break")
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
                <Progress colorScheme="info" size="lg" m="6" value={Math.abs(100 - (time / (startMin * 60) * 100))} />
                <Box style={style.buttons}>
                    {!isRunning || !isStarted.current ? <Button bg="info.700" rounded="2xl" w="30%" onPress={handleButton}>Start</Button> :
                                                        <Button bg="info.700" rounded="2xl" w="30%" onPress={handleButton}>Pause</Button>}
                </Box>
            </Box>
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
                    {!isRunning || !isStarted.current ? <Button bg="info.700" rounded="2xl" w="30%" onPress={handleButton}>Start</Button> :
                                                        <Button bg="info.700" rounded="2xl" w="30%" onPress={handleButton}>Pause</Button>}
                </Box>
            </Box>
        )
    }

    return (
        <Box h="100%" w="100%">
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
    }
})

export default Pomodoro