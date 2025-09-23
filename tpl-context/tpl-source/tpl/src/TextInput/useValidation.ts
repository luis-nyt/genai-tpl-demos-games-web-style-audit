/* eslint-disable no-restricted-syntax */
import { useState, RefObject, useEffect, useCallback, useRef, useMemo } from 'react';
import type { TextInputProps } from './index.js';
import { applyCustomValidity } from './applyCustomValidity.js';

/**
 * A custom hook which serves three purposes:
 *
 * 1. Makes an `<input>` element's `validationMessage` property available to React
 * 2. Applies a custom validation message based on either an externally provided `error` string,
 *    or the message in a `CustomValidityMessages` object which corresponds to the `<input>`'s
 *    current `validity` property
 * 3. Additionally indicates when to show the validation message via the `showValidationMessage`
 *    property (like a context-aware cross between `:invalid` and `:user-invalid`)
 *
 * This works by adding event listeners to the `<input>` element, in which we first call
 * `setCustomValidity()` with the appropriate string (or the empty string to clear a previous
 * custom validity message), then call `checkValidity()` and finally, update React state variables.
 *
 * When using an externally provided `error` string (i.e. `error` prop), we take care of "syncing",
 * so that the `<input>` element's `validity` property _also_ indicates it's invalid (since `error`
 * is set) and its `validationMessage` property matches the `error` prop itself.
 *
 * You can customize which events the hook listens to by setting the third `events` parameter to a
 * custom array of event names.
 *
 * —
 *
 * \* This is _not_ "when the `:user-invalid` selector matches the element", but rather, when a
 * designated event has fired for the first time. Set the fourth `userInvalidEvent` to a different
 * event name if desired.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/checkValidity
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setCustomValidity
 */
export const useValidation = (
  { customValidity, error }: Pick<TextInputProps, 'customValidity' | 'error'>,
  inputRef: RefObject<HTMLInputElement>,
  /**
   * An array of event names for which the hook will check the `<input>` element for validity and
   * either apply (or repeal) a custom validity message
   */
  events: (keyof HTMLElementEventMap)[] = ['focus', 'change', 'keyup', 'blur'],
  /**
   * The event name that represents the user's "first interaction" with the `<input>` element,
   * so long as the element's `value` isn't empty. This emulates the `:user-invalid` pseudo-class.
   */
  userInvalidEvent = 'blur'
): {
  validationMessage: string;
  /**
   * Whether to show the validation message. If an `error` prop is set, we'll show it immediately.
   * Otherwise, we'll wait until after the user's first interaction to show it.
   */
  showValidationMessage: boolean;
} => {
  const userHasInteracted = useRef(false);

  const [userInvalid, setUserInvalid] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  const updateValidationState = useCallback(
    (e?: Event) => {
      if (!inputRef.current) return;
      applyCustomValidity({ customValidity, error }, inputRef.current);
      inputRef.current.checkValidity();
      if (e?.type === userInvalidEvent && !userHasInteracted.current && !!inputRef.current.value) {
        userHasInteracted.current = true;
      }

      setValidationMessage(inputRef.current.validationMessage);
      setUserInvalid(!inputRef.current.validity.valid && !!userHasInteracted.current);
    },
    [customValidity, error, inputRef, userInvalidEvent]
  );

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return undefined;

    updateValidationState();
    for (const event of events) {
      input.addEventListener(event, updateValidationState);
    }

    return () => {
      for (const event of events) {
        input.removeEventListener(event, updateValidationState);
      }
    };
  }, [customValidity, error, events, inputRef, updateValidationState]);

  const showValidationMessage = useMemo(
    () => !!error || (!!validationMessage && userInvalid),
    [error, userInvalid, validationMessage]
  );

  return { validationMessage, showValidationMessage };
};
