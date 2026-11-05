import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { Palette } from '@/constants/theme';

type InfoPopupProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  paragraphs: string[];
  /** Card height from Figma; the button sits at the bottom. */
  height: number;
};

/** Frosted explainer card with a "Got it!" button. */
export function InfoPopup({ visible, onClose, title, paragraphs, height }: InfoPopupProps) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.scrim}>
        <View style={[styles.card, { height }]}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.paragraphs}>
            {paragraphs.map((paragraph) => (
              <Text key={paragraph} style={styles.body}>
                {paragraph}
              </Text>
            ))}
          </View>
          <Pressable accessibilityRole="button" onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Got it!</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrim: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Palette.scrimLight,
  },
  card: {
    width: 327,
    paddingTop: 29,
    paddingHorizontal: 27,
    paddingBottom: 21,
    borderWidth: 1,
    borderColor: Palette.white,
    borderRadius: 39,
    backgroundColor: Palette.frosted,
  },
  title: {
    color: Palette.black,
    fontSize: 17,
    lineHeight: 23,
    fontWeight: '600',
    textAlign: 'center',
  },
  paragraphs: {
    marginTop: 10,
    gap: 18,
  },
  body: {
    color: Palette.black,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  button: {
    height: 53,
    marginTop: 'auto',
    borderRadius: 32,
    backgroundColor: Palette.frostedButton,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Palette.black,
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: 0.5,
    fontWeight: '600',
  },
});
