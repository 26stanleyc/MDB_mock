import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/ui/app-header';
import { InfoPopup } from '@/components/ui/info-popup';
import { ErrorState, LoadingState } from '@/components/ui/request-state';
import { Palette } from '@/constants/theme';
import { type MyClaim, useMyClaims } from '@/lib/claims';

import { isInProgress, summarize } from './api';
import { ClaimRow } from './components/claim-row';
import { EmptyClaims } from './components/empty-claims';
import { PayoutSummary } from './components/payout-summary';

const HOW_PAYOUTS_WORK = [
  'The estimated payout is calculated by summing the estimated amounts from all your claimed settlements. These amounts are based on the settlement terms and your eligbility.',
  'All actual payouts are handled directly by the settlement administrators, not through this app. Payment timing and final amounts may vary based on the settlement process.',
];

export default function WalletScreen() {
  const [infoOpen, setInfoOpen] = useState(false);
  const claims = useMyClaims();

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <View style={styles.header}>
        <AppHeader title="Wallet" />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {claims.data ? (
          <>
            <PayoutSummary {...summarize(claims.data)} onInfo={() => setInfoOpen(true)} />
            <ClaimSection
              title="IN-PROGRESS"
              claims={claims.data.filter(isInProgress)}
              emptyTitle="No active claims"
              emptySubtitle="Claims you’ve submitted will appear here"
            />
            <ClaimSection
              title="FINISHED"
              claims={claims.data.filter((claim) => !isInProgress(claim))}
              emptyTitle="No completed claims"
              emptySubtitle="Finished claims will appear here"
            />
          </>
        ) : claims.error ? (
          <ErrorState onRetry={claims.reload} />
        ) : (
          <LoadingState />
        )}
      </ScrollView>
      <InfoPopup
        visible={infoOpen}
        onClose={() => setInfoOpen(false)}
        title="How Estimated Payouts Work"
        paragraphs={HOW_PAYOUTS_WORK}
        height={449}
      />
    </SafeAreaView>
  );
}

type ClaimSectionProps = {
  title: string;
  claims: MyClaim[];
  emptyTitle: string;
  emptySubtitle: string;
};

function ClaimSection({ title, claims, emptyTitle, emptySubtitle }: ClaimSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {claims.length > 0 ? (
        <View style={styles.rows}>
          {claims.map((claim) => (
            <ClaimRow key={claim.id} claim={claim} />
          ))}
        </View>
      ) : (
        <View style={styles.empty}>
          <EmptyClaims title={emptyTitle} subtitle={emptySubtitle} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Palette.neutral[100],
  },
  header: {
    marginTop: 18,
    zIndex: 1,
  },
  // Side margins instead of Figma's fixed 399 width, so cards fit narrower phones.
  content: {
    paddingTop: 25,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    color: Palette.neutral[600],
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
  },
  rows: {
    marginTop: 15,
    gap: 17,
  },
  // Figma: 65 above the empty state, 51 between sections (31 here + the section's 20).
  empty: {
    marginTop: 65,
    marginBottom: 31,
  },
});
