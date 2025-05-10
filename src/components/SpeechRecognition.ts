// src/utils/SpeechRecognition.ts

import { NativeEventEmitter, NativeModules, Platform } from 'react-native';

const { SpeechRecognizerModule } = NativeModules;
const speechRecognizerEmitter = new NativeEventEmitter(SpeechRecognizerModule);

type SpeechEventListener = (result: string) => void;
type ErrorEventListener = (error: string) => void;

class SpeechRecognition {
    private onSpeechResultsListener?: SpeechEventListener;
    private onSpeechErrorListener?: ErrorEventListener;

    constructor() {
        if (Platform.OS === 'android') {
            speechRecognizerEmitter.addListener('onSpeechResults', (result: string) => {
                this.onSpeechResultsListener?.(result);
            });

            speechRecognizerEmitter.addListener('onSpeechError', (error: string) => {
                this.onSpeechErrorListener?.(error);
            });
        }
    }

    startListening(language: string = 'en-US') {
        SpeechRecognizerModule.startListening(language);
    }

    stopListening() {
        SpeechRecognizerModule.stopListening();
    }

    onResults(callback: SpeechEventListener) {
        this.onSpeechResultsListener = callback;
    }

    onError(callback: ErrorEventListener) {
        this.onSpeechErrorListener = callback;
    }

    removeListeners() {
        if (Platform.OS === 'android') {
            speechRecognizerEmitter.removeAllListeners('onSpeechResults');
            speechRecognizerEmitter.removeAllListeners('onSpeechError');
        }
    }
}

export default new SpeechRecognition();
