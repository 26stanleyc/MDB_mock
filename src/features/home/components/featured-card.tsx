import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { EligibilityIcon } from '@/components/ui/eligibility-badge';
import { Palette } from '@/constants/theme';
import { dueLabel, eligibilityOf, type Settlement } from '@/lib/settlements';

type FeaturedCardProps = {
  settlement: Settlement;
  onOpen: () => void;
};

export function FeaturedCard({ settlement, onOpen }: FeaturedCardProps) {
  const eligibility = eligibilityOf(settlement);
  const progress = timeElapsed(settlement);
  // Figma's 375, narrowed on smaller phones so the next card still peeks in.
  const width = Math.min(375, useWindowDimensions().width - 64);

  return (
    // No button role here: the Claim button inside is the accessible button (web can't nest them).
    <Pressable onPress={onOpen} style={[styles.card, { width }]}>
      <View style={styles.top}>
        <Image
          source={settlement.image_url ?? require('@/assets/images/home/settlement-thumb.png')}
          style={styles.thumb}
          contentFit="cover"
        />
        <View style={styles.info}>
          <View style={styles.amountRow}>
            <Text style={styles.amount} numberOfLines={1} adjustsFontSizeToFit>
              {settlement.payout}
            </Text>
            {eligibility && <EligibilityIcon kind={eligibility} size={25} iconSize={18} />}
          </View>
          <Text style={styles.due} numberOfLines={2}>
            {settlement.brand} · {dueLabel(settlement.deadline)}
          </Text>
        </View>
        <Pressable accessibilityRole="button" onPress={onOpen} style={styles.claim}>
          <Text style={styles.claimText}>Claim</Text>
        </Pressable>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${progress * 100}%` }]} />
      </View>
      <Text style={styles.caption}>
        {settlement.claim_count} {settlement.claim_count === 1 ? 'claim' : 'claims'} filed so far 🎉
      </Text>
    </Pressable>
  );
}

// The site doesn't publish a claims goal, so the bar shows how much of the claim window
// (from when we first saw the settlement to its deadline) has passed.
function timeElapsed({ first_seen_at, deadline }: Settlement) {
  if (!deadline) return 0;
  const start = new Date(first_seen_at).getTime();
  const end = new Date(`${deadline}T23:59:59`).getTime();
  return Math.min(1, Math.max(0, (Date.now() - start) / (end - start)));
}

const styles = StyleSheet.create({
  card: {
    minHeight: 132,
    paddingHorizontal: 23,
    paddingTop: 22,
    paddingBottom: 10,
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
    marginRight: 10,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  amount: {
    flexShrink: 1,
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
