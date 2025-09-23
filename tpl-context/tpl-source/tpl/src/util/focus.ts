import { css } from 'pretty-lights';
import { borderWidth, color } from '../tokens/index.js';

/**
 * @deprecated `focusSelector` will be removed in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.idkj2loswvck TPL Web 2.0 Release Plan: Remove CSS-in-JS Utilities}
 */
export const focusSelector = ':focus';
/**
 * @deprecated `focusVisibleSelector` will be removed in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.idkj2loswvck TPL Web 2.0 Release Plan: Remove CSS-in-JS Utilities}
 */
export const focusVisibleSelector = ':focus-visible';
/**
 * @deprecated `focusNotFocusVisibleSelector` will be removed in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.idkj2loswvck TPL Web 2.0 Release Plan: Remove CSS-in-JS Utilities}
 */
export const focusNotFocusVisibleSelector = `${focusSelector}:not(${focusVisibleSelector})`;

/**
 * @deprecated `baseFocusStyles` will be removed in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.idkj2loswvck TPL Web 2.0 Release Plan: Remove CSS-in-JS Utilities}
 */
export const baseFocusStyles = {
  outline: `${borderWidth.get(2)} solid ${color.content.accent}`,
  outlineOffset: borderWidth.get(2),
};

/**
 * @deprecated Please don't import `focusStyles` directly; use `rootFocusClass` or `createFocusClass()` instead.
 */
export const focusStyles = baseFocusStyles;

/**
 * @deprecated `CreateFocusClassOptions` will be removed in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.idkj2loswvck TPL Web 2.0 Release Plan: Remove CSS-in-JS Utilities}
 */
export interface CreateFocusClassOptions {
  baseSelector?: string;
  selectorSuffix?: string;
}

/**
 * Creates a Pretty Lights CSS class
 *
 * @deprecated `createFocusClass` will be removed in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.idkj2loswvck TPL Web 2.0 Release Plan: Remove CSS-in-JS Utilities}
 */
export const createFocusClass = ({
  baseSelector = '&',
  selectorSuffix = '',
}: CreateFocusClassOptions = {}) => {
  return css({
    [`${baseSelector}${selectorSuffix}`]: {
      '@media (forced-colors: none)': {
        ...baseFocusStyles,
        outlineColor: 'transparent',
      },
    },

    [`${baseSelector}${focusSelector}${selectorSuffix}`]: baseFocusStyles,

    [`${baseSelector}${focusNotFocusVisibleSelector}${selectorSuffix}`]: {
      /**
       * Use `outline-color: transparent` instead of `outline: none`
       * to better accommodate Windows High Contrast Mode
       */
      outline: `${borderWidth.get(2)} solid transparent`,
    },

    [`${baseSelector}${focusVisibleSelector}${selectorSuffix}`]: baseFocusStyles,

    /**
     * When `selectorSuffix` is set: disable the `outline` on
     * the `baseSelector` element to avoid double focus rings
     */
    ...(selectorSuffix
      ? {
          [`${baseSelector}`]: {
            [`&, &:is(${focusSelector}, ${focusNotFocusVisibleSelector}, ${focusVisibleSelector})`]:
              {
                outline: 'none !important',
              },
          },
        }
      : {}),
  });
};

/**
 * @deprecated `rootFocusClass` will be removed in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with Critical Stylesheet and Color Scheme CSS Classes to achieve similar results.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.3aaeoyanfs81 TPL Web 2.0 Release Plan: Remove Root Component}
 */
export const rootFocusClass = createFocusClass({ baseSelector: '*' });
