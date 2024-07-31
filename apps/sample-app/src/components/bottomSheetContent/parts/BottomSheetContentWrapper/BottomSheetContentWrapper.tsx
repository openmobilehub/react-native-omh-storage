import { ReactNode } from 'react';
import { View } from 'react-native';

import { Divider, Text } from 'react-native-paper';
import { VariantProp } from 'react-native-paper/lib/typescript/components/Typography/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles } from './BottomSheetContentWrapper.styles';

interface Props {
  title: string;
  titleVariant?: VariantProp<never>;
  children: ReactNode;
}

export const BottomSheetContentWrapper = ({
  title,
  titleVariant = 'titleLarge',
  children,
}: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Text variant={titleVariant} style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Divider style={styles.divider} />
      {children}
    </View>
  );
};
