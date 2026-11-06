import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useCallback, useState } from 'react';
import { Alert, Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { EligibilityBadge } from '@/components/ui/eligibility-badge';
import { ErrorState, LoadingState, MessageState } from '@/components/ui/request-state';
import { Palette } from '@/constants/theme';
import { fileClaim } from '@/lib/claims';
import { dueLabel, eligibilityOf, formatDate } from '@/lib/settlements';
import { useRequest } from '@/lib/use-request';

import { fetchSettlement, payoutHeadline } from './api';

export default function SettlementScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const request = useRequest(useCallback(() => fetchSettlement(id), [id]));
  const settlement = request.data?.settlement;
  const [filedNow, setFiledNow] = useState(false);
  const [starting, setStarting] = useState(false);
  const claimed = filedNow || request.data?.claimed;
  const eligibility = settlement && eligibilityOf(settlement);
  const insets = useSafeAreaInsets();

  async function share() {
    if (!settlement) return;
    try {
      await Share.share({ message: `${settlement.title}: ${settlement.claim_url}` });
    } catch {
      // The browser may not support sharing; nothing else to do.
    }
  }

  // Records the claim once, then opens the official claim form. If the user already
  // claimed, it just reopens the form; the database rejects a second claim anyway.
  async function start() {
    if (!settlement || starting) return;
    setStarting(true);
    try {
      if (!claimed) {
        await fileClaim(settlement.id);
        setFiledNow(true);
      }
      await WebBrowser.openBrowserAsync(settlement.claim_url);
    } catch {
      Alert.alert('Couldn’t start your claim', 'Check your connection and try again.');
    } finally {
      setStarting(false);
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

      {settlement ? (
        <>
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.hero}>
              <Image
                source={settlement.image_url ?? require('@/assets/images/home/settlement-thumb.png')}
                style={styles.logo}
                accessibilityLabel={settlement.brand}
              />
              <Text style={styles.amount}>{payoutHeadline(settlement.payout)}</Text>
              <Text style={styles.brand}>{settlement.brand}</Text>
            </View>
            <View style={styles.divider} />
            {eligibility && (
              <View style={styles.badge}>
                <EligibilityBadge kind={eligibility} size="large" />
              </View>
            )}
            <Text style={styles.title}>{settlement.title}</Text>
            <Text style={styles.body}>{settlement.description}</Text>
            <Text style={styles.heading}>Deadline to claim</Text>
            <View style={styles.deadline}>
              <Image source={require('@/assets/images/icons/calendar.svg')} style={styles.calendar} />
              <Text style={styles.body}>
                {dueLabel(settlement.deadline)}
                {settlement.deadline && ` (${formatDate(settlement.deadline)})`}
              </Text>
            </View>
            <Text style={styles.heading}>Description</Text>
            <Text style={[styles.body, styles.description]}>
              Payout: {settlement.payout}
              {'\n'}Proof required:{' '}
              {settlement.proof_required === null ? 'Not stated' : settlement.proof_required ? 'Yes' : 'No'}
              {'\n'}Source: classaction.org
            </Text>
          </ScrollView>

          <View style={[styles.panel, { paddingBottom: insets.bottom + 14 }]}>
            <Pressable accessibilityRole="button" onPress={share} style={[styles.button, styles.shareButton]}>
              <Text style={styles.shareText}>Tell your friends</Text>
              <Image source={require('@/assets/images/icons/send.svg')} style={styles.send} />
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={start}
              disabled={starting}
              style={[styles.button, styles.startButton, starting && styles.startButtonBusy]}>
              <Text style={styles.startText}>{claimed ? 'Claim filed · Open form' : 'Get Started'}</Text>
            </Pressable>
          </View>
        </>
      ) : request.error ? (
        <ErrorState onRetry={request.reload} />
      ) : request.data ? (
        <MessageState
          title="Settlement not found"
          subtitle="It may have closed or been removed."
          actionLabel="Go back"
          onAction={() => router.back()}
        />
      ) : (
        <LoadingState />
      )}
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
  startButtonBusy: {
    opacity: 0.6,
  },
  startText: {
    color: Palette.white,
    fontSize: 19,
    fontWeight: '600',
  },
});
