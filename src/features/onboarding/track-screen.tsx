import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Palette } from '@/constants/theme';

import { OnboardingStep, StepBody, StepTitle } from './components/onboarding-step';

const LOGO = require('@/assets/images/onboarding/logo.png');

export default function TrackScreen() {
  return (
    <OnboardingStep step={4} onNext={() => router.push('/onboarding/no-proof')}>
      <Text style={styles.emoji}>🔔</Text>
      <View style={styles.notifications}>
        {/* The older notification peeks out from behind the new one. */}
        <View style={[styles.card, styles.cardBehind]}>
          <View style={[styles.icon, styles.iconBehind]}>
            <Image source={LOGO} style={styles.iconLogo} contentFit="contain" />
          </View>
          <Text style={[styles.text, styles.textBehind]}>You just got paid $35</Text>
        </View>
        <View style={[styles.card, styles.cardFront]}>
          <View style={styles.icon}>
            <Image source={LOGO} style={styles.iconLogo} contentFit="contain" />
          </View>
          <Text style={[styles.text, styles.heading]}>New $10 Claim!</Text>
          <Text style={[styles.text, styles.message]}>We’re holding your spot</Text>
          <Text style={styles.time}>9:31 AM</Text>
        </View>
      </View>
      <StepTitle style={styles.title}>We find and track everything for you</StepTitle>
      <StepBody style={styles.body}>
        When a new settlement opens, we’ll let you know. If you’re eligible, you can use ModeMobile
        for easy filing and skip the headache
      </StepBody>
    </OnboardingStep>
  );
}

const styles = StyleSheet.create({
  emoji: {
    fontSize: 100,
    marginBottom: 12,
  },
  notifications: {
    width: 365,
    height: 111,
    marginBottom: 38,
  },
  card: {
    position: 'absolute',
    borderRadius: 16,
    backgroundColor: Palette.white,
    boxShadow: `0px 4px 4px ${Palette.shadow}`,
  },
  cardFront: {
    left: 0,
    top: 0,
    width: 365,
    height: 75,
  },
  cardBehind: {
    left: 31,
    top: 41,
    width: 303,
    height: 70,
  },
  icon: {
    position: 'absolute',
    left: 15,
    top: 11,
    width: 54,
    height: 54,
    borderRadius: 8,
    backgroundColor: Palette.purple[600],
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBehind: {
    left: 12,
    top: 8,
    width: 51,
    height: 52,
  },
  iconLogo: {
    width: 44,
    height: 18,
  },
  text: {
    position: 'absolute',
    color: Palette.black,
    fontSize: 16,
    lineHeight: 24,
  },
  heading: {
    left: 82,
    top: 13,
    fontWeight: '800',
  },
  message: {
    left: 82,
    top: 41,
  },
  textBehind: {
    left: 69,
    top: 36,
    fontSize: 14,
  },
  time: {
    position: 'absolute',
    right: 21,
    top: 5,
    color: Palette.slate,
    fontSize: 14,
    lineHeight: 24,
  },
  title: {
    width: 343,
    fontSize: 30,
  },
  body: {
    width: 348,
    marginBottom: -5,
  },
});
