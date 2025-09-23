import { fireEvent, getByTestId, render, screen } from '@testing-library/react';
import React, { useRef } from 'react';
import type { TextInputProps } from './index.js';
import { useValidation } from './useValidation.js';

interface TestProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    Pick<TextInputProps, 'customValidity' | 'error'> {}

const TestComponent = ({ customValidity, error, ...rest }: TestProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { validationMessage, showValidationMessage } = useValidation(
    { customValidity, error },
    inputRef as React.RefObject<HTMLInputElement>
  );

  return (
    <input
      ref={inputRef}
      data-validation-message={validationMessage}
      data-show-validation-message={showValidationMessage}
      {...rest}
    />
  );
};

type TestRow = [props: TestProps, value: any, expected: ReturnType<typeof useValidation>];

const testId = 'test-text-input';
const noUserInput = Symbol('user-did-not-enter-input');
const defaultInvalidValidationMessage = 'Constraints not satisfied';
const sixToTenCharactersPattern = '[A-Za-z]{6,10}';

const suiteTable: [suiteName: string, suite: TestRow[]][] = [
  [
    'without client-side validation',
    [
      [{}, 'test', { validationMessage: '', showValidationMessage: false }],
      [{}, '', { validationMessage: '', showValidationMessage: false }],
      [{}, noUserInput, { validationMessage: '', showValidationMessage: false }],
      [{}, 42, { validationMessage: '', showValidationMessage: false }],
    ],
  ],
  [
    'with client-side validation and built-in validation messages',
    [
      [{ required: true }, 'test', { validationMessage: '', showValidationMessage: false }],
      [
        { required: true },
        noUserInput,
        { validationMessage: defaultInvalidValidationMessage, showValidationMessage: false },
      ],
      [
        { required: true },
        '',
        { validationMessage: defaultInvalidValidationMessage, showValidationMessage: false },
      ],
      [
        { pattern: sixToTenCharactersPattern },
        'short',
        { validationMessage: 'Constraints not satisfied', showValidationMessage: true },
      ],
      [
        { pattern: sixToTenCharactersPattern },
        'enough',
        { validationMessage: '', showValidationMessage: false },
      ],
      [
        { pattern: sixToTenCharactersPattern },
        'superfluous',
        { validationMessage: 'Constraints not satisfied', showValidationMessage: true },
      ],
    ],
  ],
  [
    'with client-side validation and customValidity',
    [
      [
        { required: true, customValidity: { valueMissing: 'Please fill out this field.' } },
        '',
        { validationMessage: 'Please fill out this field.', showValidationMessage: false },
      ],
      [
        {
          type: 'email',
          customValidity: { typeMismatch: 'Please enter a valid email address.' },
        },
        'decidedly not an email',
        {
          validationMessage: 'Please enter a valid email address.',
          showValidationMessage: true,
        },
      ],
    ],
  ],
  [
    'with error prop',
    [
      [
        { error: 'This is a custom error message passed via the error prop.' },
        '',
        {
          validationMessage: 'This is a custom error message passed via the error prop.',
          showValidationMessage: true,
        },
      ],
    ],
  ],
  [
    'with error prop and client-side validation',
    [
      [
        {
          error: 'This is a custom error message passed via the error prop.',
          pattern: sixToTenCharactersPattern,
        },
        'enough',
        {
          validationMessage: 'This is a custom error message passed via the error prop.',
          showValidationMessage: true,
        },
      ],
    ],
  ],
];

describe.each(suiteTable)('%s', (_, testTable) => {
  it.each(testTable)('props: %o + user input: "%s" → expected: %o', (props, value, expected) => {
    const { container /* rerender */ } = render(
      <TestComponent {...props} name="test" data-testid={testId} />
    );
    const input: HTMLInputElement = getByTestId(container, testId);

    fireEvent.focus(input);
    if (value !== noUserInput) fireEvent.change(input, { target: { value } });
    fireEvent.blur(input);

    // React renders the expected `validationMessage` value
    expect(input.dataset['validationMessage']).toBe(expected.validationMessage);

    // React renders the expected `showValidationMessage` value
    expect(input.dataset['showValidationMessage']).toBe(expected.showValidationMessage.toString());

    // the <input> element has the expected `validationMessage` value
    expect(input.validationMessage).toBe(expected.validationMessage);
  });
});

