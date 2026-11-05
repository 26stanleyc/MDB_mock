import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Palette } from '@/constants/theme';

import { OnboardingStep } from './components/onboarding-step';
import { QuestionHeader } from './components/question-header';

const METHODS = ['Credit Card', 'Debit Card', 'Prepaid Card', 'Zelle', 'Venmo'];

export default function PayoutScreen() {
  const [method, setMethod] = useState<string>();

  return (
    <OnboardingStep
      step={9}
      onNext={() => router.push('/onboarding/estimating')}
      contentStyle={styles.content}>
      <QuestionHeader
        title="How would you like to receive payouts?"
        subtitle="This will be set as the default payout method when claims are filled"
        subtitleWidth={260}
      />
      <View style={styles.list}>
        {METHODS.map((item) => (
          <Pressable
            key={item}
            accessibilityRole="radio"
            accessibilityState={{ selected: method === item }}
            onPress={() => setMethod(item)}
            style={[styles.option, method === item && styles.optionSelected]}>
            <Text style={styles.optionText}>{item}</Text>
          </Pressable>
        ))}
      </View>
    </OnboardingStep>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
    paddingTop: 70,
  },
  list: {
    width: 345,
    marginTop: 48,
    gap: 20,
  },
  option: {
    paddingVertical: 15,
    borderWidth: 3,
    borderColor: Palette.lavender,
    borderRadius: 16,
    backgroundColor: Palette.white,
    alignItems: 'center',
  },
  optionSelected: {
    borderColor: Palette.purple[600],
  },
  optionText: {
    color: Palette.black,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
  },
});
