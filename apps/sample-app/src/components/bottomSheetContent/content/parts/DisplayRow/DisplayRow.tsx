import { View } from 'react-native';

import { Text } from 'react-native-paper';

import { DisplayEntry } from '@/components/bottomSheetContent/content/parts/DisplayRow/DisplayEntry.types';

import { styles } from './DisplayRow.styles';

interface Props {
  displayEntry: DisplayEntry;
}

const notAvailableLabel = 'N/A';

export const DisplayRow = ({ displayEntry }: Props) => {
  return (
    <View style={styles.container}>
      <Text variant="labelMedium" style={styles.labelText}>
        {displayEntry.label}:
      </Text>
      <Text variant="bodyMedium" style={styles.valueText}>
        {displayEntry.value || notAvailableLabel}
      </Text>
    </View>
  );
};
