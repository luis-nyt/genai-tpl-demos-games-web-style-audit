import { spaceScale } from '@nyt/foundation';
import { css } from 'pretty-lights';
import { typography } from '../tokens/index.js';

export const standard = css({
  ...typography['Title/16'],
  '--button-size': '2.75rem', // 44px
  /**
   * Override the line height from the typography token's `font`; annoying but necessary.
   * Note: This also ends up being slightly shorter than Title/16's line height.
   * */
  lineHeight: '1.25rem',
  '--button-py': `calc(${spaceScale.get(1.5)} - var(--button-borderWidth))`,
});

export const compact = css({
  ...typography['Title/14'],
  '--button-size': '2rem', // 32px
  /**
   * Override the line height from the typography token's `font`; annoying but necessary.
   * Note: This also ends up being slightly shorter than Title/14's line height.
   * */
  lineHeight: '1.125rem',
  '--button-py': 'calc(0.4375rem - var(--button-borderWidth))',
});

export const extraCompact = css({
  ...typography['Title/14'],
  '--button-size': '1.5rem', // 24px
  /**
   * Override the line height from the typography token's `font`; annoying but necessary.
   * Note: This also ends up being slightly shorter than Title/14's line height.
   * */
  lineHeight: '1.125rem',
});

export const expanded = css({
  ...typography['Title/20'],
  // Turns out: Title/20's line height is small enough to avoid the overrides mentioned above
  '--button-size': '3.5rem', // 56px
});
