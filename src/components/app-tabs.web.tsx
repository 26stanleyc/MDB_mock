import { Image, ImageSource } from 'expo-image';
import { Tabs, TabList, TabTrigger, TabSlot, TabTriggerSlotProps, TabListProps } from 'expo-router/ui';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Palette } from '@/constants/theme';

export default function AppTabs() {
  return (
    <Tabs style={styles.tabs}>
      <TabSlot style={styles.slot} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="home" href="/" asChild>
            <TabButton icon={require('@/assets/images/icons/tab-home.svg')} iconSize={30}>
              Home
            </TabButton>
          </TabTrigger>
          <TabTrigger name="wallet" href="/wallet" asChild>
            <TabButton icon={require('@/assets/images/icons/tab-wallet.svg')} iconSize={39}>
              Wallet
            </TabButton>
          </TabTrigger>
          <TabTrigger name="forms" href="/forms" asChild>
            <TabButton icon={require('@/assets/images/icons/tab-forms.svg')} iconSize={31}>
              Forms
            </TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

type TabButtonProps = TabTriggerSlotProps & {
  icon: ImageSource;
  iconSize: number;
};

export function TabButton({ children, isFocused, icon, iconSize, ...props }: TabButtonProps) {
  const color = isFocused ? Palette.black : Palette.navInactive;
  return (
    <Pressable {...props} style={({ pressed }) => [styles.tabButton, pressed && styles.pressed]}>
      {/* The wallet icon has extra empty space in its box, so it overlaps its label a little. */}
      <Image
        source={icon}
        tintColor={color}
        style={{ width: iconSize, height: iconSize, marginBottom: iconSize > 31 ? -5 : 2 }}
      />
      <Text style={[styles.label, { color }]}>{children}</Text>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  return <View {...props} style={styles.tabList} />;
}

const styles = StyleSheet.create({
  tabs: {
    flex: 1,
  },
  slot: {
    flex: 1,
  },
  tabList: {
    height: 97,
    paddingBottom: 33,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 43,
    borderTopWidth: 0.3,
    borderTopColor: Palette.navBorder,
    backgroundColor: Palette.white,
    boxShadow: `0px -3px 4px -1px ${Palette.shadowSoft}`,
  },
  tabButton: {
    width: 98,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  pressed: {
    opacity: 0.7,
  },
  label: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '500',
  },
});
