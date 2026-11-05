import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { Palette } from '@/constants/theme';

import type { Claim } from '../api';

export function ClaimRow({ claim }: { claim: Claim }) {
  return (
    <View style={styles.row}>
      <Image source={claim.logo} style={styles.logo} accessibilityLabel={claim.brand} />
      <View style={styles.info}>
        <Text style={styles.amount}>{claim.amount}</Text>
        <Text style={styles.due}>{claim.due}</Text>
      </View>
      <View style={styles.status}>
        <Text style={styles.statusText}>Claimed</Text>
        <Image source={require('@/assets/images/icons/check-white.svg')} style={styles.check} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 17,
    paddingVertical: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.white,
    boxShadow: `0px 0px 6px ${Palette.shadowSoft}`,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 14,
  },
  amount: {
    color: Palette.black,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.15,
    fontWeight: '700',
  },
  due: {
    marginTop: 2,
    color: Palette.slate,
    fontSize: 15,
    lineHeight: 18,
  },
  status: {
    width: 112,
    height: 36,
    paddingLeft: 18,
    paddingRight: 13,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    backgroundColor: Palette.green[800],
  },
  statusText: {
    color: Palette.white,
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '600',
  },
  check: {
    width: 20,
    height: 20,
  },
});
