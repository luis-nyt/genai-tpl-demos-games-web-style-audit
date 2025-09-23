/**
 * A Sass-style `&` _complex_ selector which matches when the element is disabled,
 * either via the `disabled` attribute (e.g. with form elements) or `aria-disabled="true"`
 *
 * @deprecated `disabledSelector` will be removed in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.idkj2loswvck TPL Web 2.0 Release Plan: Remove CSS-in-JS Utilities}
 */
export const disabledSelector = '&:disabled, &[aria-disabled="true"]';

/**
 * A Sass-style `&` selector which matches when the element is _not_ disabled
 *
 * @deprecated `notDisabledSelector` will be removed in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.idkj2loswvck TPL Web 2.0 Release Plan: Remove CSS-in-JS Utilities}
 */
export const notDisabledSelector = '&:not(:disabled):not([aria-disabled="true"])';
