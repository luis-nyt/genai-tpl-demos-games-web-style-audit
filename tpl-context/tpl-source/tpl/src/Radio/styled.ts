import { css } from 'pretty-lights';
import { spaceScale } from '@nyt/foundation';
import { borderRadius } from '../tokens/index.js';
import { disabledSelector } from '../util/index.js';

export const rootClass = css({
  /** Note: This padding is based on the line height of TPL's Text/16 token, which is 1.3 */
  padding: `${(2 - 1.3) / 2}rem 0`,
  width: 'fit-content',
  display: 'flex',
  gap: spaceScale.get(1),
});

export const disabledClass = css({
  opacity: '0.4',
});

/** Styles for the radio "button" itself */
export const radioIndicatorClass = css({
  '--radio-size': '1.125rem', // 18px
  '--bullet-size': '0.625rem', // 10px
  '--border-size': '0.0625rem', // 1px

  flex: '0 0 auto',
  appearance: 'none',
  cursor: 'pointer',
  /** Reposition the radio indicator relative to the label text to improve vertical alignment */
  margin: '0.09375rem 0 0', // 1.5px
  border: 'var(--border-size) solid',
  width: 'var(--radio-size)',
  height: 'var(--radio-size)',
  borderRadius: '9999px', // always round

  /** Use `padding`, `background-color` and `background-clip` to render a "bullet" when checked */
  padding: 'calc((var(--radio-size) - var(--bullet-size)) / 2 - var(--border-size))',
  backgroundColor: 'transparent',
  backgroundClip: 'content-box',

  [disabledSelector]: {
    cursor: 'not-allowed',
  },

  /** Give the focus ring rendered by `LinkBox` a customized `border-radius` */
  '::before': {
    borderRadius: borderRadius.get(3),
  },

  '@media (prefers-reduced-motion: no-preference)': {
    transition: 'background-color 100ms ease-out',
  },
});

export const radioGroupClass = css({
  appearance: 'none',
  border: 'none',
  padding: 0,
  margin: 0,
});
