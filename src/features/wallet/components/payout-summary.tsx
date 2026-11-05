import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { purpleGradient } from '@/components/ui/gradient';
import { Palette } from '@/constants/theme';

type PayoutSummaryProps = {
  estimatedPayout: string;
  claimed: number;
  notified: number;
  onInfo: () => void;
};

export function PayoutSummary({ estimatedPayout, claimed, notified, onInfo }: PayoutSummaryProps) {
  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Estimated Payout</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="How estimated payouts work"
          hitSlop={8}
          onPress={onInfo}>
          <Image source={require('@/assets/images/icons/question-white.svg')} style={styles.info} />
        </Pressable>
      </View>
      <Text style={styles.amount}>{estimatedPayout}</Text>
      <View style={styles.stats}>
        <Stat label="# Claimed" value={claimed} />
        <Stat label="Notified" value={notified} />
      </View>
    </View>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 29,
    paddingVertical: 25,
    borderRadius: 15,
    ...purpleGradient(99),
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: Palette.white,
    fontSize: 24,
    lineHeight: 32,
  },
  info: {
    width: 24,
    height: 24,
  },
  amount: {
    marginTop: 18,
    color: Palette.white,
    fontSize: 40,
    lineHeight: 40,
    fontWeight: '700',
  },
  stats: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    gap: 6,
  },
  statLabel: {
    color: Palette.whiteAlpha72,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  statValue: {
    color: Palette.white,
    fontSize: 24,
    lineHeight: 24,
    letterSpacing: 0.25,
    fontWeight: '700',
  },
});
