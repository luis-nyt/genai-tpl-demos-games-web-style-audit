import React, { useRef, useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { Box, spaceScale } from '@nyt/foundation';
import { PasswordInput, PasswordInputProps } from './index.js';
import { Button, Headline, Link, TextInput } from '../index.js';

/**
 * Collects a password with the ability to show or hide typed characters.
 */
const meta = {
  title: 'Forms/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  args: {
    name: 'Default',
    label: 'Password',
  },
  parameters: {
    controls: {
      include: ['id', 'name', 'label', 'helperText', 'customValidity'],
    },
  },
  render: args => (
    <Box p={5} width="50vw">
      <form style={{ maxWidth: '28.125rem' }} onSubmit={e => e.preventDefault()}>
        <PasswordInput {...args} />
      </form>
    </Box>
  ),
} satisfies Meta<PasswordInputProps>;

export default meta;

type Story = StoryObj<PasswordInputProps>;

/**
 * Basic implementation of PasswordInput. it's build on top of TextInput and provides a show/hide password functionality.
 */
export const Default: Story = {
  args: {
    name: 'Default',
  },
};

/**
 * Depending on the application, helperText can be used to add links such as a "Forgot your password?" link.
 */
export const WithLink: Story = {
  args: {
    placeholder: 'Replace with placeholder text',
    helperText: (
      <Link href="https://example.com" target="_blank">
        Forgot your password?
      </Link>
    ),
    name: 'WithAdditionalText',
  },
};

export const WithHelperTextAndError: Story = {
  args: {
    placeholder: 'Password will show an error if invalid',
    helperText: 'password with a minimum of 6 characters',
    name: 'WithHelperTextAndError',
    minLength: 6,
  },
};

/**
 * The `locked` attribute will mark the field as read only with aria-disabled="true" and will disable the show/hide button.
 */
export const Locked: Story = {
  args: {
    locked: true,
    name: 'Locked',
    value: 'verySafePassword',
  },
};

/**
 * You can pass the `new-password` flag to tell password managers that this input accepts new password.
 * This is basically shorthand for `autoComplete="new-password"` you can still pass autocomplete instead if you need to.
 */
export const RecipeNewPasswordFlagComparison: StoryFn = () => {
  return (
    <Box p={5} width="50vw">
      <form style={{ maxWidth: '28.125rem' }}>
        <Headline size={28}>Reset password.</Headline>
        <PasswordInput name="old_password" label="Old password" />
        <PasswordInput new-password name="new_password" label="New password" />
      </form>
    </Box>
  );
};
RecipeNewPasswordFlagComparison.storyName = 'Recipe: new-password flag set vs unset.';

export const RecipeLoginForm: StoryFn = () => {
  const [processing, setProcessing] = useState<string | boolean>(false);

  const submitHandler = e => {
    e.preventDefault();
    setProcessing('Attempting Login...');
    setTimeout(() => {
      setProcessing(false);
      alert('Logged in!');
    }, 2000);
  };

  return (
    <Box p={5} width="50vw">
      <form style={{ maxWidth: '28.125rem' }} onSubmit={submitHandler}>
        <Headline sx={{ margin: '0 10%' }} size={28}>
          Log in to your account.
        </Headline>
        <TextInput
          type="email"
          name="login_email_account"
          label="Email address"
          required
          hideRequiredSuffix
        />
        <PasswordInput name="userPassword" label="Password" required hideRequiredSuffix />
        <Button
          type="submit"
          sx={{ marginTop: spaceScale.get(1.5), maxWidth: '100%' }}
          weight="emphasis"
          processing={processing}
        >
          Continue
        </Button>
      </form>
    </Box>
  );
};
RecipeLoginForm.storyName = 'Recipe: login form';

export const RecipeCreateAccountForm: StoryFn = () => {
  const [processing, setProcessing] = useState<string | boolean>(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>();

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const submitHandler = e => {
    e.preventDefault();

    if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
      return;
    }

    setProcessing('Creating Account...');
    setTimeout(() => {
      setProcessing(false);
      alert('Account created!');
    }, 2000);
  };

  const patternMismatchMessage =
    'Password needs to be between 8 and 32 characters, have at least 1 special character, number, uppercase and lowercase letters';

  const handleConfirmChange = ({ currentTarget: { value: passwordConfirmValue } }) => {
    if (passwordRef.current?.value !== passwordConfirmValue) {
      setConfirmPasswordError('password must match');
      return;
    }
    setConfirmPasswordError('');
  };
  return (
    <Box p={5} width="50vw">
      <form style={{ maxWidth: '28.125rem' }} onSubmit={submitHandler}>
        <Headline sx={{ margin: '0 10%' }} size={28}>
          Create an account.
        </Headline>
        <TextInput
          type="email"
          name="create_account_email_account"
          label="Email address"
          required
          hideRequiredSuffix
        />
        <PasswordInput
          ref={passwordRef}
          new-password
          name="newUserPassword"
          label="Password"
          required
          hideRequiredSuffix
          pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[$&+,:;=?@#\|'<>.^*\(\)%!\-]).{8,32}$"
          customValidity={{
            patternMismatch: patternMismatchMessage,
          }}
        />
        <PasswordInput
          new-password
          ref={confirmPasswordRef}
          name="newUserConfirmPassword"
          label="Confirm password"
          required
          onChange={handleConfirmChange}
          error={confirmPasswordError}
          hideRequiredSuffix
          pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[$&+,:;=?@#\|'<>.^*\(\)%!\-]).{8,32}$"
          customValidity={{
            patternMismatch: patternMismatchMessage,
          }}
        />
        <Button
          type="submit"
          sx={{ marginTop: spaceScale.get(1.5), maxWidth: '100%' }}
          weight="emphasis"
          processing={processing}
        >
          Create Account
        </Button>
      </form>
    </Box>
  );
};
RecipeCreateAccountForm.storyName = 'Recipe: Create Account form';
