import { router } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Brand, BRAND_LOGOS, BrandCircles } from './components/brand-circles';
import { OnboardingStep, StepBody, StepTitle } from './components/onboarding-step';

// Positions and logo crops copied from the Figma frame (Onboarding - 4).
const BRANDS: Brand[] = [
  { name: 'Apple', source: BRAND_LOGOS.apple, left: 0, top: 47, size: 93, logo: { left: 17, top: 17, size: 59 } },
  { name: 'Spotify', source: BRAND_LOGOS.spotify, left: 127, top: 0, size: 93, logo: { left: -16, top: -16, size: 126 } },
  { name: 'Pepsi', source: BRAND_LOGOS.pepsi, left: 241, top: 38, size: 93, logo: { left: -16, top: 0, size: 126 } },
  { name: 'Instagram', source: BRAND_LOGOS.instagram, left: 73, top: 150, size: 93, logo: { left: -4, top: -4, size: 101 } },
  { name: 'Fortnite', source: BRAND_LOGOS.fortnite, left: 190, top: 146, size: 93, logo: { left: -4, top: -4, size: 101 } },
];

export default function WeeklyScreen() {
  return (
    <OnboardingStep step={3} onNext={() => router.push('/onboarding/track')}>
      <BrandCircles brands={BRANDS} width={334} height={243} marginBottom={86} />
      <StepTitle style={styles.title}>New Settlements to claim every week</StepTitle>
      <StepBody style={styles.body}>
        Many of the largest companies often pay penalties for misleading people. ModeMobile finds
        and organizes these opportunities for you to claim your cash.
      </StepBody>
    </OnboardingStep>
  );
}

const styles = StyleSheet.create({
  title: {
    width: 343,
    fontSize: 30,
  },
  body: {
    width: 348,
  },
});
