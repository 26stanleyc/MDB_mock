import { StyleSheet, Text, View } from 'react-native';

import { Palette, Typography } from '@/constants/theme';

type QuestionHeaderProps = {
  title: string;
  subtitle: string;
  subtitleWidth: number;
};

export function QuestionHeader({ title, subtitle, subtitleWidth }: QuestionHeaderProps) {
  return (
    <>
      {/* Fixed height so the subtitle lines up whether the title has 2 or 3 lines. */}
      <View style={styles.titleBox}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={[styles.subtitle, { width: subtitleWidth }]}>{subtitle}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  titleBox: {
    width: 323,
    height: 96,
    justifyContent: 'center',
  },
  title: {
    ...Typography.headlineMedium,
    color: Palette.white,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.bodyMedium,
    marginTop: 12,
    color: Palette.white,
    textAlign: 'center',
  },
});
