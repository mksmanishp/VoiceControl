// VoiceControlledGrid.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Canvas, Path, Circle, Group, Skia } from '@shopify/react-native-skia';
import { moderateScale } from 'react-native-size-matters';
import { useVoiceControl } from '../components/useVoiceControl';

const GRID_SIZE = 9;
const CELL_SIZE = moderateScale(40);

const VoiceControlledGrid: React.FC = () => {
    const [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    const [commands, setCommands] = useState<string[]>([]);

    // Using the voice control logic hook
    const { isRecording, startRecording, stopRecording } = useVoiceControl(setPosition, setCommands);

    const createGridPath = () => {
        const path = Skia.Path.Make();
        for (let i = 0; i <= GRID_SIZE; i++) {
            path.moveTo(i * CELL_SIZE, 0);
            path.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
            path.moveTo(0, i * CELL_SIZE);
            path.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
        }
        return path;
    };

    const resetGrid = () => {
        setPosition({ x: 0, y: 0 });
        setCommands([]);
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
                    style={styles.reset}
                    onPress={resetGrid}
                >
                    <Text style={styles.buttonText}>Reset</Text>
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
