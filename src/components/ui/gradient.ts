import { Platform, ViewStyle } from 'react-native';

import { Palette } from '@/constants/theme';

/** The purple gradient used by banners and cards, at the given angle. */
export function purpleGradient(angle: number): ViewStyle {
  const gradient = `linear-gradient(${angle}deg, ${Palette.purple[800]} 0.65%, ${Palette.purple[500]} 97.4%)`;
  return {
    backgroundColor: Palette.purple[700],
    // react-native-web doesn't translate experimental_backgroundImage, so web gets the CSS property.
    ...Platform.select<ViewStyle>({
      web: { backgroundImage: gradient } as ViewStyle,
      default: { experimental_backgroundImage: gradient },
    }),
  };
}
