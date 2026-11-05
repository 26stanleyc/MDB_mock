/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://unistyl.es/), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

/**
 * Color scales from the Figma "Design System" page. They don't change with light/dark mode.
 * Steps that are blank in Figma are left out.
 */
export const Palette = {
  white: '#FFFFFF',
  black: '#000000',
  /** Primary */
  pink: { 200: '#FE86B3', 300: '#FE4F94', 400: '#FD007C', 500: '#FC0061', 600: '#EB005F', 700: '#D5005B' },
  /** Secondary */
  purple: { 300: '#B26DEB', 400: '#A04DE5', 500: '#8E2EDF', 600: '#7E2DD8', 700: '#642AD0', 800: '#4A27C9' },
  /** Tertiary */
  blue: { 200: '#71DEFE', 300: '#00D0FF', 400: '#00C5FF', 500: '#00BAFF', 600: '#00ABF6', 700: '#0098E3' },
  /** Accent */
  gold: { 400: '#FBED4A', 500: '#F8E81F', 600: '#FFDD25', 700: '#FFC41B', 800: '#FFAD10', 900: '#FD8000' },
  /** Error */
  red: { 400: '#FF5535', 500: '#FF220C', 600: '#FF1807', 700: '#FD0400', 800: '#EF0000', 900: '#D80000' },
  /** Complementary */
  green: { 300: '#9EF876', 400: '#80F450', 500: '#62F01F', 600: '#4DDE14', 700: '#29C800', 800: '#00B400' },
  // Neutral 900 is skipped: Figma lists it as "#201F", which isn't a valid color.
  neutral: {
    50: '#FBF9FE',
    100: '#F6F3F9',
    200: '#EEECF1',
    300: '#E0DEE3',
    400: '#BCBABF',
    500: '#9D9BA0',
    600: '#555970',
    700: '#2A3155',
    800: '#1C2037',
    1000: '#090909',
  },
  // Not in the design system: Material defaults and overlays used in the onboarding frames.
  lavender: '#D0BCFF',
  lavenderLight: '#EADDFF',
  slate: '#6C757E',
  shadowBlue: '#236AC4',
  shadow: 'rgba(0, 0, 0, 0.25)',
  whiteAlpha10: 'rgba(255, 255, 255, 0.1)',
  whiteAlpha20: 'rgba(255, 255, 255, 0.2)',
  whiteAlpha30: 'rgba(255, 255, 255, 0.3)',
  whiteAlpha50: 'rgba(255, 255, 255, 0.5)',
  whiteAlpha72: 'rgba(255, 255, 255, 0.72)',
  grayAlpha20: 'rgba(125, 125, 125, 0.2)',
  progressTrack: 'rgba(217, 217, 217, 0.5)',
  // Not in the design system: used by the in-app screens.
  mint: '#E4F6E7',
  cream: '#FFF3C7',
  amber: '#C18300',
  menuText: '#2C3E50',
  navInactive: '#7D7D7D',
  navBorder: '#848484',
  chip: 'rgba(232, 236, 239, 0.54)',
  textMuted: 'rgba(0, 0, 0, 0.46)',
  scrim: 'rgba(0, 0, 0, 0.46)',
  scrimLight: 'rgba(0, 0, 0, 0.19)',
  frosted: 'rgba(249, 249, 249, 0.78)',
  frostedButton: 'rgba(172, 172, 172, 0.52)',
  shadowSoft: 'rgba(0, 0, 0, 0.1)',
  shadowFaint: 'rgba(0, 0, 0, 0.02)',
  iosBlue: '#027FFF',
  divider: 'rgba(0, 0, 0, 0.09)',
} as const;

/** Light/dark theme colors, built from the Palette so a color is only defined once. */
export const Colors = {
  light: {
    text: Palette.black,
    background: Palette.white,
    backgroundElement: Palette.neutral[200],
    backgroundSelected: Palette.neutral[300],
    textSecondary: Palette.neutral[600],
  },
  dark: {
    text: Palette.white,
    background: Palette.black,
    backgroundElement: Palette.neutral[800],
    backgroundSelected: Palette.neutral[700],
    textSecondary: Palette.neutral[400],
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

/**
 * "Background-Gradient-Main" from the design system: a radial gradient, top right to bottom left.
 * Only #1C2037 is in the Palette; the other stops are gradient-only colors.
 */
export const Gradients = {
  mainDark: { colors: [Palette.neutral[800], Palette.neutral[800], '#2C3048'], locations: [0, 0.577, 1] },
  mainLight: { colors: ['#FCFAFF', '#EDF0FF', '#FCFAFF'], locations: [0, 0.577, 1] },
} as const;

/** Type scale from the design system (SF Pro on iOS, Roboto on Android: the system font). */
export const Typography = {
  displayLarge: { fontSize: 56, lineHeight: 64 },
  displayMedium: { fontSize: 48, lineHeight: 56 },
  displaySmall: { fontSize: 36, lineHeight: 48 },
  headlineLarge: { fontSize: 32, lineHeight: 40 },
  headlineMedium: { fontSize: 28, lineHeight: 32 },
  headlineSmall: { fontSize: 24, lineHeight: 32 },
  titleLarge: { fontSize: 24, lineHeight: 28 },
  titleMedium: { fontSize: 16, lineHeight: 24 },
  titleSmall: { fontSize: 14, lineHeight: 16 },
  labelLarge: { fontSize: 14, lineHeight: 20, letterSpacing: 0.1 },
  labelMedium: { fontSize: 12, lineHeight: 16, letterSpacing: 0.5 },
  labelSmall: { fontSize: 10, lineHeight: 14, letterSpacing: 0.5 },
  bodyLarge: { fontSize: 16, lineHeight: 24, letterSpacing: 0.5 },
  bodyMedium: { fontSize: 14, lineHeight: 20, letterSpacing: 0.25 },
  bodySmall: { fontSize: 12, lineHeight: 16, letterSpacing: 0.4 },
  buttonLarge: { fontSize: 15, lineHeight: 24, fontWeight: '600' },
  buttonMedium: { fontSize: 15, lineHeight: 24, fontWeight: '600' },
  buttonSmall: { fontSize: 12, lineHeight: 16, letterSpacing: 0.5 },
} as const;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
