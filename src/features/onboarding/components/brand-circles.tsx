import { Image, ImageSource } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { Palette } from '@/constants/theme';

export type Brand = {
  name: string;
  source: ImageSource;
  /** Circle position and size inside the cluster. */
  left: number;
  top: number;
  size: number;
  /** Logo crop inside the circle, copied from Figma. */
  logo: { left: number; top: number; size: number };
};

export const BRAND_LOGOS = {
  apple: require('@/assets/images/onboarding/brands/apple.png'),
  spotify: require('@/assets/images/onboarding/brands/spotify.png'),
  pepsi: require('@/assets/images/onboarding/brands/pepsi.png'),
  instagram: require('@/assets/images/onboarding/brands/instagram.png'),
  fortnite: require('@/assets/images/onboarding/brands/fortnite.png'),
};

type BrandCirclesProps = {
  brands: Brand[];
  width: number;
  height: number;
  marginBottom?: number;
};

export function BrandCircles({ brands, width, height, marginBottom }: BrandCirclesProps) {
  return (
    <View style={{ width, height, marginBottom }}>
      {brands.map(({ name, source, left, top, size, logo }) => (
        <View
          key={name}
          style={[styles.circle, { left, top, width: size, height: size, borderRadius: size / 2 }]}>
          <Image
            source={source}
            style={{ position: 'absolute', left: logo.left, top: logo.top, width: logo.size, height: logo.size }}
            contentFit="cover"
            accessibilityLabel={name}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    overflow: 'hidden',
    backgroundColor: Palette.white,
  },
});
