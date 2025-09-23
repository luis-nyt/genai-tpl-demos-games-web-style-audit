import { css } from 'pretty-lights';
import { activeSelector, processingSelector } from '../TextButton/styled.js';
import { disabledSelector } from '../util/index.js';
import { borderWidth } from '../generated/borderWidth.js';

export const emphasis = css({
  color: 'var(--button-filledFg)',
  /** Used to draw the Button background */
  background: 'hsl(var(--button-bg))',

  [activeSelector]: {
    background: 'hsla(var(--button-bg), var(--button-opacityActive))',
  },

  [disabledSelector]: {
    background: 'hsla(var(--button-bg), var(--button-opacityDisabled))',
  },

  /**
   * Place after `disabledSelector` styles, since we disable the Button while processing, but we
   * then want the button background to have a slightly different opacity
   */
  [processingSelector]: {
    background: 'hsla(var(--button-bg), var(--button-opacityActive))',
  },
});

export const standard = css({
  '--button-borderWidth': borderWidth.get(1),
  border: 'var(--button-borderWidth) solid hsl(var(--button-stroke))',

  [activeSelector]: {
    background: 'hsla(var(--button-bg), var(--button-opacityHover))',
  },

  [disabledSelector]: {
    opacity: 'var(--button-opacityDisabled)',
  },

  /**
   * Place after `disabledSelector` styles, since we disable the Button while processing, but we
   * then want the button background to have a slightly different opacity
   */
  [processingSelector]: {
    opacity: 1,
    background: 'hsla(var(--button-bg), var(--button-opacityHover))',
  },
});
