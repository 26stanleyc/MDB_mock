import { Image } from 'expo-image';
import { router } from 'expo-router';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { Palette } from '@/constants/theme';

import { OnboardingStep, StepBody } from './components/onboarding-step';

export default function EstimatingScreen() {
  return (
    <OnboardingStep
      step={10}
      onNext={() => router.push('/onboarding/total')}
      contentStyle={styles.content}>
      <Image
        source={require('@/assets/images/onboarding/logo.png')}
        style={styles.logo}
        contentFit="contain"
        accessibilityLabel="Mode Mobile"
      />
      <StepBody style={styles.text}>Estimating settlements you can claim now!</StepBody>
      <ActivityIndicator size="large" color={Palette.white} style={styles.spinner} />
    </OnboardingStep>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 159,
  },
  logo: {
    width: 263,
    height: 108,
  },
  text: {
    width: 312,
    marginTop: 17,
    lineHeight: 24,
  },
  spinner: {
    marginTop: 70,
  },
});
