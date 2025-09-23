import React, { createRef, FC, RefAttributes, useEffect } from 'react';
import { css } from 'pretty-lights';
import { getByTestId, render } from '@testing-library/react';
import { matchers } from 'pretty-lights/jest';
import {
  ColorBehaviorContext,
  // eslint-disable-next-line no-restricted-imports
  ColorBehaviorProps,
  minWidths,
  spaceScale,
  useColorBehaviorContext,
} from '@nyt/foundation';
import * as TPL from './index.js';
import { CommonWithAsProps, dataTplAttr, DataTplValue } from './index.js';

expect.extend(matchers);

/**
 * This type definition helps validate that components in {@link testTable} below have prop type
 * definitions that indicate support for the common features tested in this file's test suites.
 */
type TestRow = [
  name: keyof typeof DataTplValue,
  expectedHTMLElement: { new (): Element; prototype: Element },
];

/**
 * This test table contains all TPL components that we expect to implement certain common features,
 * such as `ref` forwarding, the `className` prop and more.
 *
 * We also use TypeScript to check that the component's prop types extend either {@link CommonProps}
 * or {@link CommonWithAsProps}. (Thus, if you can't add a component to this table due to a
 * TypeScript error, check its prop type declaration!)
 *
 * ## Add a new component to the test table
 *
 * 1. Add an enum member to {@link DataTplValue}, which we'll use to test the component's
 *    `data-tpl` attribute support.
 *
 * 2. Ensure that your component is exported from [src/index.ts](./index.ts).
 *
 * 3. Then, add a nested array to the array below, with the nested array items corresponding to:
 *
 *    a. A string representing the exported name of the component.
 *
 *    b. An HTML or SVG element constructor that corresponds to the type of element returned by the
 *       component's React `ref`.
 *       - For example, `export const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>`
 *         would have `HTMLDivElement` as the second item in its `testTable` "row".
 *
 * 4. If the component lacks support for the `as` prop and/or `children` props, additionally add
 *    its name to the {@link componentsWithoutAs} and {@link componentsWithoutChildren}  arrays.
 *
 * @see {@link ../docs/contributing/Components.md Components.md}
 */
const testTable: TestRow[] = [
  ['Body', HTMLParagraphElement],
  ['Box', HTMLDivElement],
  ['Button', HTMLButtonElement],
  ['Dialog', HTMLDialogElement],
  ['DialogContent', HTMLDivElement],
  ['Flex', HTMLDivElement],
  ['Headline', HTMLParagraphElement],
  ['HeadlineFeature', HTMLParagraphElement],
  ['HeadlineNews', HTMLParagraphElement],
  ['HeadlineOpinion', HTMLParagraphElement],
  ['HRule', HTMLHRElement],
  ['Icon', SVGSVGElement],
  ['IconButton', HTMLButtonElement],
  ['Label', HTMLParagraphElement],
  ['Link', HTMLAnchorElement],
  ['LinkBox', HTMLDivElement],
  ['PasswordInput', HTMLInputElement],
  ['Radio', HTMLInputElement],
  ['RadioGroup', HTMLFieldSetElement],
  ['Spinner', SVGSVGElement],
  ['StoryList', HTMLDivElement],
  ['StoryListItem', HTMLDivElement],
  ['StoryListItemContent', HTMLDivElement],
  ['StoryListSection', HTMLDivElement],
  ['Switcher', HTMLDivElement],
  ['Text', HTMLParagraphElement],
  ['TextButton', HTMLButtonElement],
  ['TextInput', HTMLInputElement],
  ['Title', HTMLParagraphElement],
  ['TitleKarnak', HTMLParagraphElement],
  ['Toast', HTMLDialogElement],
  ['Typography', HTMLParagraphElement],
  ['VRule', HTMLHRElement],
];

/**
 * Most components support the `as` prop, but there are legit reasons a component might lack it.
 * Write down the names of components that lack the `as` prop in this array. We'll use it to filter
 * the {@link testTable} above and then run unit test suite below, where we test `as` prop support.
 *
 * @see {@link CommonWithAsProps}
 */
const componentsWithoutAs: (keyof typeof DataTplValue)[] = [
  'Button',
  'Dialog',
  'Link',
  'HRule',
  'PasswordInput',
  'Icon',
  'IconButton',
  'Radio',
  'Spinner',
  'StoryListItem',
  'TextButton',
  'TextInput',
  'Toast',
  'VRule',
];

const componentsWithoutChildren: (keyof typeof DataTplValue)[] = [
  'HRule',
  'PasswordInput',
  'TextInput',
  'VRule',
  'Spinner',
];

