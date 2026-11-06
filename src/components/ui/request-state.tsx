import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { Palette } from '@/constants/theme';

/** Spinner shown while a list loads for the first time. */
export function LoadingState() {
  return (
    <View style={styles.box}>
      <ActivityIndicator color={Palette.purple[700]} />
    </View>
  );
}

type MessageStateProps = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
};

/** Centered message for empty lists, with an optional button. */
export function MessageState({ title, subtitle, actionLabel, onAction }: MessageStateProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {actionLabel && onAction && (
        <Pressable accessibilityRole="button" onPress={onAction} style={styles.button}>
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

/** Error message with a Retry button. */
export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <MessageState
      title="Couldn’t load this"
      subtitle="Check your connection and try again."
      actionLabel="Retry"
      onAction={onRetry}
    />
  );
}

const styles = StyleSheet.create({
  box: {
    width: '100%',
    paddingVertical: 40,
    paddingHorizontal: 24,
    borderRadius: 15, // white card so it reads on the blue onboarding background too
    backgroundColor: Palette.white,
    alignItems: 'center',
    gap: 8,
  },
  title: {
    color: Palette.black,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    color: Palette.slate,
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 8,
    height: 40,
    paddingHorizontal: 24,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: Palette.purple[700],
  },
  buttonText: {
    color: Palette.white,
    fontSize: 15,
    fontWeight: '600',
  },
});
