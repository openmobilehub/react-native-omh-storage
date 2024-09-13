import React from 'react';
import { Platform, View, ViewProps } from 'react-native';

import { Icon, Text, useTheme } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

import { styles } from '@/components/picker/Picker.styles';

export type Choice<T> = { label: string; value: T; key: string };

export type PickerProps<T> = {
  value: T;
  label: string;
  choices: Choice<T>[];
  onChange: (value: T) => void;
  style?: ViewProps['style'];
  centeredLabel?: boolean;
  disabled?: boolean;
};

export default function Picker<T>({
  value,
  label,
  choices,
  onChange,
  style,
  disabled = false,
}: PickerProps<T>) {
  const theme = useTheme();

  const renderIcon = () => {
    if (Platform.OS === 'android') {
      // Android displays icon natively
      return null;
    }

    return (
      <Icon
        source="menu-down"
        size={24}
        color={
          disabled ? theme.colors.onSurfaceDisabled : theme.colors.onSurface
        }
      />
    );
  };

  return (
    <View style={[styles.wrapper, style]}>
      <Text style={[styles.label, disabled && styles.disabled]}>{label}</Text>

      <RNPickerSelect
        onValueChange={(newValue: T) => {
          const newChoice = choices.find((p) => p.value === newValue);

          if (!newChoice) {
            console.warn(
              `[Picker] Couldn't find just-selected value '${newValue}' in choices`
            );
            return;
          }

          onChange(newChoice?.value);
        }}
        value={value}
        placeholder={
          // empty object to disable placeholder
          {}
        }
        Icon={renderIcon}
        items={choices.map((choice) => ({
          label: choice.label,
          value: choice.value,
          key: choice.key,
          color: theme.colors.onSurface,
          testID: `create-file-picker-item-${choice.key}`,
        }))}
        disabled={disabled}
        style={{
          viewContainer: {
            flex: 3,
            justifyContent: 'center',
          },
          inputIOSContainer: {
            height: 24,
            justifyContent: 'center',
          },
          inputAndroid: disabled ? styles.disabled : undefined,
          inputIOS: disabled ? styles.disabled : undefined,
          chevronUp: { display: 'none' },
          chevronDown: { display: 'none' },
        }}
      />
    </View>
  );
}
