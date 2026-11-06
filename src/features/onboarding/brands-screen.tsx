import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { ErrorState, LoadingState, MessageState } from '@/components/ui/request-state';
import { Palette } from '@/constants/theme';
import { useRequest } from '@/lib/use-request';

import { fetchBrands, saveBrands } from './api';
import { OnboardingStep } from './components/onboarding-step';
import { QuestionHeader } from './components/question-header';

export default function BrandsScreen() {
  const brands = useRequest(fetchBrands);
  const [selected, setSelected] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  function toggle(brand: string) {
    setSelected((current) =>
      current.includes(brand) ? current.filter((b) => b !== brand) : [...current, brand],
    );
  }

  async function next() {
    if (saving) return;
    setSaving(true);
    try {
      await saveBrands(selected);
      router.push('/onboarding/payout');
    } catch {
      Alert.alert('Couldn’t save your brands', 'Check your connection and try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <OnboardingStep
      step={8}
      onNext={next}
      nextLabel={saving ? 'Saving…' : 'Next'}
      contentStyle={styles.content}>
      <QuestionHeader
        title={'Which brands have\nyou purchased from in the past 5 years?'}
        subtitle="Pick the ones you haven’t claimed money from yet"
        subtitleWidth={221}
      />
      <ScrollView style={styles.grid} contentContainerStyle={styles.gridContent}>
        {brands.data ? (
          brands.data.length > 0 ? (
            // shortcut: brand names stand in for Figma's "Insert Logo Here" until we have logos.
            brands.data.map((brand) => (
              <Pressable
                key={brand}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: selected.includes(brand) }}
                onPress={() => toggle(brand)}
                style={[styles.tile, selected.includes(brand) && styles.tileSelected]}>
                <Text style={styles.tileText} numberOfLines={3}>
                  {brand}
                </Text>
              </Pressable>
            ))
          ) : (
            <MessageState title="No open settlements right now" subtitle="Tap Next to continue." />
          )
        ) : brands.error ? (
          <ErrorState onRetry={brands.reload} />
        ) : (
          <LoadingState />
        )}
      </ScrollView>
    </OnboardingStep>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
    paddingTop: 70,
    paddingBottom: 30,
  },
  grid: {
    flex: 1,
    width: 275,
    marginTop: 23,
  },
  gridContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 16,
    columnGap: 25,
  },
  tile: {
    width: 125,
    height: 109,
    borderWidth: 3,
    borderColor: 'transparent',
    borderRadius: 12,
    backgroundColor: Palette.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileSelected: {
    borderColor: Palette.purple[600],
  },
  tileText: {
    width: 103,
    color: Palette.black,
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.5,
    fontWeight: '700',
    textAlign: 'center',
  },
});
