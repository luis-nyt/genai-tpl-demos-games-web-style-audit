import { tplTypographyModifier } from './typography.js';
import { typography } from '../tokens/index.js';

const defaultBreakpoints = ['@media(min-width: 500px)', '@media(min-width: 900px)'];

const testTable: [string, object, [string, string | (string | null)[]], string[], object][] = [
  ['responds to typ prop', {}, ['typ', 'Title/28'], defaultBreakpoints, typography['Title/28']],
  [
    'responds to typography prop',
    {},
    ['typ', 'Title/28'],
    defaultBreakpoints,
    typography['Title/28'],
  ],
  [
    'responsive',
    {},
    ['typ', ['Title/28', null, 'Title/36']],
    defaultBreakpoints,
    {
      ...typography['Title/28'],
      '@media(min-width: 900px)': {
        ...typography['Title/36'],
      },
    },
  ],
  [
    'with undefined values',
    {},
    ['typ', ['foo', 'Title/28']],
    defaultBreakpoints,
    {
      '@media(min-width: 500px)': {
        ...typography['Title/28'],
      },
    },
  ],
];

describe('tplTypograhyModifier', () => {
  test.each(testTable)('%s', (_testName, obj, fixture, breakpoints, expected) => {
    const [key, value] = fixture;
    const result = tplTypographyModifier(obj, key, value, breakpoints);

    expect(result).toEqual(expected);
  });
});
