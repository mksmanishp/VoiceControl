// VoiceControlledGrid.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Canvas, Path, Circle, Group, Skia } from '@shopify/react-native-skia';
import { moderateScale } from 'react-native-size-matters';
import { useVoiceControl } from '../components/useVoiceControl';
import SpeechRecognition from '../components/SpeechRecognition';

// Listen for events


const GRID_SIZE = 9;
const CELL_SIZE = moderateScale(40);

const VoiceControlGridNative: React.FC = () => {
    const [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    const [command, setCommand] = useState('');

    console.log("xfdfsdf")
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

    useEffect(() => {
        SpeechRecognition.onResults((result) => {
            console.log('Speech Result:', result);
            setCommand(result);
        });

        SpeechRecognition.onError((error) => {
            console.error('Speech Error:', error);
        });

        return () => {
            SpeechRecognition.removeListeners();
        };
    }, []);

    const startListening = () => {
        console.log("start")
        SpeechRecognition.startListening();
    };

    const stopListening = () => {
        SpeechRecognition.stopListening();
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

                <TouchableOpacity
                    style={[styles.recordButton]}
                    onPress={startListening}
                >
                    <Text style={styles.buttonText}>
                        {'Start Recording'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.recordButton]}
                    onPress={stopListening}
                >
                    <Text style={styles.buttonText}> {'Stop Recording'}</Text>
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
        borderRadius: moderateScale(20),
    },
});

export default VoiceControlGridNative;
