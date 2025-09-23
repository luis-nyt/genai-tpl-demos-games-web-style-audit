import { useState, useEffect, useCallback } from 'react';

/**
 * @Group Toast
 */
export interface UseToastStateProps {
  /**
   * Expires the {@link Toast} timer early.
   */
  dismissToast: () => void;

  /**
   * Updates the value of the `shown` flag to `true` for the duration of the given timerValue (defaults to 1000).
   */
  showToast: (timerValue?: number) => void;

  /**
   * Flag representing toast is being shown or not. use as the value of {@link Toast}'s `open` flag.
   */
  shown: boolean;
}

/**
 * A custom hook used to manage the {@link Toast} state and to display it.
 *
 * @Group Toast
 */
export const useToastState = (): UseToastStateProps => {
  const [shown, setShown] = useState(false);
  const [timer, setTimer] = useState<number>();

  useEffect(() => {
    if (!shown) return undefined;

    const toastTimer = setTimeout(() => setShown(false), timer);

    return () => clearTimeout(toastTimer);
  }, [shown, timer]);

  const showToast = useCallback(
    (timerValue = 1000) => {
      if (shown) return;

      setTimer(timerValue);
      setShown(true);
    },
    [shown]
  );

  const dismissToast = () => setTimer(0);

  return {
    dismissToast,
    showToast,
    shown,
  };
};
