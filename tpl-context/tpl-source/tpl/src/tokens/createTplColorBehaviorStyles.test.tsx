/**
 * @fileoverview These unit tests verify that `createTplColorBehaviorStyles()` returns a
 * `ColorBehaviorStyleCreator` instance whose color behavior properties `userDefault`,
 * `alwaysLight`, `alwaysDark` and `userInverse` emit Dark Mode styles that are only applied when
 * Dark Mode support is actually enabled by the TPL Root component.
 *
 * As of this writing, when TPL Root has Dark Mode support enabled, it renders its container `<div>`
 * with an additional data attribute whose name is represented by the `DATA_DARK_MODE` constant.
 *
 * This means, if `createTplColorBehaviorStyles()` fails to "wrap" its Dark Mode styles in an
 * attribute selector, its Dark Mode styles may unintentionally appear in-browser when the media
 * query `(prefers-color-scheme: dark)` matches, but TPL Root has **not** enabled Dark Mode support.
 *
 * **Note:** The `userDefault` and `userInverse` properties of the `ColorBehaviorStyleCreator`
 * instance always emit Dark Mode styles, but based on the Dark Mode selector they use, they may or
 * may not apply to the target element.
 */

import React from 'react';
import { findByTestId, render } from '@testing-library/react';
import { matchers } from 'pretty-lights/jest';
import { ColorBehavior } from '@nyt/foundation';
import { createTplColorBehaviorStyles } from './color.js';
import { DATA_DARK_MODE } from '../util/index.js';
import { Root } from '../Root/index.js';

expect.extend(matchers);

const colorBehaviorStyles = createTplColorBehaviorStyles(
  inverted => `
  color: ${inverted.content.primary.hex};
  background: ${inverted.background.primary.hex};`
);

type TestRow = [darkModeSupportEnabled: boolean, expectMatchingDarkModeStyles: boolean];

const colorBehaviorTests: Record<ColorBehavior, TestRow[]> = {
  userDefault: [
    [false, false],
    [true, true],
  ],
  alwaysLight: [
    [false, false],
    [true, false],
  ],
  alwaysDark: [
    [false, false],
    [true, false],
  ],
  userInverse: [
    [false, false],
    [true, true],
  ],
};

describe.each(Object.entries(colorBehaviorTests))('%s', (colorBehavior, testTable) => {
  it.each(testTable)(
    'dark mode support: %s, expect matching dark mode styles: %s',
    async (darkModeSupportEnabled, expectMatchingDarkModeStyles) => {
      const { container } = render(
        <Root darkMode={darkModeSupportEnabled}>
          <div data-testid="test" className={colorBehaviorStyles[colorBehavior]}>
            Hello World
          </div>
        </Root>
      );

      const testElement = await findByTestId(container, 'test');

      const baseExpectation = expect(testElement);

      /**
       * Here we only expect matching styles if both Dark Mode support is enabled **and** we expect
       * this particular color behavior property to emit Dark Mode styles. Properties such as
       * `alwaysLight` simply don't emit Dark Mode styles, hence the distinction.
       */
      (darkModeSupportEnabled && expectMatchingDarkModeStyles
        ? baseExpectation
        : baseExpectation.not
      ).toHaveStyleRule('color', expect.any(String), {
        media: '(prefers-color-scheme: dark)',
        target: darkModeSupportEnabled ? `[${DATA_DARK_MODE}]` : undefined,
      });
    }
  );
});
