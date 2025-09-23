/**
 * @fileoverview This test file contains unit test suites for identical functionality built in to
 * the Icon _and_ Spinner components.
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Icon, IconProps, iconSizes } from './index.js';
import { Spinner } from '../Spinner/index.js';

type TestRow<Expected = Record<string, any>> = [
  name: string,
  props: Partial<IconProps>,
  expected: Expected,
];

const ariaAndRoleTestTable: TestRow[] = [
  // `aria-label` × `role` test cases
  [
    'renders aria-label and sets role="img"',
    { 'aria-label': 'Subscribe' },
    { 'aria-label': 'Subscribe', role: 'img' },
  ],
  ['renders the role prop value directly', { role: 'button' }, { role: 'button' }],
  [
    'renders the role prop value when both role and aria-label are set',
    { 'aria-label': 'Subscribe', role: 'button' },
    { 'aria-label': 'Subscribe', role: 'button' },
  ],

  // `aria-hidden` × `aria-label` test cases

  [
    'renders the aria-hidden prop value directly when set to the string "false"',
    { 'aria-hidden': 'false' },
    { 'aria-hidden': 'false' },
  ],
  [
    'renders the aria-hidden prop value directly when set to the *boolean* `false`',
    { 'aria-hidden': false },
    { 'aria-hidden': 'false' },
  ],
  [
    'renders the aria-hidden prop value directly when set to the string "true"',
    { 'aria-hidden': 'true' },
    { 'aria-hidden': 'true' },
  ],
  [
    'renders the aria-hidden prop value directly when set to the *boolean* `true`',
    { 'aria-hidden': true },
    { 'aria-hidden': 'true' },
  ],
  [
    'sets aria-hidden="true" when both aria-label and aria-hidden are missing',
    {},
    { 'aria-hidden': 'true' },
  ],
  [
    'sets aria-hidden="true" when aria-label is nullish and aria-hidden is missing',
    { 'aria-label': undefined },
    { 'aria-hidden': 'true' },
  ],
  [
    'does not set aria-hidden when aria-label is the empty string',
    { 'aria-label': '' },
    { 'aria-hidden': undefined },
  ],
  [
    'does not set aria-hidden when aria-label is non-nullish and aria-hidden is missing',
    { 'aria-label': 'Subscribe' },
    { 'aria-label': 'Subscribe', 'aria-hidden': undefined },
  ],
  [
    'renders the aria-hidden prop value and does not set aria-label when aria-label is nullish and aria-hidden is non-nullish',
    { 'aria-hidden': true, 'aria-label': undefined },
    { 'aria-hidden': 'true', 'aria-label': undefined },
  ],
  [
    'renders the aria-hidden and aria-label prop values when both aria-label and aria-hidden are non-nullish',
    { 'aria-hidden': true, 'aria-label': 'Subscribe' },
    { 'aria-hidden': 'true', 'aria-label': 'Subscribe' },
  ],
];

describe.each(Object.entries({ Icon, Spinner }))('%s', (suiteName, Component) => {
  describe('aria and role props', () => {
    it.each(ariaAndRoleTestTable)('%s', (_testName, props, expectedAttributes) => {
      const {
        container: { firstChild },
      } = render(<Component {...props} />);

      Object.entries(expectedAttributes).forEach(([key, value]) => {
        expect((firstChild as HTMLElement | null)?.hasAttribute(key)).toBe(
          typeof value !== 'undefined'
        );
        expect((firstChild as HTMLElement | null)?.getAttribute(key)).toBe(
          typeof value !== 'undefined' ? value : null
        );
      });
    });
  });

  describe('size prop', () => {
    describe('sets width, height and viewBox accordingly', () => {
      it.each(iconSizes)('%s', size => {
        const {
          container: { firstChild },
        } = render(<Component size={size} />);

        expect((firstChild as HTMLElement | null)?.getAttribute('width')).toBe(size.toString());
        expect((firstChild as HTMLElement | null)?.getAttribute('height')).toBe(size.toString());
        expect((firstChild as HTMLElement | null)?.getAttribute('viewBox')).toBe(
          /** Spinner's `viewBox` is always the same (it uses the same artwork for all sizes) */
          suiteName === 'Spinner' ? '0 0 24 24' : `0 0 ${size} ${size}`
        );
      });
    });
  });
});
