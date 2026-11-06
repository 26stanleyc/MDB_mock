import { useCallback, useEffect, useState } from 'react';

/**
 * Runs `load` on mount and gives back its data or error, plus `reload`.
 * `load` must be stable (a module-level function or useCallback), or it reruns every render.
 * Data stays on screen while reloading, so screens only show a spinner on first load:
 * no data and no error means it's still loading.
 */
export function useRequest<T>(load: () => Promise<T>) {
  const [state, setState] = useState<{ data?: T; error?: Error }>({});
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let current = true; // ignore responses from a request that's been superseded
    load().then(
      (data) => current && setState({ data }),
      (e) => current && setState((s) => ({ data: s.data, error: e instanceof Error ? e : new Error(String(e)) })),
    );
    return () => {
      current = false;
    };
  }, [load, attempt]);

  const reload = useCallback(() => {
    setState((s) => ({ data: s.data })); // clear the error so Retry shows the spinner
    setAttempt((n) => n + 1);
  }, []);

  return { ...state, reload };
}
