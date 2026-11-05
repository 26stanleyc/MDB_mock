import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { Palette } from '@/constants/theme';

import type { FormStatus, SavedForm } from '../api';

const STATUS_COLORS: Record<FormStatus, string> = {
  Pending: Palette.gold[800],
  'Payment Sent': Palette.green[800],
  'Case Closed': Palette.red[700],
};

export function FormRow({ form }: { form: SavedForm }) {
  return (
    <View style={styles.row}>
      <Image source={require('@/assets/images/icons/form-doc.svg')} style={styles.icon} />
      <View style={styles.info}>
        {/* The pill shares the name's line only, so the date below gets the full width. */}
        <View style={styles.top}>
          <Text style={styles.name} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
            {form.name}
          </Text>
          <View style={[styles.status, { backgroundColor: STATUS_COLORS[form.status] }]}>
            <Text style={styles.statusText}>{form.status}</Text>
          </View>
        </View>
        <Text style={styles.submitted}>Submitted: {form.submitted}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 80,
    paddingLeft: 17,
    paddingRight: 18,
    paddingVertical: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Palette.white,
    boxShadow: `0px 0px 6px ${Palette.shadowSoft}`,
  },
  icon: {
    width: 49,
    height: 49,
  },
  info: {
    flex: 1,
    marginLeft: 13,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  name: {
    flex: 1,
    color: Palette.black,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.15,
    fontWeight: '700',
  },
  submitted: {
    marginTop: 2,
    color: Palette.slate,
    fontSize: 15,
    lineHeight: 18,
  },
  status: {
    height: 25,
    marginTop: 1,
    paddingHorizontal: 15,
    borderRadius: 11,
    justifyContent: 'center',
  },
  statusText: {
    color: Palette.white,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
  },
});
