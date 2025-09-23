import { Theme } from '@nyt/foundation';
import { lightInput, darkInput } from '../generated/color.js';
import { fontWeight, fontSize, typography } from '../generated/typography.js';
import { borderWidth } from '../generated/borderWidth.js';
import { spaceScale } from '../generated/spacing.js';
import { ruleTokens } from './rule.js';
import cssVars from '../generated/cssVar.js';

const snaps: [string, any][] = [
  ['lightInput', lightInput],
  ['darkInput', darkInput],
  ['fontSize', fontSize],
  ['typography', typography],
  ['fontWeight', fontWeight],
  ['borderWidth', borderWidth],
  ['ruleTokens', ruleTokens],
  ['spaceScale', spaceScale],
  ['cssVars', cssVars],
];

describe('generated tokens', () => {
  test.each(snaps)('%s', (_testName, tokenObj) => {
    expect(tokenObj).toMatchSnapshot();
  });

  test('instance of Theme using lightInput can be created without errors', () => {
    expect(() => new Theme(lightInput)).not.toThrow();
  });

  test('instance of Theme using darkInput can be created without errors', () => {
    expect(() => new Theme(darkInput)).not.toThrow();
  });
});
