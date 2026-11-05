import { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, Text, TextProps, View, ViewStyle } from 'react-native';

import { Palette, Spacing } from '@/constants/theme';

import { OnboardingBackground } from './onboarding-background';
import { PillButton } from './pill-button';

/** Steps between the splash and the paywall in the Figma onboarding flow. */
const TOTAL_STEPS = 11;

type OnboardingStepProps = PropsWithChildren<{
  step: number;
  onNext: () => void;
  nextLabel?: string;
  contentStyle?: StyleProp<ViewStyle>;
}>;

export function OnboardingStep({
  step,
  onNext,
  nextLabel = 'Next',
  contentStyle,
  children,
}: OnboardingStepProps) {
  return (
    <OnboardingBackground>
      <View
        style={styles.track}
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: TOTAL_STEPS, now: step }}>
        <View style={[styles.fill, { width: `${(step / TOTAL_STEPS) * 100}%` }]} />
      </View>
      <View style={[styles.content, contentStyle]}>{children}</View>
      <View style={styles.footer}>
        <PillButton label={nextLabel} onPress={onNext} />
      </View>
    </OnboardingBackground>
  );
}

export function StepTitle({ style, ...props }: TextProps) {
  return <Text style={[styles.title, style]} {...props} />;
}

export function StepBody({ style, ...props }: TextProps) {
  return <Text style={[styles.body, style]} {...props} />;
}

/** The huge italic numbers, like "$397" and "#1". */
export function StepHero({ style, ...props }: TextProps) {
  return <Text style={[styles.hero, style]} {...props} />;
}

const styles = StyleSheet.create({
  track: {
    width: 365,
    height: 11,
    marginTop: Spacing.two,
    borderRadius: 5.5,
    overflow: 'hidden',
    backgroundColor: Palette.progressTrack,
  },
  fill: {
    height: '100%',
    borderRadius: 5.5,
    backgroundColor: Palette.white,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 110,
  },
  footer: {
    // Same height as the splash's terms text + gaps, so Next sits where Get Started does.
    paddingBottom: 96,
  },
  title: {
    width: 282,
    color: Palette.white,
    fontSize: 40,
    lineHeight: 40,
    letterSpacing: 2,
    fontWeight: '900',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  body: {
    width: 282,
    marginTop: 22,
    color: Palette.white,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.5,
    fontWeight: '700',
    textAlign: 'center',
  },
  hero: {
    color: Palette.white,
    fontSize: 96,
    lineHeight: 100,
    letterSpacing: 1.5,
    fontWeight: '900',
    fontStyle: 'italic',
    textAlign: 'center',
    textShadowColor: Palette.shadow,
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
});
