import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Palette } from '@/constants/theme';

import { CloseButton } from './components/close-button';
import { PillButton } from './components/pill-button';
import { finishOnboarding } from './progress';

export default function OfferScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <CloseButton
          onPress={finishOnboarding}
          color={Palette.neutral[500]}
          backgroundColor={Palette.grayAlpha20}
        />
      </View>
      <Text style={styles.title}>
        We want you to <Text style={styles.highlight}>make some money</Text>
      </Text>
      <Text style={styles.emoji}>🎁</Text>
      <View style={styles.badge}>
        <Text style={styles.check}>✓</Text>
        <Text style={styles.badgeText}>50% Discount Applied</Text>
      </View>
      <Text style={styles.body}>Use the app for{'\n'}a discount with our{'\n'}one time offer!</Text>
      <View style={styles.footer}>
        {/* shortcut: no purchase yet, the offer just finishes onboarding. */}
        <PillButton label="Continue for 50% OFF" onPress={finishOnboarding} inverted style={styles.button} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Palette.white,
  },
  header: {
    alignSelf: 'stretch',
    alignItems: 'flex-end',
    paddingRight: 34,
    marginTop: 16,
  },
  title: {
    width: 343,
    marginTop: 48,
    color: Palette.black,
    fontSize: 34,
    lineHeight: 33,
    letterSpacing: 1.5,
    fontWeight: '900',
    textAlign: 'center',
  },
  highlight: {
    color: Palette.purple[600],
  },
  emoji: {
    marginTop: 24,
    fontSize: 180,
    lineHeight: 210,
  },
  badge: {
    width: 265,
    height: 43,
    marginTop: 35,
    borderRadius: 50,
    backgroundColor: Palette.purple[600],
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    position: 'absolute',
    left: 15,
    color: Palette.white,
    fontSize: 16,
    fontWeight: '700',
  },
  badgeText: {
    color: Palette.white,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
    fontWeight: '800',
  },
  body: {
    width: 348,
    marginTop: 50,
    color: Palette.black,
    fontSize: 28,
    lineHeight: 30,
    letterSpacing: 0.5,
    fontWeight: '700',
    textAlign: 'center',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 85,
  },
  button: {
    width: 366,
  },
});
