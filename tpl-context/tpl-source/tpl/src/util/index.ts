import { css } from 'pretty-lights';

/**
 * @deprecated `visuallyHiddenStyles` will be removed in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.idkj2loswvck TPL Web 2.0 Release Plan: Remove CSS-in-JS Utilities}
 */
const visuallyHiddenStyles = {
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '1px',
};

/**
 * class for hiding elements visually but exposing them to screen readers
 * @see https://www.a11yproject.com/posts/how-to-hide-content/
 *
 * @deprecated `visuallyHidden` will be removed in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.idkj2loswvck TPL Web 2.0 Release Plan: Remove CSS-in-JS Utilities}
 */
const visuallyHidden = css({
  '&:not(:focus):not(:active)': visuallyHiddenStyles,
});

export * from './responsive.js';
export * from './disabledSelectors.js';
export * from './globals.js';
export * from './prefersDarkMode.js';
export * from './focus.js';
export * from './DataTpl.js';
export * from './types.js';

export { visuallyHidden, visuallyHiddenStyles };
