import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { EligibilityBadge } from '@/components/ui/eligibility-badge';
import { Palette } from '@/constants/theme';

import { EXAMPLE_SETTLEMENT } from './api';

export default function SettlementScreen() {
  const settlement = EXAMPLE_SETTLEMENT;
  const insets = useSafeAreaInsets();

  async function share() {
    try {
      await Share.share({ message: settlement.title });
    } catch {
      // The browser may not support sharing; nothing else to do.
    }
  }

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <View style={styles.nav}>
        <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.back}>
          <Image source={require('@/assets/images/icons/back.svg')} style={styles.backIcon} />
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={styles.navTitle}>Settlement Details</Text>
        {/* shortcut: Info has no destination in Figma yet. */}
        <Pressable accessibilityRole="button" style={styles.info}>
          <Text style={styles.infoText}>Info</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Image source={settlement.logo} style={styles.logo} accessibilityLabel={settlement.brand} />
          <Text style={styles.amount}>claim at least {settlement.amount}</Text>
          <Text style={styles.brand}>{settlement.brand}</Text>
        </View>
        <View style={styles.divider} />
        {settlement.eligibility && (
          <View style={styles.badge}>
            <EligibilityBadge kind={settlement.eligibility} size="large" />
          </View>
        )}
        <Text style={styles.title}>{settlement.title}</Text>
        <Text style={styles.body}>{settlement.summary}</Text>
        <Text style={styles.heading}>Deadline to claim</Text>
        <View style={styles.deadline}>
          <Image source={require('@/assets/images/icons/calendar.svg')} style={styles.calendar} />
          <Text style={styles.body}>{settlement.due}</Text>
        </View>
        <Text style={styles.heading}>Description</Text>
        <Text style={[styles.body, styles.description]}>{settlement.description}</Text>
      </ScrollView>

      <View style={[styles.panel, { paddingBottom: insets.bottom + 14 }]}>
        <Pressable accessibilityRole="button" onPress={share} style={[styles.button, styles.shareButton]}>
          <Text style={styles.shareText}>Tell your friends</Text>
          <Image source={require('@/assets/images/icons/send.svg')} style={styles.send} />
        </Pressable>
        {/* shortcut: filing a claim isn't designed yet. */}
        <Pressable accessibilityRole="button" style={[styles.button, styles.startButton]}>
          <Text style={styles.startText}>Get Started</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Palette.white,
  },
  nav: {
    height: 33,
    marginTop: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    zIndex: 1,
  },
  backIcon: {
    width: 14,
    height: 28,
  },
  backText: {
    color: Palette.iosBlue,
    fontSize: 18,
    fontWeight: '500',
  },
  // Centered on the screen, not between Back and Info.
  navTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    color: Palette.black,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.15,
    fontWeight: '700',
    textAlign: 'center',
    pointerEvents: 'none',
  },
  info: {
    height: 33,
    paddingHorizontal: 13,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Palette.divider,
    borderRadius: 22,
    justifyContent: 'center',
    backgroundColor: Palette.neutral[100],
  },
  infoText: {
    color: Palette.iosBlue,
    fontSize: 15,
    fontWeight: '500',
  },
  content: {
    paddingTop: 78,
    paddingHorizontal: 22,
    paddingBottom: 24,
  },
  hero: {
    alignItems: 'center',
  },
  logo: {
    width: 67,
    height: 67,
    borderRadius: 8,
  },
  amount: {
    marginTop: 21,
    color: Palette.black,
    fontSize: 36,
    lineHeight: 40,
    letterSpacing: 0.72,
    fontWeight: '700',
    textAlign: 'center',
  },
  brand: {
    marginTop: 15,
    color: Palette.slate,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.28,
  },
  divider: {
    height: 1,
    marginTop: 25,
    backgroundColor: Palette.divider,
  },
  badge: {
    marginTop: 25,
  },
  title: {
    marginTop: 25,
    color: Palette.black,
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '600',
  },
  body: {
    marginTop: 10,
    color: Palette.slate,
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: -0.36,
  },
  heading: {
    marginTop: 29,
    color: Palette.black,
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '600',
  },
  deadline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  calendar: {
    width: 26,
    height: 26,
    marginTop: 10,
  },
  description: {
    marginBottom: 8,
  },
  panel: {
    paddingTop: 22,
    paddingHorizontal: 25,
    gap: 7,
    backgroundColor: Palette.white,
    boxShadow: `0px -2px 13px ${Palette.shadow}`,
  },
  button: {
    height: 56,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButton: {
    gap: 9,
    backgroundColor: Palette.neutral[200],
  },
  shareText: {
    color: Palette.black,
    fontSize: 18,
    fontWeight: '600',
  },
  send: {
    width: 18,
    height: 18,
  },
  startButton: {
    backgroundColor: Palette.purple[600],
  },
  startText: {
    color: Palette.white,
    fontSize: 19,
    fontWeight: '600',
  },
});
