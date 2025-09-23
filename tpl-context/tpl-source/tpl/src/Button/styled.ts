import { spaceScale } from '@nyt/foundation';
import { css } from 'pretty-lights';
import { onlyIconClass } from '../BaseButton/styled.js';
import {
  activeSelector,
  contentSelector,
  hoverSelector,
  underlineSelector,
} from '../TextButton/styled.js';
import { borderRadius } from '../tokens/index.js';
import { disabledSelector } from '../util/index.js';

export const buttonHoverStyles = {
  boxShadow:
    '0 0 0 var(--button-shadowSpread) hsla(var(--button-strokeHover), var(--button-opacityHover))',
};

export const buttonActiveStyles = {
  boxShadow: '0 0 0 0 transparent',
  /** Override TextButton's `opacity` style to avoid dimming the _entire_ Button when clicked */
  opacity: 1,
  background: 'hsla(var(--button-bg), var(--button-opacityHover))',
};

export const button = css({
  '--button-shadowSpread': borderRadius.get(3),
  /** Applied to `childrenClass` via CSS `inherit` */
  gap: spaceScale.get(1),

  /** Override for TextButton styles --- don't draw the underline (pseudo-element), like, at all */
  [underlineSelector]: {
    content: 'none',
  },

  /** Icon Button (or Button with only an Icon child): decrease horizontal padding by the smallest space token increment */
  [`&.${onlyIconClass}`]: {
    '--button-pxExtra': `-${spaceScale.get(0.5)}`,
  },

  [hoverSelector]: buttonHoverStyles,

  [activeSelector]: buttonActiveStyles,

  [disabledSelector]: {
    [contentSelector]: {
      /** Override TextButton's `opacity`; Button makes its background semitransparent instead */
      opacity: 1,
    },
  },
});
