import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    Button,
    Alert,
    TouchableOpacity,
} from 'react-native';
import {
    getStoredValue,
    setStoredValue,
    removeStoredValue,
    clearAllStorage,
} from "../components/Helper";

const EMPTY = '<empty>';

function LocalStorage(): React.JSX.Element {
    const [key, setKey] = useState<string>('');
    const [value, setValue] = useState<string | null>(null);
    const [editingValue, setEditingValue] = useState<string | null>(null);

    useEffect(() => {
        const fetchValue = async () => {
            if (key) {
                const storedValue = await getStoredValue(key);
                setValue(storedValue ?? '');
            }
        };

        fetchValue();
    }, [key]);

    async function saveValue() {
        if (!key) return Alert.alert("Please provide a key.");
        const newValue = editingValue ?? EMPTY;
        await setStoredValue(key, newValue);
        setValue(newValue);
    }

    async function deleteValue() {
        if (!key) return Alert.alert("Please provide a key.");
        await removeStoredValue(key);
        setValue('');
    }

    async function clearAll() {
        await clearAllStorage();
        setValue('');
        setKey('');
    }

    return (
        <SafeAreaView style={{}}>
            <Text style={styles.text}>
                Current stored value is: {value ?? 'No Value'}
            </Text>
            <TextInput
                placeholder="Enter the key"
                style={styles.textInput}
                onChangeText={setKey}
                value={key}
            />
            <TextInput
                placeholder="Enter the text you want to store"
                style={styles.textInput}
                onChangeText={setEditingValue}
                value={editingValue ?? ''}
            />

            <TouchableOpacity style={styles.button} onPress={saveValue}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={deleteValue}>
                <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={clearAll}>
                <Text style={styles.buttonText}>Clear All</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    text: {
        margin: 10,
        fontSize: 20,
    },
    textInput: {
        margin: 10,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        marginVertical: 5,
        borderRadius: 8,
        alignItems: 'center',

    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default LocalStorage;
