import { router } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { OnboardingStep, StepBody, StepTitle } from './components/onboarding-step';

export default function ClassActionsScreen() {
  return (
    <OnboardingStep step={1} onNext={() => router.push('/onboarding/awarded')}>
      <Text style={styles.emoji}>👩‍⚖️</Text>
      <StepTitle>Class Action Settlements</StepTitle>
      <StepBody>
        Are when companies have to pay money to customers because they may have done something
        wrong or illegal.
      </StepBody>
    </OnboardingStep>
  );
}

const styles = StyleSheet.create({
  emoji: {
    fontSize: 120,
    marginBottom: 16,
  },
});
