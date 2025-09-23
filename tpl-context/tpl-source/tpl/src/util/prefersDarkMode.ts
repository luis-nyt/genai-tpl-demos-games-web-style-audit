import { DATA_DARK_MODE } from './globals.js';

/**
 * Media selector for dark mode; uses data attribute from root to ensure
 * dark mode is supported
 *
 * @deprecated `prefersDarkMode` will be removed in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.idkj2loswvck TPL Web 2.0 Release Plan: Remove CSS-in-JS Utilities}
 */
export const prefersDarkMode = (content: string): string =>
  `@media (prefers-color-scheme: dark) { [${DATA_DARK_MODE}] & { ${content}}}`;