describe.each(testTable)('%s', (name, expectedHTMLElement) => {
  const Component: FC<
    Omit<CommonWithAsProps, 'as' | 'children'> & RefAttributes<any> & { as?: any; children?: any }
  > = TPL[name];

  if (!componentsWithoutAs.includes(name)) {
    test('`as` prop', () => {
      const asProp = 'article';
      const { container } = render(<Component as={asProp} />);

      expect((container.firstChild as HTMLElement | null)?.tagName).toBe(asProp.toUpperCase());
    });
  }

  test('className prop', () => {
    const className = 'dingus';
    const { container } = render(<Component className={className} />);

    expect((container.firstChild as HTMLElement | null)?.classList).toContain(className);
  });

  if (!componentsWithoutChildren.includes(name)) {
    test('children prop', () => {
      const firstChildTestId = 'first-child-element';
      const secondChildTestId = 'second-child-element';
      const { container } = render(
        <Component>
          <span data-testid={firstChildTestId}>First Child</span>
          <span data-testid={secondChildTestId}>Second Child</span>
        </Component>
      );

      expect(getByTestId(container, firstChildTestId)).toBeTruthy();
      expect(getByTestId(container, secondChildTestId)).toBeTruthy();
    });

    // TODO: What about colorBehavior support for components that don't support `children`?
    describe('colorBehavior context', () => {
      const colorBehaviorContextSpy = jest.fn();

      const ColorBehaviorContextTester = () => {
        const colorBehaviorContextValue = useColorBehaviorContext();

        useEffect(() => {
          colorBehaviorContextSpy(colorBehaviorContextValue);
        }, [colorBehaviorContextValue]);

        return null;
      };

      beforeEach(() => {
        colorBehaviorContextSpy.mockClear();
      });

      type ColorBehaviorContextTestRow = [
        contextValue: Required<ColorBehaviorProps>,
        propValue: ColorBehaviorProps | undefined,
        expectedChildContextValue: ColorBehaviorProps,
      ];

      const colorBehaviorTestTable: ColorBehaviorContextTestRow[] = [
        // Verify that child context matches the context set "above" the test component
        [{ colorBehavior: 'userDefault' }, undefined, { colorBehavior: 'userDefault' }],
        [{ colorBehavior: 'alwaysLight' }, undefined, { colorBehavior: 'alwaysLight' }],
        [{ colorBehavior: 'alwaysDark' }, undefined, { colorBehavior: 'alwaysDark' }],
        [{ colorBehavior: 'userInverse' }, undefined, { colorBehavior: 'userInverse' }],

        // Verify that child context matches the colorBehavior prop set on the test component
        [
          { colorBehavior: 'userInverse' },
          { colorBehavior: 'userDefault' },
          { colorBehavior: 'userDefault' },
        ],
        [
          { colorBehavior: 'userDefault' },
          { colorBehavior: 'alwaysLight' },
          { colorBehavior: 'alwaysLight' },
        ],
        [
          { colorBehavior: 'userDefault' },
          { colorBehavior: 'alwaysDark' },
          { colorBehavior: 'alwaysDark' },
        ],
        [
          { colorBehavior: 'userDefault' },
          { colorBehavior: 'userInverse' },
          { colorBehavior: 'userInverse' },
        ],
      ];

      const defaultInverseBehaviorTestTable: ColorBehaviorContextTestRow[] = [
        // Verify that child context applies the inverse of the context set "above" the test component
        [{ colorBehavior: 'userDefault' }, undefined, { colorBehavior: 'userInverse' }],
        [{ colorBehavior: 'alwaysLight' }, undefined, { colorBehavior: 'alwaysDark' }],
        [{ colorBehavior: 'alwaysDark' }, undefined, { colorBehavior: 'alwaysLight' }],
        [{ colorBehavior: 'userInverse' }, undefined, { colorBehavior: 'userDefault' }],

        // Verify that child context matches the colorBehavior prop set on the test component
        [
          { colorBehavior: 'userInverse' },
          { colorBehavior: 'userDefault' },
          { colorBehavior: 'userDefault' },
        ],
        [
          { colorBehavior: 'userDefault' },
          { colorBehavior: 'alwaysLight' },
          { colorBehavior: 'alwaysLight' },
        ],
        [
          { colorBehavior: 'userDefault' },
          { colorBehavior: 'alwaysDark' },
          { colorBehavior: 'alwaysDark' },
        ],
        [
          { colorBehavior: 'userDefault' },
          { colorBehavior: 'userInverse' },
          { colorBehavior: 'userInverse' },
        ],
      ];

      const selectColorBehaviorTestTable =
        name === 'Toast' ? defaultInverseBehaviorTestTable : colorBehaviorTestTable;

      it.each(selectColorBehaviorTestTable)(
        'context: %s, props: %s, expected child context: %s',
        (contextValue, propValue, expectedChildContextValue) => {
          render(
            <ColorBehaviorContext.Provider value={contextValue}>
              <Component {...propValue}>
                <ColorBehaviorContextTester />
              </Component>
            </ColorBehaviorContext.Provider>
          );

          expect(colorBehaviorContextSpy).toHaveBeenCalledWith(expectedChildContextValue);
        }
      );
    });
  }

  test('data-testid prop', () => {
    const testId = 'dingus';
    const { container } = render(<Component data-testid={testId} />);

    expect(getByTestId(container, testId)).toBeTruthy();
  });

  test(`${dataTplAttr} attribute`, async () => {
    const { container } = render(<Component />);

    expect(container.querySelector(`[${dataTplAttr}="${DataTplValue[name]}"]`)).toBeTruthy();
  });

  test('ref prop', () => {
    const ref = createRef();
    render(<Component ref={ref} />);

    expect(ref.current).toEqual(expect.any(expectedHTMLElement));
  });

  test('style prop', () => {
    const property = '--my-custom-property';
    const value = 'my-custom-value';

    const { container } = render(<Component style={{ [property]: value }} />);

    expect(
      getComputedStyle((container.firstChild as HTMLElement | null)!).getPropertyValue(property)
    ).toBe(value);
  });

  describe('sx prop', () => {
    it('applies `sx`-based styles to the root element', () => {
      const { container } = render(<Component sx={{ m: [0.5, 1] }} />);

      expect(container.firstChild).toHaveStyleRule('margin', spaceScale.get(0.5));
      expect(container.firstChild).toHaveStyleRule('margin', spaceScale.get(1), {
        media: `(min-width: ${minWidths[0]})`,
      });
    });

    it('gives `sx` styles higher source order precedence than `className` styles', () => {
      const myClass = css({ maxWidth: '48em' });
      const { container } = render(<Component className={myClass} sx={{ maxWidth: '1337px' }} />);

      expect(container.firstChild).toHaveStyleRule('max-width', '1337px');
    });
  });
});
