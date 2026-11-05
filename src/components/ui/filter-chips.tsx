import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { Palette, Typography } from '@/constants/theme';

type FilterChipsProps = {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
  /** Side margin inside the scroll area, so chips scroll all the way to the screen edge. */
  inset: number;
};

/** Horizontally scrolling row of pill filters; one is selected at a time. */
export function FilterChips({ options, selected, onSelect, inset }: FilterChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.row, { paddingHorizontal: inset }]}>
      {options.map((option) => {
        const isSelected = option === selected;
        return (
          <Pressable
            key={option}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected }}
            onPress={() => onSelect(option)}
            style={[styles.chip, isSelected && styles.chipSelected]}>
            <Text style={[styles.label, isSelected && styles.labelSelected]}>{option}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 6,
  },
  chip: {
    height: 41,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: Palette.chip,
    justifyContent: 'center',
  },
  chipSelected: {
    paddingHorizontal: 18,
    backgroundColor: Palette.slate,
  },
  label: {
    ...Typography.bodyLarge,
    color: Palette.slate,
  },
  labelSelected: {
    color: Palette.white,
  },
});
