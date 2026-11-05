import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Palette } from '@/constants/theme';

import { OnboardingStep, StepBody, StepTitle } from './components/onboarding-step';

export default function NoProofScreen() {
  return (
    <OnboardingStep step={5} onNext={() => router.push('/onboarding/owed')}>
      <View style={styles.card}>
        <View style={styles.logoTile}>
          <Image
            source={require('@/assets/images/onboarding/apple-white.png')}
            style={styles.logo}
            contentFit="contain"
            accessibilityLabel="Apple"
          />
        </View>
        <Text style={styles.brand}>Apple</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>No Proof</Text>
        </View>
        <Text style={styles.deadline}>Claim by Aug 10th 2025</Text>
      </View>
      <StepTitle style={styles.title}>No proof?{'\n'}Still eligible!</StepTitle>
      <StepBody style={styles.body}>
        You can still file a claim if you lost your receipt. If something requires proof, we’ll let
        you know before you file.
      </StepBody>
    </OnboardingStep>
  );
}

// Inner positions are Figma's minus the 3px border.
const styles = StyleSheet.create({
  card: {
    width: 365,
    height: 136,
    marginBottom: 65,
    borderWidth: 3,
    borderColor: Palette.lavenderLight,
    borderRadius: 20,
    backgroundColor: Palette.lavender,
  },
  logoTile: {
    position: 'absolute',
    left: 12,
    top: 20,
    width: 108,
    height: 83,
    borderWidth: 1.5,
    borderColor: Palette.slate,
    borderRadius: 12,
    backgroundColor: Palette.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 41,
    height: 49,
  },
  brand: {
    position: 'absolute',
    left: 134,
    top: 29,
    color: Palette.white,
    fontSize: 28,
    lineHeight: 28,
    letterSpacing: 0.5,
    fontWeight: '700',
  },
  badge: {
    position: 'absolute',
    left: 222,
    top: 32,
    width: 75,
    height: 21,
    borderRadius: 12,
    backgroundColor: Palette.purple[600],
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: Palette.white,
    fontSize: 12,
    letterSpacing: 0.5,
    fontWeight: '700',
  },
  deadline: {
    position: 'absolute',
    left: 134,
    top: 67,
    color: Palette.white,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
  },
  title: {
    width: 343,
    fontSize: 30,
  },
  body: {
    width: 348,
    marginTop: 31,
    marginBottom: 5,
  },
});
