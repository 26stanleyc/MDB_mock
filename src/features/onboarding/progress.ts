import { router } from 'expo-router';

// shortcut: kept in memory, so onboarding shows on every launch until we add storage.
let finished = false;

export function hasFinishedOnboarding() {
  return finished;
}

export function finishOnboarding() {
  finished = true;
  router.replace('/');
}
