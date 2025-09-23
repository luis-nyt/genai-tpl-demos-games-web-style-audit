import type { TextInputProps } from './index.js';

export type ValidationStates = keyof Omit<ValidityState, 'customError' | 'valid'>;

export type CustomValidityMessages = {
  [P in ValidationStates]?: string;
};

export const allowedValidityProps = Object.freeze([
  'badInput', // should be evaluated first, otherwise we miss the chance to override the default badInput error message
  'patternMismatch',
  'typeMismatch',
  'rangeOverflow',
  'rangeUnderflow',
  'tooLong',
  'tooShort',
  'valueMissing',
]);

/**
 * Process the input's `ValidityState` and sets the appropriate custom error message if set.
 */
export const applyCustomValidity = (
  { customValidity, error }: Pick<TextInputProps, 'customValidity' | 'error'>,
  input: HTMLInputElement
) => {
  let customValidityMessage = '';

  // If we got a React `error` prop, that's it, we have a custom error
  if (error) customValidityMessage = error;
  else if (customValidity) {
    /**
     * Iterate through `input.validity`'s properties in a fixed order until we find a currently
     * `true` validity condition for which `customValidity` contains a matching custom message.
     */
    // eslint-disable-next-line no-restricted-syntax
    for (const p of allowedValidityProps) {
      if (input.validity[p] && customValidity[p]) {
        customValidityMessage = customValidity[p] || '';
        break;
      }
    }
  }

  /**
   * Unconditionally call `setCustomValidity()`. If we don't have a custom validity message, we'll
   * set it to the empty string, which intentionally clears the previous custom validity message.
   */
  input.setCustomValidity(customValidityMessage);
};
