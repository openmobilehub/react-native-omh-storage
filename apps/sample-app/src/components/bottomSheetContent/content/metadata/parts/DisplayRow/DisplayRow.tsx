import { View } from 'react-native';

import { Text } from 'react-native-paper';

import { DisplayEntry } from '../../getDisplayData';
import { styles } from './DisplayRow.styles';

interface Props {
  displayEntry: DisplayEntry;
}

const notAvailableLabel = 'N/A';

export const DisplayRow = ({ displayEntry }: Props) => {
  return (
    <View style={styles.container}>
      <Text variant="labelMedium">{displayEntry.label}:</Text>
      <Text variant="bodyMedium">
        {displayEntry.value || notAvailableLabel}
      </Text>
    </View>
  );
};
