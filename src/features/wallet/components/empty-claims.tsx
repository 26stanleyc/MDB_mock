import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { Palette } from '@/constants/theme';

export function EmptyClaims({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.empty}>
      <Image source={require('@/assets/images/icons/clock.svg')} style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 28,
    height: 28,
  },
  title: {
    marginTop: 6,
    color: Palette.neutral[600],
    fontSize: 16,
    lineHeight: 28,
    fontWeight: '600',
  },
  subtitle: {
    marginTop: -6,
    color: Palette.neutral[600],
    opacity: 0.59,
    fontSize: 14,
    lineHeight: 28,
  },
});
