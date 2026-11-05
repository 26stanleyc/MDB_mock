import { router } from 'expo-router';
import { StyleSheet } from 'react-native';

import { OnboardingStep, StepBody, StepHero } from './components/onboarding-step';

export default function NumberOneScreen() {
  return (
    <OnboardingStep step={7} onNext={() => router.push('/onboarding/brands')}>
      <StepBody style={styles.eyebrow}>Class Action{'\n'}Payout App</StepBody>
      <StepHero style={styles.hero}>#1</StepHero>
      <StepHero style={styles.stars}>⭐️⭐⭐⭐⭐</StepHero>
      <StepBody style={styles.trusted}>Trusted by thousands of users</StepBody>
    </OnboardingStep>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    width: 285,
    marginTop: 0,
    marginBottom: 46,
    lineHeight: 24,
  },
  hero: {
    marginBottom: 49,
  },
  stars: {
    fontSize: 64,
    lineHeight: 76,
  },
  trusted: {
    width: 285,
    marginTop: 21,
    marginBottom: 20,
    lineHeight: 24,
  },
});
