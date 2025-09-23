import { css } from 'pretty-lights';
import { spaceScale } from '@nyt/foundation';
import { borderRadius, borderWidth, typography } from '../tokens/index.js';
import { focusSelector, focusVisibleSelector } from '../util/index.js';

export const marginTopSpace = '0.375rem';

export const inputLabelClass = css({
  display: 'block',
  margin: `${spaceScale.get(3)} 0 ${spaceScale.get(0.5)} 0`,
});

export const inputHelperTextClass = css({
  margin: `${marginTopSpace} 0 0 0`,
});

export const alertInputClass = css({
  margin: `0 ${spaceScale.get(0.5)} 0 0`,
});

const alertIconSpace = `0.95em + ${spaceScale.get(0.5)}`;

export const inputErrorTextClass = css({
  margin: `${marginTopSpace} 0 0 calc(${alertIconSpace})`,
  textIndent: `calc(-1 * (${alertIconSpace}))`,
});

export const tabFocusClass = css({
  // :not(:active) prevents the input outline from flashing blue when clicking the input
  '&:focus-within:not(:active)': {
    borderColor: 'var(--tpl-input-tab-focus-accent)',
    boxShadow: `inset 0 0 0 ${borderWidth.get(1)} var(--tpl-input-tab-focus-accent)`,
  },
});

const transitionStyle = {
  '@media (prefers-reduced-motion: no-preference)': {
    /** Make the focus ring fade in and out */
    transition: '100ms ease-out',
  },
};

const inputFocusStyles = {
  [`&${focusSelector}${focusVisibleSelector}, :active:not(:disabled)`]: {
    outline: 'transparent',
  },
};

export const inputContainerFocusClass = css({
  borderColor: 'var(--tpl-input-focus-stroke)',
  boxShadow: `inset 0 0 0 ${borderWidth.get(1)} var(--tpl-input-focus-stroke)`,
});

export const inputContainerClass = css({
  position: 'relative',
  display: 'flex',
  flexWrap: 'nowrap',
  boxSizing: 'border-box',
  background: 'var(--tpl-input-background)',

  height: '2.75rem',

  border: `${borderWidth.get(1)} solid var(--tpl-input-stroke)`,
  borderRadius: borderRadius.get(3),
  ...transitionStyle,
});

/**
 * we're simulating a disabled input so we can allow it to be tabbed through
 */
export const lockedClass = css({
  background: 'var(--tpl-input-locked-background)',
});

export const textInputClass = css({
  '&:-webkit-autofill, &:autofill': {
    /**
     * telling the browser that autofill styles should respect the current theme
     */
    '@media (prefers-color-scheme: light)': {
      colorScheme: 'light',
    },
    '@media (prefers-color-scheme: dark)': {
      colorScheme: 'dark',
    },
    backgroundClip: 'border-box',
    borderRadius: 0.8,

    '&:focus': {
      margin: '0.0625rem',
      padding: `0 calc(${spaceScale.get(1.5)} - 0.0625rem)`,
    },
  },
  display: 'block',
  color: 'var(--tpl-input-content)',
  margin: '0.0625rem',
  padding: `0 calc(${spaceScale.get(1.5)} - 0.0625rem)`,
  border: 'none',

  width: '100%',
  backgroundColor: 'var(--tpl-input-background)',
  borderRadius: spaceScale.get(0.5),

  font: typography['Text/16'].font,
  lineHeight: 0,
  ...inputFocusStyles,
  '&::placeholder': {
    color: 'var(--tpl-input-placeholder)',
  },

  '&:disabled': {
    background: 'var(--tpl-input-locked-background)',
  },
});

export const inputFocusErrorClass = css({
  '&:focus-within, :active:not(:disabled)': {
    borderColor: 'var(--tpl-input-error-stroke)',
    boxShadow: `inset 0 0 0 ${borderWidth.get(1)} var(--tpl-input-error-stroke)`,
  },
});

export const inputErrorClass = css({
  borderColor: 'var(--tpl-input-error-stroke)',
});
