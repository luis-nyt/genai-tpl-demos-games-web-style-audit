import { css } from 'pretty-lights';
import { visuallyHiddenStyles } from '../util/index.js';

export const linkClass = css({
  color: 'inherit',
  /** Explicitly set `text-decoration: underline`, just in case a CSS reset has removed it */
  textDecoration: 'underline',

  ':hover': {
    textDecoration: 'none',
  },

  '&[target="_blank"]::after': {
    ...visuallyHiddenStyles,
    content: "'(opens in new tab)'",
  },

  /**
   * The string after the `/` denotes alternative text
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/content#alternative_text
   * @see https://caniuse.com/mdn-css_properties_content_alt_text
   */
  '@supports (content: "primary" / "alt")': {
    '&[target="_blank"]::after': {
      content: "'\\FEFF' / '(opens in new tab)'", // non-breaking character and pseudo alt text
      display: 'contents', // removes the "space" and doesn't wrap
    },
  },
});

export const subtleClass = css({
  textDecoration: 'none',

  ':hover': {
    textDecoration: 'underline',
  },
});
