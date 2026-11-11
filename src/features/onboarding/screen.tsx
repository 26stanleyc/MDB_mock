import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Palette, Spacing } from '@/constants/theme';

import { OnboardingBackground } from './components/onboarding-background';
import { PillButton } from './components/pill-button';

export default function OnboardingScreen() {
  return (
    <OnboardingBackground>
      <View style={styles.logoSection}>
        <Image
          source={require('@/assets/images/onboarding/logo.svg')}
          style={styles.logo}
          contentFit="contain"
          accessibilityLabel="Mode Mobile"
        />
      </View>

      <View style={styles.footer}>
        <PillButton
          label="Get Started"
          onPress={() => router.push('/onboarding/class-actions')}
          style={styles.button}
        />
        <Text style={styles.terms}>
          by continuing you agree to our <Text style={styles.link}>Terms of Use</Text> and{' '}
          <Text style={styles.link}>Class Action Terms</Text>
        </Text>
      </View>
    </OnboardingBackground>
  );
}

const styles = StyleSheet.create({
  logoSection: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 263,
    height: 108,
  },
  footer: {
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: Spacing.five,
  },
  button: {
    width: 305,
  },
  terms: {
    width: 299,
    color: Palette.white,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
    fontWeight: '500',
    textAlign: 'center',
  },
  link: {
    textDecorationLine: 'underline',
  },
});
