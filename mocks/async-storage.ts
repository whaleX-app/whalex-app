const asyncStorage: any = jest.createMockFromModule('@react-native-async-storage/async-storage');

asyncStorage.getItem = jest.fn();
asyncStorage.setItem = jest.fn();

export default asyncStorage;
