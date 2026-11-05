import { Image } from 'expo-image';
import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';

import { Palette } from '@/constants/theme';

type AppHeaderProps = {
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  /** Shows the round ☰ button when set. */
  onMenu?: () => void;
};

export function AppHeader({ title, titleStyle, onMenu }: AppHeaderProps) {
  return (
    <View style={styles.bar}>
      <Image
        source={require('@/assets/images/onboarding/logo.png')}
        style={styles.logo}
        contentFit="contain"
        accessibilityLabel="Mode Mobile"
      />
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {onMenu && (
        <Pressable accessibilityRole="button" accessibilityLabel="Menu" hitSlop={8} onPress={onMenu}>
          <Image source={require('@/assets/images/icons/menu.svg')} style={styles.menu} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 55,
    paddingLeft: 28,
    paddingRight: 33,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Palette.white,
    boxShadow: `0px 0px 4px ${Palette.shadowSoft}`,
  },
  logo: {
    width: 68,
    height: 28,
  },
  // Centered on the bar, not between the logo and the menu button.
  title: {
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
  menu: {
    width: 35,
    height: 35,
  },
});
