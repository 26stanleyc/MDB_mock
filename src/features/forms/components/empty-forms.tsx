import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { Palette } from '@/constants/theme';

export function EmptyForms() {
  return (
    <View style={styles.card}>
      <Image source={require('@/assets/images/icons/form-doc-large.svg')} style={styles.icon} />
      <Text style={styles.title}>No saved forms</Text>
      <Text style={styles.subtitle}>Forms you fill out will be saved here for your records</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 399,
    height: 221,
    paddingTop: 27,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: Palette.white,
    boxShadow: `0px 0px 4.2px ${Palette.shadowSoft}`,
  },
  icon: {
    width: 60,
    height: 60,
  },
  title: {
    marginTop: 16,
    color: Palette.black,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.15,
    fontWeight: '700',
  },
  subtitle: {
    width: 345,
    marginTop: 16,
    color: Palette.black,
    opacity: 0.42,
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
});
