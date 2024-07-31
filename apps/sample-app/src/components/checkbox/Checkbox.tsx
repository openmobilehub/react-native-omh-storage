import React from 'react';

import { Checkbox as PaperCheckbox } from 'react-native-paper';

import { styles } from './Checkbox.styles';

type Props = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label: string;
  enabled?: boolean;
};

export const Checkbox = ({
  value,
  onValueChange,
  label,
  enabled = true,
}: Props) => {
  const handlePress = () => {
    onValueChange(!value);
  };

  return (
    <PaperCheckbox.Item
      mode="android"
      disabled={!enabled}
      style={styles.checkbox}
      status={value ? 'checked' : 'unchecked'}
      onPress={handlePress}
      label={label}
      position="leading"
      labelStyle={styles.label}
    />
  );
};
