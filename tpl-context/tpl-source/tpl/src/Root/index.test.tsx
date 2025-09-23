import React from 'react';
import { render } from '@testing-library/react';
import { Root as FoundationRoot, breakpoints, useBreakpointContext } from '@nyt/foundation';
import { Root } from './index.js';
import { light, dark } from '../__fixtures__/testColors.js';
import { DATA_DARK_MODE } from '../util/index.js';

// Spy on `Root` from `@nyt/foundation`
jest.mock('@nyt/foundation', () => {
  const foundation = jest.requireActual('@nyt/foundation');
  /**
   * Create a shallow copy to avoid the runtime error: "TypeError: Cannot redefine property"
   * when calling `jest.spyOn()`
   */
  const foundationWithSpy = { ...foundation };
  jest.spyOn(foundationWithSpy, 'Root');
  return foundationWithSpy;
});

beforeEach(() => {
  (FoundationRoot as jest.Mock).mockClear();
});

describe('Root', () => {
  it('provides media queries to children', () => {
    const TestEl = () => {
      const breakpoint = useBreakpointContext();

      expect(breakpoint).toEqual(expect.arrayContaining(breakpoints));

      return null;
    };

    render(
      <Root>
        <TestEl />
      </Root>
    );
  });

  it('supports custom `light` and `dark` themes', () => {
    render(
      <Root light={light} dark={dark}>
        <div />
      </Root>
    );

    expect(FoundationRoot).toHaveBeenCalledWith(
      expect.objectContaining({ light, dark }),
      undefined
    );
  });

  it('adds a specific data attribute when dark mode support is enabled', () => {
    const {
      container: { firstChild },
    } = render(
      <Root darkMode>
        <div />
      </Root>
    );

    expect((firstChild as HTMLElement).getAttribute(DATA_DARK_MODE)).toBe('true');
  });

  it('omits the data attribute when dark mode support is disabled', () => {
    const {
      container: { firstChild },
    } = render(
      <Root darkMode={false}>
        <div />
      </Root>
    );

    expect((firstChild as HTMLElement).getAttribute(DATA_DARK_MODE)).toBeNull();
  });
});
