import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { matchers } from 'pretty-lights/jest';

import { PasswordInput } from './index.js';

expect.extend(matchers);

describe('password', () => {
  it('toggles password', () => {
    const { getByText, getByTestId } = render(
      <PasswordInput data-testid="password" name="password" label="password" />
    );

    // password initially renders as expected
    expect(getByTestId('password').getAttribute('type')).toBe('password');
    expect(screen.getByText('Show')).toBeInTheDocument();
    expect(screen.getByText('Your password is hidden.')).toBeInTheDocument();

    // Click the Show button to display password as plain text.
    fireEvent.click(getByText('Show'));

    // Validate input has toggled to a plain text and updated related ui elements
    expect(getByTestId('password').getAttribute('type')).toBe('text');
    expect(screen.getByText('Hide')).toBeInTheDocument();
    expect(screen.getByText('Your password is shown.')).toBeInTheDocument();

    // Click Hide button to toggle back to a secure field
    fireEvent.click(getByText('Hide'));

    // Input should now be of type password, same as initial render.
    expect(getByTestId('password').getAttribute('type')).toBe('password');
    expect(screen.getByText('Show')).toBeInTheDocument();
    expect(screen.getByText('Your password is hidden.')).toBeInTheDocument();
  });
});
