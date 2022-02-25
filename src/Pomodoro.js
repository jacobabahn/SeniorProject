import { useEffect, useState } from "react"
import { Box, Text, Button, Progress, Center } from "native-base"
import { StyleSheet } from "react-native"


const Pomodoro = () => {
    const [time, setTime] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [isStarted, setIsStarted] = useState(false)
    const [reset, setReset] = useState(false)
    const [isBreak, setIsBreak] = useState(false)

        useEffect(() => {
            const interval = setInterval(() => {
                if (isRunning && time > 0) {
                    setTime(time => time - 1);
                } else if (time === 0) {
                    handleReset()
                }
            }, 1000);
            return () => clearInterval(interval);
        }, [isRunning, time])

    const minutes = Math.floor(time / 60)
    let seconds = time - minutes * 60

    seconds = (seconds < 10 ? '0' : '') + seconds;

    const handleButton = () => {
        setIsStarted(true)
        setIsRunning(!isRunning)
    }

    const handleReset = () => {
        // setIsStarted(false)
        // setIsRunning(false)
        if (isBreak) {
            return (
                <Box mt="60%">
                    <Center>
                        <Button m="3" bg="info.700" rounded="2xl" w="70%" onPress={() => handleBreakStart()}>Start Break</Button>
                        <Button m="3" bg="info.700" rounded="2xl" w="70%" onPress={() => handlePomodoroStart()}>Restart Timer</Button>
                    </Center>
                </Box>
            )
        } else {
            handlePomodoroStart()
            setIsBreak(true)
        }
    }

    const handleBreakStart = () => {
        console.log("here")
        setIsBreak(false)
        setTime(5 * 60)
        return (
            <Box h="100%" w="100%">
                <Center>
                    <Text style={style.time} mt="45%" fontSize="8xl" color="white">{minutes}:{seconds}</Text>
                </Center>
                <Progress colorScheme="info" size="lg" m="6" value={Math.abs((time / (5 * 60) * 100) - 100)} />
                <Box style={style.buttons}>
                    {!isRunning || !isStarted ? <Button bg="info.700" rounded="2xl" w="30%" onPress={handleButton}>Start</Button> :
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
                <Progress colorScheme="info" size="lg" m="6" value={Math.abs((time / (25 * 60) * 100) - 100)} />
                <Box style={style.buttons}>
                    {!isRunning || !isStarted ? <Button bg="info.700" rounded="2xl" w="30%" onPress={handleButton}>Start</Button> :
                                                <Button bg="info.700" rounded="2xl" w="30%" onPress={handleButton}>Pause</Button>}
                </Box>
            </Box>
        )
    }

    return (
        handlePomodoroStart()
        // handleReset()
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