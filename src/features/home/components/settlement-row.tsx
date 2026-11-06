import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { EligibilityBadge } from '@/components/ui/eligibility-badge';
import { Palette } from '@/constants/theme';
import { dueLabel, eligibilityOf, type Settlement } from '@/lib/settlements';

type SettlementRowProps = {
  settlement: Settlement;
  onOpen: () => void;
};

export function SettlementRow({ settlement, onOpen }: SettlementRowProps) {
  const eligibility = eligibilityOf(settlement);
  return (
    // No button role here: the Claim button inside is the accessible button (web can't nest them).
    <Pressable onPress={onOpen} style={styles.row}>
      <Image
        source={settlement.image_url ?? require('@/assets/images/home/settlement-thumb.png')}
        style={styles.thumb}
        contentFit="cover"
      />
      <View style={styles.info}>
        <View style={styles.amountRow}>
          <Text style={styles.amount} numberOfLines={1}>
            {settlement.payout}
          </Text>
          {eligibility && <EligibilityBadge kind={eligibility} />}
        </View>
        <Text style={styles.brand} numberOfLines={1}>
          {settlement.brand}
        </Text>
        <Text style={styles.due}>{dueLabel(settlement.deadline)}</Text>
      </View>
      <Pressable accessibilityRole="button" onPress={onOpen} style={styles.claim}>
        <Text style={styles.claimText}>Claim</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 79,
    paddingVertical: 12,
    paddingHorizontal: 19,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.white,
    boxShadow: `0px 4px 4px ${Palette.shadowFaint}`,
  },
  thumb: {
    width: 45,
    height: 45,
    borderRadius: 5,
  },
  info: {
    flex: 1,
    marginLeft: 15,
    marginRight: 10,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  amount: {
    flexShrink: 1,
    color: Palette.black,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.15,
    fontWeight: '700',
  },
  brand: {
    color: Palette.black,
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '600',
  },
  due: {
    marginTop: 2,
    color: Palette.slate,
    fontSize: 15,
    lineHeight: 18,
  },
  claim: {
    width: 78,
    height: 34,
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
});
