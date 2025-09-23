import React from 'react';
import { render } from '@testing-library/react';
import { matchers } from 'pretty-lights/jest';
import { BreakpointContext, breakpoints } from '@nyt/foundation';
import * as util from './util/index.js';

expect.extend(matchers);

const { useResponsivePropToCSS, useResponsivePropToClass } = util;

const responsivePropToCSSFixtures: [[string, any, ((any) => string)?], object][] = [
  // not responsive
  [['marginBottom', 0], { marginBottom: 0 }],

  // responsive
  [
    ['marginBottom', [0, 1, 2]],
    {
      [breakpoints[1]]: {
        marginBottom: 2,
      },
      [breakpoints[0]]: {
        marginBottom: 1,
      },
      marginBottom: 0,
    },
  ],

  // with transformed property
  [
    ['color', 0, () => 'red'],
    {
      color: 'red',
    },
  ],

  // with responsive transformed property
  [
    [
      'color',
      [0, null, 1],
      arg => {
        return ['red', 'black'][arg];
      },
    ],
    {
      [breakpoints[1]]: {
        color: 'black',
      },
      color: 'red',
    },
  ],
];

let css: { [P: string]: any } | null | undefined;

const ToCssTestComponent = ({ args }: { args: Parameters<typeof useResponsivePropToCSS> }) => {
  css = useResponsivePropToCSS(...args);
  return null;
};

beforeEach(() => {
  css = undefined;
});

describe.each(responsivePropToCSSFixtures)(
  'responsivePropToCSS %s',
  (fix, expected: { [p: string]: any } | null) => {
    it('transforms a single array style prop to css', () => {
      render(<ToCssTestComponent args={fix} />);

      expect(css).toStrictEqual(expected);
    });
  }
);

const ToClassTestComponent = ({ args }: { args: Parameters<typeof useResponsivePropToClass> }) => {
  const cssClass = useResponsivePropToClass(...args);
  return <div className={cssClass} />;
};

describe('responsivePropToClass', () => {
  it('returns a css class', () => {
    const {
      container: { firstChild },
    } = render(<ToClassTestComponent args={['marginBottom', '32px']} />);

    expect(firstChild).toHaveStyleRule('margin-bottom', '32px');
  });

  it('supports BreakpointContext', () => {
    const testBreakpoints = ['@media (min-width: 480px)', '@media (min-width: 1024px)'] as const;

    const {
      container: { firstChild },
    } = render(
      <BreakpointContext.Provider value={testBreakpoints}>
        <ToClassTestComponent args={['marginBottom', ['32px', '48px', '64px']]} />
      </BreakpointContext.Provider>
    );

    expect(firstChild).toHaveStyleRule('margin-bottom', '32px');
    expect(firstChild).toHaveStyleRule('margin-bottom', '48px', { media: '(min-width: 480px)' });
    expect(firstChild).toHaveStyleRule('margin-bottom', '64px', { media: '(min-width: 1024px)' });
  });
});
