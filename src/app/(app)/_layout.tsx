import { Redirect } from 'expo-router';

import AppTabs from '@/components/app-tabs';
import { hasFinishedOnboarding } from '@/features/onboarding/progress';

export default function TabLayout() {
  if (!hasFinishedOnboarding()) return <Redirect href="/onboarding" />;
  return <AppTabs />;
}
