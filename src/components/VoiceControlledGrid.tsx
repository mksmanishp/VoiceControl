import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Canvas, Path, Skia, Circle, Group } from '@shopify/react-native-skia';
import { moderateScale } from 'react-native-size-matters';
import Voice from '@react-native-voice/voice';

const GRID_SIZE = 9;
const CELL_SIZE = moderateScale(40);

const VoiceControlledGrid: React.FC = () => {

    const [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    const [commands, setCommands] = useState<string[]>([]);
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        Voice.onSpeechResults = handleSpeechResults;
        Voice.onSpeechError = handleSpeechError;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const handleSpeechResults = (event: any) => {
        const result = event.value[0];
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

    const handleSpeechError = (error: any) => {
        console.error("Speech Error:", error);
    };

    const moveDot = (direction: string, steps: number = 1) => {
        setPosition(prev => {
            let { x, y } = prev;
            const GRID_SIZE = 9;
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
        setCommands(prev => [command, ...prev].slice(0, 3));
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

    const createGridPath = () => {
        const path = Skia.Path.Make();
        for (let i = 0; i <= GRID_SIZE; i++) {
            // Vertical lines
            path.moveTo(i * CELL_SIZE, 0);
            path.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);

            // Horizontal lines
            path.moveTo(0, i * CELL_SIZE);
            path.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
        }
        return path;
    };

    // Reset the grid and commands
    const resetGrid = () => {
        setPosition({ x: 0, y: 0 });
        setCommands([]);
        setIsRecording(false);
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <Canvas style={styles.canvas}>
                <Group>
                    <Path path={createGridPath()} color="#888" style="stroke" strokeWidth={3} />
                    <Circle
                        cx={position.x * CELL_SIZE + CELL_SIZE / 2}
                        cy={position.y * CELL_SIZE + CELL_SIZE / 2}
                        r={CELL_SIZE / 3}
                        color="#FF6347"
                    />
                </Group>
            </Canvas>

            <View style={styles.infoPanel}>
                <Text style={styles.infoText}>Position: ({position.x}, {position.y})</Text>

                <View style={styles.commandList}>
                    <Text style={styles.commandText}>Previous Commands:</Text>
                    {commands.map((cmd, index) => (
                        <Text key={index} style={styles.commandText}>{cmd}</Text>
                    ))}
                </View>

                <TouchableOpacity
                    style={[styles.recordButton, isRecording && styles.recordingButton]}
                    onPress={isRecording ? stopRecording : startRecording}
                >
                    <Text style={styles.buttonText}>
                        {isRecording ? 'Stop Recording' : 'Start Recording'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.reset]}
                    onPress={resetGrid}
                >
                    <Text style={styles.buttonText}>
                        {'Reset'}
                    </Text>
                </TouchableOpacity>
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    canvas: {
        width: GRID_SIZE * CELL_SIZE,
        height: GRID_SIZE * CELL_SIZE,
    },
    infoPanel: {
        marginTop: 20,
        alignItems: 'center',
    },
    infoText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    commandList: {
        marginTop: 10,
        alignItems: 'center',
    },
    commandText: {
        fontSize: 16,
        color: '#555',
    },
    recordButton: {
        marginTop: moderateScale(80),
        backgroundColor: '#007AFF',
        padding: moderateScale(15),
        paddingHorizontal: moderateScale(50),
        borderRadius: moderateScale(20),
    },
    recordingButton: {
        backgroundColor: '#FF6347',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    reset: {
        marginTop: moderateScale(10),
        backgroundColor: '#007AFF',
        padding: moderateScale(15),
        paddingHorizontal: moderateScale(77),
        borderRadius: moderateScale(20),
    },
});

export default VoiceControlledGrid;
