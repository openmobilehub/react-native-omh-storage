import AsyncStorage from '@react-native-async-storage/async-storage';

interface Storage {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
}

const asyncStorage: Storage = {
  async get(key) {
    return await AsyncStorage.getItem(key);
  },
  async set(key, value) {
    return await AsyncStorage.setItem(key, value);
  },
  async delete(key) {
    return await AsyncStorage.removeItem(key);
  },
};

export default asyncStorage;
