import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/ui/app-header';
import { FilterChips } from '@/components/ui/filter-chips';
import { InfoPopup } from '@/components/ui/info-popup';
import { ErrorState, LoadingState, MessageState } from '@/components/ui/request-state';
import { Palette } from '@/constants/theme';
import { useRequest } from '@/lib/use-request';

import { CATEGORIES, fetchHome, inCategory } from './api';
import { EligibilityIcon } from '@/components/ui/eligibility-badge';
import { FeaturedCard } from './components/featured-card';
import { HomeMenu } from './components/home-menu';
import { SettlementRow } from './components/settlement-row';
import { UpgradeBanner } from './components/upgrade-banner';

const HOW_IT_WORKS = [
  'Class action lawsuits allow groups of people who have been harmed by a company to sue together. When companies settle these lawsuits, they often pay money to affected customers.',
  'This apps helps you discover and claim your share of these settlements.\nSimply tap on any settlement to learn more and submit your claim if you’re eligible.',
];

export default function HomeScreen() {
  const [category, setCategory] = useState('All');
  const [menuOpen, setMenuOpen] = useState(false);
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const home = useRequest(fetchHome);

  const featured = home.data?.featured ?? [];
  const settlements = home.data?.settlements.filter((s) => inCategory(s, category)) ?? [];

  function openSettlement(id: string) {
    router.push({ pathname: '/settlement/[id]', params: { id } });
  }

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <View style={styles.header}>
        <AppHeader
          title="Settlements"
          titleStyle={styles.headerTitle}
          onMenu={() => setMenuOpen(true)}
        />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {featured.length > 0 && (
          <>
            <View style={styles.featuredHeader}>
              <Text style={styles.sectionTitle}>Featured</Text>
              <View style={styles.legend}>
                <View style={styles.legendItem}>
                  <EligibilityIcon kind="noProof" size={23} iconSize={13} />
                  <Text style={styles.legendText}>No Proof</Text>
                </View>
                <View style={styles.legendItem}>
                  <EligibilityIcon kind="uncapped" size={23} iconSize={15} />
                  <Text style={styles.legendText}>Uncapped</Text>
                </View>
              </View>
            </View>

            {/* Vertical padding keeps the card shadows from being clipped by the scroll view. */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.carousel}
              contentContainerStyle={styles.carouselContent}>
              {featured.map((settlement) => (
                <FeaturedCard
                  key={settlement.id}
                  settlement={settlement}
                  onOpen={() => openSettlement(settlement.id)}
                />
              ))}
            </ScrollView>
          </>
        )}

        <View style={styles.inset}>
          <UpgradeBanner onUpgrade={() => router.push('/onboarding/paywall')} />
        </View>

        <View style={styles.chips}>
          <FilterChips
            options={CATEGORIES}
            selected={category}
            onSelect={setCategory}
            inset={21}
          />
        </View>

        <View style={styles.list}>
          {home.data ? (
            settlements.length > 0 ? (
              settlements.map((settlement) => (
                <SettlementRow
                  key={settlement.id}
                  settlement={settlement}
                  onOpen={() => openSettlement(settlement.id)}
                />
              ))
            ) : (
              <MessageState
                title="No settlements here yet"
                subtitle="We check for new settlements every day."
              />
            )
          ) : home.error ? (
            <ErrorState onRetry={home.reload} />
          ) : (
            <LoadingState />
          )}
        </View>
      </ScrollView>

      <HomeMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        onHowItWorks={() => {
          setMenuOpen(false);
          setHowItWorksOpen(true);
        }}
      />
      <InfoPopup
        visible={howItWorksOpen}
        onClose={() => setHowItWorksOpen(false)}
        title="How Class Action Lawsuits Work"
        paragraphs={HOW_IT_WORKS}
        height={410}
      />
    </SafeAreaView>
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
  headerTitle: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: 0,
  },
  // Side margins live on each section (not the scroll content) so the carousel and
  // chips can scroll edge to edge, and cards stretch to fit narrower phones.
  content: {
    paddingTop: 18,
    paddingBottom: 24,
  },
  inset: {
    marginLeft: 21,
    marginRight: 20,
  },
  featuredHeader: {
    marginLeft: 21,
    marginRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: Palette.black,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '700',
  },
  legend: {
    flexDirection: 'row',
    gap: 11,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  legendText: {
    color: Palette.textMuted,
    fontSize: 15,
    lineHeight: 28,
    fontWeight: '600',
  },
  carousel: {
    marginTop: 21,
    marginBottom: 12,
  },
  carouselContent: {
    gap: 17,
    paddingVertical: 4,
    paddingLeft: 22,
    paddingRight: 21,
  },
  chips: {
    marginTop: 16,
  },
  list: {
    marginTop: 16,
    marginLeft: 21,
    marginRight: 20,
    gap: 17,
  },
});
