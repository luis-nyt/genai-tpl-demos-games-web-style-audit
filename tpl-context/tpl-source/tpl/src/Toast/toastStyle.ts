import { css } from 'pretty-lights';
import type { Properties, Property } from 'csstype';
import { spaceScale } from '@nyt/foundation';

/**
 * @group Toast
 *
 * @deprecated `ToastStyle` will be replaced in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with SCSS Mixins to achieve similar results.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.em4jzdqfw15r TPL Web 2.0 Release Plan: Replace Component Style CSS-in-JS Helpers with SCSS Mixins}
 */

export interface ToastStyle {
  /** The background color of the Toast */
  background: Property.Background | undefined;
  /** The corner radius on all corners of the Toast. */
  cornerRadius: Property.BorderRadius;
  /** The maximum width of the Toast, including the outerPadding */
  maxWidth: Property.MaxWidth;
  /** The minimum height of the Toast */
  minHeight: Property.MinHeight;
  /** The padding around the Toast's body */
  padding: Property.Padding;
  /** The padding on the left and right outside of the Toast's body */
  outerPadding: Property.PaddingLeft;
}

/**
 * @group Toast
 *
 * @deprecated `ToastStyleCssInJsProperties` will be replaced in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with SCSS Mixins to achieve similar results.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.em4jzdqfw15r TPL Web 2.0 Release Plan: Replace Component Style CSS-in-JS Helpers with SCSS Mixins}
 */
export type ToastStyleCssInJsProperties = {
  [P in keyof ToastStyle]: `var(--${string}, ${string})`;
};

/**
 * The default values used for {@link Toast}. We use this in {@link toastStyle}
 * (the object) to provide CSS `var()` fallback values.
 */
const toastStyleFallbackValues = {
  background: undefined,
  cornerRadius: '0.25rem',
  maxWidth: '25rem',
  minHeight: `${spaceScale.get(4)}`,
  padding: `${spaceScale.get(1.5)}`,
  outerPadding: `${spaceScale.get(2)}`,
} as const satisfies ToastStyle;

const getCssCustomPropertyName = (property: string, prefix = 'tpl-toast'): `--${string}` =>
  `--${prefix ? `${prefix}-` : ''}${property}`;

/**
 * @group Toast
 *
 * @deprecated `toastStyle` will be replaced in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with SCSS Mixins to achieve similar results.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.em4jzdqfw15r TPL Web 2.0 Release Plan: Replace Component Style CSS-in-JS Helpers with SCSS Mixins}
 */
export const toastStyle = Object.fromEntries(
  Object.entries(toastStyleFallbackValues).map(([property, value]) => [
    property,
    `var(${getCssCustomPropertyName(property)}${
      // Only output a fallback value if necessary
      typeof value !== 'undefined' ? `, ${value}` : ''
    })`,
  ])
) as ToastStyleCssInJsProperties;

/**
 * @group Toast
 *
 * @deprecated `createToastStylePropertyDeclarations` will be replaced in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with SCSS Mixins to achieve similar results.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.em4jzdqfw15r TPL Web 2.0 Release Plan: Replace Component Style CSS-in-JS Helpers with SCSS Mixins}
 */
export const createToastStylePropertyDeclarations = (
  customStyleProperties: Partial<ToastStyle>
): Properties =>
  Object.fromEntries(
    Object.entries(customStyleProperties).map(([property, value]) => [
      getCssCustomPropertyName(property),
      value,
    ])
  );

/**
 * @group Toast
 *
 * @deprecated `createToastStyleClass` will be replaced in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with SCSS Mixins to achieve similar results.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.em4jzdqfw15r TPL Web 2.0 Release Plan: Replace Component Style CSS-in-JS Helpers with SCSS Mixins}
 */
export const createToastStyleClass = (properties: Partial<ToastStyle>): string =>
  css(createToastStylePropertyDeclarations(properties));
