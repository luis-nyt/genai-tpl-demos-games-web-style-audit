import React, { JSX } from 'react';
import { matchers, StyleRuleOptions } from 'pretty-lights/jest';
import { render } from '@testing-library/react';
import { createFocusClass, CreateFocusClassOptions, rootFocusClass } from './focus.js';
import { borderWidth } from '../generated/borderWidth.js';
import { color } from '../tokens/index.js';
import { Root } from '../Root/index.js';

expect.extend(matchers);

const expectedOutlineWidth = borderWidth.get(2);

const expectedBaseFocusStyles = {
  outline: `${expectedOutlineWidth} solid ${color.content.accent}`,
  'outline-offset': expectedOutlineWidth,
};

describe('createFocusStyles', () => {
  type ExpectedStylesTestRow = [
    styleRuleOptions: StyleRuleOptions,
    expectedStyles: Record<string, any>,
    expected?: boolean,
  ];

  const expectedTransitionValue = 'outline-color 100ms ease-out';

  const expectedFocusNotFocusVisibleOutlineValue = `${expectedOutlineWidth} solid transparent`;

  type SuiteTestTable = [
    suiteName: string,
    options?: CreateFocusClassOptions,
    component?: (props: { className?: string }) => JSX.Element | null,
  ];

  const suiteTestTable: SuiteTestTable[] = [
    ['with default arguments'],
    ['with baseSelector argument', { baseSelector: '.test' }],
    ['with selectorSuffix', { selectorSuffix: '::before' }],
    /**
     * This test suite answers the question: does the Root component apply `rootFocusStyles`?
     *
     * It's located in _this_ test file since it contains all the nitty-gritty CSS unit tests for
     * the styles returned by `createFocusClass()`; making those portable, just so we could call
     * them in `Root/index.test.tsx` instead, just didn't make sense.
     */
    [
      'Root and rootFocusStyles',
      { baseSelector: '*' },
      /**
       * Note that Root has no idea what `testFocusStyles` we've set up in the beforeAll callback
       * function below. This is intentional; we are using this existing test suite machinery to
       * test whether Root, when rendered, applies the styles from `rootFocusStyles`, which we
       * expect to be the equivalent of `createFocusStyles({ baseSelector: '*' })`.
       */
      () => (
        <Root>
          <div />
        </Root>
      ),
    ],
  ];

  describe.each(suiteTestTable)(
    '%s',
    (_suiteName, { baseSelector, selectorSuffix } = {}, component = undefined) => {
      let firstChild: ChildNode | null;

      beforeAll(() => {
        const testFocusStyles = createFocusClass({ baseSelector, selectorSuffix });
        const Component = component ?? 'div';

        ({
          container: { firstChild },
        } = render(<Component className={testFocusStyles} />));
      });

      afterAll(() => {
        firstChild = null;
      });

      const createTargetSelector = (focusSelector?: string) =>
        `${baseSelector || ''}${focusSelector || ''}${selectorSuffix || ''}` || undefined;

      let testTable: ExpectedStylesTestRow[] = [
        [
          { media: '(forced-colors: none)', target: createTargetSelector() },
          { ...expectedBaseFocusStyles, 'outline-color': 'transparent' },
        ],
        [
          { media: '(forced-colors: active)', target: createTargetSelector() },
          expectedBaseFocusStyles,
          false, // meaning we *don't* expect the base focus styles to be applied here
        ],
        [
          { media: '(prefers-reduced-motion: no-preference)', target: createTargetSelector() },
          { transition: expectedTransitionValue },
          false, // meaning we *don't* expect the `transition` property to be applied here
        ],
        [
          { media: '(prefers-reduced-motion: reduce)', target: createTargetSelector() },
          { transition: expectedTransitionValue },
          false, // meaning we *don't* expect the `transition` property to be applied here
        ],
        [{ target: createTargetSelector(':focus') }, expectedBaseFocusStyles],
        [
          { target: createTargetSelector(':focus:not(:focus-visible)') },
          { outline: expectedFocusNotFocusVisibleOutlineValue },
        ],
        [{ target: createTargetSelector(':focus-visible') }, expectedBaseFocusStyles],
      ];

      /** Add extra unit tests when `selectorSuffix` is set, since it changes the style output */
      if (selectorSuffix) {
        testTable = testTable.concat([
          [{ target: baseSelector }, { outline: 'none !important' }],
          [{ target: `${baseSelector ?? ''}:focus` }, { outline: 'none !important' }],
          [
            { target: `${baseSelector ?? ''}:focus:not(:focus-visible)` },
            { outline: 'none !important' },
          ],
          [{ target: `${baseSelector ?? ''}:focus-visible` }, { outline: 'none !important' }],
        ]);
      }

      it.each(testTable)('%o', (styleRuleOptions, expectedStyles, expected = true) => {
        const baseExpectation = expect(firstChild);

        Object.entries(expectedStyles).forEach(([property, value]) => {
          (expected ? baseExpectation : baseExpectation.not).toHaveStyleRule(
            property,
            value,
            styleRuleOptions
          );
        });
      });
    }
  );
});

describe('rootFocusClass', () => {
  it('sets up focus styles for all child elements', () => {
    const {
      container: { firstChild },
    } = render(<div className={rootFocusClass} />);

    Object.entries(expectedBaseFocusStyles).forEach(([property, value]) => {
      expect(firstChild).toHaveStyleRule(property, value, { target: '*:focus' });
    });
  });
});
