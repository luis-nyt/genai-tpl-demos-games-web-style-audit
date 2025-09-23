import { spaceScale } from '@nyt/foundation';
import { css } from 'pretty-lights';
import { borderRadius, borderWidth } from '../tokens/index.js';
import { disabledSelector, notDisabledSelector } from '../util/index.js';
import { contentClass } from '../BaseButton/styled.js';

export const hoverSelector = `&:hover${notDisabledSelector}`;

export const activeSelector = `&:active${notDisabledSelector}`;

export const processingSelector = '&[data-processing="true"]';

/** A convenient selector for the BaseButton's "content" element, which contains its children, icon and Spinner */
export const contentSelector = `.${contentClass}`;

/** The pseudo-element used to draw the TextButton's underline */
export const underlineSelector = `${contentSelector}::after`;

export const textButton = css({
  '--button-opacityHover': 0.12,
  '--button-opacityActive': 0.8,
  '--button-opacityDisabled': 0.4,
  /**
   * Used to adjust the Button padding when rendering a single Icon child element.
   *
   * Note: This default value of zero must have a unit; otherwise, CSS `calc()` won't evaluate it.
   */
  '--button-pxExtra': '0px',
  '--button-stroke': 'var(--button-fg)',
  '--button-borderWidth': '0px',

  appearance: 'none',
  width: '100%',
  /**
   * Make `<a>` tags behave similarly to `<button>` in terms of `max-width`
   * @see https://stackoverflow.com/a/27770128
   */
  maxWidth: 'fit-content',
  /** Same as above; make sure both `<a>` and `<button>` use `box-sizing: border-box` */
  boxSizing: 'border-box',
  textDecoration: 'none',
  /** Applied to `childrenClass` via CSS `inherit` */
  gap: spaceScale.get(0.5),
  borderRadius: borderRadius.get(3),
  padding: 0,
  /** TODO: Consider if left alignment with Icon + multi-line button text would be useful */
  textAlign: 'center',
  border: 'none',
  background: 'transparent',
  color: 'hsl(var(--button-fg))',
  display: 'block',
  /** Applied to `childrenClass` via CSS `inherit` */
  flexDirection: 'row',
  /** Applied to `childrenClass` via CSS `inherit` */
  alignItems: 'center',
  /** Applied to `childrenClass` via CSS `inherit` */
  justifyContent: 'center',
  minWidth: 'var(--button-size)',
  minHeight: 'var(--button-size)',

  '@media (prefers-reduced-motion: no-preference)': {
    transition: '100ms ease-out',
    transitionProperty: 'color, background-color, border-color, box-shadow, outline-color',
  },

  [contentSelector]: {
    /** Make sure the content element gets the same transition property as Button parent element */
    transition: 'inherit',
    padding: 'var(--button-py) var(--button-px)',
  },

  [underlineSelector]: {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    margin: 'auto',
    width: '100%',
    transition: 'inherit',
    boxSizing: 'border-box',
    height: 'calc(var(--button-size) - var(--button-py) * 2)',
    border: `${borderWidth.get(1)} hsl(var(--button-stroke))`,
    borderBottomStyle: 'solid',
  },

  [hoverSelector]: {
    textDecoration: 'none',
    [underlineSelector]: {
      opacity: 0,
    },
  },

  [activeSelector]: {
    opacity: 'var(--button-opacityActive)',
  },

  [disabledSelector]: {
    cursor: 'not-allowed',
    [contentSelector]: {
      opacity: 'var(--button-opacityDisabled)',
    },
  },

  /**
   * Place after `disabledSelector` styles, since we disable the Button while processing, but we
   * then want to use this different `cursor` value
   */
  [processingSelector]: {
    cursor: 'wait',
    [contentSelector]: {
      opacity: 1,
    },
    [underlineSelector]: {
      visibility: 'hidden',
    },
  },
});