it('has the expected `showValidationMessage` value after the user enters, but then clears the input value', () => {
  const testProps = {
    'data-testid': testId,
    required: true,
  };

  render(<TestComponent {...testProps} />);
  const input: HTMLInputElement = screen.getByTestId(testId);

  // On first interaction, the user fills out the form field, and is thus valid
  fireEvent.focus(input);
  fireEvent.change(input, { target: { value: 'anything' } });
  fireEvent.blur(input);

  // React renders the expected `validationMessage` value
  expect(input.dataset['validationMessage']).toBe('');
  // React renders the expected `showValidationMessage` value
  expect(input.dataset['showValidationMessage']).toBe('false');
  // the <input> element has the expected `validationMessage` value
  expect(input.validationMessage).toBe('');

  // User *clears* their previous input, so now this required field is empty (and invalid)
  fireEvent.focus(input);
  fireEvent.change(input, { target: { value: '' } });
  fireEvent.blur(input);

  // React renders the expected `validationMessage` value
  expect(input.dataset['validationMessage']).toBe(defaultInvalidValidationMessage);
  // React renders the expected `showValidationMessage` value
  expect(input.dataset['showValidationMessage']).toBe('true');
  // the <input> element has the expected `validationMessage` value
  expect(input.validationMessage).toBe(defaultInvalidValidationMessage);
});

it('has the expected validationMessage after switching between custom validity messages, built-in validity messages and the error prop', () => {
  const testCustomValidityMessage = 'This is a custom error message';
  const testProps = {
    'data-testid': testId,
    pattern: sixToTenCharactersPattern,
  };

  const { rerender } = render(
    <TestComponent {...testProps} customValidity={{ patternMismatch: testCustomValidityMessage }} />
  );
  const input: HTMLInputElement = screen.getByTestId(testId);

  fireEvent.focus(input);
  fireEvent.change(input, { target: { value: 'short' } });
  fireEvent.blur(input);

  // React renders the expected `validationMessage` value
  expect(input.dataset['validationMessage']).toBe(testCustomValidityMessage);
  // React renders the expected `showValidationMessage` value
  expect(input.dataset['showValidationMessage']).toBe('true');
  // the <input> element has the expected `validationMessage` value
  expect(input.validationMessage).toBe(testCustomValidityMessage);

  // Re-render the component without the `customValidity` prop
  rerender(<TestComponent {...testProps} />);
  // input = screen.getByTestId(testId);

  // Re-enter user input on this uncontrolled `<input>` field (and thus we've lost the `value`)
  fireEvent.focus(input);
  fireEvent.change(input, { target: { value: 'short' } });
  fireEvent.blur(input);

  // React renders the expected `validationMessage` value
  expect(input.dataset['validationMessage']).toBe(defaultInvalidValidationMessage);
  // React renders the expected `showValidationMessage` value
  expect(input.dataset['showValidationMessage']).toBe('true');
  // the <input> element has the expected `validationMessage` value
  expect(input.validationMessage).toBe(defaultInvalidValidationMessage);

  // Re-render the component with an `error` prop
  rerender(<TestComponent {...testProps} error={testCustomValidityMessage} />);

  // React renders the expected `validationMessage` value
  expect(input.dataset['validationMessage']).toBe(testCustomValidityMessage);
  // React renders the expected `showValidationMessage` value
  expect(input.dataset['showValidationMessage']).toBe('true');
  // the <input> element has the expected `validationMessage` value
  expect(input.validationMessage).toBe(testCustomValidityMessage);
});
