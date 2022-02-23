import { useEffect, useState } from "react"
import { Box, Text, Button, Progress } from "native-base"


const Pomodoro = () => {
    const [time, setTime] = useState(25 * 60)
    const [isRunning, setIsRunning] = useState(false)

        useEffect(() => {
            const interval = setInterval(() => {
                if (isRunning && time > 0) {
                    setTime(time => time - 1);
                }
            }, 1000);
            return () => clearInterval(interval);
        }, [isRunning, time])

    const minutes = Math.floor(time / 60)
    let seconds = time - minutes * 60

    seconds = (seconds < 10 ? '0' : '') + seconds;

    return (
        <Box>
            <Text fontSize="lg" color="white">{minutes}:{seconds}</Text>
            <Progress m="2" value={time / (25 * 60)} />
            <Button onPress={() => setIsRunning(true)}>Start</Button>
            <Button onPress={() => setIsRunning(false)}>Pause</Button>
        </Box>
    )
        
}

export default Pomodoro