import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { Palette } from '@/constants/theme';

import { OnboardingStep } from './components/onboarding-step';
import { QuestionHeader } from './components/question-header';

// Figma has "Insert Logo Here" placeholders until the brand list is decided.
const BRANDS = Array.from({ length: 8 }, (_, i) => `brand-${i + 1}`);

export default function BrandsScreen() {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(brand: string) {
    setSelected((current) =>
      current.includes(brand) ? current.filter((b) => b !== brand) : [...current, brand],
    );
  }

  return (
    <OnboardingStep
      step={8}
      onNext={() => router.push('/onboarding/payout')}
      contentStyle={styles.content}>
      <QuestionHeader
        title={'Which brands have\nyou purchased from in the past 5 years?'}
        subtitle="Pick the ones you haven’t claimed money from yet"
        subtitleWidth={221}
      />
      <ScrollView style={styles.grid} contentContainerStyle={styles.gridContent}>
        {BRANDS.map((brand) => (
          <Pressable
            key={brand}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: selected.includes(brand) }}
            onPress={() => toggle(brand)}
            style={[styles.tile, selected.includes(brand) && styles.tileSelected]}>
            <Text style={styles.tileText}>Insert Logo Here</Text>
          </Pressable>
        ))}
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
    width: 83,
    color: Palette.black,
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.5,
    fontWeight: '700',
    textAlign: 'center',
  },
});
