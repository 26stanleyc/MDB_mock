import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

import { Palette } from '@/constants/theme';

type PillButtonProps = {
  label: string;
  onPress: () => void;
  /** Purple button with white text, for white screens. */
  inverted?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function PillButton({ label, onPress, inverted, style }: PillButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        inverted && styles.buttonInverted,
        style,
        pressed && styles.pressed,
      ]}>
      <Text style={[styles.label, inverted && styles.labelInverted]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 297,
    paddingVertical: 19,
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: Palette.white,
  },
  buttonInverted: {
    backgroundColor: Palette.purple[600],
  },
  pressed: {
    opacity: 0.7,
  },
  label: {
    color: Palette.purple[600],
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '600',
  },
  labelInverted: {
    color: Palette.white,
  },
});
