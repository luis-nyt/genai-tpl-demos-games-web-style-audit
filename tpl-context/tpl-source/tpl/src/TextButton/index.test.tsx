import React from 'react';
import { render } from '@testing-library/react';
import { matchers } from 'pretty-lights/jest';
import { TextButton } from './index.js';

expect.extend(matchers);

describe('CSS `transition` property', () => {
  const transitionTestTable = [
    ['no-preference', true],
    ['reduce', false],
  ];

  const {
    container: { firstChild },
  } = render(<TextButton />);

  it.each(transitionTestTable)(
    '%s → %s',
    (prefersReducedMotionValue, transitionPropertyIsPresent) => {
      const baseExpectation = expect(firstChild);

      (transitionPropertyIsPresent ? baseExpectation : baseExpectation.not).toHaveStyleRule(
        'transition',
        expect.any(String),
        {
          media: `(prefers-reduced-motion: ${prefersReducedMotionValue})`,
        }
      );
    }
  );
});
