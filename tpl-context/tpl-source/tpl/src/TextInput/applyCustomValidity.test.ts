import { CustomValidityMessages, applyCustomValidity } from './applyCustomValidity.js';

const customValidity: CustomValidityMessages = {
  patternMismatch: 'patternMismatch set',
  typeMismatch: 'typeMismatch set',
  rangeOverflow: 'rangeOverflow set',
  rangeUnderflow: 'rangeUnderflow set',
  valueMissing: 'valueMissing set',
};

/**
 * tooShort and tooLong events don't seem to work during tests.
 */
const testTable: [string, string, [string, string], string][] = [
  ['valueMissing', 'text', ['required', 'true'], ''],
  ['typeMismatch', 'text', ['type', 'email'], 'notAnEmail'],
  ['rangeOverflow', 'number', ['max', '3'], '5'],
  ['rangeUnderflow', 'number', ['min', '3'], '1'],
  ['patternMismatch', 'text', ['pattern', '[a-z]'], '42'],
];

it.each(testTable)(
  'sets custom %s message',
  (testName, type, validationRequirement, inputValue) => {
    const input: HTMLInputElement = document.createElement('input');
    input.type = type;
    input.setAttribute(...validationRequirement);
    input.value = inputValue;

    // initialize custom validity state
    input.setCustomValidity('initial');
    applyCustomValidity({ customValidity }, input);

    expect(input.validationMessage).toBe(customValidity[testName]);
  }
);
