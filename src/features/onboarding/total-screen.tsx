import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';

import { OnboardingStep, StepBody, StepTitle } from './components/onboarding-step';

export default function TotalScreen() {
  return (
    <OnboardingStep
      step={11}
      onNext={() => router.push('/onboarding/paywall')}
      nextLabel="Claim My Cash"
      contentStyle={styles.content}>
      <Image
        source={require('@/assets/images/onboarding/logo.png')}
        style={styles.logo}
        contentFit="contain"
        accessibilityLabel="Mode Mobile"
      />
      <StepTitle style={styles.total}>$4.822 B</StepTitle>
      <StepBody style={styles.body}>
        Brands you selected are estimated to pay this much out to Class Actions
      </StepBody>
    </OnboardingStep>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
    paddingTop: 183,
  },
  logo: {
    width: 263,
    height: 108,
  },
  total: {
    width: 292,
    marginTop: 53,
    fontStyle: 'normal',
  },
  body: {
    width: 292,
    marginTop: 41,
    lineHeight: 24,
  },
});
