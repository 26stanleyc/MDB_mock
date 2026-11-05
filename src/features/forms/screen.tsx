import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FilterChips } from '@/components/ui/filter-chips';
import { Palette } from '@/constants/theme';

import { FORMS, STATUS_FILTERS } from './api';
import { EmptyForms } from './components/empty-forms';
import { FormRow } from './components/form-row';

export default function FormsScreen() {
  const [status, setStatus] = useState('All');
  const forms = status === 'All' ? FORMS : FORMS.filter((form) => form.status === status);

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      {/* Forms has its own header: title on the left, no logo, file count on the right. */}
      <View style={styles.header}>
        <Text style={styles.title}>Forms</Text>
        <Text style={styles.count}>
          {FORMS.length} {FORMS.length === 1 ? 'file' : 'files'}
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {FORMS.length === 0 ? (
          <View style={styles.empty}>
            <EmptyForms />
          </View>
        ) : (
          <>
            <View style={styles.chips}>
              <FilterChips
                options={STATUS_FILTERS}
                selected={status}
                onSelect={setStatus}
                inset={22}
              />
            </View>
            <View style={styles.list}>
              {forms.map((form) => (
                <FormRow key={form.id} form={form} />
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Palette.neutral[100],
  },
  header: {
    height: 55,
    marginTop: 18,
    paddingLeft: 22,
    paddingRight: 21,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
    backgroundColor: Palette.white,
    boxShadow: `0px 0px 4px ${Palette.shadowSoft}`,
  },
  title: {
    color: Palette.black,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.15,
    fontWeight: '700',
  },
  count: {
    color: Palette.black,
    opacity: 0.56,
    fontSize: 15,
    lineHeight: 24,
    letterSpacing: 0.5,
    fontWeight: '500',
  },
  content: {
    paddingBottom: 24,
  },
  // Side margins instead of Figma's fixed 399 width, so rows fit narrower phones.
  empty: {
    marginTop: 25,
    marginHorizontal: 20,
  },
  chips: {
    marginTop: 17,
  },
  list: {
    marginTop: 22,
    marginHorizontal: 19,
    gap: 12,
  },
});
