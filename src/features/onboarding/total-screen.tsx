import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';

import { OnboardingStep, StepBody, StepTitle } from './components/onboarding-step';

export default function TotalScreen() {
  // Filled in by the Estimating step from the user's picked brands.
  const params = useLocalSearchParams<{ total?: string; count?: string }>();
  const total = Number(params.total) || 0;
  const count = Number(params.count) || 0;
  const settlements = `${count} open ${count === 1 ? 'settlement' : 'settlements'}`;

  let title: string;
  let body: string;
  if (total > 0) {
    title = `$${total.toLocaleString('en-US')}`;
    body = `You could claim up to this much from ${settlements} for the brands you picked`;
  } else if (count > 0) {
    title = settlements;
    body = 'Found for the brands you picked. Their payouts vary, so we can’t total them yet';
  } else {
    title = 'No matches yet';
    body = 'None of the brands you picked have an open settlement right now. We’ll let you know when one opens';
  }

  return (
    <OnboardingStep
      step={11}
      onNext={() => router.push('/onboarding/paywall')}
      nextLabel="Claim My Cash"
      contentStyle={styles.content}>
      <Image
        source={require('@/assets/images/onboarding/logo.svg')}
        style={styles.logo}
        contentFit="contain"
        accessibilityLabel="Mode Mobile"
      />
      <StepTitle style={styles.total}>{title}</StepTitle>
      <StepBody style={styles.body}>{body}</StepBody>
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
