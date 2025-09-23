import type { Properties, Property } from 'csstype';
import { css } from 'pretty-lights';
import { spaceScale } from '../generated/spacing.js';

/**
 * @group Dialog
 *
 * @deprecated `DialogStyle` will be replaced in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with SCSS Mixins to achieve similar results.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.em4jzdqfw15r TPL Web 2.0 Release Plan: Replace Component Style CSS-in-JS Helpers with SCSS Mixins}
 */
export interface DialogStyle {
  /** The background color of the dialog. */
  background: Property.Background | undefined;
  /** The space above the dialog's `content` and in between `content` and `actions`. */
  spacing: Property.Gap;
  /** The horizontal alignment of everything inside the dialog. Note: does not change text alignment. */
  alignment: Property.AlignItems;
  /** The horizontal and bottom padding inside the dialog. */
  padding: Property.PaddingLeft;
  /** The vertical and horizontal padding around outside of the dialog. */
  outerPadding: Property.PaddingLeft;
  /** The space between buttons within the dialog's `actions`. */
  spacingBetweenActions: Property.Gap;
  /** The corner radius on all corners of the dialog. */
  cornerRadius: Property.BorderRadius;
  /// The color of the shadow behind the dialog. Recommended to use alongside `shadowRadius`, `shadowX`, `shadowY`.
  shadowColor: string;
  /// The radius of the shadow behind the dialog.
  shadowRadius: (string & {}) | 0;
  /// The horizontal offset of the shadow behind the dialog.
  shadowX: (string & {}) | 0;
  /// The vertical offset of the shadow behind the dialog.
  shadowY: (string & {}) | 0;
  /**
   * Whether to enable or disable automatic padding around the dialog's content view.
   *
   * When enabled, TPLDialog tries to optimize the content view's layout under certain conditions, e.g. to prevent text content from "crashing" in to the "X" close button when the `media` view is absent.
   *
   * If these padding optimizations cause issues, set `automaticContentPadding` to `false` and, if necessary, add additional padding directly to the `content` view.
   */
  automaticContentPadding: boolean;
}

/**
 * @group Dialog
 *
 * @deprecated `DialogStyleCssInJsProperties` will be replaced in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with SCSS Mixins to achieve similar results.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.em4jzdqfw15r TPL Web 2.0 Release Plan: Replace Component Style CSS-in-JS Helpers with SCSS Mixins}
 */
export type DialogStyleCssInJsProperties = {
  [P in keyof DialogStyle]: `var(--${string}, ${string})`;
};

/**
 * The default values used for {@link Dialog}. We use this in {@link dialogStyle}
 * (the object) to provide CSS `var()` fallback values.
 */
const dialogStyleFallbackValues = {
  background: undefined,
  spacing: spaceScale.get(3)!,
  alignment: 'center',
  padding: spaceScale.get(4)!,
  outerPadding: '1rem',
  spacingBetweenActions: spaceScale.get(1.5)!,
  cornerRadius: '0.1875rem',
  shadowColor: 'hsla(0deg 0% 0% / 15%)',
  shadowRadius: '0.3125rem', // TODO: 0.417rem?
  shadowX: 0,
  shadowY: '0.1875rem',
  automaticContentPadding: true,
} as const satisfies DialogStyle;

const getCssCustomPropertyName = (property: string, prefix = 'tpl-dialog'): `--${string}` =>
  `--${prefix ? `${prefix}-` : ''}${property}`;

/**
 * @group Dialog
 *
 * @deprecated `dialogStyle` will be replaced in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with SCSS Mixins to achieve similar results.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.em4jzdqfw15r TPL Web 2.0 Release Plan: Replace Component Style CSS-in-JS Helpers with SCSS Mixins}
 */
export const dialogStyle = Object.fromEntries(
  Object.entries(dialogStyleFallbackValues).map(([property, value]) => [
    property,
    `var(${getCssCustomPropertyName(property)}${
      // Only output a fallback value if necessary
      typeof value !== 'undefined' ? `, ${value}` : ''
    })`,
  ])
) as DialogStyleCssInJsProperties;

/**
 * @group Dialog
 *
 * @deprecated `createDialogStylePropertyDeclarations` will be replaced in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with SCSS Mixins to achieve similar results.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.em4jzdqfw15r TPL Web 2.0 Release Plan: Replace Component Style CSS-in-JS Helpers with SCSS Mixins}
 */
export const createDialogStylePropertyDeclarations = (
  customStyleProperties: Partial<DialogStyle>
): Properties =>
  Object.fromEntries(
    Object.entries(customStyleProperties).map(([property, value]) => [
      getCssCustomPropertyName(property),
      value,
    ])
  );

/**
 * @group Dialog
 *
 * @deprecated `createDialogStyleClass` will be replaced in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with SCSS Mixins to achieve similar results.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.em4jzdqfw15r TPL Web 2.0 Release Plan: Replace Component Style CSS-in-JS Helpers with SCSS Mixins}
 */
export const createDialogStyleClass = (properties: Partial<DialogStyle>): string =>
  css(createDialogStylePropertyDeclarations(properties));
