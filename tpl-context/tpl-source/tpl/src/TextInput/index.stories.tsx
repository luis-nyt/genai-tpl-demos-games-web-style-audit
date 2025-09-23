import React from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { Box } from '@nyt/foundation';
import { TextInput, TextInputProps } from './index.js';
import { Link, Text } from '../index.js';

/**
 * Collects plain text.
 */
const meta = {
  title: 'Forms/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  parameters: {
    controls: {
      include: [
        'badge',
        'background',
        'bg',
        'colorBehavior',
        'customValidity',
        'error',
        'helperText',
        'hideLabel',
        'hideRequiredSuffix',
        'label',
        'locked',
        'name',
        'required',
        'type',
      ],
    },
  },
  args: {
    name: 'Default',
  },
  argTypes: {
    required: { control: { type: 'boolean' } },
    label: { control: { type: 'text' } },
  },
  render: args => (
    <Box p={5} width="50vw">
      <form style={{ maxWidth: '28.125rem' }} onSubmit={e => e.preventDefault()}>
        <TextInput {...args} />
      </form>
    </Box>
  ),
} satisfies Meta<TextInputProps>;

export default meta;

type Story = StoryObj<TextInputProps>;

/**
 * Basic implementation of TextInput. `className` can be overridden with styles from your project.
 */
export const Default: Story = {
  args: {
    label: 'Label',
  },
};

/**
 * Marking an input as required will also append "(required)" at the end of it's label.
 * This helps make it clear that the input is required before attempting to submit the form.
 */
export const DefaultRequired: Story = {
  args: {
    label: 'Label',
    required: true,
  },
};

/**
 * You can remove the appended "(required)" suffix for any required input by passing `hideRequiredSuffix`.
 */
export const DefaultRequiredWithHiddenSuffix: Story = {
  args: {
    label: 'Label',
    required: true,
    hideRequiredSuffix: true,
  },
};

/**
 * You can pass JSX, such as a link, through `helperText`.
 */
export const WithLinkInHelperText: Story = {
  args: {
    name: 'WithLinkInHelperText',
    label: 'Label',
    helperText: <Link href="https://nytimes.com">some link</Link>,
  },
};

/**
 * TPL inputs are integrated with <a href="https://developer.mozilla.org/en-US/docs/Web/API/ValidityState" target="_blank">ValidityState</a> and will show an error message if invalid data is used.
 */
export const WithErrorValidation: Story = {
  args: {
    name: 'withErrorText',
    label: 'Label',
    required: true,
    minLength: 5,
    helperText:
      'Hint: This input displays an error when it has less than 5 characters or is empty.',
  },
};

/**
 * You can pass a `customValidity` object as a prop to override html's default error messages
 */

export const WithCustomValidationMessages: Story = {
  args: {
    name: 'WithCustomValidationMessages',
    label: 'Label',
    required: true,
    minLength: 5,
    customValidity: {
      valueMissing: 'Please enter a value',
      tooShort: 'Must be at least 5 characters',
    },
  },
};

/**
 * The `customValidity` attribute can be useful when setting the pattern property to provide a more descriptive error message than the default `patternMismatch` error.
 */
export const WithCustomPatternAndValidity: Story = {
  args: {
    name: 'WithCustomPatternAndValidity',
    label: 'Label',
    customValidity: {
      patternMismatch: 'This input must contain between 6 and 10 letters.',
    },
    pattern: '[A-Za-z]{6,10}',
  },
};
/**
 * The `error` attribute allows you to pass the string from a 'React-driven' error to be displayed by the input.
 */
export const WithReactDrivenError: Story = {
  args: {
    name: 'WithReactDrivenError',
    label: 'Label',
    error:
      'Please use more than six letters, up to 10. Additionally, please consider the environment when printing this error message.',
  },
};

/**
 * Passing `error` overrides HTML validation/styles, including any messages set via `customValidity`.
 * `error` should be removed or set to empty when the input is deemed valid.
 */
export const WithReactDrivenErrorOverridingHTMLValidation: Story = {
  args: {
    name: 'WithReactDrivenErrorOverridingHTMLValidation',
    label: 'Label',
    error: 'This input is actually required',
    required: true,
  },
};

/**
 * Passing the `locked` attribute provides a screen reader friendly alternative to `disabled`.
 */
export const Locked: Story = {
  args: {
    name: 'Locked',
    label: 'Label',
    locked: true,
  },
};

/**
 * Locked inputs cannot be edited, but can still be tabbed through.
 */
export const LockedCanBeTabbedThrough: StoryFn = () => {
  return (
    <Box p={5} width="50vw" style={{ maxWidth: '28.125rem' }}>
      <TextInput label="Input 1" name="input_1" />
      <TextInput label="Input 2" name="input_2" locked />
      <TextInput label="Input 3" name="input_3" />
    </Box>
  );
};

export const LockedWithValue: Story = {
  args: {
    name: 'LockedWithValue',
    label: 'First name',
    locked: true,
    value: 'Henry',
  },
};

export const LockedWithLabelHelperAndPlaceholderText: Story = {
  args: {
    name: 'LockedWithLabelHelperAndPlaceholderText',
    locked: true,
    label: 'Label',
    helperText: 'Useful text about this disabled input',
    placeholder: 'Placeholder text',
  },
  name: 'Locked With Label, Helper and Placeholder Text',
};

/**
 * You can provide JSX as `label`, `helperText` instead of simple strings and customize accordingly.
 */
export const WithJSXLabelDescriptionError: Story = {
  args: {
    name: 'WithJSXLabelDescriptionError',
    minLength: 5,
    label: (
      <>
        Text Input{' '}
        <Text as="span" size={12} color="secondaryDim">
          (Optional)
        </Text>
      </>
    ),
    helperText: (
      <Text as="span" size={14}>
        This is some <strong>helpful</strong> text. It tells you that this input has a min length of
        5 characters if it has a value.
      </Text>
    ),
  },
  name: 'With JSX Label, Description and Error',
};

/**
 * Utilizes Text input to collect an email address, offering automatic validation.
 */
export const RecipeEmailAddress: Story = {
  args: {
    customValidity: {
      typeMismatch: 'Please enter a valid username or email address',
    },
    name: 'RecipeEmailAddress',
    label: 'Email address',
    type: 'email',
  },
};
RecipeEmailAddress.storyName = 'Recipe: Email address';
