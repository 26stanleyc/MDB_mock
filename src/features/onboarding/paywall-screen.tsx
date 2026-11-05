import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Palette, Typography } from '@/constants/theme';

import { Brand, BRAND_LOGOS, BrandCircles } from './components/brand-circles';
import { CloseButton } from './components/close-button';
import { OnboardingBackground } from './components/onboarding-background';
import { StepBody } from './components/onboarding-step';
import { PillButton } from './components/pill-button';
import { finishOnboarding } from './progress';

// Positions and logo crops copied from the Figma frame (Onboarding - 15).
const BRANDS: Brand[] = [
  { name: 'Apple', source: BRAND_LOGOS.apple, left: 0, top: 35, size: 93, logo: { left: 17, top: 17, size: 59 } },
  { name: 'Spotify', source: BRAND_LOGOS.spotify, left: 133, top: 0, size: 93, logo: { left: -16, top: -16, size: 126 } },
  { name: 'Pepsi', source: BRAND_LOGOS.pepsi, left: 258, top: 47, size: 74, logo: { left: -11, top: 0, size: 95 } },
  { name: 'Instagram', source: BRAND_LOGOS.instagram, left: 61, top: 129, size: 93, logo: { left: -4, top: -4, size: 101 } },
  { name: 'Fortnite', source: BRAND_LOGOS.fortnite, left: 184, top: 133, size: 93, logo: { left: -4, top: -4, size: 101 } },
];

const PLANS = [
  { id: 'weekly', name: 'Weekly Unlimited', price: '$9.99', blurb: 'Perfect for trying it out', period: 'Weekly' },
  { id: 'yearly', name: 'Yearly Unlimited', price: '$39.99', blurb: 'Make the most money', period: 'Yearly' },
];

export default function PaywallScreen() {
  const [plan, setPlan] = useState('yearly');

  return (
    <OnboardingBackground>
      <View style={styles.header}>
        <CloseButton
          onPress={() => router.push('/onboarding/offer')}
          color={Palette.white}
          backgroundColor={Palette.whiteAlpha20}
        />
      </View>
      <View style={styles.content}>
        <BrandCircles brands={BRANDS} width={332} height={226} marginBottom={46} />
        <Text style={styles.title}>$1B in settlements coming this year</Text>
        <StepBody style={styles.body}>
          Gain Access to Unlimited Settlements! ModeMobile is the easiest way to get loads of cash
          with little effort
        </StepBody>
        <View style={styles.plans}>
          {PLANS.map((item) => (
            <Pressable
              key={item.id}
              accessibilityRole="radio"
              accessibilityState={{ selected: plan === item.id }}
              onPress={() => setPlan(item.id)}
              style={[styles.plan, plan === item.id && styles.planSelected]}>
              <View style={styles.planRow}>
                <Text style={styles.planName}>{item.name}</Text>
                <Text style={styles.planName}>{item.price}</Text>
              </View>
              <View style={[styles.planRow, styles.planDetailRow]}>
                <Text style={styles.planDetail}>{item.blurb}</Text>
                <Text style={styles.planDetail}>{item.period}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
      {/* shortcut: no purchase yet, Continue just finishes onboarding. */}
      <PillButton label="Continue" onPress={finishOnboarding} />
      <View style={styles.links}>
        <Text style={styles.link}>Terms</Text>
        <Text style={styles.link}>Privacy</Text>
        <Text style={styles.link}>Restore</Text>
      </View>
    </OnboardingBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    alignSelf: 'stretch',
    paddingLeft: 25,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 23,
  },
  title: {
    width: 343,
    color: Palette.white,
    fontSize: 37,
    lineHeight: 33,
    letterSpacing: -1,
    fontWeight: '900',
    fontStyle: 'italic',
    textAlign: 'center',
    textShadowColor: Palette.shadowBlue,
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 4,
  },
  body: {
    width: 348,
    marginTop: 24,
  },
  plans: {
    width: 365,
    marginTop: 30,
    gap: 14,
  },
  plan: {
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderWidth: 3,
    borderColor: Palette.whiteAlpha50,
    borderRadius: 16,
    backgroundColor: Palette.whiteAlpha10,
  },
  planSelected: {
    backgroundColor: Palette.whiteAlpha30,
  },
  planRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  planDetailRow: {
    marginTop: 1,
    marginBottom: 2,
  },
  planName: {
    color: Palette.white,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.15,
    fontWeight: '700',
  },
  planDetail: {
    ...Typography.bodyLarge,
    color: Palette.white,
  },
  links: {
    width: 316,
    marginTop: 66,
    paddingBottom: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  link: {
    width: 80,
    color: Palette.white,
    fontSize: 12,
    lineHeight: 24,
    letterSpacing: 0.5,
    fontWeight: '500',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
