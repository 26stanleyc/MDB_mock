import { router } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { OnboardingStep, StepBody, StepTitle } from './components/onboarding-step';

export default function AwardedScreen() {
  return (
    <OnboardingStep step={2} onNext={() => router.push('/onboarding/weekly')}>
      <StepBody style={styles.eyebrow}>Last year people{'\n'}like you were awarded</StepBody>
      <Text style={styles.emoji}>💰</Text>
      <StepTitle style={styles.title}>$1.3 Billion</StepTitle>
      <StepBody style={styles.body}>
        Companies have to pay money to customers, but it is up to the people to claim the reward.
      </StepBody>
    </OnboardingStep>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    width: 285,
    marginTop: 0,
    marginBottom: 14,
    lineHeight: 24,
  },
  emoji: {
    fontSize: 120,
    marginBottom: 5,
  },
  title: {
    marginBottom: 25,
  },
  body: {
    lineHeight: 24,
  },
});
