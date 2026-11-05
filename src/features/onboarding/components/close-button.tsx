import { Pressable, StyleSheet, Text } from 'react-native';

type CloseButtonProps = {
  onPress: () => void;
  color: string;
  backgroundColor: string;
};

export function CloseButton({ onPress, color, backgroundColor }: CloseButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Close"
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => [styles.button, { backgroundColor }, pressed && styles.pressed]}>
      <Text style={[styles.icon, { color }]}>✕</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 33,
    height: 33,
    borderRadius: 16.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '700',
  },
});
