import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Canvas, Path, Skia, Circle, Group } from '@shopify/react-native-skia';
import { moderateScale } from 'react-native-size-matters';

const GRID_SIZE = 9;
const CELL_SIZE = moderateScale(40);

const VoiceControlledGrid: React.FC = () => {
    const [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    const [commands, setCommands] = useState<string[]>([]);
    const [isRecording, setIsRecording] = useState(false);

    const moveDot = (direction: string, steps: number = 1) => {
        setPosition(prev => {
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
        setCommands(prev => [command, ...prev].slice(0, 3));
    };

    const handleStartStopRecording = () => {
        setIsRecording(prev => !prev);
        // Simulate recording status for testing purposes
        if (isRecording) {
            // Stop recording action logic (e.g., invoke speech recognition here)
        } else {
            // Start recording action logic (e.g., start speech recognition here)
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

    return (
        <GestureHandlerRootView style={styles.container}>
            <Canvas style={styles.canvas}>
                <Group>
                    <Path path={createGridPath()} color="#888" style="stroke" strokeWidth={2} />
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
                    onPress={handleStartStopRecording}
                >
                    <Text style={styles.buttonText}>
                        {isRecording ? 'Stop Recording' : 'Start Recording'}
                    </Text>
                </TouchableOpacity>
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginTop: 20,
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    recordingButton: {
        backgroundColor: '#FF6347',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default VoiceControlledGrid;
