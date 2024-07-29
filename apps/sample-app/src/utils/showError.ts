import { Alert } from 'react-native';

export const showError = (error: any) => {
  Alert.alert('Error', JSON.stringify(error));
};
