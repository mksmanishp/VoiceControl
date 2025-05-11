import NativeLocalStorage from "../../specs/NativeLocalStorage";

export const getStoredValue = async (key: string): Promise<string | null> => {
    try {
        return await NativeLocalStorage?.getItem(key) ?? null;
    } catch (error) {
        console.error(`Failed to get stored value for key "${key}":`, error);
        return null;
    }
};

export const setStoredValue = async (key: string, value: string): Promise<void> => {
    try {
        await NativeLocalStorage?.setItem(value, key);
    } catch (error) {
        console.error(`Failed to set stored value for key "${key}":`, error);
    }
};

export const removeStoredValue = async (key: string): Promise<void> => {
    try {
        await NativeLocalStorage?.removeItem(key);
    } catch (error) {
        console.error(`Failed to remove stored value for key "${key}":`, error);
    }
};

export const clearAllStorage = async (): Promise<void> => {
    try {
        await NativeLocalStorage?.clear();
    } catch (error) {
        console.error("Failed to clear all storage:", error);
    }
};
