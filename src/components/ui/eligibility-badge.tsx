import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { Palette } from '@/constants/theme';

export type Eligibility = 'noProof' | 'uncapped';

const BADGES = {
  noProof: {
    label: 'No proof',
    icon: require('@/assets/images/icons/check.svg'),
    background: Palette.mint,
    color: Palette.green[800],
  },
  uncapped: {
    label: 'Uncapped',
    icon: require('@/assets/images/icons/star.svg'),
    background: Palette.cream,
    color: Palette.amber,
  },
};

type EligibilityBadgeProps = {
  kind: Eligibility;
  /** "large" is the bigger pill on Settlement Details. */
  size?: 'small' | 'large';
};

/** Pill with a label, e.g. "No proof ✓". */
export function EligibilityBadge({ kind, size = 'small' }: EligibilityBadgeProps) {
  const badge = BADGES[kind];
  const large = size === 'large';
  const iconSize = large ? 16 : kind === 'noProof' ? 11 : 14;
  return (
    <View style={[styles.pill, large && styles.pillLarge, { backgroundColor: badge.background }]}>
      <Text style={[styles.label, large && styles.labelLarge, { color: badge.color }]}>
        {badge.label}
      </Text>
      <Image source={badge.icon} style={{ width: iconSize, height: iconSize }} />
    </View>
  );
}

/** Round icon-only version, used in the Featured legend and on featured cards. */
export function EligibilityIcon({
  kind,
  size,
  iconSize,
}: {
  kind: Eligibility;
  size: number;
  iconSize: number;
}) {
  const badge = BADGES[kind];
  return (
    <View
      style={[
        styles.circle,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: badge.background },
      ]}>
      <Image source={badge.icon} style={{ width: iconSize, height: iconSize }} />
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    height: 23,
    paddingHorizontal: 8,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  pillLarge: {
    height: 34,
    paddingHorizontal: 19,
    borderRadius: 17,
    alignSelf: 'flex-start',
    gap: 2,
  },
  label: {
    fontSize: 13,
    letterSpacing: -0.26,
    fontWeight: '600',
  },
  labelLarge: {
    fontSize: 15,
    letterSpacing: -0.3,
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
