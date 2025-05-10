// moveLogic.ts
import Voice from '@react-native-voice/voice';
import { useState, useEffect } from 'react';

// Define GRID_SIZE constant for the grid size
const GRID_SIZE = 9;

export const useVoiceControl = (setPosition: any, setCommands: any) => {
    const [isRecording, setIsRecording] = useState(false);

    // Effect hook to set up and clean up the voice recognition events
    useEffect(() => {
        Voice.onSpeechResults = handleSpeechResults;
        Voice.onSpeechError = handleSpeechError;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const handleSpeechResults = (event: any) => {
        const result = event.value[0];
        console.log(result)
        addCommand(result);
        processVoiceCommand(result);
    };

    const processVoiceCommand = (command: string) => {
        if (command.includes('left')) {
            moveDot('left');
        } else if (command.includes('right')) {
            moveDot('right');
        } else if (command.includes('up')) {
            moveDot('up');
        } else if (command.includes('down')) {
            moveDot('down');
        } else if (command.startsWith('move')) {
            const match = command.match(/move (\w+) by (\d+)/);
            if (match) {
                const direction = match[1];
                const steps = parseInt(match[2], 10);
                moveDot(direction, steps);
            }
        }
    };

    const moveDot = (direction: string, steps: number = 1) => {
        setPosition((prev: { x: number, y: number }) => {
            let { x, y } = prev;
            switch (direction) {
                case 'up':
                    y = (y - steps + GRID_SIZE) % GRID_SIZE;
                    break;
                case 'down':
                    y = (y + steps) % GRID_SIZE;
                    break;
                case 'left':
                    x = (x - steps + GRID_SIZE) % GRID_SIZE;
                    break;
                case 'right':
                    x = (x + steps) % GRID_SIZE;
                    break;
            }
            return { x, y };
        });
    };

    const addCommand = (command: string) => {
        setCommands((prev: string[]) => [command, ...prev].slice(0, 3));
    };

    const handleSpeechError = (error: any) => {
        console.error("Speech Error:", error);
    };

    const startRecording = async () => {
        try {
            await Voice.start('en-US');
            setIsRecording(true);
        } catch (error) {
            console.error("Error starting voice recognition:", error);
        }
    };

    const stopRecording = async () => {
        try {
            await Voice.stop();
            setIsRecording(false);
        } catch (error) {
            console.error("Error stopping voice recognition:", error);
        }
    };

    return {
        isRecording,
        startRecording,
        stopRecording,
    };
};
