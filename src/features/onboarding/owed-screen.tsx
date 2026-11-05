import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Palette } from '@/constants/theme';

import { OnboardingStep, StepBody, StepHero } from './components/onboarding-step';

export default function OwedScreen() {
  return (
    <OnboardingStep step={6} onNext={() => router.push('/onboarding/number-one')}>
      <StepBody style={styles.eyebrow}>On a yearly average{'\n'}you are owed</StepBody>
      <StepHero style={styles.hero}>$397</StepHero>
      <View style={styles.review}>
        <View style={styles.avatar} />
        <Text style={[styles.text, styles.name]}>John D.</Text>
        <Text style={[styles.text, styles.stars]}>⭐️⭐⭐⭐⭐</Text>
        <Text style={[styles.text, styles.claimed]}>Claimed $41 last month</Text>
        <Text style={[styles.text, styles.quote]}>
          “It’s like finding money on the ground every single week!”
        </Text>
      </View>
    </OnboardingStep>
  );
}

// Review positions are Figma's minus the 3px border.
const styles = StyleSheet.create({
  eyebrow: {
    width: 285,
    marginTop: 0,
    marginBottom: 27,
    lineHeight: 24,
  },
  hero: {
    marginBottom: 42,
  },
  review: {
    width: 345,
    height: 183,
    marginBottom: -16,
    borderWidth: 3,
    borderColor: Palette.lavenderLight,
    borderRadius: 20,
    backgroundColor: Palette.purple[600],
  },
  avatar: {
    position: 'absolute',
    left: 13,
    top: 18,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: Palette.white,
  },
  text: {
    position: 'absolute',
    color: Palette.white,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.25,
  },
  name: {
    left: 75,
    top: 20,
    fontWeight: '800',
  },
  stars: {
    right: 25,
    top: 19,
    letterSpacing: 0.75,
  },
  claimed: {
    left: 75,
    top: 48,
  },
  quote: {
    left: 22,
    top: 97,
    width: 289,
    fontWeight: '700',
  },
});
