import { Pressable, StyleSheet, Text, View } from 'react-native';

import { purpleGradient } from '@/components/ui/gradient';
import { Palette } from '@/constants/theme';

export function UpgradeBanner({ onUpgrade }: { onUpgrade: () => void }) {
  return (
    <View style={styles.banner}>
      <View style={styles.copy}>
        <Text style={styles.title}>Unlimited Claims</Text>
        <Text style={styles.subtitle}>Become a member for only $9.99</Text>
      </View>
      <Pressable accessibilityRole="button" onPress={onUpgrade} style={styles.button}>
        <Text style={styles.buttonText}>Upgrade</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    paddingHorizontal: 22,
    paddingVertical: 29,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...purpleGradient(105.8),
  },
  copy: {
    flex: 1,
    maxWidth: 196,
    marginRight: 12,
    gap: 2,
  },
  title: {
    color: Palette.white,
    fontSize: 20,
    lineHeight: 20,
    fontWeight: '700',
  },
  subtitle: {
    color: Palette.white,
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '600',
  },
  button: {
    width: 97,
    padding: 8,
    borderRadius: 5,
    backgroundColor: Palette.white,
    alignItems: 'center',
  },
  buttonText: {
    color: Palette.purple[700],
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '600',
  },
});
