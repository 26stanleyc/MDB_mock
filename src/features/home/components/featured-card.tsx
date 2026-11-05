import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { EligibilityIcon } from '@/components/ui/eligibility-badge';
import { Palette } from '@/constants/theme';

import type { FeaturedSettlement } from '../api';

type FeaturedCardProps = {
  settlement: FeaturedSettlement;
  onOpen: () => void;
};

export function FeaturedCard({ settlement, onOpen }: FeaturedCardProps) {
  const progress = settlement.claimsFiled / settlement.claimsTotal;

  return (
    // No button role here: the Claim button inside is the accessible button (web can't nest them).
    <Pressable onPress={onOpen} style={styles.card}>
      <View style={styles.top}>
        <Image
          source={require('@/assets/images/home/settlement-thumb.png')}
          style={styles.thumb}
          contentFit="cover"
        />
        <View style={styles.info}>
          <View style={styles.amountRow}>
            <Text style={styles.amount}>{settlement.amount}</Text>
            {settlement.eligibility && (
              <EligibilityIcon kind={settlement.eligibility} size={25} iconSize={18} />
            )}
          </View>
          <Text style={styles.due}>{settlement.due}</Text>
        </View>
        <Pressable accessibilityRole="button" onPress={onOpen} style={styles.claim}>
          <Text style={styles.claimText}>Claim</Text>
        </Pressable>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${progress * 100}%` }]} />
      </View>
      <Text style={styles.caption}>
        {settlement.claimsFiled} out of {settlement.claimsTotal} claims filled 🎉
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 375,
    height: 132,
    paddingHorizontal: 23,
    paddingTop: 22,
    borderRadius: 15,
    backgroundColor: Palette.white,
    boxShadow: `0px 0px 4px 1px ${Palette.shadowSoft}`,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumb: {
    width: 45,
    height: 45,
    borderRadius: 5,
  },
  info: {
    flex: 1,
    marginLeft: 11,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  amount: {
    color: Palette.black,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '700',
  },
  due: {
    color: Palette.slate,
    fontSize: 15,
    lineHeight: 18,
  },
  claim: {
    width: 88,
    height: 35,
    borderRadius: 5,
    backgroundColor: Palette.purple[700],
    alignItems: 'center',
    justifyContent: 'center',
  },
  claimText: {
    color: Palette.white,
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '600',
  },
  track: {
    height: 7,
    marginTop: 17,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Palette.neutral[200],
  },
  fill: {
    height: '100%',
    borderRadius: 16,
    backgroundColor: Palette.purple[800],
  },
  caption: {
    marginTop: 7,
    color: Palette.slate,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
});
