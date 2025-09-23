import React from 'react';
import { BreakpointArray, BreakpointContext, breakpoints } from '@nyt/foundation';
import { render } from '@testing-library/react';
import { useTypographyCSS } from './useTypographyCSS';
import type { TextProps, TextStyle } from '../Text';
import { typographyFlat } from '../tokens/typography';

type TestRow<TextSizeStyle extends TextStyle> = [
  size: TextProps<TextSizeStyle>['size'],
  expected?: any
];

const createDisplayTestSuite = (
  customBreakpoints: Readonly<BreakpointArray> = breakpoints
): TestRow<'display'> => [
  [1, 2, 3],
  {
    font: typographyFlat.display[1][0],
    [customBreakpoints[0]]: { font: typographyFlat.display[2][1] },
    [customBreakpoints[1]]: { font: typographyFlat.display[3] },
  },
];

const suiteTable: { [P in TextStyle]?: TestRow<P>[] } = {
  body: [
    [
      1,
      {
        font: typographyFlat.body[1],
      },
    ],
    [
      [1, 2],
      {
        font: typographyFlat.body[1],
        [breakpoints[0]]: { font: typographyFlat.body[2] },
      },
    ],
    [
      [1, 2, 3],
      {
        font: typographyFlat.body[1],
        [breakpoints[0]]: { font: typographyFlat.body[2] },
        [breakpoints[1]]: { font: typographyFlat.body[3] },
      },
    ],
  ],

  display: [
    [
      1,
      {
        font: typographyFlat.display[1][0],
        [breakpoints[0]]: { font: typographyFlat.display[1][1] },
        [breakpoints[1]]: { font: typographyFlat.display[1][2] },
      },
    ],
    [
      2,
      {
        font: typographyFlat.display[2][0],
        [breakpoints[0]]: { font: typographyFlat.display[2][1] },
      },
    ],
    [
      3,
      {
        font: typographyFlat.display[3],
      },
    ],
    [
      [1, 3],
      {
        font: typographyFlat.display[1][0],
        [breakpoints[0]]: { font: typographyFlat.display[3] },
      },
    ],
    [
      [1, 3, 2],
      {
        font: typographyFlat.display[1][0],
        [breakpoints[0]]: { font: typographyFlat.display[3] },
        // Display 2 doesn't have a value for the second breakpoint / array index 2
      },
    ],
    [
      [1, 1, 3],
      {
        font: typographyFlat.display[1][0],
        [breakpoints[0]]: { font: typographyFlat.display[1][1] },
        [breakpoints[1]]: { font: typographyFlat.display[3] },
      },
    ],
    createDisplayTestSuite(),
    [
      [1, null, 3],
      {
        font: typographyFlat.display[1][0],
        [breakpoints[1]]: { font: typographyFlat.display[3] },
      },
    ],
    [
      [2, 3],
      {
        font: typographyFlat.display[2][0],
        [breakpoints[0]]: { font: typographyFlat.display[3] },
      },
    ],
    [
      [2, 2, 3],
      {
        font: typographyFlat.display[2][0],
        [breakpoints[0]]: { font: typographyFlat.display[2][1] },
        [breakpoints[1]]: { font: typographyFlat.display[3] },
      },
    ],
    [
      [2, null, 3],
      {
        font: typographyFlat.display[2][0],
        [breakpoints[1]]: { font: typographyFlat.display[3] },
      },
    ],
    [
      [3, 2, 1],
      {
        font: typographyFlat.display[3],
        [breakpoints[0]]: { font: typographyFlat.display[2][1] },
        [breakpoints[1]]: { font: typographyFlat.display[1][2] },
      },
    ],
    [
      [3, null, 1],
      {
        font: typographyFlat.display[3],
        [breakpoints[1]]: { font: typographyFlat.display[1][2] },
      },
    ],
    [
      [null, null, 1],
      {
        [breakpoints[1]]: { font: typographyFlat.display[1][2] },
      },
    ],
    [
      [null, null, 2],
      // Empty object, because Display 2 doesn't have a value for the second breakpoint / array index 2
      {},
    ],
    [
      [null, null, 3],
      {
        [breakpoints[1]]: { font: typographyFlat.display[3] },
      },
    ],
  ],
};

let css: { [p: string]: any } | null | undefined;

const TestComponent = ({ args }: { args: Parameters<typeof useTypographyCSS> }) => {
  css = useTypographyCSS(...args);
  return null;
};

beforeEach(() => {
  css = undefined;
});

describe.each(Object.entries(suiteTable))('"%s" variant', (variant, tests) => {
  it.each(tests)('size: %s', (size, expected) => {
    render(<TestComponent args={[typographyFlat, variant, size]} />);

    expect(css).toEqual(expected);
  });
});

it('supports BreakpointContext', () => {
  const testBreakpoints = ['@media (min-width: 480px)', '@media (min-width: 1024px)'] as const;

  const [size, expected] = createDisplayTestSuite(testBreakpoints);

  render(
    <BreakpointContext.Provider value={testBreakpoints}>
      <TestComponent args={[typographyFlat, 'display', size]} />
    </BreakpointContext.Provider>
  );

  expect(css).toEqual(expected);
});
