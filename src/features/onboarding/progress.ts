import '@/lib/local-storage';
import { router } from 'expo-router';

// Saved on the device, so onboarding only shows on the first launch.
const KEY = 'onboarding-finished';

export function hasFinishedOnboarding() {
  // `?.` because web's server render runs in Node, which has no localStorage.
  return globalThis.localStorage?.getItem(KEY) === 'true';
}

export function finishOnboarding() {
  localStorage.setItem(KEY, 'true');
  router.replace('/');
}
