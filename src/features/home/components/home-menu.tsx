import { Image } from 'expo-image';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Palette } from '@/constants/theme';

type HomeMenuProps = {
  visible: boolean;
  onClose: () => void;
  onHowItWorks: () => void;
};

export function HomeMenu({ visible, onClose, onHowItWorks }: HomeMenuProps) {
  const insets = useSafeAreaInsets();

  // shortcut: Privacy, Terms and Support just close the menu until those pages exist.
  const items = [
    { label: 'How does this work', icon: require('@/assets/images/icons/info.svg'), size: 20, onPress: onHowItWorks },
    { label: 'Privacy Policy', icon: require('@/assets/images/icons/privacy.svg'), size: 24, onPress: onClose },
    { label: 'Terms of Use', icon: require('@/assets/images/icons/docs.svg'), size: 24, onPress: onClose },
    { label: 'Contact Support', icon: require('@/assets/images/icons/question.svg'), size: 20, onPress: onClose },
  ];

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.scrim} onPress={onClose} accessibilityLabel="Close menu" />
      {/* Sits just under the header: safe area + 18 gap + 55 header + 5. */}
      <View style={[styles.menu, { top: insets.top + 78 }]}>
        {items.map((item) => (
          <Pressable
            key={item.label}
            accessibilityRole="menuitem"
            onPress={item.onPress}
            style={styles.item}>
            <View style={styles.iconBox}>
              <Image source={item.icon} style={{ width: item.size, height: item.size }} />
            </View>
            <Text style={styles.label}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Palette.scrim,
  },
  menu: {
    position: 'absolute',
    right: 0,
    width: 238,
    paddingHorizontal: 19,
    paddingVertical: 28,
    gap: 27,
    borderRadius: 14,
    backgroundColor: Palette.white,
  },
  item: {
    height: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBox: {
    width: 24,
    alignItems: 'center',
  },
  label: {
    color: Palette.menuText,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '500',
  },
});
