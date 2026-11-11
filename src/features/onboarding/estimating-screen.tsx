import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { Palette } from '@/constants/theme';
import { useRequest } from '@/lib/use-request';

import { estimatePayout } from './api';
import { OnboardingStep, StepBody } from './components/onboarding-step';

const MIN_SPINNER_MS = 1500;

// Keeps the spinner up long enough to read the screen, even when the query is instant.
async function loadEstimate() {
  const [estimate] = await Promise.all([
    estimatePayout(),
    new Promise((resolve) => setTimeout(resolve, MIN_SPINNER_MS)),
  ]);
  return estimate;
}

export default function EstimatingScreen() {
  const estimate = useRequest(loadEstimate);
  const { data } = estimate;

  useEffect(() => {
    if (!data) return;
    // Replace, so Back from the total skips this screen instead of estimating again.
    router.replace({
      pathname: '/onboarding/total',
      params: { total: data.total, count: data.count },
    });
  }, [data]);

  return (
    <OnboardingStep
      step={10}
      // Moves on by itself once the estimate is in; Next only matters for retrying after an error.
      onNext={() => estimate.error && estimate.reload()}
      nextLabel={estimate.error ? 'Try Again' : 'Next'}
      contentStyle={styles.content}>
      <Image
        source={require('@/assets/images/onboarding/logo.png')}
        style={styles.logo}
        contentFit="contain"
        accessibilityLabel="Mode Mobile"
      />
      {estimate.error ? (
        <StepBody style={styles.text}>
          Couldn’t estimate your settlements. Check your connection and try again.
        </StepBody>
      ) : (
        <>
          <StepBody style={styles.text}>Estimating settlements you can claim now!</StepBody>
          <ActivityIndicator size="large" color={Palette.white} style={styles.spinner} />
        </>
      )}
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
